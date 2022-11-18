const Messagecontroller=require('../controllers/messagecontroller');
const messagerouter=require('express').Router();
const {authenticateToken}=require('../controllers/authnitication');
// const {sio}=require('../controllers/io_middleware');




messagerouter.post('/sendmsg',authenticateToken,Messagecontroller.sendmsg);

module.exports=messagerouter;