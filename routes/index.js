const express=require('express');
const Router=express.Router();
const passport=require('passport');
const firstTimeCheck=require('../controllers/firstTimeController');
Router.get('/',passport.checkAuthentication,function(req,res){return res.redirect('/content/announcements')});
Router.use('/content',passport.checkAuthentication,firstTimeCheck.checkFirstTime,require('./content'));

Router.use('/users',require('./users'));
module.exports=Router;