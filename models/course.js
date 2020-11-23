const mongoose = require('mongoose');
const path = require('path');

const courseSchema = new mongoose.Schema({
    code: {
        type: String,
        required: true,
        unique: true
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
    teachers:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    }],
    isActive: {
        type: Boolean
    },
    dept:{
        type:String
    }
}, {
    timestamps: true
});

const Course = mongoose.model('Course', courseSchema);
module.exports = Course;