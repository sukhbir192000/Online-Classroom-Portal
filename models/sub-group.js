const mongoose = require('mongoose');
const path = require('path');

const subGroupSchema = new mongoose.Schema({
    subGroupNumber: {
        type: Number,
        required: true
    },
    class: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    student: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }]
});

const SubGroup = mongoose.model('SubGroup', subGroupSchema);
module.exports = SubGroup;