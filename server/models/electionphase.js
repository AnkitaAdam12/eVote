const mongoose = require('mongoose');
const electionphaseSchema=new mongoose.Schema({
    currentphase :{
        type:String,
        required:true,
    }
});
const electionphaseModel=mongoose.model('complaints', electionphaseSchema);
module.exports= electionphaseModel;