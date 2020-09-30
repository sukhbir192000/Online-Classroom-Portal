const mongoose = require('mongoose');
const path = require('path');

const groupSchema = new mongoose.Schema({
    groupNumber: {
        type: Number,
        required: true
    },
    class: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Class'
    },
    student: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }]
});

const Group = mongoose.model('Group', groupSchema);
module.exports = Group;