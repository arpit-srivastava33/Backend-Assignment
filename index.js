// require('dotenv').config();
// const express = require('express')
import 'dotenv/config'
import express from 'express';
const app = express()
// const dbConnect = require('./db');
import dbConnect from './db.js'
import route from './routes/productRoute.js';
dbConnect();
app.use(express.json());
app.use("/api", route);



const server = app.listen(process.env.PORT, () => {
    console.log(`Server is up and running! at ${process.env.PORT}`);
})

export default server