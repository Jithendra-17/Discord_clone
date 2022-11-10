const db=require('../models');
var nodemailer=require('nodemailer');
const OTP=db.loginOtps;
let randotp;
setInterval(createRandomOtp,1000);
//let randotp= Math.round(1000+ Math.random() * 9000);
function createRandomOtp(){
    randotp= Math.round(1000+ Math.random() * 9000);
}
const sendOtp=async(req,res)=>{
    var transporter=nodemailer.createTransport({
        service:'gmail',
        auth:{
            user:'jithendra.ch@codingmart.com',
            pass:'Jithendra@2002',
        }
    });
    
    var mailoption={
        from:'jithendra.ch@codingmart.com',
        to:req.body.email_id,
        subject:'OTP',
        text:`OTP is ${randotp}`,
    };
    
    transporter.sendMail(mailoption,(err,res)=>{
        if(err)
        console.log(err.message);
        else
        console.log("sent mail succesfully");
    })
    let info={
        email_id:req.body.email,
        otp:randotp,
    }
    try{
    const otp=await OTP.create(info);
    res.status(200).send(otp);
    console.log(`sent otp to ${info}`);
    }
    catch(err){ res.send(err.message)}
    
}


module.exports={
    sendOtp,
}

