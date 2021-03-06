const express=require('express');
const multer=require('multer');
const path = require('path');

const Router=express.Router();
const passport=require('../config/passport-google-oauth2-strategy');
const contentController=require('../controllers/assignment_controller');

let storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname,'..','/uploads/assignment'));
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() + file.originalname);
    }
});
var upload = multer({
    storage:storage
});
var fields = [
  {name: "file0"},{name: "file1"},{name: "file2"},{name: "file3"},{name: "file4"},{name: "file5"},{name: "file6"},{name: "file7"},{name: "file8"},{name: "file9"},
]

Router.get('/',contentController.assignment);
//change to isAdmin
Router.post('/create',passport.checkAdmin, upload.fields(fields),contentController.assignmentCreate);

Router.get('/delete/:id',passport.checkAdmin,contentController.assignmentDelete);
Router.post('/update/:assignmentId',passport.checkAdmin,contentController.assignmentUpdate);
module.exports = Router;