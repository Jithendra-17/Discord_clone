const servercontroller=require('../controllers/servercontroller');
const serverrouter=require('express').Router();
const {authenticateToken}=require('../controllers/authnitication');
const upload=require('../controllers/multer_middleware');


serverrouter.post('/createserver',authenticateToken,upload.single("image"),servercontroller.createserver);
serverrouter.get('/server/getnonprivatechannels/:id',authenticateToken,servercontroller.getnonprivatechannels);
serverrouter.get('/getallservers',authenticateToken,servercontroller.getallservers);
serverrouter.post('/joinserver/:id',authenticateToken,servercontroller.joinserver);
serverrouter.delete('/leave',authenticateToken,servercontroller.leave);

module.exports=serverrouter;