import {v2 as cloudinary} from "cloudinary"
import fs from "fs"


cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET 
  });


  const uploadOnCloudinary = async (loacalfilepath)=>{
try {
    
        if (!loacalfilepath) return null;
        const responce = cloudinary.uploader.upload(loacalfilepath,{resource_type:"auto"})  
       return responce;
} catch (error) {
    fs.unlinkSync(loacalfilepath)
    console.log("cloudinary error");
    
    return null
    
}
   
  }
  export{ uploadOnCloudinary}
