import express from "express";
import connectDB from "./db/index.js";
import dotenv from "dotenv";
const app = express();
dotenv.config({
    path: './env'
})



connectDB()
.then(()=>{
    app.listen(process.env.PORT||8000,()=>{
        console.log(`server started at PORT" ${process.env.PORT}`);
        console.log('MONGODB_URL:', process.env.MONGODB_URL); 
    })
}).catch((err)=>{
    console.log("moongo connection fauled ",err);
    
})
