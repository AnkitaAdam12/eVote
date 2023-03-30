var nodemailer=require('nodemailer');

module.exports.emailapi=function(useremailid,name){
    var transporter=nodemailer.createTransport({
        host:'smtp.gmail.com',
        // port:587,
        port:465,
        secure:true,
        requireTLS:true,
        auth:{
            user:'evoterservice@gmail.com',
            pass:'mcgbjanmwdzehfcm'
        }
    });
    var message = `Dear [Client Name],

Thank you for contacting the National e-Voting System. We appreciate your interest and value your feedback.

We have received your message regarding your problem. We are sorry for the inconvenience you have faced. Our team is working diligently to resolve the issue and ensure a seamless voting experience for all users.

We would like to assure you that your concerns are of utmost importance to us, and we will do our best to resolve the issue as quickly as possible. In the meantime, if you have any further questions or concerns, please do not hesitate to reach out to us.

Thank you for your patience and understanding.

Best regards,
National e-Voting System Support Team`;

message = message.replace("[Client Name]", name);

    var mailOptions={
        from:'evoterservice@gmail.com',
        to:useremailid,
        subject:"National e-Voter Service System",
        text: message,
        
    }
    transporter.sendMail(mailOptions,function(error,info){
        if(error){
            console.log(error);
        }
        else{
            console.log("email has been sent , ",info.response);
        }
    })
    
}

module.exports.OTP=function(useremailid,otp){

    var transporter=nodemailer.createTransport({
        host:'smtp.gmail.com',
        // port:587,
        port:465,
        secure:true,
        requireTLS:true,
        auth:{
            user:'evoterservice@gmail.com',
            pass:'mcgbjanmwdzehfcm'
        }
    });
    var message = `Dear User,
    Thank you for using our service. Please use the following One-Time Password (OTP) to verify your account:

    OTP: 123
    
    This OTP is valid for 5 minutes and can only be used once. Please do not share this OTP with anyone else.
    
    If you have any questions or concerns, please contact our support team.

Best regards,
National e-Voting System Support Team`;

message = message.replace("123", otp);

    var mailOptions={
        from:'evoterservice@gmail.com',
        to:useremailid,
        subject:"National e-Voter Service System",
        text: message,
        
    }
    transporter.sendMail(mailOptions,function(error,info){
        if(error){
            console.log(error);
        }
        else{
            console.log("otp has been sent , ",info.response);
        }
    })
    
}

module.exports.VoterId=function(voterid,name,useremailid){

    var transporter=nodemailer.createTransport({
        host:'smtp.gmail.com',
        // port:587,
        port:465,
        secure:true,
        requireTLS:true,
        auth:{
            user:'evoterservice@gmail.com',
            pass:'mcgbjanmwdzehfcm'
        }
    });
    var message = `Dear [client Name],

    We hope this email finds you well. We are writing to provide you with your unique Voter ID for login.
    
    As a user of our system, you will need this Voter ID to log in and access your account. 
    
    Your Voter ID is: [id]
    
    Please keep this Voter ID safe and secure as it will be required for all future logins. If you have any trouble logging in, please don't hesitate to contact us for assistance.
    
    Thank you for your cooperation and we hope you have a successful experience with our platform.

Best regards,
National e-Voting System Support Team`;

message = message.replace("[client Name]", name);
message = message.replace("[id]", voterid);

    var mailOptions={
        from:'evoterservice@gmail.com',
        to:useremailid,
        subject:"National e-Voter Service System",
        text: message,
        
    }
    transporter.sendMail(mailOptions,function(error,info){
        if(error){
            console.log(error);
        }
        else{
            console.log("voterid has been sent , ",info.response);
        }
    })
    
}

module.exports.VoterId2=function(voterid,useremailid){

    var transporter=nodemailer.createTransport({
        host:'smtp.gmail.com',
        // port:587,
        port:465,
        secure:true,
        requireTLS:true,
        auth:{
            user:'evoterservice@gmail.com',
            pass:'mcgbjanmwdzehfcm'
        }
    });
    var message = `Dear User,

    We hope this email finds you well. We are writing to provide you with your unique Voter ID for login.
    
    As a user of our system, you will need this Voter ID to log in and access your account. 
    
    Your Recovered Voter ID is: [id]
    
    Please keep this Voter ID safe and secure as it will be required for all future logins. If you have any trouble logging in, please don't hesitate to contact us for assistance.
    
    Thank you for your cooperation and we hope you have a successful experience with our platform.

Best regards,
National e-Voting System Support Team`;

message = message.replace("[id]", voterid);

    var mailOptions={
        from:'evoterservice@gmail.com',
        to:useremailid,
        subject:"National e-Voter Service System",
        text: message,
        
    }
    transporter.sendMail(mailOptions,function(error,info){
        if(error){
            console.log(error);
        }
        else{
            console.log("recovered voterid has been sent , ",info.response);
        }
    }) 
}

