const usercontroller=require('../controllers/usercontroller');
const userrouter=require('express').Router();
const {authenticateToken}=require('../controllers/authnitication');

userrouter.post('/signup',usercontroller.signUp);
userrouter.get('/getprofile',authenticateToken,usercontroller.getProfile);
userrouter.post('/login',usercontroller.login);



module.exports=userrouter;