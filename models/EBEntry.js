const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const EBEntrySchema = new Schema({
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
    },
    ebNumber: {
        type: Number,
        required: true
    },
    actionPts: {
        type: String,
        required: true
    },
    ebDate: {
        type: Date,
        default: Date.now
    }
},{ collection: 'ebentries'});

EBEntrySchema.virtual('id').get(function(){
    return this._id.toHexString();
});

EBEntrySchema.set('toJSON', {
    virtuals: true
});

module.exports = EBEntry = mongoose.model("EBEntry", EBEntrySchema);
