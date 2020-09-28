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
    
}, {
    timestamps: true
});

const Course = mongoose.model('Course', courseSchema);
module.exports = Course;