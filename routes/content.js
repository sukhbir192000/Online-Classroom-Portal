const express=require('express');
const Router=express.Router();
const passport=require('../config/passport-google-oauth2-strategy');
const contentController=require('../controllers/content');
Router.get('/announcements',contentController.announcement);
//change to isAdmin
Router.post('/announcements/create',passport.checkAuthentication,contentController.announcementCreate);
Router.get('/studymaterial',contentController.studyMaterial);
Router.get('/recordedlectures',contentController.recordedLectures);
Router.get('/assignments',contentController.assignments);
Router.get('/timetable',contentController.timeTable);
Router.get('/doubts',contentController.doubts);
module.exports=Router;