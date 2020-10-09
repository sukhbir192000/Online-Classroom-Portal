const express=require('express');
const Router=express.Router();
const passport=require('../config/passport-google-oauth2-strategy');
const contentController=require('../controllers/content');
Router.use('/announcements',require('./announcements'));
Router.use('/studymaterial',require('./studyMaterial'));
Router.use('/recordedlectures',require('./recordedLectures'));
Router.use('/assignments',require('./assignments'));
Router.use('/timetable',require('./timetable'));
Router.use('/assignmentsubmissions',require('./assignmentSubmission'));
Router.use('/viewsubmissions',passport.checkAdmin,require('./assignmentViewSubmission'));
Router.get('/doubts',contentController.doubts);
module.exports=Router;