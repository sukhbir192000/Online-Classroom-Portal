const express=require('express');
const Router=express.Router();
const passport=require('passport');
Router.get('/',passport.checkAuthentication,function(req,res){return res.redirect('/content/assignments')});
Router.use('/content',passport.checkAuthentication,require('./content'));
Router.use('/users',require('./users'));
module.exports=Router;