module.exports.convey_partyreg=function(lname,useremailid){

    var transporter=nodemailer.createTransport({
        host:'smtp.gmail.com',
        // port:587,
        port:465,
        secure:true,
        requireTLS:true,
        auth:{
            user:'evoterservice@gmail.com',
            pass:'mcgbjanmwdzehfcm'
        }
    });
    var message = `Dear User,

    We are writing to inform you that your request to create a party account with the Election Commissioner has been successfully submitted. We appreciate your interest in staying informed about election-related updates and events.

    Once the Election Commissioner reviews and approves your request, you will receive a notification from our office with further instructions on how to access and manage your account.
    
    We appreciate your commitment to civic engagement and look forward to continuing to work with you.

Best regards,
National e-Voting System Support Team`;

message = message.replace("User",lname);

    var mailOptions={
        from:'evoterservice@gmail.com',
        to:useremailid,
        subject:"National e-Voter Service System",
        text: message,
        
    }
    transporter.sendMail(mailOptions,function(error,info){
        if(error){
            console.log(error);
        }
        else{
            console.log("party creation request has been sent , ",info.response);
        }
    }) 
}

module.exports.convey_rejected_partyreg=function(pn,useremailid){
    // console.log("usermailid is : ",useremailid)

    var transporter=nodemailer.createTransport({
        host:'smtp.gmail.com',
        // port:587,
        port:465,
        secure:true,
        requireTLS:true,
        auth:{
            user:'evoterservice@gmail.com',
            pass:'mcgbjanmwdzehfcm'
        }
    });
    var message = `Dear [Party] Representatives,

    We are here to inform you that your party has been rejected by the election commissioner for the upcoming elections. Unfortunately, your party did not meet the criteria outlined in the election guidelines, and therefore, we are unable to accept your nomination.
    
    Please note that we understand the time and effort that you have put into preparing for the elections, and we appreciate your commitment to serving the community. However, the election commissioner has determined that your party does not meet the requirements for participation in the upcoming elections.
    
    We understand that this news may be disappointing, but we encourage you to continue your efforts to make a positive difference in the community. We wish you all the best in your future endeavors.
    
    If you have any questions or concerns, please do not hesitate to contact us.

Best regards,
National e-Voting System Support Team`;

message = message.replace("[Party]",pn);

    var mailOptions={
        from:'evoterservice@gmail.com',
        to:useremailid,
        subject:"National e-Voter Service System",
        text: message,
        
    }
    transporter.sendMail(mailOptions,function(error,info){
        if(error){
            console.log(error);
        }
        else{
            console.log("party rejected message has been sent , ",info.response);
        }
    }) 
}

module.exports.convey_accepted_partyreg=function(pn,useremailid){
    // console.log("usermailid is : ",useremailid)

    var transporter=nodemailer.createTransport({
        host:'smtp.gmail.com',
        // port:587,
        port:465,
        secure:true,
        requireTLS:true,
        auth:{
            user:'evoterservice@gmail.com',
            pass:'mcgbjanmwdzehfcm'
        }
    });
    var message = `Dear [Party] Representatives,

    We are here to inform you that your party, has been accepted by the election commissioner for the upcoming elections. We are pleased to inform you that your nomination has met all the criteria outlined in the election guidelines, and we look forward to your participation in the democratic process.

    We appreciate the time and effort that you have put into preparing for the elections, and we are confident that your party will provide a valuable contribution to the political discourse in our community.
    
    Please note that we will provide further instructions on the voting process, including polling locations and voting hours, in due course. If you have any questions or concerns, please do not hesitate to contact us.
    
    Congratulations on your nomination, and we wish you all the best in the upcoming elections.

Best regards,
National e-Voting System Support Team`;

message = message.replace("[Party]",pn);

    var mailOptions={
        from:'evoterservice@gmail.com',
        to:useremailid,
        subject:"National e-Voter Service System",
        text: message,
        
    }
    transporter.sendMail(mailOptions,function(error,info){
        if(error){
            console.log(error);
        }
        else{
            console.log("party accepted message has been sent , ",info.response);
        }
    }) 
}


