const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
    url: {
        type: String,
        required: true
    },
    timesUsed: {
        type: Number,
        required: true
    }
}, {
    timestamps: true
});

const File = mongoose.model('File', fileSchema);
module.exports = File;