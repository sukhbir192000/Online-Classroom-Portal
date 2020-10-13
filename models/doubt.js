const mongoose = require('mongoose');
const classSubSchema = require('./class-sub');


// const multer=require('multer');
const path = require('path');
const file_path=path.join('/uploads/doubts/');
// const classSubSchema = require('./class-sub');

const doubtSchema = new mongoose.Schema({
    title: {
        type: String
    },
    content: {
        type: String
    },
    classSub: classSubSchema,
    postedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    postedFor:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    ],
    isPrivate: {
        type: Boolean,
        default: false
    },
    replies: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Reply'
    }]
}, {
    timestamps: true
});
doubtSchema.statics.filePath=file_path;
const Doubt = mongoose.model('Doubt', doubtSchema);
module.exports = Doubt;