const express = require('express')
const undici = require('undici')
const moment = require('moment')
const path = require('path')
const multer = require('multer')
const http=require('http')
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const app = express();
const ComplaintssModel = require("../models/complaints");
const voter_accounts_Model = require("../models/voteraccounts");
const party_accounts_Model = require("../models/partyaccounts");
const faceapi = require('face-api.js');
const canvas = require('canvas');
const { Canvas, Image, ImageData } = canvas;
faceapi.env.monkeyPatch({ Canvas, Image, ImageData });
const { createCanvas } = canvas;
var uservoterid;
var vid;
var partyname;
// const fetch = require('node-fetch');

// Load models
// const MODELS_URL = path.join('./node_modules/face-api.js/');
Promise.all([
   faceapi.nets.ssdMobilenetv1.loadFromDisk('./node_modules/face-api.js/weights/'),
//   faceapi.nets.tinyFaceDetector.loadFromUri(MODELS_URL),
  faceapi.nets.faceLandmark68Net.loadFromDisk('./node_modules/face-api.js/weights/'),
  faceapi.nets.faceRecognitionNet.loadFromDisk('./node_modules/face-api.js/weights/'),
]);


// const otpjs = require(__dirname,"assets/js/otp");
// const otpjs = require('../../assets/js/otp');
var bodyParser = require("body-parser");
const mongoose = require('mongoose');
var db = mongoose.connection;
app.use(bodyParser.json());
app.use(express.static('FINAL YEAR PROJECT'));
app.use(bodyParser.urlencoded({ extended: true }));


const email_api = require('../services/emailAPI');
const blockchain_api=require('../services/BlockChain/blockchain');
const blockchain=new blockchain_api();
const { VoterLogin } = require('../routes/routes');
const candidate_nominations_Model = require('../models/candidatenominations')
const { timeStamp } = require('console')
var useremailid;
var aadhar_no;
var otp;
var name;
var errorMsg = null;
module.exports.Contactus = function (req, res) {
   name = req.body.inputName4;
   useremailid = req.body.inputEmail4;
   var phoneno = req.body.inputNumber4;
   var service = req.body.service;
   var msg = req.body.inputMessage;

   var data = {
      "name": name,
      "email": useremailid,
      "phone_no": phoneno,
      "service": service,
      "message": msg
   }
   db.collection('complaints').insertOne(data, function (err, collection) {
      if (err) throw err;
      email_api.emailapi(useremailid, name);
      console.log("Record inserted Successfully");

      //    alert("We will let you know the answer for your trouble");
   });
   res.render('homePage', { success: 'Message sent successfully!' });
}

module.exports.sendOtp = function (req, res) {
   aadhar_no = req.body.aadhar;
   useremailid = req.body.email;
   otp = Math.floor(1000 + Math.random() * 9000);
   email_api.OTP(useremailid, otp);
   res.render('VoterReg1', { msg:'OTP sent' });

}

module.exports.ValidateOtp = function (req, res) {
   // aadhar_no= req.body.aadhar;
   // useremailid =req.body.email;
   var userotp = req.body.otp;
   errorMsg = null;

   console.log(userotp)
   console.log(otp)
   if (parseInt(userotp) === otp) {
      //check addhar number in db
      // res.render('VoterReg2');
      // app.post('/check-number', function(req, res) {
      // const enteredNumber = req.body.number;

      voter_accounts_Model.findOne({ aadharno: aadhar_no }, function (err, adnumber) {
         // console.log(adnumber);
         if (err) return console.error(err);

         if (adnumber) {
            // res.send('aadhar Number is already present in the database');
            res.render('Otp', { errorMsg:null, msg:'Account already exists! Please do SignIn!' });
         } else {
            res.render('VoterReg2',{msg:null})
            //  res.send('aadhar Number is not present in the database');
         }
      });
      //  });
   } else {
      errorMsg = "OTP not matched"
      res.render('Otp', { errorMsg, msg:null });
   }
   // email_api.OTP(useremailid,otp);
   // res.render('Otp',{userotp:otp});

}

