const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const moment = require('moment');

const keys = require('../../config/keys');
const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');
const validateUpdateUserInput = require('../../validation/updateUser');

const EBEntry = require('../../models/EBEntry');
const User = require('../../models/User');
const Lab = require('../../models/Lab');
const Project = require('../../models/Project');

const ConsolidatedEBEntry = require('../../models/ConsolidatedEBEntry');




router.post(['/register','/user-add'], (req, res) => {
    const { errors, isValid } = validateRegisterInput(req.body);
    if (!isValid) {
        return res.status(400).json(errors);
    }
    User.findOne({ email: req.body.email }).then(user => {
        if (user) {
            return res.status(400).json({ email: 'Email already exists' });
        } else {
            const newUser = new User({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password
            });
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if (err) throw err;
                    newUser.password = hash;
                    newUser
                        .save()
                        .then(user => {
                            return res.status(200).json({message: 'User added successfully. Refreshing data...'})
                        }).catch(err => console.log(err));
                });
            });
        }
    });
});

router.post('/user-data', (req, res) => {
    User.find({}).select(['-password']).then(user => {
        if (user) {
            return res.status(200).send(user);
        }
    });
});


/* EB calls */

router.get('/eb-due-list', (req, res) => {
    console.log(req.query);
    const { labName } = req.query;
    const projectNo = req.body.projectNo;

    EBEntry.find({lab: labName}).then( ebEntries => {

           
        if ( ebEntries ) {
            
            const entries = ebEntries.filter( ebentry => {
                let { ebDate } = ebentry;
       
                const ebDateObj = moment(ebDate);
                const today = moment();
                const days = today.diff(ebDate,"days");
                console.log( 'days diff b/w '+ ebDateObj.format("DD/MM/YYYY") + " "+today.format("DD/MM/YYYY") +days );

                if( days >= 180 ){
                    return true
                }else{
                    return false;
                }
        
            }).map( ebentry => {
                let { ebDate, ...rest} = ebentry;
       
                const ebDateObj = moment(ebDate);
                const entry = Object.assign(ebentry, {ebDateStr: ebDateObj.format("DD/MM/YYYY")})
                
                const test = {
                    ...ebentry._doc,
                    ebDate: ebDateObj.format("DD/MM/YYYY")
                };

                console.log(test);
                return test;
            });
            
            return res.status(200).send(entries);

        }else{
            return res.status(200).send("No due list found");
        }
   
      
    });
});

router.put('/update-eblist', (req, res) => {
    // const { errors, isValid } = validateUpdateUserInput(req.body);
    // if (!isValid) {
    //     return res.status(400).json(errors);
    // }
    console.log(req.body);
    const projectNo = req.body.projectNo;


    

    EBEntry.findOne({projectNo}).then( ebentry => {

        let {_id, ebDate, ...values} = req.body;
       
        const date = moment(ebDate, "DD/MM/YYYY");
        
        const consolidatedEBEntry =  new ConsolidatedEBEntry({...values}); 
        consolidatedEBEntry.save()
        .then( res => console.log('consolidated Eb Entry saved successfully..') )
        .catch( err => console.log(err.message) )
        
        if ( ebentry ) {
            
            EBEntry.updateOne({ _id: ebentry._id}, {$set: values}, { $setOnInsert: { ebDate: date.toDate() } }, function(err, result) {
                if (err) {
                    return res.status(400).json(err);
                } else {
                    return res.status(200).json({ message: 'EB Entry updated successfully.', success: true });
                }
            });

        }else{
            const ebentryObj =  new EBEntry({...values}); 
            ebentryObj.save()
            .then( res => res.status(200).json({ message: 'EB Entry saved successfully.', success: true }) )
            .catch( err => res.status(400).json(err) )
        }


    });
});

router.post('/eb-entry-delete', (req, res) => {
    EBEntry.deleteOne({ _id: req.body._id}).then(entry => {
        if (entry) {
            return res.status(200).json({message: 'Eb Entry deleted successfully. Refreshing data...', success: true})
        }
    });
});

router.post('/update-eblist', (req, res) => {
    // const { errors, isValid } = validateUpdateUserInput(req.body);
    // if (!isValid) {
    //     return res.status(400).json(errors);
    // }

    let {_id, ...values} = req.body;
    const ebentry =  new EBEntry({...values}); 
    ebentry.save()
    .then( resp => res.status(200).json({ message: 'EB Entry saved successfully.Redirecting to Dashboard page..', success: true }) )
    .catch( err => res.status(400).json(err) )

});

router.get('/labs', (req, res) => {
    Lab.find({}).then(labs => {
        if (labs) {
            return res.status(200).send(labs);
        }
        else{
            return res.status(200).send('No Records for Labs');
        }
    });
});

router.get('/projects', (req, res) => {
    
    console.log(JSON.stringify(req.query));
    Project.find(req.query).then( projects => {
        if (projects) {
            return res.status(200).send(projects);
        }
        else{
            return res.status(200).send('No Records for projects');
        }
    });
});

router.post('/user-delete', (req, res) => {
    User.deleteOne({ _id: req.body._id}).then(user => {
        if (user) {
            return res.status(200).json({message: 'User deleted successfully. Refreshing data...', success: true})
        }
    });
});

router.post('/user-update', (req, res) => {
    const { errors, isValid } = validateUpdateUserInput(req.body);
    if (!isValid) {
        return res.status(400).json(errors);
    }
    const _id = req.body._id;
    User.findOne({ _id }).then( user => {
        if (user) {
            if (req.body.password !== '') {
                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(req.body.password, salt, (err, hash) => {
                        if (err) throw err;
                        user.password = hash;
                    });
                });
            }
            let update = {'name': req.body.name, 'email': req.body.email, 'password': user.password};
            User.update({ _id: _id}, {$set: update}, function(err, result) {
                if (err) {
                    return res.status(400).json({ message: 'Unable to update user.' });
                } else {
                    return res.status(200).json({ message: 'User updated successfully. Refreshing data...', success: true });
                }
            });
        } else {
            return res.status(400).json({ message: 'Now user found to update.' });
        }
    });
});

router.post('/login', (req, res) => {
    const { errors, isValid } = validateLoginInput(req.body);
    if (!isValid) {
        return res.status(400).json(errors);
    }
    const email = req.body.email;
    const password = req.body.password;
    User.findOne({ email }).then(user => {
        if (!user) {
            return res.status(404).json({ email: 'Email not found' });
        }
        bcrypt.compare(password, user.password).then(isMatch => {
            if (isMatch) {
                const payload = {
                    id: user.id,
                    name: user.name
                };
                jwt.sign(
                    payload,
                    keys.secretOrKey,
                    {
                        expiresIn: 31556926 // 1 year in seconds
                    },
                    (err, token) => {
                        res.json({
                            success: true,
                            token: 'Bearer ' + token
                        });
                    }
                );
            } else {
                return res
                    .status(400)
                    .json({ password: 'Password incorrect' });
            }
        });
    });
});


module.exports = router;
