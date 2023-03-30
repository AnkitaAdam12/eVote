const mongoose = require('mongoose');
const party_accounts_Schema=new mongoose.Schema({
    leader_name: {
        type:String,
        required:true,
    },
    leader_age: {
        type:String,
        required:true,
    },
    party_name: {
        type:String,
        required:true,
    },
    members_count: {
        type:String,
        required:true,
    },
    party_email: {
        type:String,
        required:true,
    },
    party_logo: {
        type:Buffer,
        // contentype:"image/png",
        required:true
    },
    password: {
        type:String,
        required:true,
    }
});
const party_accounts_Model=mongoose.model('partyaccounts',party_accounts_Schema);
module.exports= party_accounts_Model;