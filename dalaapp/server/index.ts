//This file acts as the entry point for your backend application.
// It sets up the Express server, establishes database connections,
// and defines middleware configurations.
const express = require('express');
import { fetchDataRoute } from "./routes/fetch.router";
const cors=require('cors');
const mongoose = require("mongoose");
const app=express();
app.use(express.static('assets'));
require('dotenv').config();

app.use(express.json());


// Mount the `/todos` resource
app.use("", fetchDataRoute);

export default app;




console.log(process.env.MONGO_URL);
mongoose.connect(process.env.MONGO_URL);









app.listen(4000);