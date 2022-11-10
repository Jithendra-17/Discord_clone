const db=require('../models');
const Server=db.notification;

const notificationstatus=async(req,res)=>{
    let info={
        mute:req.body.mute,
        none:req.body.none,
        mention:req.body.mention,
    }
    try{
    const server=await Server.create(info);
    res.status(200).send(notificationstatus);
    //console.log(user);
    }
    catch(err){ res.send(err.message)}
    
}


module.exports={
    notificationstatus
}