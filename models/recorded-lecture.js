const mongoose = require('mongoose');
const classSubSchema = require('./class-sub');

const recordedLectureSchema = new mongoose.Schema({
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
    }
}, {
    timestamps: true
});

const RecordedLecture = mongoose.model('Recorded Lecture', recordedLectureSchema);
module.exports = RecordedLecture;