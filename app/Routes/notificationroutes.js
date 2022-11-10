const notificationcontroller=require('../controllers/notificationcontroller');
const notificationrouter=require('express').Router();

notificationrouter.post('/notificationstatus',notificationcontroller.notificationstatus);

module.exports=notificationrouter;