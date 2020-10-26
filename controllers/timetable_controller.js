const TimetableModel=require('../models/timetable');
const CourseModel=require('../models/course');
const ClassModel=require('../models/class');
const GroupModel=require('../models/group');
const SubGroupModel=require('../models/sub-group');
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
        //     duration: 1,
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
                        {$or: [
                            {"classSub.group": undefined},
                            {"classSub.group": user.group}
                        ]},
                        {$or: [
                            {"classSub.subGroup": undefined},
                            {"classSub.subGroup": user.subGroup}
                        ]}
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


        // ----------------------COURSE LIST OF TEACHER FOR ADD OPTION------------------------------
        if(user.isAdmin){
            var lecturePresent = false, labPresent = false;
            var courseList = []
            for(let classSubElement of user.classSub){
                let course = await CourseModel.findById(classSubElement.course);
                courseList.push(course);
                if(classSubElement.subGroup) labPresent = true;
                if(classSubElement.group || (!classSubElement.group && !classSubElement.subGroup)) lecturePresent = true;
            }
            let mymap = new Map();

            courseList = courseList.filter(el => {
                const val = mymap.get(el.name);
                if(val) {
                    if(el.id < val) {
                        mymap.delete(el.name);
                        mymap.set(el.name, el.id);
                        return true;
                    } else {
                        return false;
                    }
                } 
                mymap.set(el.name, el.id);
                return true;
            });
        }
        // ----------------------RETURN RESPONSE------------------------------
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
                startingDate: startingDate,
                courseList: courseList,
                lecturePresent: lecturePresent,
                labPresent: labPresent
            });
        }
    }
    catch(err){
        console.log("Error: ", err);
    }
}

module.exports.availableSlots=async function(req,res){
    try{
        if(req.xhr){
            let occupiedClasses
            let requiredDate=new Date(req.body.date);
            requiredDate.setHours(1);
            requiredDate.setMinutes(0);
            requiredDate.setSeconds(0);
            requiredDate.setMilliseconds(0);
            let user=res.locals.user;
            if(req.body.group=="All"){
                occupiedClasses=await Timetable.find({
                    $or:[{
                        "classSub.class":req.body.branch,
                        date:requiredDate
                    },{
                        teacher:user._id,
                        date:requiredDate
                    }]
                    
                }).sort('startingTime');
            }
            else if(req.body.subGroup=="All"){
                occupiedClasses=await Timetable.find({
                    $or:[{
                        $and:[
                            {
                                "classSub.class":req.body.branch,
                                date:requiredDate
                            },{
                                $or:[
                                    {
                                        "classSub.group":undefined
                                    },{
                                        "classSub.group":req.body.group
                                    }
                                ]
                            }
                        ]
                    },{
                        teacher:user._id,
                        date:requiredDate
                    }]
                }).sort('startingTime');
            }
            else{
                occupiedClasses=await Timetable.find({
                    $or:[{
                        $and: [
                            {
                                date: requiredDate,
                                "classSub.class":req.body.branch
                            },
                            {
                                $or: [
                                    {"classSub.group": undefined},
                                    {
                                        $and: [
                                            {"classSub.group": req.body.group},
                                            {$or: [
                                                {"classSub.subGroup": undefined},
                                                {"classSub.subGroup": req.body.subGroup}
                                            ]}
                                        ]
                                    }
                                ]
                            }
                        ]
                    },{
                        teacher:user._id,
                        date:requiredDate
                    }]
                    
                }).sort('startingTime');
            }
            let unoccupiedClasses=[];
            let j=0;
            let breakCondition=false;
            if(occupiedClasses.length==0) breakCondition = true;
            for(let i=8;i<17;i++){
                if(breakCondition){
                    if(17-i>=req.body.duration){
                        unoccupiedClasses.push(i);
                    }
                }
                else{
                    
                        //i may be included ->1 hour free
                    if(occupiedClasses[j].startingTime-i>=req.body.duration){
                        unoccupiedClasses.push(i);
                    }
                    
                    while(occupiedClasses[j].startingTime<=i){
                        //not to include
                        if(occupiedClasses[j].startingTime+occupiedClasses[j].duration-1>i){
                            i=occupiedClasses[j].duration+occupiedClasses[j].startingTime-1;
                        }
                        
                        j++;
                        
                        if(j>=occupiedClasses.length){
                            breakCondition=true;
                            break;
                        }
                    }
                }
            
            }
            return res.status(200).json({
                message:"Received response",
                unoccupiedClasses: unoccupiedClasses
            });
        }
    }
    catch(err){
        console.log(err);
    }
}

module.exports.classCreate = async function(req,res){
    try{
        let user = res.locals.user;
        let classDate = new Date(req.body.lecture_date);
        classDate.setHours(1);
        classDate.setMinutes(0);
        classDate.setSeconds(0);
        classDate.setMilliseconds(0);
        let subject = req.body.subject, group = req.body.group, branch=req.body.branch;
        if(req.body.group=='All'){
            for(let classSubElement of user.classSub){
                if(subject==classSubElement.course && branch==classSubElement.class){
                    await TimetableModel.create({
                        startingTime: req.body.slots_available,
                        date: classDate,
                        duration: req.body.duration_hr,
                        classSub: classSubElement,
                        teacher: res.locals.user
                    })
                }
            }
        }
        else if(req.body.sub_group == 'All'){
            for(let classSubElement of user.classSub){
                if(subject==classSubElement.course && branch==classSubElement.class && group==classSubElement.group){
                    await TimetableModel.create({
                        startingTime: req.body.slots_available,
                        date: classDate,
                        duration: req.body.duration_hr,
                        classSub: classSubElement,
                        teacher: res.locals.user
                    })
                }
            }
        }
        else{
            await TimetableModel.create({
                startingTime: req.body.slots_available,
                date: classDate,
                duration: req.body.duration_hr,
                classSub: {
                    course: req.body.subject,
                    class: req.body.branch,
                    group: req.body.group,
                    subGroup: req.body.sub_group
                },
                teacher: res.locals.user
            })
        }
        req.flash('success',"Added class");
        return res.redirect('back');
    }
    catch(err){
        console.log(err);
    }
}
module.exports.classDelete=async function(req,res){
    if(req.xhr){
       
        await TimetableModel.findByIdAndDelete(req.params.id);
        return res.status(200).json({
            message:"deleted class"
        })
    }
}