import {User} from "../models/user.models.js"
import { uploadOnCloudinary } from "../utils/cloudinary.js"

const registerUser = async (req,res)=>{

     const {username, email,password }=req.body
     if (username===""){
        res.status(400).json({
            success:false,
            message:"username is required "
        })
        
     }
     if (email===""){
        res.status(400).json({
            success:false,
            message:"email is required"
        })
        
     }
     if (password===""){
        res.status(400).json({
            success:false,
            message:"password is required"
        })
        
     }
    
  const existedUser = await User.findOne(
   { $or:[{username},{email}]}
   )

   if(existedUser){

    res.status(200).json({
      message: "user already existed with this email and name"  
    })
    
}
const avatarLocalPath = req.files?.avatar?.[0]?.path;

if (!avatarLocalPath){
    res.status().json({
        message:"no avatar file "
    })
}

const avatar = uploadOnCloudinary (avatarLocalPath)
   
const user = await User.create({
    username ,
    email,
    password,
    avatar : avatar.url
})

const createdUser = User.findById(user._id).select(
    "-password -refreshTokens"
)

if (!createdUser)
    res.status(500 ).json({
message:"something went wrong while registering"
})

return res.status(200).json({
    createdUser,
    message:    "user registerd success"
})


}

export {
    registerUser,
}
