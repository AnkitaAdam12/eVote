const mongoose = require('mongoose');
const voter_accounts_Schema=new mongoose.Schema({
    voterid: {
        type:String,
        required:true,
    },
    aadharno: {
        type:String,
        required:true,
    },
    name: {
        type:String,
        required:true,
    },
    email: {
        type:String,
        required:true,
    },
    age: {
        type:String,
        required:true,
    },
    phone_no: {
        type:String,
        required:true,
    },
    photo: {
        type:Buffer,
        required:true,
    },
    imageData: {
        type:String,
        required:true,
    },
    password: {
        type:String,
        required:true,
    }
});
const voter_accounts_Model=mongoose.model('voteraccounts',voter_accounts_Schema);
module.exports= voter_accounts_Model;