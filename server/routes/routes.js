// this file is to create the routes for application

const mongoose = require('mongoose');
var db = mongoose.connection;
const routes={};
const controller = require('../controller/controller')
const { Chart } = require('chart.js');
routes.homePage = function(req, res){
    // res.sendFile(__dirname + '/views/index.html')
    res.render('homePage', {success : ''});
}

routes.sepLogin=function(req,res){
    res.render('SepLogin')
}
routes.sepRegistration=function(req,res){
    res.render('sepRegistration');
}
routes.VoterReg2=function(req,res){
    res.render('VoterReg2',{msg:null});
}
routes.dash=function(req,res){
    res.render('Dashboard');
}
routes.Partylogin=function(req,res){
    res.render('Partylogin',{msg:null});
}
routes.Adminlogin=function(req,res){
    res.render('Adminlogin',{msg:null});
}
routes.Partyreg=function(req,res){
    res.render('PartyReg', {msg:null});
}
routes.voterreg1=function(req,res){
    res.render('VoterReg1', {msg:null});
}
routes.VoterLogin=function(req,res){
    res.render('VoterLogin',{msg:null});
}
routes.otp=function(req,res){
    res.render('otp', {errorMsg:null,msg:null});
}
routes.voterDashboard=function(req,res){

    res.render('voterDashboard',{msg:null});
}
routes.partyDashboard=function(req,res){
    res.render('partyDashboard',{msg:null});
}
routes.adminDashboard=function(req,res){
    res.render('adminDashboard',{msg:null});
}
routes.forgot_VoterId=function(req,res){
    res.render('forgot_VoterId1', {msg:null});
}
routes.forgot_VoterId2=function(req,res){
    res.render('forgot_VoterId2', {errorMsg:null,msg:null});
}
routes.Authetication1 = function(req,res){
    res.render('faceRecon');
}
routes.firstStep=function(req,res){
    db.collection('electionphase').findOne({ iid: "1"}, function (err, result) {
        if (err) throw err;
        var currentphase=result.currentphase;
        if(currentphase=="Start Voting"){
            const viid=controller.returnVid();
            db.collection('votes').findOne({ voterId: viid}, function (err1, result1) {
                if (err1)throw err1;
                if(result1!=null){
                    res.render('voterDashboard',{msg:"Your vote is already casted!"});
                }
                else{
                    res.render('firstStep',{msg:null});
                }
            });
        }
        else if(currentphase=="Start Election"||currentphase=="Nominate Candidates"||currentphase=="Stop Nominations"){
            res.render('voterDashboard',{msg:"Voting phase not yet started, we'll notify you when it begins!"});
        }
        else{
            res.render('voterDashboard',{msg:"Votings has been Ended!"});
        }
    });
}
routes.thirdStep=function(req,res){
    res.render('thirdStep',{msg:null});
}
routes.ballot=function(req,res){
    // const user=controller.getNominations();
    // console.log(user);
    // var nominations=[];
    var nominations=[];
    db.collection("partyaccounts").find({}).toArray(function(err, result) {
        if (err) throw err;
        db.collection("candidatenominations").find({"Approval":"yes"}).toArray(function(err, result1){
            let binaryData = new Array();
            for(i = 0; i<result.length; i++){
                for(j = 0; j<result1.length; j++){
                    // binaryData[i] = new Buffer.from(result[i].party_logo,"binary");
                    if(result[i].party_name==result1[j].party_name){
                        let data={};
                        data.candi_name=result1[j].candidate_name;
                        data.party_name=result1[j].party_name;
                        data.party_logo=result[i].party_logo;
                        nominations[j]=data;    
                        binaryData[j] = new Buffer.from(result[i].party_logo,"binary");
                        // console.log(result[i].candi_name);
                    }
                 }
             }
        // res.setHeader("content-type","image/png");
        // res.setHeader("content-type","image/jpg");
        res.render('votingBallot',{users:nominations,image:binaryData});
        });
      });
}
routes.democracy=function(req,res){
    res.render('democracy');
}
routes.stepsToVote=function(req,res){
    res.render('stepsToVote')
}
routes.myProfile=function(req,res){
    var vid=controller.returnVid();
    // console.log(vid);
    db.collection('voteraccounts').findOne({ voterid: vid}, function (err, result) {
        // console.log(vid);
        if (err) return console.error(err);
  
        if (result != null) {
            let binaryData = new Buffer.from(result.photo,"binary");
            res.render('myProfile',{users:result,image:binaryData});
        } 
     });
}
routes.editProfile=function(req,res){
    var vid=controller.returnVid();
    // console.log(vid);
    db.collection('voteraccounts').findOne({ voterid: vid}, function (err, result) {
        // console.log(vid);
        if (err) return console.error(err);
  
        if (result != null) {
            let binaryData = new Buffer.from(result.photo,"binary");
            res.render('editProfile',{users:result,image:binaryData,msg:null});
        } 
     });
    // res.render('editProfile')
}
routes.party_myProfile=function(req,res){
    var party_name=controller.returnPN();
    // console.log(vid);
    db.collection('partyaccounts').findOne({ party_name: party_name}, function (err, result) {
        // console.log(vid);
        if (err) return console.error(err);
  
        if (result != null) {
            let binaryData = new Buffer.from(result.party_logo,"binary");
            res.render('party_myProfile',{users:result,image:binaryData});
        } 
     });
}
routes.party_editProfile=function(req,res){
    var party_name=controller.returnPN();
    // console.log(vid);
    db.collection('partyaccounts').findOne({ party_name: party_name}, function (err, result) {
        // console.log(vid);
        if (err) return console.error(err);
  
        if (result != null) {
            let binaryData = new Buffer.from(result.party_logo,"binary");
            res.render('party_editProfile',{users:result,image:binaryData,msg:null});
        } 
     });
    // res.render('editProfile')
}
routes.party_requests=function(req,res){

    db.collection("partyaccounts").find({Approval:"no"}).toArray(function(err, result) {
        if (err) throw err;
        let binaryData = new Array();
        for(i = 0; i<result.length; i++){
            binaryData[i] = new Buffer.from(result[i].party_logo,"binary");
        }
        
        // res.setHeader("content-type","image/png");
        // res.setHeader("content-type","image/jpg");
        res.render('party_reg_request',{users:result,image:binaryData,msg:null});
      });

    // res.render('party_reg_request');
}

