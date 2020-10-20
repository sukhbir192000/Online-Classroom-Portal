const express=require('express');
const Router=express.Router();
const passport=require('../config/passport-google-oauth2-strategy');
const contentController=require('../controllers/timetable_controller');
Router.get('/',contentController.timetable);
Router.post('/slots',contentController.availableSlots);
//change to isAdmin
// Router.post('/create',passport.checkAdmin,contentController.announcementCreate);
// Router.get('/delete/:id',passport.checkAdmin,contentController.announcementDelete);
// Router.get('/form/subjects',passport.checkAdmin,contentController.getSubjects);
// Router.post('/form/branches',passport.checkAdmin,contentController.getBranches);
// Router.post('/form/groups',passport.checkAdmin,contentController.getGroups);
// Router.post('/form/subGroups',passport.checkAdmin,contentController.getSubGroups);
// Router.post('/update/:announcementId',passport.checkAdmin,contentController.announcementUpdate);
module.exports = Router;