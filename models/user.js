const mongoose = require('mongoose');
const path = require('path');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
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
        type: Number
    },
    subgroup: {
        type: Number
    },
    courses: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course'
    }],
    class_sub: [
        new mongoose.Schema({
            course: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Course'
            },
            class: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Class'
            },
            group: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Group'
            },
            subgroup: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'SubGroup'
            }
        })
    ]
}, {
    timestamps: true
});

const User = mongoose.model('User', userSchema);
module.exports = User;