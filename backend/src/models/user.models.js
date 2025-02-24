import mongoose from "mongoose";
const { Schema } = mongoose;
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';


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
    }, refreshToken: {
        type: String
    }


}, { timestamps: true })

//encrypted the password 
userSchema.pre('save', async function (next) {
    if (this.isModified.password) {
        this.password = await bcrypt.hash(this.password, 10)
    }
    else {
        return next();
    }
    next()
})

userSchema.methods.isPasswordcorrect = async function (password) {
    return await bcrypt.compare(password, this.password)
}

userSchema.methods.genrateAccessToken = function () {
    return jwt.sign({
        _id: this.id,
        username: this.username,
        email: this.email,
        avatar: this.avatar
    },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}
userSchema.methods.genrateRefreshToken = function () {
    return jwt.sign({
        _id: this.id,
       
    },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}

export const User = mongoose.model("User", userSchema)