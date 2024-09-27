const { default: mongoose } = require("mongoose");

const applicationSchema=new mongoose.Schema({
    recruiterUserId:String,
    name:String,
    email:String,
    candidateUserId:String,
    status:Array,
    jobId:String,
    jobAppliedDate:String
})

const Application=mongoose.models.Application || mongoose.model('Application',applicationSchema);

export default Application;

