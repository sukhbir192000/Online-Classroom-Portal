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
        type:Boolean,
        default: false
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
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
    dept:{
        type:String
    },
    contact:{
        type:String
    },
    dob:{
        type:String
    },
    classSub: [classSubSchema]
}, {
    timestamps: true
});

const User = mongoose.model('User', userSchema);
module.exports = User;