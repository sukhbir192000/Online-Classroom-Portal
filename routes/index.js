const express=require('express');
const Router=express.Router();
Router.use('/content',require('./content'));
Router.use('/users',require('./users'));
module.exports=Router;