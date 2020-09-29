const mongoose = require('mongoose');
const path = require('path');
const classSubSchema = require('./class-sub');

const announcementSchema = new mongoose.Schema({
    title: {
        type: String
    },
    content: {
        type: String
    },
    classSub: [classSubSchema]
}, {
    timestamps: true
});

const Announcement = mongoose.model('Announcement', announcementSchema);
module.exports = Announcement;