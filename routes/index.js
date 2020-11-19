const express=require('express');
const Router=express.Router();
const passport=require('passport');
const firstTimeCheck=require('../controllers/firstTimeController');
Router.get('/',passport.checkAuthentication,function(req,res){
    if(res.locals.user.isSuperUser){
        return res.redirect('/superuser');
    }
    else{
        return res.redirect('/content/announcements');
    }
});
Router.use('/content',passport.checkAuthentication,passport.checkNotSuperUser,firstTimeCheck.checkFirstTime,require('./content'));

Router.use('/users',require('./users'));
Router.use('/superuser',passport.checkSuperUser,require('./superuser'));
module.exports=Router;