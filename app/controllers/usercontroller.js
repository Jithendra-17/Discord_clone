require('dotenv').config();

const db=require('../models');
const User=db.users;
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');


//adding an user(sign up)
const signUp=async(req,res)=>{
    const hashedpassword=await bcrypt.hash(req.body.password,10);
    let info={
        name:req.body.name,
        email_id:req.body.email_id,
        mobile_number:req.body.mobile_number,
        password:hashedpassword,
        dob:req.body.dob,
    }
    try{
    const user=await User.create(info);
    
    res.status(200).send(user);
    }
    catch(err){ res.send(err.message)}
    
}

//Getting an user details
const getProfile=async(req,res)=>{
    let id=req.userId;
    try{
    const user=await User.findOne({where :{id:id},attributes:['name','email_id','mobile_number','dob']});
    // console.log(user.name)
    res.status(200).send(user);
    }
    catch(err){res.send(err.message)}
}

//Login
const login=async(req,res)=>{
    try{
        
        const user= await User.findOne({where:{email_id:req.body.userName}});
        if(user==null)
        {
            // res.send("User didnt exist.....\n For creating an new user go to '127.0.0.1/user/adduser'");
            res.send(404);
        }
        try{
            if(await bcrypt.compare(req.body.password,user.password)){
                
                let data = {
                    userId: user.id,
                };
                //console.log(data);
                  const accessToken = jwt.sign(data,`${process.env.ACCESS_TOKEN_SECRET}`, {
                    expiresIn: '1d'
                  });
                 // console.log(accessToken);
              res.json({
                Message: "Login Successful",
                accessToken:accessToken,
            });
            }
            else
            res.send('password is wrong');
        }
        catch{
            res.status(401).send();
        }
    }
    catch{
        res.send(404).send();
    }
}


module.exports={
    signUp,getProfile,login
}