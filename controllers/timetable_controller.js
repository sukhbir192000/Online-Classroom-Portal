const TimetableModel=require('../models/timetable');
const CourseModel=require('../models/course');
const ClassModel=require('../models/class');
const GroupModel=require('../models/group');
const SubGroupModel=require('../models/sub-group');
const { render } = require('ejs');
const Timetable = require('../models/timetable');

module.exports.timetable = async function(req, res) {
    try{
        // let customDate = new Date(Date.now());
        // customDate.setHours(1);
        // customDate.setMinutes(0);
        // customDate.setSeconds(0);
        // customDate.setMilliseconds(0);
        // await TimetableModel.create({
        //     startingTime: 11,
        //     date: customDate,
        //     duration: 60,
        //     classSub: {
        //         "course" : "5f7474e8ed898e4664816678",
        //         "class" : "5f7439c114b9781df80b3c4f",
        //         "group" : "5f746dde33b7d3478095bb02"
        //     },
        //     teacher: res.locals.user.id
        // })
        
        var user = res.locals.user;
        var startingDate = new Date(Date.now());
        if(startingDate.getDay()==0){
            startingDate.setDate(startingDate.getDate() - startingDate.getDay() - 6);
        }
        else{
            startingDate.setDate(startingDate.getDate() - startingDate.getDay() + 1);
        }
        if(req.xhr){
            startingDate.setDate(startingDate.getDate() + (parseInt(req.query.offset)*7));
        }
        startingDate.setHours(1);
        startingDate.setMinutes(0);
        startingDate.setSeconds(0);
        startingDate.setMilliseconds(0);
        timetableItems = [];
        if(!user.isAdmin){
            for(let i=0;i<7;i++){
                let date = new Date(startingDate);
                date.setDate(startingDate.getDate() + i);
                let items = await TimetableModel.find({
                    $and: [
                        {
                            "date": date,
                            "classSub.course":{$in:user.courses},
                            "classSub.class":user.class
                        },
                        {
                            $or: [
                                {"classSub.group": undefined},
                                {
                                    $and: [
                                        {"classSub.group": user.group},
                                        {$or: [
                                            {"classSub.subGroup": undefined},
                                            {"classSub.subGroup": user.subGroup}
                                        ]}
                                    ]
                                }
                            ]
                        }
                    ]
                }).populate('classSub.course').sort("startingTime");
                timetableItems.push(items);
            }
        }
        else{
            // Add filters later here
            for(let i=0;i<7;i++){
                let date = new Date(startingDate);
                date.setDate(date.getDate() + i);
                let items = await TimetableModel.find({
                    "date": date,
                    "teacher": user._id
                }).populate('classSub.course').sort("startingTime");
                timetableItems.push(items);
            }
        }
        for(let i=0;i<7;i++){
            let dayItems = timetableItems[i];
            let newDayItems = [];
            for(let items of dayItems){
                newDayItems[items.startingTime] = items
            }
            timetableItems[i] = newDayItems;
        }
        if(req.xhr){
            return res.status(200).json({
                timetableItems: timetableItems,
                startingDate: startingDate
            })
        }
        else{
            return res.render('time_table',{
                timetableItems: timetableItems,
                title: "Timetable",
                startingDate: startingDate
            });
        }
    }
    catch(err){
        console.log("Error: ", err);
    }
}