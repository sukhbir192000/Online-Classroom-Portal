const mongoose = require('mongoose');
const classSubSchema = require('./class-sub');

const announcementSchema = new mongoose.Schema({
    title: {
        type: String
    },
    content: {
        type: String
    },
    classSub: classSubSchema,
    postedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, {
    timestamps: true
});

const Announcement = mongoose.model('Announcement', announcementSchema);
module.exports = Announcement;