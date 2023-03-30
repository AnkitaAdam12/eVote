const mongoose = require('mongoose');
const candidate_nominations_Schema=new mongoose.Schema({
    party_name: {
        type:String,
        required:true,
    },
    candidate_name: {
        type:String,
        required:true,
    },
    candidate_age: {
        type:String,
        required:true,
    },
    marrital_status: {
        type:String,
        required:true,
    },
    gender: {
        type:String,
        required:true,
    },
    candidate_email: {
        type:String,
        required:true,
    },
    photo: {
        type:Buffer,
        // contentype:"image/png",
        required:true
    },
    qualification: {
        type:String,
        required:true,
    },
    position: {
        type:String,
        required:true,
    }
});
const candidate_nominations_Model=mongoose.model('candidatenominations',candidate_nominations_Schema);
module.exports= candidate_nominations_Model;