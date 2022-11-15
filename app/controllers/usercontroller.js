require('dotenv').config();

const db=require('../models');
const User=db.users;
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const io=require('../server');



//adding an user(sign up)
const signUp=async(req,res)=>{
    const hashedpassword=await bcrypt.hash(req.body.password,10);
    let info={
        name:req.body.username,
        email_id:req.body.email,
        // mobile_number:req.body.mobile_number,
        password:hashedpassword,
        dob:req.body.DOB,
    }
    try{
    const userdata=await User.create(info);
    const user= await User.findOne({where:{email_id:req.body.email}});
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
                user_details: userdata,
                accessToken:accessToken,
            });
            }
            else
            res.send('Something Went wrong please try Logging In again');
        }
        catch{
            res.status(401).send();
        }
    }
    catch{
        res.send(404).send();
    }
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

        const d= await User.findOne({where:{email_id:req.body.userName}});

        io.emit('online',{message:`user ${d.name} having id ${d.id} is online`})
    }
    catch{
        res.send(404).send();
    }
}


module.exports={
    signUp,getProfile,login
}