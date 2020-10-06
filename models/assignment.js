const mongoose = require('mongoose');
// const multer=require('multer');
const path = require('path');
const file_path=path.join('/uploads/assignment/');
const classSubSchema = require('./class-sub');

const assignmentSchema = new mongoose.Schema({
    title: {
        type: String
    },
    content: {
        type: String
    },
    deadline:{
        type:Date
    },
    classSub: classSubSchema,
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
    weightage:{
        type:Number
    }
}, {
    timestamps: true
});

assignmentSchema.statics.filePath=file_path;
const assignmentModel = mongoose.model('Assignment', assignmentSchema);
module.exports = assignmentModel;