module.exports.Registration = function (req, res) {
   var voterid = String(Math.floor(100000 + Math.random() * 900000));
   ad = aadhar_no;
   name = req.body.name;
   emailid = useremailid;
   var dob = req.body.dob;
   var userphoneno = req.body.phno;
   var pwd = req.body.pwd2;
   var photo = req.file.buffer;

   const binaryData = new Buffer.from(req.file.buffer).toString("binary");

   const imageData = Buffer.from(req.file.buffer).toString('base64');

   const userage = String(moment().diff(dob, 'years'));

   var data = {
      "voterid": voterid,
      "aadharno": ad,
      "name": name,
      "email": emailid,
      "age": userage,
      "phone_no": userphoneno,
      "photo": binaryData,
      "imageData":imageData,
      "password": pwd
   }
   db.collection('voteraccounts').insertOne(data, function (err, collection) {
      if (err) throw err;

      email_api.VoterId(voterid, name, emailid);
      console.log("Account created Successfully");
      res.render('VoterReg2', { msg:'Account Created Successfully' });

      //    alert("We will let you know the answer for your trouble");
   });
   // res.render('homePage', { success: 'Message sent successfully!' });

}

module.exports.login = async function (req, res) {
   
   // res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
   // res.setHeader('Pragma', 'no-cache');
   // res.setHeader('Expires', '0');

   vid=req.body.voterId;
   var uservoterid = req.body.voterId;
   var userpwd = req.body.pwd;

   db.collection('voteraccounts').findOne({ voterid: uservoterid, password: userpwd }, function (err, vid) {
      // console.log(vid);
      if (err) return console.error(err);

      // res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, max-age=0');
      // res.setHeader('Pragma', 'no-cache');
      // res.setHeader('Expires', '0');
      if (vid != null) {
         res.render('VoterLogin', { msg:'Login Successful' });
      } else {
         res.render('VoterLogin', { msg:'Login Failed' });
      }
   });
}

module.exports.returnVid = function (){
   return vid;

}

module.exports.partyReg = function (req, res) {

   var leader_name = req.body.name;
   var leader_dob = req.body.dob;
   var party_name = req.body.party;
   var members_count = req.body.count;
   var party_email = req.body.email;
   var party_logo = req.file.buffer;
   var password = req.body.pwd2;

   const binaryData = new Buffer.from(req.file.buffer).toString("binary");

   const leaderage = String(moment().diff(leader_dob, 'years'));

   var data = {
      "leader_name": leader_name,
      "leader_age": leaderage,
      "party_name": party_name,
      "members_count": members_count,
      "party_email": party_email,
      "party_logo": binaryData,
      "password": password,
      "Approval":"no"
   }

   party_accounts_Model.findOne({ party_name: party_name }, function (err, result) {
      // console.log(adnumber);
      if (err) return console.error(err);

      if (result) {
         res.render('PartyReg',{msg:'Party Already Exists! Please do SignIn'});  
         // res.send('aadhar Number is already present in the database');
      } else {
         db.collection('partyaccounts').insertOne(data, function (err, collection) {
            if (err) throw err;

            // email_api.VoterId(voterid,name,emailid); 
            console.log("party created Successfully");
            email_api.convey_partyreg(leader_name,party_email);
            res.render('PartyReg',{msg:'Party created successfully..!'});
         });
      }
   });

}

module.exports.partyLogin = async function (req, res) {
   partyname = req.body.uname;
   var partypwd = req.body.pwd;
   db.collection('partyaccounts').findOne({ party_name: partyname, password: partypwd }, function (err, pid) {
      // console.log(vid);
      if (err) return console.error(err);

      if (pid != null) {
         console.log(pid.Approval)
         if(pid.Approval=="yes")
         res.render('PartyLogin',{msg:'login successful'});
         if(pid.Approval=="no"){
            res.render('PartyLogin',{msg:'Your Party has not been Authenticated Yet!'});
         }
      }
      else {
         res.render('PartyLogin',{msg:'login Failed'});
      }
   });
}
module.exports.returnPN=function(){
   return partyname;

}
module.exports.AdminLogin = async function (req, res) {
   var uname = req.body.username;
   var pwd = req.body.pwd;
   db.collection('adminaccount').findOne({ username: uname, password: pwd }, function (err, result) {
      // console.log(vid);
      if (err) return console.error(err);

      if (result!= null) {
         res.render('AdminLogin',{msg:'login successful'});
      } else {
         res.render('AdminLogin',{msg:'login Failed'});
      }
   });
}

