const express=require('express');
const multer=require('multer');
const path = require('path');

const Router=express.Router();
const passport=require('../config/passport-google-oauth2-strategy');
const contentController=require('../controllers/study_material_controller');

let storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname,'..','/uploads'));
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now());
    }
});
var upload = multer({
    storage:storage
});

Router.get('/',contentController.studyMaterial);
//change to isAdmin
Router.post('/create',passport.checkAdmin, upload.array('files'),contentController.studyMaterialCreate);
// // Router.get('/edit/:',passport.checkAuthentication,contentController.announcementEdit);
// Router.get('/delete/:id',passport.checkAdmin,contentController.announcementDelete);
// Router.get('/form/subjects',passport.checkAdmin,contentController.getSubjects);
// Router.post('/form/branches',passport.checkAdmin,contentController.getBranches);
// Router.post('/form/groups',passport.checkAdmin,contentController.getGroups);
// Router.post('/form/subGroups',passport.checkAdmin,contentController.getSubGroups);
// Router.post('/update/:announcementId',passport.checkAdmin,contentController.announcementUpdate);
module.exports = Router;