module.exports.convey_candidateReg=function(lname,useremailid){

    var transporter=nodemailer.createTransport({
        host:'smtp.gmail.com',
        // port:587,
        port:465,
        secure:true,
        requireTLS:true,
        auth:{
            user:'evoterservice@gmail.com',
            pass:'mcgbjanmwdzehfcm'
        }
    });
    var message = `Dear name,

    We are here to inform you that your nomination request for the upcoming election has been sent to the election commissioner for authentication. We will inform you as soon as we receive a response from them.
    
    Please note that your nomination is subject to approval from the election commissioner. We will keep you informed of any updates on the status of your nomination.
    
    Thank you for your interest in running for office. If you have any questions or concerns, please do not hesitate to contact us.

Best regards,
National e-Voting System Support Team`;

message = message.replace("name",lname);

    var mailOptions={
        from:'evoterservice@gmail.com',
        to:useremailid,
        subject:"National e-Voter Service System",
        text: message,
        
    }
    transporter.sendMail(mailOptions,function(error,info){
        if(error){
            console.log(error);
        }
        else{
            console.log("nomination request has been sent , ",info.response);
        }
    }) 
}

module.exports.convey_accepted_candidateReg=function(lname,useremailid){

    var transporter=nodemailer.createTransport({
        host:'smtp.gmail.com',
        // port:587,
        port:465,
        secure:true,
        requireTLS:true,
        auth:{
            user:'evoterservice@gmail.com',
            pass:'mcgbjanmwdzehfcm'
        }
    });
    var message = `Dear name,

    We are pleased to inform you that your nomination request for the upcoming election has been accepted by the election commissioner. Congratulations on taking this important step in your political career!
    
    Please note that your nomination is still subject to approval from the election commissioner, but we are optimistic that it will be approved. We will keep you informed of any updates on the status of your nomination.
    
    Thank you for your interest in running for office. If you have any questions or concerns, please do not hesitate to contact us.

Best regards,
National e-Voting System Support Team`;

message = message.replace("name",lname);

    var mailOptions={
        from:'evoterservice@gmail.com',
        to:useremailid,
        subject:"National e-Voter Service System",
        text: message,
        
    }
    transporter.sendMail(mailOptions,function(error,info){
        if(error){
            console.log(error);
        }
        else{
            console.log("nomination accepted msg has been sent , ",info.response);
        }
    }) 
}

module.exports.convey_rejected_candidateReg=function(lname,useremailid){

    var transporter=nodemailer.createTransport({
        host:'smtp.gmail.com',
        // port:587,
        port:465,
        secure:true,
        requireTLS:true,
        auth:{
            user:'evoterservice@gmail.com',
            pass:'mcgbjanmwdzehfcm'
        }
    });
    var message = `Dear name,

    We regret to inform you that your nomination request for the upcoming election has been rejected by the election commissioner for authentication. We understand that this may be disappointing news, and we encourage you to continue your political journey and try again in the future.
    
    Please note that you can appeal this decision to the relevant authorities, and we can provide you with more information on how to do so if you are interested.
    
    Thank you for your interest in running for office. If you have any questions or concerns, please do not hesitate to contact us.

Best regards,
National e-Voting System Support Team`;

message = message.replace("name",lname);

    var mailOptions={
        from:'evoterservice@gmail.com',
        to:useremailid,
        subject:"National e-Voter Service System",
        text: message,
        
    }
    transporter.sendMail(mailOptions,function(error,info){
        if(error){
            console.log(error);
        }
        else{
            console.log("nomination rejected msg has been sent , ",info.response);
        }
    }) 
}

