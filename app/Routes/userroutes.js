const usercontroller=require('../controllers/usercontroller');
const userrouter=require('express').Router();
const {authenticateToken}=require('../controllers/authnitication');
const upload=require('../controllers/multer_middleware');



userrouter.post('/signup',upload.any(),usercontroller.signUp);
userrouter.get('/getprofile',authenticateToken,usercontroller.getProfile);
userrouter.post('/login',usercontroller.login);



module.exports=userrouter;