module.exports.voterId = function (req, res) {
   aadhar_no = req.body.aadhar;
   useremailid = req.body.email;
   otp = Math.floor(1000 + Math.random() * 9000);
   email_api.OTP(useremailid, otp);
   res.render('forgot_VoterId1', { msg:'OTP sent' });

}

module.exports.voterId2 = function (req, res) {
   var userotp = req.body.otp;
   errorMsg = null;

   console.log(userotp)
   console.log(otp)
   if (parseInt(userotp) === otp) {

      voter_accounts_Model.findOne({ aadharno: aadhar_no }, function (err, adnumber) {
         if (err) return console.error(err);

         if (adnumber) {
            var vid= adnumber.voterid;
            email_api.VoterId2(vid, useremailid);
            res.render('forgot_VoterId2',{errorMsg:null, msg:"Your Voter Id is recovered"})
            // res.render('Otp', { errorMsg:null, msg:'Account already exists! Please do SignIn!' });
         } else {
            res.render('forgot_VoterId2',{errorMsg:null, msg:"No account found"})
         }
      });
   } else {
      errorMsg = "OTP not matched"
      res.render('forgot_VoterId2', { errorMsg, msg:null });
   }

}

// module.exports.Registration1 = async function (req, res) {
//    var voterid = String(Math.floor(100000 + Math.random() * 900000));
//    var pwd = req.body.pwd2;
//    var photo = req.file.buffer;

//    let imageData = Buffer.from(req.file.buffer).toString('base64');
//    // const imageData =  Buffer.from(req.file.buffer.replace(/^data:image\/\w+;base64,/, ''), 'base64');

//    // const userage = String(moment().diff(dob, 'years'));

//    // Extract face features from the image
// //   const detection = await faceapi.detectSingleFace(imageData).withFaceLandmarks().withFaceDescriptor();
// //   if (!detection) {
// //     return res.status(400).json({ message: 'No face detected' });
// //   }

//    var data = {
//       "voterid": voterid,
//       "imageData": imageData,
//       "password": pwd
//    }
//    await db.collection('demo').insertOne(data, function (err, collection) {
//       if (err) throw err;

//       // email_api.VoterId(voterid, name, emailid);
//       console.log("Account created Successfully");
//       res.render('VoterReg2', { msg:'Account Created Successfully' });

//       //    alert("We will let you know the answer for your trouble");
//    });
//    // res.render('homePage', { success: 'Message sent successfully!' });
//    imageData= null;
// }

module.exports.firstAuth=async function(req,res){
   uservoterid = req.body.voterId;
   var useraadhar = req.body.aadhar;
   db.collection('voteraccounts').findOne({ voterid: uservoterid, aadharno: useraadhar }, function (err, vid) {
      // console.log(vid);
      if (err) return console.error(err);
      if (vid != null) {
         let em=vid.email;
         otp = Math.floor(1000 + Math.random() * 9000);
         email_api.OTP(em, otp);
         res.render('secondStep', { errorMsg: null, msg:'Login Successful' });
      } else {
         res.render('firstStep', { errorMsg: null, msg:'Login Failed' });
      }
   });
}

module.exports.secondAuth= async function(req,res){
   var userotp = req.body.otp;
   errorMsg = null;

   console.log(userotp)
   console.log(otp)
   if (parseInt(userotp) === otp) {
      res.render('thirdStep',{msg:null})
   }
   else{
      errorMsg = "OTP not matched"
      res.render('secondStep', { errorMsg, msg:null });
   }

}

