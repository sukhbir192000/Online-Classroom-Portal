const express=require('express');
const Router=express.Router();
const passport=require('../config/passport-google-oauth2-strategy');
const contentController=require('../controllers/announcement_controller');
Router.get('/',contentController.announcement);
//change to isAdmin
Router.post('/create',passport.checkAuthentication,contentController.announcementCreate);

module.exports = Router;