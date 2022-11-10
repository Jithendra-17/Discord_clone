const OTP=require('../controllers/otpconstroller');
const otprouter=require('express').Router();

otprouter.post('/sendotp',OTP.sendOtp);
// otprouter.get('/:id',OTP.getOneuser);

module.exports=otprouter;