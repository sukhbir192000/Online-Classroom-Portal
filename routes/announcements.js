const express=require('express');
const Router=express.Router();
const passport=require('../config/passport-google-oauth2-strategy');
const contentController=require('../controllers/announcementController');
Router.get('/announcements',contentController.announcement);
//change to isAdmin
Router.post('/announcements/create',passport.checkAuthentication,contentController.announcementCreate);