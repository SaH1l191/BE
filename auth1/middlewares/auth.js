//auth , isStudent, isAdmin

const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.auth= (req,res,next)=>{
    try{
        //extract jwt token 
        //other ways to fetch tokens  - pending classes 
        const token = req.body.token ; 

        if(!token){
            return res.status(401).json({
                success:false,
                message:"Token Missing",
            });
        }
        //vefiry token
        try{
            const decode = jwt.verify(token,process.env.JWT_SECRECT);
            console.log("logging decode:-" + decode);

            req.user = decode;

            next();

        }catch(error){
            return res.status(401).json({
                success:false,
               
                message:"Token is invalid",
            })
        }
        next();

    }
    catch(error){
        return res.status(401).json({
            success:false,
            message:"Something went wrong while verifying the token",
    });
    }
}

exports.isStudent = (req,res,next)=>{
    try{
        if(req.user.role!=="Student"){
            return res.status(401).json({
                success:true,
                message:"This is a protected route for Students",
            });
        }
        next();
    }
    catch(error){
        return res.json(500).json({
            success:false,
               
                message:"User role is not Matching",
        })
    }
}

exports.isAdmin = (req,res,next)=>{
    try{
        if(req.user.role!=="Admin"){
            return res.status(403).json({
                success:false,
                message:"This is a protected route for Admins",
            });
        }
        next();
    }
    catch(error){
        return res.json(500).json({
            success:false,
            message:"User role is not Matching",
        })
    }
}