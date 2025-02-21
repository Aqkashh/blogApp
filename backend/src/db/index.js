import mongoose from 'mongoose';
import { DB_NAME } from "../constants.js";

const connectDB=async ()=>{

    try {
        const connectionINstance =await  mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`)
      console.log(' MongoDB connected !! DB HOST ');
      console.log(connectionINstance.connection.host);
      
      
    }
    catch(err){
        console.log("connection error",err);
        process.exit(1)
    }
}

export default connectDB;