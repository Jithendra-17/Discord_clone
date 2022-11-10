const Messagecontroller=require('../controllers/messagecontroller');
const messagerouter=require('express').Router();

messagerouter.post('/sendmsg',Messagecontroller.sendmsg);

module.exports=messagerouter;