import jwt from "jsonwebtoken";
import {User} from "../models/user.models.js";

export const verifyJWt = async (req,res,next)=>{

 
   try {
     const Token = req.cookies?.AccessToken
 
     if (!Token ){
         return res.status(401).json({
             success:false,
             message:"unautjorised access"
         })
     }
 
 const decodedToken = jwt.verify(Token,process.env.ACCESS_TOKEN_SECRET)
 
 const user = await User.findById(decodedToken?._id).select("-password -refreshToken")
 if (!user ){
     return res.status(401).json({
         success:false ,
         message:"invalid access token "
     })
 }
 
 req.user = user 
 next ()
   } catch (error) {
    return res.status(401).json(
        {
            success:false,
            message:"invalid access token"
        }
    )
    
   }
    
}