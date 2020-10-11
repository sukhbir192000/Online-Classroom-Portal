const mongoose = require('mongoose');
const classSubSchema = require('./class-sub');

const doubtSchema = new mongoose.Schema({
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
    },
    isPrivate: {
        type: Boolean,
        default: false
    },
    replies: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Reply'
    }]
}, {
    timestamps: true
});

const Doubt = mongoose.model('Doubt', doubtSchema);
module.exports = Doubt;