const mongoose = require('mongoose');
const classSubSchema = require('./class-sub');

const timetableSchema = new mongoose.Schema({
    startingTime: {
        type: Number
    },
    date:{
        type: Date
    },
    duration:{
        type: Number
    },
    classSub: classSubSchema,
    teacher: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, {
    timestamps: true
});

const Timetable = mongoose.model('Timetable', timetableSchema);
module.exports = Timetable;