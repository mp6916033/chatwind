const asyncWrapper  = require("../middleWare/asyncWrapper");
const jwt = require("jsonwebtoken");
const ErrorHandler  = require("../appUtills/error");
const userModel = require("../model/UserModel");


exports.authentication = asyncWrapper( async (req , res , next) =>{
const token = req.cookies.token;
if (!token) {
  return next(new ErrorHandler("Please Login to access this resource", 401));
}

const decodeToken = jwt.verify(token, process.env.JWT_SECRET);


  
  next();
   
});
