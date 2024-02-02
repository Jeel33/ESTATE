import express from "express";
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import userRoute from "./routes/user.route.js";
import authRoute from "./routes/auth.route.js";
import cookieParser from "cookie-parser";

dotenv.config()


mongoose.connect(process.env.MONGO_URI).then((data)=>{
    console.log(`mongodb connected successfully ${data.connection.host}`)
}).catch((err)=>{
    console.log(err)
})

const app = express();
app.use(express.json())
app.use(cookieParser());

app.use('/api/user/',userRoute)
app.use('/api/auth/',authRoute)

app.use((err,req,res,next)=>{
    const statusCode = err.statusCode || 500;
    const message = err.message || "internal server error"
    return res.status(statusCode).json({
        succes:false,
        statusCode,
        message
    })
})

app.listen(3000, ()=>{
    console.log("server is listening on 3000")
})