routes.accepted_partys=function(req,res){
    db.collection("partyaccounts").find({Approval:"yes"}).toArray(function(err, result) {
        if (err) throw err;
        let binaryData = new Array();
        for(i = 0; i<result.length; i++){
            binaryData[i] = new Buffer.from(result[i].party_logo,"binary");
        }
        
        // res.setHeader("content-type","image/png");
        // res.setHeader("content-type","image/jpg");
        res.render('party_accepted_requests',{users:result,image:binaryData});
      });
}
routes.votingBallot=function(req,res){
    // res.render('ActualVotingBallot');
    // db.collection("partyaccounts").find({}).toArray(function(err, result) {
    //     if (err) throw err;
    //     let binaryData = new Array();
    //     for(i = 0; i<result.length; i++){
    //         binaryData[i] = new Buffer.from(result[i].party_logo,"binary");
    //     }
        
    //     // res.setHeader("content-type","image/png");
    //     // res.setHeader("content-type","image/jpg");
    //     res.render('ActualVotingBallot',{users:result,image:binaryData});
    //   });
    var nominations=[];
    db.collection("partyaccounts").find({}).toArray(function(err, result) {
        if (err) throw err;
        db.collection("candidatenominations").find({"Approval":"yes"}).toArray(function(err, result1){
            let binaryData = new Array();
            for(i = 0; i<result.length; i++){
                for(j = 0; j<result1.length; j++){
                    // binaryData[i] = new Buffer.from(result[i].party_logo,"binary");
                    if(result[i].party_name==result1[j].party_name){
                        let data={};
                        data.candi_name=result1[j].candidate_name;
                        data.party_name=result1[j].party_name;
                        data.party_logo=result[i].party_logo;
                        nominations[j]=data;    
                        binaryData[j] = new Buffer.from(result[i].party_logo,"binary");
                        // console.log(result[i].candi_name);
                    }
                 }
             }
        // res.setHeader("content-type","image/png");
        // res.setHeader("content-type","image/jpg");
        res.render('ActualVotingBallot',{users:nominations,image:binaryData});
        });
      });
}
routes.nominateCandidate=function(req,res){
    db.collection('electionphase').findOne({ iid: "1"}, function (err, result) {
        if (err) throw err;
        var currentphase=result.currentphase;
        if(currentphase=="Nominate Candidates"){
            res.render('nominateCandidate',{msg:null});
        }
        else if(currentphase=="Start Election"){
            res.render('partyDashboard',{msg:"Nominations phase not yet started, we'll notify you when it begins!"});
        }
        else{
            res.render('partyDashboard',{msg:"Candidate Nominations Ended!"});
        }
    });
    
}
routes.candidate_request = function(req,res){
    var data=[];
    db.collection('partyaccounts').find({}).toArray(function(err,result1) {
        if (err) throw err;
        db.collection("candidatenominations").find({"Approval":"no"}).toArray(function(err, result){
            for (i=0;i<result1.length;i++){
                for(j=0;j<result.length;j++){
                    if(result1[i].party_name.toLowerCase() === result[j].party_name.toLowerCase()){
                        let demo={};
                        // demo=result[j]
                        demo.party_name=result1[i].party_name;
                        demo.candi_name=result[j].candidate_name;
                        demo.candi_age=result[j].candidate_age;
                        demo.position=result[j].position;
                        demo.party_logo=result1[i].party_logo;
                        // demo=new Buffer.from(result1[i].party_logo,"binary");
                        data[data.length]=demo;
                        
                    }

                }

            }
            // console.log(data)
        res.render('candidate_reg_request',{users:data,msg:null});

        });
        // let binaryData = new Array();
        // for(i = 0; i<result.length; i++){
        //     binaryData[i] = new Buffer.from(result[i].photo,"binary");
        // }
        
        // res.setHeader("content-type","image/png");
        // res.setHeader("content-type","image/jpg");
        
      });
}