module.exports.thirdAuth = async (req, res) => {

   const user = await voter_accounts_Model.findOne({ voterid: uservoterid}); // Retrieve the user from the database using the email
 
   if (!user) {
     return res.status(401).send({ message: 'User not found' }); // User not found
      
   }
 
   const imageBuffer = Buffer.from(req.body.imageData.replace(/^data:image\/\w+;base64,/, ''), 'base64'); // Convert the base64-encoded image data to a binary buffer
 
   const image = await canvas.loadImage(imageBuffer); // Load the image buffer using the canvas library
  
  
   const detection = await faceapi.detectSingleFace(image).withFaceLandmarks().withFaceDescriptor(); // Detect the face in the image and compute the face descriptor
 
   if (!detection) {
     return res.status(401).send({ message: 'Face not detected' }); // Face not detected
   // return res.render('thirdStep',{msg:'Face Not Detected!'})
   }
 
   const faceDescriptor = new Float32Array(detection.descriptor); // Convert the face descriptor to a Float32Array
   console.log(faceDescriptor.length)


// you can now use the imageElement in your face recognition code

   const buffer = Buffer.from(user.imageData, 'base64')
   const dbimage = await canvas.loadImage(buffer);
   const dbDetection = await faceapi.detectSingleFace(dbimage).withFaceLandmarks().withFaceDescriptor(); 


   const storedDescriptor = new Float32Array(dbDetection.descriptor); // Retrieve the stored face descriptor from the user's data
   console.log(storedDescriptor.length)

   const distance = faceapi.euclideanDistance(faceDescriptor, storedDescriptor); // Calculate the euclidean distance between the computed face descriptor and the stored face descriptor
   console.log('distance calculated : '+distance);
   if (distance < 0.5) {
         console.log('user authenticated');
      db.collection("partyaccounts").find({}).toArray(function(err, result) {
         if (err) throw err;
         let binaryData = new Array();
         for(i = 0; i<result.length; i++){
             binaryData[i] = new Buffer.from(result[i].party_logo,"binary");
         }
         
         res.render('ActualVotingBallot',{msg:null,users:result,image:binaryData},(error,html)=>{
            if (error) {
               console.error(error);
               res.status(500).send('Internal Server Error');
             } else {
               res.send('votingBallot');
             }
         });
       });
   } else {
     
      console.log('user unauthenticated');
      // return res.render('thirdStep', {msg:'User Not Recongnized'})
      // render the filename to fetch api
      
      res.render('thirdStep', {msg:'User Not Recongnized'}, (error, html) => {    //pass the file to be loaded here
         if (error) {
           console.error(error);
           res.status(500).send('Internal Server Error');
         } else {
           res.send('thirdStep');       //pass the get request url here 
         }
       });
      
   }
   // imageBuffer=null;
   // buffer=null;
}

module.exports.getNominations=function(){
   // const user = db.collection('partyaccounts').find({});
   // return user;
//    .then(user => {
//       return user
//   })
//   .catch(err => {
//       res.status(500).send({ message : err.message || "Error Occurred while retriving user information" })
//   })
db.collection("partyaccounts").find({}).toArray(function(err, result) {
   if (err) throw err;
   // db.close();
   return result;
 });
}

module.exports.updateProfile=function(req,res){
   var name=req.body.name;
   var age=req.body.age;
   var mbno=req.body.phno;
   var email=req.body.email;
   db.collection('voteraccounts').updateOne(
      {voterid: vid },
      { $set: { "name": name , "age": age,"phone_no": mbno , "email": email  } },
      function(err, result) {
        console.log("Updated the document");
        db.collection('voteraccounts').findOne({ voterid: vid}, function (err, result1) {
         // console.log(vid);
         if (err) return console.error(err);
   
         if (result1 != null) {
             let binaryData = new Buffer.from(result1.photo,"binary");
             res.render('editProfile',{users:result1,image:binaryData,msg:'Profile Successfully Updated'});
         } 
      });
      //   res.render('editProfile',{users:null,image:null,msg:'Profile Successfully Updated'});
      }
    );
}

