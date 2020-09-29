const mongoose = require('mongoose');
const path = require('path');
const classSubSchema = require('./class-sub');

const recordedLectureSchema = new mongoose.Schema({
    title: {
        type: String
    },
    content: {
        type: String
    },
    classSub: [classSubSchema]
}, {
    timestamps: true
});

const RecordedLecture = mongoose.model('Recorded Lecture', recordedLectureSchema);
module.exports = RecordedLecture;