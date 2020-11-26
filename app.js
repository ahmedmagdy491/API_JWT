const express = require('express');
const mongoose = require('mongoose');
require('dotenv/config');

//IMPORT AUHTENTICATION ROUTES
const authRout = require('./routes/auth');
const postRout = require('./routes/posts')

//APP
const app = express();

//MIDDLEWARES

app.use(express.json())
//ROUTES MIDDLEWARES
app.use('/api/user',authRout);
app.use('/api/post', postRout)


//CONNECT TO DB
mongoose.connect(process.env.DB_CONNECTION,{ 
    useUnifiedTopology: true,
    useNewUrlParser:true},
    ()=>{
        console.log("connected to database");
    })


//LISTEN TO PORT 4000
app.listen(process.env.PORT || 4000,
    ()=>{
        console.log("listening to port 4000")
    })