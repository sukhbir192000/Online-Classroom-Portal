const express=require('express');
const Router=express.Router();
const passport=require('../config/passport-google-oauth2-strategy');
const contentController=require('../controllers/assignment_controller');
Router.get('/',contentController.assignments);
//change to isAdmin
// Router.post('/announcements/create',passport.checkAuthentication,contentController.announcementCreate);

module.exports = Router;