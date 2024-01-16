import express from "express";
import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

const app = express();
mongoose.connect(process.env.MONGO_URI).then((data)=>{
    console.log(`mongodb connected successfully ${data.connection.host}`)
}).catch((err)=>{
    console.log(err)
})

app.listen(3000, ()=>{
    console.log("server is listening on 3000")
})