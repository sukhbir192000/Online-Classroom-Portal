const TimetableModel=require('../models/timetable');
const CourseModel=require('../models/course');
const ClassModel=require('../models/class');
const GroupModel=require('../models/group');
const SubGroupModel=require('../models/sub-group');

module.exports.timetable = async function(req, res) {
    try{
        var user = res.locals.user;
        var startingDate = new Date(Date.now());
        if(date.getDay()==0){
            startingDate.setDate(startingDate.getDate() - startingDate.getDay() - 6);
        }
        else{
            startingDate.setDate(startingDate.getDate() - startingDate.getDay() + 1);
        }
        startingDate.setHours(1);
        startingDate.setMinutes(0);
        startingDate.setSeconds(0);
        startingDate.setMilliseconds(0);
        timetableItems = [];
        if(!user.isAdmin){
            for(let i=0;i<7;i++){
                let date = startingDate;
                date.setDate(startingDate.getDate() + i);
                let items = await TimetableModel.find({
                    $and: [
                        {
                            "date": date,
                            "classSub.course":course,
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
                }).sort("startingTime");
                timetableItems.push(items);
            }
        }
        else{
            // Add filters later here
            for(let i=0;i<7;i++){
                let date = startingDate;
                date.setDate(startingDate.getDate() + i);
                let items = await TimetableModel.find({
                    "date": date,
                    "teacher": user._id
                }).sort("startingTime");
                timetableItems.push(items);
            }
        }
    }
    catch(err){
        console.log("Error: ", err);
    }
}