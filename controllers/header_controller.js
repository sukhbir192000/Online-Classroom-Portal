const CourseModel = require('../models/course');
const TimetableModel = require('../models/timetable');
const LinkModel = require('../models/link');
module.exports.getClass = async function (req, res) {
    let date = new Date(Date.now());
    let currentHour = date.getHours();
    date.setHours(1);
    date.setMinutes(0);
    date.setSeconds(0);
    date.setMilliseconds(0);
    let user = res.locals.user;
    let classCurrent
    if (user.isAdmin) {
        classCurrent = await TimetableModel.findOne({
            $and: [{
                teacher: user._id,
                date: date
            },{
                $expr: {$lte: ["$startingTime", currentHour]}
            },{
                $expr: {$gt: ["$startingTime", {$subtract: [currentHour, "$duration"]}]}
            }]
        }).populate('classSub.course');
    }
    else {
        classCurrent = await TimetableModel.findOne({
            $and: [
                {
                    "date": date,
                    "classSub.course": { $in: user.courses },
                    "classSub.class": user.class
                },
                {
                    $or: [
                        { "classSub.group": undefined },
                        { "classSub.group": user.group }
                    ]
                },
                {
                    $or: [
                        { "classSub.subGroup": undefined },
                        { "classSub.subGroup": user.subGroup }
                    ]
                },
                {
                    $expr: {$lte: ["$startingTime", currentHour]}
                },
                {
                    $expr: {$gt: ["$startingTime", {$subtract: [currentHour, "$duration"]}]}
                }
            ]
        }).populate('classSub.course');
    }
    if (req.xhr) {
        let className = "No", classLink = "";
        if (classCurrent) {
            classLink = classCurrent.classSub.link;
            className = classCurrent.classSub.course.name;
        }

        return res.status(200).json({
            className: className,
            classLink: classLink
        })
    }
}

module.exports.getLink = async function (req, res) {
    try {
        let req_link = await LinkModel.findById(req.params.linkId);
        return res.status(200).json({
            link: req_link.link
        })
    }
    catch (err) {
        console.log(err);
        return res.status(400);
    }
}
