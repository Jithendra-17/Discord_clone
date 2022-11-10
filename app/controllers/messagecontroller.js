const db=require('../models');
const Message=db.messages;

// const io=require('socket.io')(5000);


const sendmsg=async(req,res)=>{
    let info={
        msg:req.body.msg,
        
    }
    try{
    const msg=await Message.create(info);
    io.on('connection', (socket) => {
        socket.on('chat message', msg => {
          socket.broadcast.emit('chat message', socket.id+":"+msg);
          console.log('message is '+msg);
          res.sendstaus(200);
        });
      });
    }
    catch(err){ res.send(err.message)}
    
}

module.exports={
    sendmsg
}