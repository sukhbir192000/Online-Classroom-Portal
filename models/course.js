const mongoose = require('mongoose');
const path = require('path');

const courseSchema = new mongoose.Schema({
    code: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    credits: {
        type: Number,
        required: true
    },
    students: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    sem: {
        type: Number,
        required: true,
        min: 1,
        max: 8
    }
}, {
    timestamps: true
});

const Course = mongoose.model('Course', courseSchema);
module.exports = Course;