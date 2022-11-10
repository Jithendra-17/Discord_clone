require('dotenv').config();
const jwt = require('jsonwebtoken');


const authenticateToken = async (req,res,next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(" ")[1];
    
    
    if(token == null){
        return res.sendStatus(401);
    }
    
    
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, function(err, decoded) {
        if(err) {
            return res.send(err.message);
        }
        req.userId = decoded.userId;
     // console.log(decoded);
        next();
    });
}

module.exports={
  authenticateToken
}