// const { channelmembers, users } = require('../models');
const { servermember, channelmember } = require('../models');
const db=require('../models');
const server_model = require('../models/server_model');
const Channel=db.channels;
const User=db.users;
const Channelmember=db.channelmember;
const Servermember=db.servermember;
const Serverchanneluser=db.serverchanneluser;
const io=require('../server');


//To createChannel by the user
const createChannel=async(req,res)=>{
    // const member=await Servermember.findOne({where:{userId:req.userId}})
    const creator=await db.servers.findOne({where:{created_by:req.userId}});
    // const role=await Serverchanneluser.findOne({where:{userId:req.userId,serverId:req.body.serverId,role:req.body.role}})
    let info={
        name:req.body.name,
        // channel_id:req.body.channel_id,
        // message_id:req.body.message_id,
        // thread_id:req.body.thread_id,
        // share:req.body.share,
        // notification:req.body.notification,
        type:req.body.type,
        serverId:req.body.serverId,
        created_by:req.userId,
        private_channel:req.body.private_channel,
    }
   
    // if(creator || (role.userId==req.userId))
    // {
    //     res.send('successful');
    // }
    if(creator){
    try{
    const channel=await Channel.create(info);
    const createChannel=await Channelmember.create({
        userId:req.userId,
        channelId:channel.id,
    })
    if(!channel.private_channel){
    const serverchannel=await Serverchanneluser.create({
        userId:req.userId,
        serverId:channel.serverId,
        channelId:channel.id,
        role:1,
        private:false})
   // console.log(channel.id);
    res.status(200).send(channel);
    }
    else{
        const serverchannel=await Serverchanneluser.create({
            userId:req.userId,
            serverId:channel.serverId,
            channelId:channel.id,

            private:true})
        res.status(200).send(channel);
    }
}

    catch(err){ res.send(err.message)}   
}
else{res.send('first join the server')}
}




//To get all the channels that the user had created
const getchannel=async(req,res)=>{
    //let id=req.params.id;
    
    try{
    const channel=await Channelmember.findAll({where :{userId:req.userId}});
    res.status(200).send(channel);
    // console.log(req.userId+"hello");
    }
    catch(err){res.send(err.message)}
}



const sendmsg=async(req,res)=>{
    // let info={
    //     id:req.body.id,
    //    // name:req.body.name,
    //     message:req.body.message,
    // }
    
    try{
       let channel=await Channel.findOne({where:{id:req.body.id}});
       let user=await Serverchanneluser.findOne({where:{userId:req.userId,channelId:req.body.id,serverId:channel.serverId}});
        if(user){
           
            // io.on('connection',socket=>{
            //     console.log('connected')
            // })
            // io.emit('message', req.body.message);
        res.json({user:user,message:'message sent succesfully'});

        }

    }
    catch(err){res.send(err.message)}
    return channel
}


//Join a channel by an user so that the junction table gets updated.
const joinchannel=async(req,res)=>{
    let id=req.params.id;
    try{
        // let channel=await Channel.findOne({where:{id:req.body.id,private_channel:false}});
        let channel=await Channel.findOne({where:{id:id}});
        const sermem=await Servermember.findOne({where:{userId:req.userId,serverId:channel.serverId}});
        const present=await Serverchanneluser.findOne({where:{userId:req.userId,serverId:channel.serverId,channelId:id}})

    if(!present){
    if((channel && channel.private_channel==false)&&(!sermem || sermem))
    {
        const data=await servermember.create({
            userId:req.userId,
            serverId:channel.serverId
        })
        const chdata=await channelmember.create({
            userId:req.userId,
            channelId:id,
        })
        const scd=await Serverchanneluser.create({
            userId:req.userId,
            private:channel.private_channel,
            serverId:channel.serverId,
            role:1,
            channelId:id
        })

        if(req.body.message)
        {
       io.join(channel.id);
        io.brodadcast.to(channel.id).emit('joinedchannel',{message:`User with id ${req.userId} had joined in the Channel ${channel.name}`})
        }
        else console.log("tyoe any msg")

        res.status(200).send(`User added to server and the channel ${id}`);
        
    }

    // const sermem=await Servermember.findOne({where:{userId:req.userId,serverId:channel.serverId}});
    if(channel && channel.private_channel==true && !sermem){
        // const data =await Channelmember.create(info);
        const serdata=await Servermember.create({userId:req.userId,serverId:channel.serverId})
        res.status(200).json({message:"user not in server so added to the server",Data:serdata});
    }

    if(channel && channel.private_channel==true && sermem){
        const role=await db.permission.findOne({where:{id:req.body.role}})
        if(role){
        const serdata=await Serverchanneluser.create({
            userId:req.userId,
            serverId:channel.serverId,
            channelId:id,
            role:req.body.role ,
            private:true,
        })
    }
    else{ res.status(400).send('Provide the role for getting added in the channel');}
    }
    else
    res.status(200).send("channel doesnt exist");
   
    }
    else res.send('Already joined');
}
    catch(err){res.send(err.message);}
}

//Get the number of users peresent in that channel 
const getusersofchannel=async(req,res)=>{
    try{
        
        const member=await Channelmember.findOne({where:{userId:req.userId,channelId:req.body.id}})
        if(member){
        const data=await Channelmember.findAll(
            {where:
                {channelId:req.body.id},
               attributes:['id'],
               include : [
                {
                    model : db.channels,
                    attributes:['name']
                    
    }],
                 include : [
                {
                    model : db.users,
                    attributes:['name']
                    
    }]
    })
    res.status(200).send(data);
}
else{res.send("Not accessable")}
    }
    catch(err){res.send(err.message);}
}


const gotochannel=async(req,res)=>{
    try{
        const cd=await Serverchanneluser.findOne({where:{userId:req.userId,channelId:req.body.channelId,serverId:req.body.serverId}});
        if(cd && req.body.message)
        {
            io.sockets.on('connection',socket=>{
                socket.join(req.body.channelId);

                socket.broadcast.to(req.body.channelId)
                .emit('message',req.body.message)

                // socket.emit('message',req.body.message);

            })
            res.send('msg sent')
        }
        else
        {
            res.send('Unable to go to channel')
        }
    }
    catch(err){res.send(err.message)}
}

module.exports={
    createChannel,sendmsg,getchannel,joinchannel,getusersofchannel,gotochannel,
}
