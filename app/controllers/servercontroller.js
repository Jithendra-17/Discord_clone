const { channelmember } = require('../models');
const cloudinary = require('../config/cloudinaryconfig');

const db=require('../models');
const User=db.users;
const Server=db.servers;
const Servermember=db.servermember;
const Channel=db.channels;
const Serverchanneluser=db.serverchanneluser;

//Create server
const createserver=async(req,res)=>{
    
try{

const result = await cloudinary.uploader.upload(req.file.path);


    const server=await Server.create( 
        {name:req.body.servername,
        image:result.secure_url,
        created_by:req.userId,});
    const addserver=await Servermember.create({
        userId:req.userId,
        serverId:server.id,
    })
    res.status(200).send(server);
}
    catch(err){  console.log(err);res.send(err.message)}
    }

//Get the servers of the user which he is present in.    

const getallservers=async(req,res)=>{
    try{
        const server=await Servermember.findAll( {where:
            {userId:req.userId},
           attributes:[],
             include : [
            {
                model : db.servers,
               attributes:['name','image'],
               include:[
                {
                    model:db.channels,
                    attributes:['name'],
                }
               ]
                
}]
})
res.status(200).send(server);
    }
    catch(err){res.send(err.message);}
}



const getnonprivatechannels=async(req,res)=>{
    let id=req.params.id
    try{
        const details=await Serverchanneluser.findAll( {where:
            {serverId:id,userId:req.userId,private:false},
        //    attributes:[],
             include : [
            {
                model : db.channels,
               attributes:['name'],
            //    include:[
            //     {
            //         model:db.channels,
            //         attributes:['name'],
            //     }
            //    ]
                
}]
})
res.status(200).send(details);
    }
    catch(err){res.send(err.message);}
}


//Join a server
const joinserver=async(req,res)=>{
  try{
    const join=await Servermember.create({userId:req.userId,serverId:req.params.id});
    res.status(200).send(join);

  }
  catch(err){res.send(err.message)}
}

//leave the server
const leave=async(req,res)=>{
    try{
    const serverdata=await Servermember.destroy({where:{userId:req.userId,serverId:req.body.serverId}});
    const channeldata=await Serverchanneluser.destroy({where:{userId:req.userId,serverId:req.body.serverId}})
    
    res.send("Deleted succesfully");
    }
    catch(err){res.send(err.message)}

}






module.exports={
    createserver,getallservers,getnonprivatechannels,joinserver,leave
}