module.exports.start_election=function(useremailid){

    var transporter=nodemailer.createTransport({
        host:'smtp.gmail.com',
        // port:587,
        port:465,
        secure:true,
        requireTLS:true,
        auth:{
            user:'evoterservice@gmail.com',
            pass:'mcgbjanmwdzehfcm'
        }
    });
    var message = `Dear E-Voting Platform Users,

    We are here to inform you that the election procedure has officially begun. As the Election Commissioner, I want to ensure that you are aware of the process and that your vote will make a difference.
    
    As a user of our e-voting platform, you have the ability to participate in the election process and help shape the future of our community. Your vote matters and will be counted towards the final results.
    
    We encourage you to submit your vote as soon as possible to avoid any technical issues or unforeseen circumstances.
    
    We have taken all necessary precautions to ensure the security and integrity of the e-voting platform, and we are confident that the process will be fair and transparent.
    
    Thank you for your participation in this important event, and we look forward to seeing the outcome of the election.

Best regards,
National e-Voting System Support Team`;

// message = message.replace("name",lname);

    var mailOptions={
        from:'evoterservice@gmail.com',
        to:useremailid,
        subject:"National e-Voter Service System",
        text: message,
        
    }
    transporter.sendMail(mailOptions,function(error,info){
        if(error){
            console.log(error);
        }
        else{
            console.log("start election msges has been sent , ",info.response);
        }
    }) 
}

module.exports.start_nominations=function(useremailid){

    var transporter=nodemailer.createTransport({
        host:'smtp.gmail.com',
        // port:587,
        port:465,
        secure:true,
        requireTLS:true,
        auth:{
            user:'evoterservice@gmail.com',
            pass:'mcgbjanmwdzehfcm'
        }
    });
    var message = `Dear Political Parties on E-Voting Platform,

    We are here to inform you that the candidate nomination procedure for the upcoming election has officially begun. As the Election Commissioner, I want to ensure that you are aware of the process and that you have enough time to nominate your candidates.
    
    We encourage you to submit your candidate nominations as soon as possible to avoid any last-minute issues.
    
    Please note that all the required information and documentation must be submitted before the deadline to be eligible for the election. We have taken all necessary precautions to ensure the security and integrity of the e-voting platform, and we are confident that the process will be fair and transparent.
    
    We encourage you to participate in the election and nominate your candidates who can make a difference in our community. Your participation is crucial for the success of the democratic process.
    
    Thank you for your attention to this matter, and we look forward to your participation in the upcoming election.

Best regards,
National e-Voting System Support Team`;

// message = message.replace("name",lname);

    var mailOptions={
        from:'evoterservice@gmail.com',
        to:useremailid,
        subject:"National e-Voter Service System",
        text: message,
        
    }
    transporter.sendMail(mailOptions,function(error,info){
        if(error){
            console.log(error);
        }
        else{
            console.log("start nomination msg has been sent , ",info.response);
        }
    }) 
}


module.exports.stop_nominations=function(useremailid){

    var transporter=nodemailer.createTransport({
        host:'smtp.gmail.com',
        // port:587,
        port:465,
        secure:true,
        requireTLS:true,
        auth:{
            user:'evoterservice@gmail.com',
            pass:'mcgbjanmwdzehfcm'
        }
    });
    var message = `Dear Political Parties on E-Voting Platform,

    I am writing to inform you that the candidate nomination procedure for the upcoming election has officially ended. As the Election Commissioner, I want to thank you for your participation in the nomination process and for your commitment to our democratic process.
    
    We have received all the required information and documentation from all the eligible candidates, and their names will be displayed on the e-voting platform for voters to choose from.
    
    We encourage you to encourage your supporters to vote for your candidates during this period.
    
    We have taken all necessary precautions to ensure the security and integrity of the e-voting platform, and we are confident that the process will be fair and transparent.
    
    Thank you for your attention to this matter, and we look forward to a successful and fair election.

Best regards,
National e-Voting System Support Team`;

// message = message.replace("name",lname);

    var mailOptions={
        from:'evoterservice@gmail.com',
        to:useremailid,
        subject:"National e-Voter Service System",
        text: message,
        
    }
    transporter.sendMail(mailOptions,function(error,info){
        if(error){
            console.log(error);
        }
        else{
            console.log("stop nomination msg has been sent , ",info.response);
        }
    }) 
}

