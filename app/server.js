const express=require('express');
const cors= require('cors');
const app=express();


const http=require('http');
const socketio=require('socket.io');
let server=http.createServer(app);
let io=socketio(server);


var corsOptions={
    // origin:'http://192.168.1.140:3000/login'
    origin:'*'
}

app.use(cors(corsOptions));

app.use(express.json());

app.use(express.urlencoded({extended:true}));



app.get('/welcome',(req,res)=>{
    res.json({message:'welcome to discord application'});
});

const userrouter=require('./Routes/userroutes');
app.use('/',userrouter);

const otprouter=require('./Routes/otproutes');
app.use('/otp',otprouter);

const messagerouter=require('./Routes/messageroute');
app.use('/message',messagerouter);

const channelrouter=require('./Routes/channelroutes');
app.use('/user/server/',channelrouter);

const rolerouter=require('./Routes/role_routes');
app.use('/role',rolerouter);

const serverrouter=require('./Routes/serverroutes');
app.use('/user',serverrouter);

const notificationrouter=require('./Routes/notificationroutes');
app.use('/notification',notificationrouter);




const PORT=process.env.PORT||7070;

server.listen(PORT,()=>{
    console.log(`server running on ${PORT}`);
});




