import express from "express";
import connectDB from "./db/index.js";
import dotenv from "dotenv";


// const app = express();
import { app } from "./app.js";



dotenv.config({
    path: './env'
})


// console.log(process.env.MONGODB_URL)
connectDB()
    .then(() => {
        app.listen(process.env.PORT || 8000, () => {
            console.log(`server started at PORT" ${process.env.PORT}`);
            console.log('MONGODB_URL:', process.env.MONGODB_URL);
        })
        app.get('/health-check', (req, res) => {
            res.json({ msg: "Server is runnning" })
        })
    }).catch((err) => {
        console.log("moongo connection fauled ", err);

    })
