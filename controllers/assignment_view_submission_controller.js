const path = require('path');
const fs = require('fs');
const AssignmentSubmissionModel = require('../models/assignment_submission');
const AssignmentModel = require('../models/assignment');
const CourseModel = require('../models/course');
const ClassModel = require('../models/class');
const GroupModel = require('../models/group');
const SubGroupModel = require('../models/sub-group');
const FileModel = require('../models/file');


module.exports.viewSubmission = async function (req, res) {
    try {
        let assignment = await AssignmentModel.findById(req.params.assignmentId)
            .populate('classSub.course');
        let submissionList = await AssignmentSubmissionModel.find({
            assignmentId: req.params.assignmentId,
            turnedIn: true
        }).populate('postedBy');
        return res.render('assignment_view_submission', {
            title: "Submission",
            assignment: assignment,
            submissionList: submissionList
        })

    }
    catch (err) {
        console.log("Error while getting assignment submissions :", err);
    }
}
module.exports.viewSubmissionGrade = async function (req, res) {
    try {
        if (req.xhr) {
            // console.log("Grade Request");
            let submission = await AssignmentSubmissionModel.findById(req.body.id);
            // console.log(submission);
            submission.marksAlloted = req.body.marks;
            submission.comment = req.body.comment;
            submission.save();

        }
    }
    catch (err) {
        console.log(err);
        res.status(400);
    }
}