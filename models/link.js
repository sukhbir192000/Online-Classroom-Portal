const mongoose = require('mongoose');

const linkSchema = new mongoose.Schema({
    link: {
        type: String
    }
}, {
    timestamps: true
});

const Link = mongoose.model('Link', linkSchema);
module.exports = Link;