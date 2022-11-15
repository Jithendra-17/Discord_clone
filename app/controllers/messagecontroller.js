const db=require('../models');
const Message=db.messages;
const io=require('../server');
// let socket=io();
// const io=require('socket.io')(5000);
const sendmsg=async(req,res)=>{
res.send('hi')   
}


// const data=async(req,res)=>{
// const channel=await db.channels.findOne({where:{id:req.body.id}});
// const user=await db.serverchanneluser.findOne({where:{userId:req.userId,channelId:req.body.id,serverId:channel.serverId}});
// }




// io.on('connection',socket=>{
//   const data=async(req,res)=>{
//     const ch=await db.serverchanneluser.findOne({where:{id:req.body.id}});
//     socket.join(ch);
//     socket.broadcast.to(ch).emit({messages:'postman'})
//   }
// })

// const socket = new EventEmitter();

const so=io.on('connection',(socket)=>{
    console.log(socket.id)
})
  
//   socket.on('New message',(data)=>{
//     console.log(data);
//   })
//   socket.on('disconnect',()=>{
//     console.log('User disconnected');
//   })
//   socket.emit('msg',{name:'jith'})
//   io.emit('emit msg',{ name1:'dj'})
// })










module.exports={
    sendmsg,
}