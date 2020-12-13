const mongoose = require('mongoose');
const path = require('path');

module.exports = new mongoose.Schema({
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
    subGroup: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'SubGroup'
    },
    link:{
        type:String
    }
});