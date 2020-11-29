const mongoose = require('mongoose');
const classSubSchema = require('./class-sub');

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
        teacher: {
            type:mongoose.Schema.Types.ObjectId,
            ref:'User'
        },
        classSub: classSubSchema,
        classType: String
    }],
    isActive: {
        type: Boolean
    },
    dept:{
        type:String
    },
    offered_to: [{
        type: String
    }]
}, {
    timestamps: true
});

const Course = mongoose.model('Course', courseSchema);
module.exports = Course;