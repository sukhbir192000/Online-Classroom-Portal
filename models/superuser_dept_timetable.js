const mongoose = require('mongoose');


const superUserTimetableSchema = new mongoose.Schema({
    timeTableData: {
        type: Array
    },
    class:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Class"
    },
    startDate: {
        type: Date
    },
    endDate:{
        type: Date
    }
}, {
    timestamps: true
});

const SuperUserTimeTable = mongoose.model('SuperUserTimeTable', superUserTimetableSchema);
module.exports = SuperUserTimeTable;