module.exports.update_partyProfile=function(req,res){
   var lname=req.body.name;
   var age=req.body.age;
   var mcnt=req.body.mcnt;
   var email=req.body.email;
   db.collection('partyaccounts').updateOne(
      {party_name: partyname },
      { $set: { "leader_name": lname , "leader_age": age,"members_count": mcnt , "party_email": email  } },
      function(err, result) {
        console.log("Updated the party document");
        db.collection('partyaccounts').findOne({ party_name: partyname}, function (err, result1) {
         // console.log(vid);
         if (err) return console.error(err);
   
         if (result1 != null) {
             let binaryData = new Buffer.from(result1.party_logo,"binary");
             res.render('party_editProfile',{users:result1,image:binaryData,msg:'Profile Successfully Updated'});
         } 
      });
      //   res.render('editProfile',{users:null,image:null,msg:'Profile Successfully Updated'});
      }
    );
}
module.exports.party_reg_request=function(req,res){
   var em;
   console.log(req.body.pn);
   var pn=req.body.pn;
   var action=req.body.action;
   if(action==="accept"){
      console.log("Accept button clicked")
      // console.log("reject button clicked")
      db.collection('partyaccounts').findOne({party_name:pn},function(err,result1){
         if(err) throw err;
         // console.log("result is : ",res.party_email);
         // em=res.party_email;
         db.collection('partyaccounts').updateOne(
            {party_name: pn },
            { $set: { "Approval": "yes"} },
            function(err, result) {
              console.log("Updated the approval");
            //   console.log("result : ",result);
            //   var em=result.party_email;
            //   console.log(em);
            // console.log("em is : ",em);
              email_api.convey_accepted_partyreg(pn,result1.party_email);
            });

            // render the same file
            db.collection("partyaccounts").find({Approval:"no"}).toArray(function(err, result) {
               if (err) throw err;
               let binaryData = new Array();
               for(i = 0; i<result.length; i++){
                  binaryData[i] = new Buffer.from(result[i].party_logo,"binary");
               }
               res.render('party_reg_request',{users:result,image:binaryData, msg : 'Party Accepted!'});
            });
      })
      
   }
   else if(action==="reject"){
      // console.log("reject button clicked")
      db.collection('partyaccounts').findOne({party_name:pn},function(err,result1){
         if(err) throw err;
         // console.log("result is : ",res.party_email);
         // em=res.party_email;
         db.collection('partyaccounts').deleteOne({ party_name: pn }, function(err, result) {
            if (err) throw err;
            console.log('Party rejected!');
            email_api.convey_rejected_partyreg(pn,result1.party_email);
        });
      })
      
      // render the same file
      db.collection("partyaccounts").find({Approval:"no"}).toArray(function(err, result) {
         if (err) throw err;
         let binaryData = new Array();
         for(i = 0; i<result.length; i++){
            binaryData[i] = new Buffer.from(result[i].party_logo,"binary");
         }
         res.render('party_reg_request',{users:result,image:binaryData, msg : 'Party Rejected!'});
      });
   }
   
}

module.exports.ActualVote=function(req,res){
   console.log("My vote to : ",req.body.pn);
   console.log("My voter id : ",vid)
   var pn=req.body.pn;
   // const block=blockchain.addBlock(vid,pn);
   // console.log("vote added ");
   // console.log("block is : ");
   // console.log(block);
   // db.collection('votes').insertOne(block, function (err, collection) {
   //    if (err) throw err;
   //    // email_api.VoterId(voterid, name, emailid);
   //    console.log("Vote Casted Securely!");
   //    res.render('voterDashboard',{msg:'Vote Casted Securely!'});
   //    //    alert("We will let you know the answer for your trouble");
   // });
   const chain=blockchain.addBlock(vid,pn);
   db.collection('votes').find({}).toArray(function(err, result) {
      if(err)throw err;
      for(var i=0;i<chain.length-1;i++){
         // result[i].pName="BJP";
         if(result[i]!=chain[i]){
            var id=result[i]._id;
            db.collection('votes').updateOne(
               {_id: id },
               { $set:  chain[i] },
               function(err, result) {
                  if(err)throw err;
                  console.log("votes updated")
               });
         }
      }
      const block=chain[chain.length-1];
      db.collection('votes').insertOne(block, function (err, collection) {
            if (err) throw err;
            // email_api.VoterId(voterid, name, emailid);
            console.log("Vote Casted Securely!");
            res.render('voterDashboard',{msg:'Vote Casted Securely!'});
            //    alert("We will let you know the answer for your trouble");
         });
   }); 
}

