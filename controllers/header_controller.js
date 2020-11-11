const CourseModel=require('../models/course');
const TimetableModel=require('../models/timetable');
module.exports.getClass=async function(req,res){
    let date=new Date(Date.now());
    let currentHour=date.getHours();
    date.setHours(1);
    date.setMinutes(0);
    date.setSeconds(0);
    date.setMilliseconds(0);
    let user=res.locals.user;
    let classCurrent
    if(user.isAdmin){
        classCurrent=await TimetableModel.findOne({
            teacher:user._id,
            date:date,
            startingTime:currentHour
        }).populate('classSub.course');
        console.log('currentClass:', classCurrent);
    }
    else{
        classCurrent=await TimetableModel.findOne({
            $and: [
                {
                    "date": date,
                    startingTime:currentHour,
                    "classSub.course":{$in:user.courses},
                    "classSub.class":user.class
                },
                {$or: [
                    {"classSub.group": undefined},
                    {"classSub.group": user.group}
                ]},
                {$or: [
                    {"classSub.subGroup": undefined},
                    {"classSub.subGroup": user.subGroup}
                ]}
            ]
        }).populate('classSub.course');
    }
    if(req.xhr){
        let className="No";
        if(classCurrent){
            
            className=classCurrent.classSub.course.name;
            console.log(className);
        }
        
        return res.status(200).json({
            className:className
        })
    }
}