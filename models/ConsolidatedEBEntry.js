const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ConsolidatedEBSchema = new Schema({
    lab: {
        type: String,
        required: false
    },
    projectTitle: {
        type: String,
        required: false
    },
    projectNo: {
        type: String,
        required: false
    },
    ebNumber: {
        type: Number,
        required: true
    },
    actionPts: {
        type: String,
        required: false
    },
    ebDate: {
        type: Date,
        default: Date.now
    }
},{ collection: 'Consol_EB'});

ConsolidatedEBSchema.virtual('id').get(function(){
    return this._id.toHexString();
});

ConsolidatedEBSchema.set('toJSON', {
    virtuals: true
});

module.exports = ConsolidatedEBEntry = mongoose.model("ConsolidatedEBEntry", ConsolidatedEBSchema);
