// Require Files
const express=require('express');
// const mongoose=require('mongoose');
const app=express();
const port=8000;

// routes
app.use('/',require('./routes'));


// Listen to server on port
app.listen(port,function(err){
    if(err){
        console.log(`Error in starting server ${err}`);
        return;
    }
    console.log("Server started successfully");
});