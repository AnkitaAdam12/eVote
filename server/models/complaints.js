const mongoose = require('mongoose');
const complaintsSchema=new mongoose.Schema({
    name :{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    phone_no :{
        type:String,
        required:true,
    },
    service : {
        type:String,
        required:true,
    },
    message : {
        type:String,
        required:true,
    }
});
const complaintsModel=mongoose.model('complaints', complaintsSchema);
module.exports= complaintsModel;