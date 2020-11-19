const mongoose = require('mongoose');
const path = require('path');
const classSubSchema = require('./class-sub');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    isSuperUser:{
        type:Boolean
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    sid: {
        type: Number
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    class: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Class'
    },
    group: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Group'
    },
    subGroup: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'SubGroup'
    },
    courses: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course'
    }],
    classSub: [classSubSchema]
}, {
    timestamps: true
});

const User = mongoose.model('User', userSchema);
module.exports = User;