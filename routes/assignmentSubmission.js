const express=require('express');
const multer=require('multer');
const path = require('path');

const Router=express.Router();
const passport=require('../config/passport-google-oauth2-strategy');
const contentController=require('../controllers/assignment_submission_controller');

let storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname,'..','/uploads/assignment'));
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});
var upload = multer({
    storage:storage
});
// var fields = [
//   {name: "file0"},{name: "file1"},{name: "file2"},{name: "file3"},{name: "file4"},{name: "file5"},{name: "file6"},{name: "file7"},{name: "file8"},{name: "file9"},
// ]
Router.get('/:assignmentId',contentController.assignmentSubmission);
//ajax calls
Router.post('/:assignmentId/addfile', upload.array('files'),contentController.assignmentSubmissionCreate);
Router.post('/:assignmentId/update',contentController.assignmentSubmissionUpdate);
Router.get('/:assignmentId/submit',contentController.assignmentSubmissionSubmit);
Router.post('/:assignmentId/delete',contentController.assignmentSubmissionDelete);
module.exports = Router;