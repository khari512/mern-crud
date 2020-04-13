const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProjectSchema = new Schema({
    lab: {
        type: String,
        required: true
    },
    projectTitle: {
        type: String,
        required: true
    },
    projectNo: {
        type: String,
        required: true
    }
},{ collection: 'projects'});

ProjectSchema.virtual('id').get(function(){
    return this._id.toHexString();
});

ProjectSchema.set('toJSON', {
    virtuals: true
});

module.exports = Lab = mongoose.model("project", ProjectSchema);
