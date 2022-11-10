const channelcontroller=require('../controllers/channelcontroller');
const channelrouter=require('express').Router();
const {authenticateToken}=require('../controllers/authnitication');

channelrouter.post('/addchannel',authenticateToken,channelcontroller.createChannel);
channelrouter.get('/',authenticateToken,channelcontroller.getchannel);
channelrouter.post('/sendmsg',channelcontroller.sendmsg);
// channelrouter.get('/getprivatechannels',authenticateToken,channelcontroller.getprivatechannels);
channelrouter.post('/joinchannel/:id',authenticateToken,channelcontroller.joinchannel);
channelrouter.post('/channelmembers',authenticateToken,channelcontroller.getusersofchannel);


module.exports=channelrouter;