module.exports.start_voting=function(useremailid){

    var transporter=nodemailer.createTransport({
        host:'smtp.gmail.com',
        // port:587,
        port:465,
        secure:true,
        requireTLS:true,
        auth:{
            user:'evoterservice@gmail.com',
            pass:'mcgbjanmwdzehfcm'
        }
    });
    var message = `Dear E-Voting Platform Users,

    We are here to inform you that the actual voting procedure for the upcoming election has officially begun. As the Election Commissioner, I want to remind you of the importance of your vote and encourage you to participate in this democratic process.
    
    Your vote can make a significant impact on the outcome of the election, and we urge you to take the time to choose the candidate who you believe will best represent our community.
    
    We encourage you to submit your vote as soon as possible to avoid any last-minute issues. We have taken all necessary precautions to ensure the security and integrity of the e-voting platform, and we are confident that the process will be fair and transparent.
    
    We would like to politely request everyone to cast their vote and take part in this important event. Your participation will help us make a better decision and bring a positive change to our community.
    
    Thank you for your attention to this matter, and we look forward to seeing the outcome of the election.
Best regards,
National e-Voting System Support Team`;

// message = message.replace("name",lname);

    var mailOptions={
        from:'evoterservice@gmail.com',
        to:useremailid,
        subject:"National e-Voter Service System",
        text: message,
        
    }
    transporter.sendMail(mailOptions,function(error,info){
        if(error){
            console.log(error);
        }
        else{
            console.log("start voting msg has been sent , ",info.response);
        }
    }) 
}


module.exports.stop_voting=function(useremailid){

    var transporter=nodemailer.createTransport({
        host:'smtp.gmail.com',
        // port:587,
        port:465,
        secure:true,
        requireTLS:true,
        auth:{
            user:'evoterservice@gmail.com',
            pass:'mcgbjanmwdzehfcm'
        }
    });
    var message = `Dear E-Voting Platform Users,

    We are here to inform you that the voting procedure for the recent election has officially ended. As the Election Commissioner, I want to thank you for your participation in this democratic process.
    
    We have received an overwhelming response from the community, and we are pleased to see so many of you taking part in this important event. We hope that the candidates you have chosen will help bring about positive change to our community.
    
    We would like to remind you that the results of the election will be announced shortly, and we encourage you to stay tuned for the updates. We have taken all necessary precautions to ensure the security and integrity of the e-voting platform, and we are confident that the process will be fair and transparent.
    
    Once again, we would like to thank you for taking the time to participate in this important event. Your vote mattered, and we appreciate your contribution to our democratic process.
Best regards,
National e-Voting System Support Team`;

// message = message.replace("name",lname);

    var mailOptions={
        from:'evoterservice@gmail.com',
        to:useremailid,
        subject:"National e-Voter Service System",
        text: message,
        
    }
    transporter.sendMail(mailOptions,function(error,info){
        if(error){
            console.log(error);
        }
        else{
            console.log("stop voting msg has been sent , ",info.response);
        }
    }) 
}

module.exports.stop_election=function(useremailid){

    var transporter=nodemailer.createTransport({
        host:'smtp.gmail.com',
        // port:587,
        port:465,
        secure:true,
        requireTLS:true,
        auth:{
            user:'evoterservice@gmail.com',
            pass:'mcgbjanmwdzehfcm'
        }
    });
    var message = `Dear E-Voting Platform Users,

    We are here to inform you that the elections have come to a close. On behalf of the election commission, I would like to thank you for your participation in this critical event.

    The election process was conducted smoothly, and we appreciate your trust in the e-voting platform to cast your vote. We received an overwhelming response from voters, and your contribution has been invaluable to us.

    As the election commissioner, I am pleased to announce that the votes have been counted, and the results have been declared.

    We want to take this opportunity to thank all the officials, volunteers, and staff members who worked tirelessly to make this event a success. Their hard work and dedication have made it possible to conduct the elections in a transparent and impartial manner.

    We are committed to ensuring that the election process is fair and democratic, and we will continue to work towards improving the e-voting platform's efficiency and security.

Once again, I would like to express my gratitude for your participation in this crucial event. Your vote is essential to strengthening our democracy.
Best regards,
National e-Voting System Support Team`;

// message = message.replace("name",lname);

    var mailOptions={
        from:'evoterservice@gmail.com',
        to:useremailid,
        subject:"National e-Voter Service System",
        text: message,
        
    }
    transporter.sendMail(mailOptions,function(error,info){
        if(error){
            console.log(error);
        }
        else{
            console.log("stop election msg has been sent , ",info.response);
        }
    }) 
}