module.exports.candidateReg = function(req,res){
   var party_name = partyname ;
   var candidate_name = req.body.name;
   var candidate_dob = req.body.dob;
   var marrital_status = req.body.marritalStatus;
   var gender = req.body.gender;
   var candidate_email = req.body.email;
   // var photo = req.file.buffer;
   var qualification = req.body.quali;
   var position = req.body.position;

   const binaryData = new Buffer.from(req.file.buffer).toString("binary");

   const candidate_age = String(moment().diff(candidate_dob, 'years'));

   var data = {
      "party_name": party_name,
      "candidate_name": candidate_name,
      "candidate_age": candidate_age,
      "marrital_status": marrital_status,
      "gender": gender,
      "candidate_email": candidate_email,
      "photo": binaryData,
      "qualification": qualification,
      "position":position,
      "Approval":"no"
   }

   candidate_nominations_Model.findOne({ party_name: party_name }, function (err, result) {
      // console.log(adnumber);
      if (err) return console.error(err);

      if (result) {
         res.render('nominateCandidate',{msg:'You have been already nominated for the Elections'});  
         // res.send('aadhar Number is already present in the database');
      } else {
         db.collection('candidatenominations').insertOne(data, function (err, collection) {
            if (err) throw err;

            // email_api.VoterId(voterid,name,emailid); 
            console.log("Nomination Successful!");
            email_api.convey_candidateReg(candidate_name,candidate_email);
            res.render('nominateCandidate',{msg:'Candidate Nominated Successfully!'});
         });
      }
   });

}
module.exports.candidate_reg_request=function(req,res){
   // console.log(req.body.pn);
   var pn=req.body.pn;
   var ln=req.body.ln;
   var action=req.body.action;
   if(action==="accept"){
      db.collection('candidatenominations').findOne({party_name:pn},function(err,result1){
         if(err) throw err;
         // console.log("result is : ",res.party_email);
         // em=res.party_email;
         db.collection('candidatenominations').updateOne(
            {party_name: pn },
            { $set: { "Approval": "yes"} },
            function(err, result) {
            //   console.log("result : ",result);
            //   var em=result.party_email;
            //   console.log(em);
            // console.log("em is : ",em);
              email_api.convey_accepted_candidateReg(ln,result1.candidate_email);
            });

            // render the same file
            db.collection("candidatenominations").find({Approval:"no"}).toArray(function(err, result) {
               if (err) throw err;
               let binaryData = new Array();
               for(i = 0; i<result.length; i++){
                  binaryData[i] = new Buffer.from(result[i].photo,"binary");
               }
               res.render('candidate_reg_request',{users:result,image:binaryData, msg : 'Candidate Nomination Accepted!'});
            });
      })
      
   }
   else if(action==="reject"){
      // console.log("reject button clicked")
      db.collection('candidatenominations').findOne({party_name:pn},function(err,result1){
         if(err) throw err;
         // console.log("result is : ",res.party_email);
         // em=res.party_email;
         db.collection('candidatenominations').deleteOne({ party_name: pn }, function(err, result) {
            if (err) throw err;
            console.log('candiidate rejected!');
            email_api.convey_rejected_candidateReg(ln,result1.candidate_email);
        });
      })
      
      // render the same file
      db.collection("candidatenominations").find({Approval:"no"}).toArray(function(err, result) {
         if (err) throw err;
         let binaryData = new Array();
         for(i = 0; i<result.length; i++){
            binaryData[i] = new Buffer.from(result[i].photo,"binary");
         }
         res.render('candidate_reg_request',{users:result,image:binaryData, msg : 'Candidate Nomination Rejected!'});
      });
   }
}

