const path = require('path');
const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const formatMessage = require('./utils/message');
const {userJoin,getCurrentUser,userLeave,getRoomUsers} = require('./utils/users');


const {authenticateToken}=require('.././controllers/authnitication');
const db=require('./../models');
const User=db.users;

const app = express();
const server = http.createServer(app);
const io = socketio(server);


app.use(express.static(path.join(__dirname, 'public')));
const Name = 'Discord';


const details=await User.findOne({where:{id:req.userId}});
const serverdetails=await db.servermember


io.on('connection', socket => {
  socket.on('joinRoom', ({ username, room }) => {
    const user = userJoin(req.userId, details.name, room);

    socket.join(user.room);

   
    // socket.emit('message', formatMessage(Name,'Welcome to the Chat'));

    
    socket.broadcast
      .to(user.room)
      .emit(
        'message',
        formatMessage(Name, `${user.username} has joined the chat`)
      );

   
    io.to(user.room).emit('roomUsers', {
      room: user.room,
      users: getRoomUsers(user.room)
    });
  });

  
  socket.on('chatMessage', msg => {
    const user = getCurrentUser(socket.id);

    io.to(user.room).emit('message', formatMessage(user.username, msg));
  });

 
  socket.on('disconnect', () => {
    const user = userLeave(socket.id);

    if (user) {
      io.to(user.room).emit(
        'message',
        formatMessage(Name, `${user.username} has left the chat`)
      );

      
      io.to(user.room).emit('roomUsers', {
        room: user.room,
        users: getRoomUsers(user.room)
      });
    }
  });
});

const PORT = 5050 || process.env.PORT;

server.listen(PORT, () => console.log(`Server running on port http://127.0.0.1:${PORT}`));