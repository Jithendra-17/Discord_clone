
// let config=require('cloudinary');
// const cloudinaryConfig = (req,res,next) =>{ config({
// cloud_name: 'ddfuuvunk',
// api_key: "377235851286147",
// api_secret:"BDn970coLbMlZfpf7RHgW5OoSuc",
// });
// next();
// }
// module.exports={ cloudinaryConfig, uploader };

const cloudinary = require("cloudinary").v2;
const CLOUD_NAME = "ddfuuvunk";
const API_KEY = "377235851286147";
const API_SECRET = "BDn970coLbMlZfpf7RHgW5OoSuc";
cloudinary.config({
  cloud_name: CLOUD_NAME,
  api_key: API_KEY,
  api_secret: API_SECRET,
});

module.exports = cloudinary;