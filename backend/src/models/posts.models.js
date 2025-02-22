import mongoose, { Schema } from "mongoose";

const postSchema = new mongoose.Schema({
    title: {
        type: String
    },
    authorId: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    content:{
        type: String,
    }



}, { timestamps: true })

export const Post = mongoose.model("Post", postSchema)