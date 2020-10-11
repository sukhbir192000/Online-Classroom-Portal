const mongoose = require('mongoose');

const replySchema = new mongoose.Schema({
    content: {
        type: String
    },
    postedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    replies: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Reply'
    }]
}, {
    timestamps: true
});

const Reply = mongoose.model('Reply', replySchema);
module.exports = Reply;