module.exports.Electionphase=function(req,res){
   var val=req.body.electionphase;
   console.log(val)
   // var data={
   //    "currentphase":val
   // }
   // db.collection('electionphase').insertOne(data, function (err, collection) {
   //    if (err) throw err;
   //    res.render('setElectionPhase',{msg:'Election Phase Updated Successfully!'})
   // });
      db.collection('electionphase').updateOne(
         {iid: "1" },
         { $set: { currentphase: val} },
         function(err, result) {
            const phases=["Start Election","Nominate Candidates","Stop Nominations","Start Voting","Stop Voting","Display Results","Stop Election"];
            db.collection('electionphase').findOne({ iid: "1"}, function (err, result) {
            if (err) throw err;
            var currentphase=result.currentphase;
            var index=phases.indexOf(currentphase);
            if(index==6){
               index=-1;
            }
            var nextphase=phases[++index];
            if(currentphase=="Start Election"){
               db.collection("voteraccounts").find({}).toArray(function(err, result) {
                  if (err) throw err;
                  for(i = 0; i<result.length; i++){
                        var em=result[i].email;
                        email_api.start_election(em);
                  }
               });
               db.collection("partyaccounts").find({}).toArray(function(err, result) {
                  if (err) throw err;
                  for(i = 0; i<result.length; i++){
                        var em=result[i].party_email;
                        email_api.start_election(em);
                  }
               });
               res.render('setElectionPhase',{msg:'Election Phase Updated Successfully!',next:nextphase,current:currentphase})

            }
            else if(currentphase=="Nominate Candidates"){
               db.collection("partyaccounts").find({}).toArray(function(err, result) {
                  if (err) throw err;
                  for(i = 0; i<result.length; i++){
                        var em=result[i].party_email;
                        email_api.start_nominations(em);
                  }
               });
               res.render('setElectionPhase',{msg:'Election Phase Updated Successfully!',next:nextphase,current:currentphase})
            }
            else if(currentphase=="Stop Nominations"){
               db.collection("partyaccounts").find({}).toArray(function(err, result) {
                  if (err) throw err;
                  for(i = 0; i<result.length; i++){
                        var em=result[i].party_email;
                        email_api.stop_nominations(em);
                  }
               });
               res.render('setElectionPhase',{msg:'Election Phase Updated Successfully!',next:nextphase,current:currentphase})
            }
            else if(currentphase=="Start Voting"){
               db.collection('candidatenominations').find({Approval:'no'}).toArray(function(err,result1){
                  if(result1!=null){
                     db.collection('electionphase').updateOne(
                        {iid: "1" },
                        { $set: { currentphase: "Stop Nominations"} },
                        function(err, result) {
                           if (err) throw err;
                        });
                        // console.log("Im here....")
                     res.render('setElectionPhase',{msg:'Finish the Candidate Nominations!',next:"Start Voting",current:"Stop Nominations"})
                     // flag=true;
                     // console.log("value of flag : ",flag)
                  }
                  else{
                     db.collection("voteraccounts").find({}).toArray(function(err, result) {
                        if (err) throw err;
                        for(i = 0; i<result.length; i++){
                              var em=result[i].email;
                              email_api.start_voting(em);
                        }
                     });
                     db.collection("partyaccounts").find({}).toArray(function(err, result) {
                        if (err) throw err;
                        for(i = 0; i<result.length; i++){
                              var em=result[i].party_email;
                              email_api.start_voting(em);
                        }
                     });
                     res.render('setElectionPhase',{msg:'Election Phase Updated Successfully!',next:nextphase,current:currentphase})
                  }
               });
             
            }
            else if(currentphase=="Stop Voting"){
               db.collection("voteraccounts").find({}).toArray(function(err, result) {
                  if (err) throw err;
                  for(i = 0; i<result.length; i++){
                        var em=result[i].email;
                        email_api.stop_voting(em);
                  }
               });
               db.collection("partyaccounts").find({}).toArray(function(err, result) {
                  if (err) throw err;
                  for(i = 0; i<result.length; i++){
                        var em=result[i].party_email;
                        email_api.stop_voting(em);
                  }
               });
               res.render('setElectionPhase',{msg:'Election Phase Updated Successfully!',next:nextphase,current:currentphase})
            }
            else if(currentphase=="Stop Election"){
               db.collection("voteraccounts").find({}).toArray(function(err, result) {
                  if (err) throw err;
                  for(i = 0; i<result.length; i++){
                        var em=result[i].email;
                        email_api.stop_election(em);
                  }
               });
               db.collection("partyaccounts").find({}).toArray(function(err, result) {
                  if (err) throw err;
                  for(i = 0; i<result.length; i++){
                        var em=result[i].party_email;
                        email_api.stop_election(em);
                  }
               });
               // db.collection('candidatenominations').deleteMany({}, function(err, result) {
               //    if(err) throw err;
               //    console.log("Removed all records from candidatenominations");
               // });
               db.collection('votes').findOne({},function (err,result){
                  if (err )throw err;
                  // console.log("result is ",result)
                  db.collection('votes').deleteMany({_id:{ $ne: result._id }}, function(err, result1) {
                     if(err) throw err;
                     console.log("Removed all records from votes");
                  });
               });
               res.render('setElectionPhase',{msg:'Election Phase Updated Successfully!',next:nextphase,current:currentphase})
            }    
            // var index=phases.indexOf(currentphase);
            // if(index==6){
            //    index=-1;
            // }
            // var nextphase=phases[++index];
            // console.log("value of flag : ",flag)
            // if(flag==false){
            //    res.render('setElectionPhase',{msg:'Election Phase Updated Successfully!',next:nextphase,current:currentphase})
            // }
            });
         });
}

