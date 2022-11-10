const rolecontroller=require('../controllers/role_controller');
const rolerouter=require('express').Router();
const {authenticateToken}=require('../controllers/authnitication');


rolerouter.post('/addrole',rolecontroller.addrole);

module.exports=rolerouter;