// routes.accepted_nominations = function(req,res){
    // db.collection("candidatenominations").find({Approval:"yes"}).toArray(function(err, result) {
    //     if (err) throw err;
    //     let binaryData = new Array();
    //     for(i = 0; i<result.length; i++){
    //         binaryData[i] = new Buffer.from(result[i].photo,"binary");
    //     }
        
    //     // res.setHeader("content-type","image/png");
    //     // res.setHeader("content-type","image/jpg");
    //     res.render('candidate_accepted_requests',{users:result,image:binaryData,msg:null});
    //   });
    
// }

routes.accepted_nominations=function(req,res){
    db.collection("candidatenominations").find({Approval:"yes"}).toArray(function(err, result) {
        if (err) throw err;
        let binaryData = new Array();
        for(i = 0; i<result.length; i++){
            binaryData[i] = new Buffer.from(result[i].photo,"binary");
        }
        
        // res.setHeader("content-type","image/png");
        // res.setHeader("content-type","image/jpg");
        res.render('candidate_accepted_requests',{users:result,image:binaryData,msg:null});
      });
}
routes.electionphase=function(req,res){
    const phases=["Start Election","Nominate Candidates","Stop Nominations","Start Voting","Stop Voting","Display Results","Stop Election"];
    db.collection('electionphase').findOne({ iid: "1"}, function (err, result) {
        if (err) throw err;
        var currentphase=result.currentphase;
        var index=phases.indexOf(currentphase);
        if(index==6){
            index=-1;
         }
        var nextphase=phases[++index];
        res.render('setElectionPhase',{msg:null,next:nextphase,current:currentphase});
      });
}
routes.electionresults=function(req,res){
    // var votes=[];
    // db.collection("candidatenominations").find({Approval:"yes"}).toArray(function(err, result) {
    //     for(var i=0;i<result.length;i++){
    //         let data={};
    //         data.party_name=result[i].party_name;
    //         data.votes=0;
    //         votes[i]=data;
    //         // console.log("here : ",votes[i])
    //     }
    //     // console.log("after for loop votes is ",votes)
    //     db.collection("votes").find({}).toArray(function(err, result) {
    //         // console.log("result is : ",result)
    //         for(var i=0;i<votes.length;i++){
    //             for(var j=0;j<result.length;j++){
    //                 if(votes[i].party_name==result[j].pName){
    //                     votes[i].votes+=1;  
    //                     // console.log("here 1: ",votes[i])
    //                 }
    //             }
    //         }
    //         var temp={};
    //         for(var i=0;i<votes.length-1;i++){
    //             if(votes[i].votes>votes[i+1].votes){
    //                 temp=votes[i];
    //             }
    //             else{
    //                 temp=votes[i+1];
    //             }
    //         }

    //         db.collection('candidatenominations').findOne({ party_name:temp.party_name}, function (err, result) {
    //             if(err) throw err;
    //             temp.candi_name=result.candidate_name;
    //             temp.photo=result.photo;
    //             // console.log("here temp is : ",temp)
    //             db.collection('partyaccounts').findOne({ party_name:temp.party_name}, function (err, result) {
    //                 if(err) throw err;
    //                 temp.party_logo=result.party_logo;
    //                 const data = votes.map((vote) => ({
    //                     label: vote.party_name,
    //                     data: vote.votes,
    //                   }));
    //                   const chartData = {
    //                     labels: data.map((candidate) => candidate.label),
    //                     datasets: [
    //                       {
    //                         data: data.map((candidate) => candidate.data),
    //                         backgroundColor: [
    //                           'rgba(255, 99, 132, 0.2)',
    //                           'rgba(54, 162, 235, 0.2)',
    //                           'rgba(255, 206, 86, 0.2)',
    //                           'rgba(75, 192, 192, 0.2)',
    //                           'rgba(153, 102, 255, 0.2)',
    //                         ],
    //                         borderColor: [
    //                           'rgba(255, 99, 132, 1)',
    //                           'rgba(54, 162, 235, 1)',
    //                           'rgba(255, 206, 86, 1)',
    //                           'rgba(75, 192, 192, 1)',
    //                           'rgba(153, 102, 255, 1)',
    //                         ],
    //                         borderWidth: 1,
    //                       },
    //                     ],
    //                   };
    //                   res.render('electionresults',{chart:chartData,msg:null,winner:temp});
    //             });
    //         });
    //     });
    // });

    db.collection('electionphase').findOne({ iid: "1"}, function (err, result) {
        if (err) throw err;
        var currentphase=result.currentphase;
        if(currentphase=="Display Results"){
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
                      res.render('electionresults',{chart:chartData,msg:null,winner:temp});
                });
            });
        });
    });
}
else{
    res.render('adminDashboard',{msg:'Please update the current Election Phase!'});
}
    });
}

routes.votingresults=function(req,res){
    db.collection('electionphase').findOne({ iid: "1"}, function (err, result) {
        if (err) throw err;
        var currentphase=result.currentphase;
        if(currentphase=="publish results"){
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
                      res.render('showresult',{chart:chartData,msg:null,winner:temp});
                });
            });
        });
    });
}
else{
    res.render('voterDashboard',{msg:'Election Results are yet to be displayed!'});
}
    });
    
}

routes.votingResults1=function(req,res){
    db.collection('electionphase').findOne({ iid: "1"}, function (err, result) {
        if (err) throw err;
        var currentphase=result.currentphase;
        if(currentphase=="publish results"){
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
                      res.render('showresult',{chart:chartData,msg:null,winner:temp});
                });
            });
        });
    });
}
else{
    res.render('partyDashboard',{msg:'Election Results are yet to be displayed!'});
}
    });
    
}
module.exports = routes;