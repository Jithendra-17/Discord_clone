const db=require('../models');
const Message=db.messages;
const io=require('../server');
// const io=require('socket.io')(5000);
const sendmsg=async(req,res)=>{
    // let info={
    //     msg:req.body.msg,
        
    // }
    // try{
    // const msg=await Message.create(info);
    // io.on('connection', (socket) => {
    //     socket.on('chat message', msg => {
    //       socket.broadcast.emit('chat message', socket.id+":"+msg);
    //       console.log('message is '+msg);
    //       res.sendstaus(200);
    //     });
    //   });
    // }
    // catch(err){ res.send(err.message)}
    res.send('hi')
   
}
const data=async(req,res)=>{
const channel=await db.channels.findOne({where:{id:req.body.id}});
const user=await db.serverchanneluser.findOne({where:{userId:req.userId,channelId:req.body.id,serverId:channel.serverId}});
}

// console.log(data);


io.on('connection',(socket)=>{
  console.log('user connected')
  socket.on('message',(data)=>{
    console.log(data);
  })
  socket.on('New message',(data)=>{
    console.log(data);
  })
  socket.on('disconnect',()=>{
    console.log('User disconnected');
  })
  io.emit('emit msg',{ name1:'dj'})
})









module.exports={
    sendmsg
}