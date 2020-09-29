const mongoose = require('mongoose');
const path = require('path');

const classSchema = new mongoose.Schema({
    stream: {
        type: String,
        required: true
    },
    passingOutYear: {
        type: Number,
        required: true
    },
    student: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    totalGroups: {
        type: Number,
        required: true
    },
    totalSubGroups: {
        type: Number,
        required: true
    }
});

const Class = mongoose.model('Class', classSchema);
module.exports = Class;