module.exports.publishresults=function(req,res){
   db.collection('electionphase').updateOne(
      {iid: "1" },
      { $set: { currentphase: "publish results"} },
      function(err, result) {
         if(err)throw err;
         console.log("phase updated")
         var votes=[];
    db.collection("candidatenominations").find({Approval:"yes"}).toArray(function(err, result) {
        for(var i=0;i<result.length;i++){
            let data={};
            data.party_name=result[i].party_name;
            data.votes=0;
            votes[i]=data;
            // console.log("here : ",votes[i])
        }
        // console.log("after for loop votes is ",votes)
        db.collection("votes").find({}).toArray(function(err, result) {
            // console.log("result is : ",result)
            for(var i=0;i<votes.length;i++){
                for(var j=0;j<result.length;j++){
                    if(votes[i].party_name==result[j].pName){
                        votes[i].votes+=1;  
                        // console.log("here 1: ",votes[i])
                    }
                }
            }
            var temp={};
            for(var i=0;i<votes.length-1;i++){
                if(votes[i].votes>votes[i+1].votes){
                    temp=votes[i];
                }
                else{
                    temp=votes[i+1];
                }
            }

            db.collection('candidatenominations').findOne({ party_name:temp.party_name}, function (err, result) {
                if(err) throw err;
                temp.candi_name=result.candidate_name;
                temp.photo=result.photo;
                // console.log("here temp is : ",temp)
                db.collection('partyaccounts').findOne({ party_name:temp.party_name}, function (err, result) {
                    if(err) throw err;
                    temp.party_logo=result.party_logo;
                    const data = votes.map((vote) => ({
                        label: vote.party_name,
                        data: vote.votes,
                      }));
                      const chartData = {
                        labels: data.map((candidate) => candidate.label),
                        datasets: [
                          {
                            data: data.map((candidate) => candidate.data),
                            backgroundColor: [
                              'rgba(255, 99, 132, 0.2)',
                              'rgba(54, 162, 235, 0.2)',
                              'rgba(255, 206, 86, 0.2)',
                              'rgba(75, 192, 192, 0.2)',
                              'rgba(153, 102, 255, 0.2)',
                            ],
                            borderColor: [
                              'rgba(255, 99, 132, 1)',
                              'rgba(54, 162, 235, 1)',
                              'rgba(255, 206, 86, 1)',
                              'rgba(75, 192, 192, 1)',
                              'rgba(153, 102, 255, 1)',
                            ],
                            borderWidth: 1,
                          },
                        ],
                        
                      };
                     //  console.log("labels : ",chartData.labels)
                    //   console.log(chartData);
                      res.render('electionresults',{chart:chartData,winner:temp,msg:'Election Results Published!'});
                });
                
            });
           
            // console.log("temp is : ",temp)
            
              // Create chart data
          
        });
    });
         // res.render('electionresults',{chart:null,msg:'Election Results Published!'})

   });
}