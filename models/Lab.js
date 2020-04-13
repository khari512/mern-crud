const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const LabSchema = new Schema({
    name: {
        type: String,
        required: true
    },
   
},{ collection: 'labs'});

LabSchema.virtual('id').get(function(){
    return this._id.toHexString();
});

LabSchema.set('toJSON', {
    virtuals: true
});

module.exports = Lab = mongoose.model("lab", LabSchema);
