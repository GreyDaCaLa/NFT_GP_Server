// require('dotenv').config()
import * as dotenv from "dotenv"
dotenv.config()
// const express = require("express")
import express from "express"
import morgan from "morgan"
// const mongoose = require('mongoose')
import mongoose from "mongoose"
import router from "./routes/index.js"
import cors from 'cors';
import http from 'http';

const app = express()

app.use(cors());

const uri = process.env.DB_GAME_OBJS_URL;
mongoose.connect(uri, { useNewUrlParser: true})
const db = mongoose.connection
db.on('error',(error)=>console.error(error))
db.once('open', ()=>console.log("Connected to Mongo Database"))

app.use(express.json())
app.use(morgan("dev"))
app.use(router)

const httpserver = http.createServer(app)

const PORT = process.env.PORT || 5000

// app.listen(PORT, ()=>{
//     console.log("server has started listening on "+PORT+"..........")
// })

httpserver.listen(PORT, () => {
    console.log("server has started listening on "+PORT+"..........")
});














