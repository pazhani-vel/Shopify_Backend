const asynHandler = require('express-async-handler')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv').config()

const validatejwt = asynHandler(async(req,res,next)=>{
     let token;
    
        let authHeader = req.headers.authorization || req.headers.Authorization;
    
        if(authHeader && authHeader.startsWith("Bearer"))
        {
            token = authHeader.split(" ")[1];
    
            jwt.verify(
                token,
                process.env.JWT_SECRET_KEY,
                (err,decoded)=>{
                    console.log(decoded)
                    if(err)
                    {
                        console.log(err)
                        res.status(401);
                        throw new Error("User is not authenticated");
                    }
                    console.log(decoded);
                    req.user = decoded.user;
                    req.admin = decoded.admin;
                    next();
                }
            )   
        }
        if(!token)
            {
                res.status(401);
                throw new Error("The user is not authenticated or token is missing");
            }
})


module.exports = {validatejwt}