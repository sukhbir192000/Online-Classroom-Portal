const express=require('express');
const Router=express.Router();
const passport=require('../config/passport-google-oauth2-strategy');
const contentController=require('../controllers/announcement_controller');
Router.get('/',contentController.announcement);
//change to isAdmin
Router.post('/create',passport.checkAdmin,contentController.announcementCreate);
// Router.get('/edit/:',passport.checkAuthentication,contentController.announcementEdit);
Router.get('/delete/:id',passport.checkAdmin,contentController.announcementDelete);
Router.get('/form/subjects',passport.checkAdmin,contentController.getSubjects);
module.exports = Router;