const TimeTableModel = require('../models/timetable')
const ClassModel = require('../models/class');
const SuperUserTimeTable = require('../models/superuser_dept_timetable');
const CourseModel = require('../models/course');
const GroupModel = require('../models/group');
const SubGroupModel = require('../models/sub-group');
const { init } = require('../models/timetable');

module.exports.timetable = async function (req, res) {
    try {
        if (req.xhr) {
            console.log("AJAX HIT")
            let req_class = await ClassModel.findOne({
                stream: res.locals.user.dept,
                passingOutYear: req.body.passingOutYear

            })
            let timeTableItems;
            if (req_class) {
                timeTableItems = await SuperUserTimeTable.findOne({
                    class: req_class._id
                })
            }
            // --------------------courses-------------------------
            let present_date = new Date();
            let present_year = present_date.getFullYear();
            let req_year = 4 - (req.body.passingOutYear - present_year);
            if (present_date.getMonth() > 5) req_year++;
            let course_available = await CourseModel.find({
                offered_to: res.locals.user.dept,
                year: req_year
            });
            //-----------------------groups-------------------------
            let group_list = await GroupModel.find({ class: req_class._id });
            let sub_group_list = await SubGroupModel.find({ class: req_class._id });
            return res.status(200).json({
                timeTableItems: timeTableItems,
                courses: course_available,
                groups: group_list,
                sub_groups: sub_group_list
            })

        }
        else {
            let present_classes = await ClassModel.find({ stream: res.locals.user.dept }).sort('passingOutYear');
            return res.render('superuser/timetable', {
                title: 'Timetable',
                timetableItems: [[], [], [], [], [], [], []],
                present_classes: present_classes
            });
        }
    }
    catch (err) {
        console.log(err);
        if (req.xhr) {
            return res.status(400);
        }

        return res.redirect('back');
    }
}
module.exports.saveTimeTable = async function (req, res) {

    try {
        // console.log("saving data",req.body.timeTableData);
        // let parsed_data = JSON.parse(req.body);
        // console.log("after parse",parsed_data);
        let req_class = await ClassModel.findOne({
            stream: res.locals.user.dept,
            passingOutYear: req.body.passingOutYear

        })
        console.log("no data:", req_class);
        let timeTableItem = await SuperUserTimeTable.findOne({
            class: req_class._id
        })
        if (!timeTableItem) {
            timeTableItem = await SuperUserTimeTable.create({
                class: req_class._id,
                startDate: req.body.startDate,
                endDate: req.body.endDate
            })
        }
        timeTableItem.timeTableData = req.body.timeTableData
        timeTableItem.save();
        //wipe tt
        await TimeTableModel.deleteMany({
            "classSub.class":req_class._id
        })


        for (let i = 0; i < 7; i++) {

            for (let j = 8; j < req.body.timeTableData[i].length; j++) {
                // console.log(req.body.timeTableData[i][j]);
                //starting time is j

                if (req.body.timeTableData[i][j][0] != "") {

                    let timeTableItemsArray = req.body.timeTableData[i][j][0];
                    console.log("***************************")
                    console.log(timeTableItemsArray[0],timeTableItemsArray[1]);
                    for (let classItem of timeTableItemsArray) {
                        console.log("starting at ", i, j, " : ", classItem);
                        //here i am at classItem
                        let initialDate = new Date(req.body.startDate);

                        while (!(i == 6 && initialDate.getDay() == 0) && !(initialDate.getDay() == i + 1)) {

                            initialDate.setDate(initialDate.getDate() + 1);
                        }
                        initialDate.setHours(1);
                        initialDate.setSeconds(0);
                        initialDate.setMinutes(0);
                        initialDate.setMilliseconds(0);
                        let finalDate = new Date(req.body.endDate);

                        if (classItem[1] == "Lab") {
                            console.log("labclass");
                            let my_class_sub = await CourseModel.findById(classItem[0]);
                            let my_teachers = my_class_sub.teachers;
                            for (let teacher of my_teachers) {


                                if (teacher.classSub.class == req_class.id) {
                                    console.log("reached here",classItem[2],teacher.classSub.subGroup);
                                    if (classItem[2] == teacher.classSub.subGroup) {
                                        //create for this
                                        console.log("creating lab");
                                        console.log(classItem)

                                        console.log("data:", req.body.startDate, req.body.endDate);
                                        //ith day

                                        console.log("initialDate:", initialDate);

                                        while (initialDate < finalDate) {
                                            let classCreated = await TimeTableModel.create({
                                                startingTime: j,
                                                date:initialDate,
                                                duration: classItem[3],
                                                classSub: teacher.classSub,
                                                teacher: teacher.teacher,
                                                classType: classItem[1]
                                            })
                                            initialDate.setDate(initialDate.getDate() + 7);
                                        }
                                        break;
                                    }

                                }
                            }

                        }
                        else {
                            console.log("lectureclass");
                            let my_class_sub = await CourseModel.findById(classItem[0]);
                            let my_teachers = my_class_sub.teachers;
                            for (let teacher of my_teachers) {
                                if (teacher.classSub.class == req_class.id) {
                                    if (classItem[2] == "All" || classItem[2] == teacher.classSub.group) {
                                        //create for this
                                        console.log("creating lecture");
                                        console.log(classItem)
                                        while (initialDate < finalDate) {
                                            let classCreated = await TimeTableModel.create({
                                                startingTime: j,
                                                date:initialDate,
                                                duration: classItem[3],
                                                classSub: teacher.classSub,
                                                teacher: teacher.teacher,
                                                classType: classItem[1]
                                            })
                                            initialDate.setDate(initialDate.getDate() + 7);  
                                        }
                                        break;
                                    }

                                }
                            }

                        }


                    }

                }
            }

        }
        //save to teacher tt too
        return res.status(200).json({
            message: "Updated TT"
        })
    }
    catch (err) {
        console.log(err);
        return res.status(400);
    }
}