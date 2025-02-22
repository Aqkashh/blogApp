import mongoose, { Schema } from "mongoose";

const commentsSchema = new mongoose.Schema({

    commentBy: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    commentOn: {
        type: Schema.Types.ObjectId,
        ref: "Post"
    },
    comment: {
        type: String,
        required: true
    }

}, { timestamps: true })

export const Comment = mongoose.model("Comments", commentsSchema)