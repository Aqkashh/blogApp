import mongoose from "mongoose";
const { Schema } = mongoose;


const userSchema = new mongoose.Schema({

    username: {
        type: String,
        required: true,
        lowercase: true,
        unique: true,
        index: true
    },
    eamil: {
        type: String,
        required: true,
        lowercase: true,
        unique: true,
        index: true
    },
    password: {
        type: String,
        required: [true, 'password is required']
    },
    avatar: {
        type: String,
        required: true
    }


}, { timestamps: true })


export const User = mongoose.model("User", userSchema)