import { NextFunction } from 'express';
import jwt from 'jsonwebtoken'


export const studenttoken = (req:any,res:any,next:NextFunction) =>{
    const token = req.cookies.token;
    const secret = "student"

    if(!token){
        res.status(404).json({
            success:false,
            message:"Unauthorized: Login first"
        })
    }

    jwt.verify(token,secret, (error:any, decoded:any)=>{
        if(error){
            console.log(error);
            return res.status(500).json({
                success: false,
                message: "Invalid token or secret key"
            })
        }else{
            req.userId = decoded.userId;
            next();
        }
        
    })
}