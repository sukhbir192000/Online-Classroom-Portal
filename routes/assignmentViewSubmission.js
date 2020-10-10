const express=require('express');
const path = require('path');

const Router=express.Router();
const passport=require('../config/passport-google-oauth2-strategy');
const contentController=require('../controllers/assignment_view_submission_controller');

Router.get('/:assignmentId',contentController.viewSubmission);

//ajax calls
Router.post('/:assignmentId/grade/:submissionId',contentController.viewSubmissionGrade);
// Router.post('/:assignmentId/update',contentController.viewSubmissionUpdate);
// Router.get('/:assignmentId/submit',contentController.assignmentSubmissionSubmit);
// Router.post('/:assignmentId/delete',contentController.assignmentSubmissionDelete);
module.exports = Router;
