const mongoose = require('mongoose');
const classSubSchema = require('./class-sub');

const quizSchema = new mongoose.Schema({
    title: {
        type: String
    },
    content: {
        type: String
    },
    classSub: classSubSchema,
    link: {
        type: String
    },
    totalMarks: {
        type: Number
    },
    dateTime: {
        type: Date
    },
    duration: {
        type: Number
    },
    postedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, {
    timestamps: true
});

const Quiz = mongoose.model('Quiz', quizSchema);
module.exports = Quiz;