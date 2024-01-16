import express from "express";
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import Route from "./routes/user.route.js";

dotenv.config()


mongoose.connect(process.env.MONGO_URI).then((data)=>{
    console.log(`mongodb connected successfully ${data.connection.host}`)
}).catch((err)=>{
    console.log(err)
})

const app = express();

app.use('/api/user/',Route)

app.listen(3000, ()=>{
    console.log("server is listening on 3000")
})