import express from "express";
import cors from "cors";
import AuthRoutes from "./Routes/Auth.js";
import bodyParser from "body-parser";
import mongoose from 'mongoose';

const app = express();
app.use(cors())


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/demo1')
app.use(AuthRoutes)

app.listen(5000, () => {
    console.log('server start');
})