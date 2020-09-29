const mongoose = require('mongoose');
const path = require('path');
const classSubSchema = require('./class-sub');

const assignmentSchema = new mongoose.Schema({
    title: {
        type: String
    },
    description: {
        type: String
    },
    deadline: {
        type: Date,
        required: true
    },
    classSub: [classSubSchema]
}, {
    timestamps: true
});

const Assignment = mongoose.model('Assignment', assignmentSchema);
module.exports = Assignment;