const mongoose = require('mongoose');
// const multer=require('multer');
const path = require('path');
const file_path=path.join('/uploads/assignment/');
const classSubSchema = require('./class-sub');

const assignmentSubmissionSchema = new mongoose.Schema({
    turnedIn: {
        type: Boolean,
        default: false
    },
    submittedAt: {
        type:Date
    },
    postedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    files:[
        {
            url:{
                type:String
            },
            name:{
                type:String
            }
            
        }
    ],
    assignmentId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Assignment',
        required:true
    },
    marksAlloted:{
        type:Number
    },
    comment:{
        type:String
    }
}, {
    timestamps: true
});

assignmentSubmissionSchema.statics.filePath=file_path;
const assignmentSubmissionModel = mongoose.model('Assignment Submission', assignmentSubmissionSchema);
module.exports = assignmentSubmissionModel;