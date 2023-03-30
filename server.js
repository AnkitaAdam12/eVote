const express = require('express')
const dotenv = require('dotenv')
// const morgan = require('morgan')
const path = require('path')
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const app = express();
dotenv.config({ path: `config.env` })
const PORT = process.env.PORT || 8080
const dbconn = require('./server/database/connection');
dbconn.dbconnection();

const mongoose = require('mongoose');
// const ComplaintssModel = require('./server/models/complaints');
var bodyParser = require("body-parser");
// // import routes
const render = require('./server/render/render') 
app.listen(3000, () => { console.log(`server is running at http://localhost:${3000}`)});


// mongodb+srv://Ankita1207:Ankita%401207@cluster0.4r9tzk8.mongodb.net/E-Voting?retryWrites=true&w=majority
// var db=mongoose.connection;
// mongoose.set('strictQuery', false);
// const email_api = require('./server/services/emailAPI');
// var useremailid;
// var name;
// mongoose.connect('mongodb://Ankita1207:Ankita%401207@ac-mjlzatw-shard-00-00.4r9tzk8.mongodb.net:27017,ac-mjlzatw-shard-00-01.4r9tzk8.mongodb.net:27017,ac-mjlzatw-shard-00-02.4r9tzk8.mongodb.net:27017/E-Voting?ssl=true&replicaSet=atlas-1zh8tw-shard-0&authSource=admin&retryWrites=true&w=majority',
// // "mongodb://Ankita1207:Ankita%401207@ac-mjlzatw-shard-00-00.4r9tzk8.mongodb.net:27017,ac-mjlzatw-shard-00-01.4r9tzk8.mongodb.net:27017,ac-mjlzatw-shard-00-02.4r9tzk8.mongodb.net:27017/E-Voting?ssl=true&replicaSet=atlas-1zh8tw-shard-0&authSource=admin&retryWrites=true&w=majority"
//    {
//       useNewUrlParser: true,
//       // useCreateIndex:true,
//       useUnifiedTopology: true
//    }
// ).then(() => { console.warn("Node js connected to MongoDB Atlas Successfully..!") })
//    .catch((err) => {
//       console.log('error occured : ', err);
//    })

app.use(bodyParser.json());
app.use(express.static('FINAL YEAR PROJECT'));
app.use(bodyParser.urlencoded({extended: true}));



//log request
// app.use(morgan('tiny'))
// //parse request to body-parser
// app.use(bodyparser.urlencoded({ extended: true }))
//set view engine
app.set("view engine", "ejs")
//app.set("views", path.resolve(__dirname, "views/ejs"))
//load assets
app.use('/css', express.static(path.resolve(__dirname, "assets/css")))
app.use('/img', express.static(path.resolve(__dirname, "assets/img")))
app.use('/js', express.static(path.resolve(__dirname, "assets/js")))
app.use('/models', express.static(path.resolve(__dirname, "server/models")))


app.get('/', render.homePage)
app.get('/sepLogin',render.sepLogin)
app.get('/sepRegistration', render.sepRegistration)
// app.get('/VoterReg', render.VoterReg)
app.get('/dash', render.dash)
app.get('/Partylogin', render.Partylogin)
app.get('/Adminlogin', render.Adminlogin)
app.get('/Partyreg', render.Partyreg)
app.get('/VoterReg1', render.voterreg1)
app.get('/VoterReg2', render.VoterReg2)
app.get('/otp',render.otp)
app.post('/ContactUs', render.Contactus)
app.post('/Otp', render.sendOtp)
app.post('/ValidateOtp', render.ValidateOtp)
app.post('/Registration', upload.single("picture"), render.Registration)
app.post('/Login',render.login)
app.get('/VoterLogin',render.VoterLogin);
app.post('/partyReg',upload.single("picture"), render.partyReg);
app.post('/PartyLogin',render.partyLogin);
app.post('/AdminLogin',render.AdminLogin);
app.get('/voterDashboard', render.voterDashboard);
app.get('/partyDashboard',render.partyDashboard);
app.get('/adminDashboard',render.adminDashboard);
app.get('/forgot_VoterId',render.forgot_VoterId);
app.get('/forgot_VoterId2',render.forgot_VoterId2);
app.post('/voterId',render.voterId);
app.post('/voterId2',render.voterId2);
app.post('/Registration1', upload.single("picture"), render.Registration1)
app.post('/thirdAuth', upload.single("imageData"), render.thirdAuth)
app.get('/Authentication1',render.Authetication1)
app.get('/firstStep',render.firstStep)
app.post('/firstAuth',render.firstAuth)
app.post('/secondAuth',render.secondAuth)
app.get('/thirdStep',render.thirdStep)
app.get('/ballot',render.ballot)
app.get('/democracy',render.democracy)
app.get('/stepsToVote',render.stepsToVote)
app.get('/myProfile',render.myProfile)
app.get('/editProfile',render.editProfile)
app.post('/updateProfile',render.updateProfile)
app.get('/myParty',render.myParty)
app.get('/party_editProfile',render.party_editProfile)
app.post('/update_partyProfile',render.update_partyProfile)
app.get('/party_requests',render.party_requests)
app.post('/party_reg_request',render.party_reg_request)
app.get('/accepted_partys',render.accepted_partys)
app.get('/votingBallot',render.votingBallot)
app.post('/ActualVote',render.ActualVote)
app.get('/nominateCandidate',render.nominateCandidate)
app.post('/candidateReg', upload.single("picture"),render.candidateReg)
app.get('/candidate_request',render.candidate_request)
app.post('/candidate_reg_request',render.candidate_reg_request)
app.get('/accepted_nominations',render.accepted_nominations)
app.get('/electionphase',render.electionphase)
app.post('/Electionphase',render.Electionphase)
app.get('/electionresults',render.electionresults)
app.post('/publishresults',render.publishresults)
app.get('/votingresults',render.votingresults)
app.get('/votingResults1',render.votingResults1)
// app.post('/Login',)


// app.post('/ContactUs', function(req,res){
//     name = req.body.inputName4;
//     useremailid =req.body.inputEmail4;
//     var phoneno = req.body.inputNumber4;
//     var service=req.body.service;
//     var msg=req.body.inputMessage;
 
//     var data = {
//        "name": name,
//        "email":useremailid,
//        "phone_no":phoneno,
//        "service":service,
//        "message":msg
//     }
//     db.collection('complaints').insertOne(data,function(err, collection){
//     if (err) throw err;
//        email_api.emailapi(useremailid,name);
//        console.log("Record inserted Successfully");
      
//     //    alert("We will let you know the answer for your trouble");
//     });
//     res.render('homePage',{success: 'Message sent successfully!'});
//  })

// app.listen(3000, () => { console.log(`server is running at http://localhost:${3000}`) });//http://localhost:3000/