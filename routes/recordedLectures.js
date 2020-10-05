const express=require('express');
const Router=express.Router();
const passport=require('../config/passport-google-oauth2-strategy');
const contentController=require('../controllers/recorded_lectures_controller');
Router.get('/',contentController.recordedLecture);
//change to isAdmin
Router.post('/create',passport.checkAdmin,contentController.recordedLectureCreate);
// Router.get('/delete/:id',passport.checkAdmin,contentController.recordedLectureDelete);
// Router.post('/update/:recordedLectureId',passport.checkAdmin,contentController.recordedLectureUpdate);
module.exports = Router;