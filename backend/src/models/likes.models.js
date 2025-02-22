import mongoose, { Schema } from "mongoose";

const likesSchema= new mongoose.Schema({
  
    likedby:{
        type:Schema.Types.ObjectId,
        ref:"User"
    },
    likedOn:{
        type:Schema.Types.ObjectId,
        ref : "Post"
    }

},{timestamps:true })

export const Likes = mongoose.model("likes",likesSchema)