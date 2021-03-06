const RecordedLecturesModel = require('../models/recorded-lecture');
const CourseModel = require('../models/course');
const ClassModel = require('../models/class');


module.exports.recordedLecture = async function (req, res) {
    try {
        let user = res.locals.user;
        let courseFilterAdmin = []
        if (user.isAdmin) {
            for (let classSubElement of user.classSub) {
                let course = await CourseModel.findById(classSubElement.course);
                courseFilterAdmin.push(course);
            }
            let mymap = new Map();

            courseFilterAdmin = courseFilterAdmin.filter(el => {
                const val = mymap.get(el.name);
                if (val) {
                    if (el.id < val) {
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
        let recordedLecturesList = [];
        var courseList = [];
        if (!req.query.sub || req.query.sub == "All") {
            courseList = courseList.concat(user.courses);
        }
        else {
            try {
                let coursefind = await CourseModel.find({
                    name: req.query.sub
                });
                if (coursefind.length != 0) {
                    courseList.push(coursefind[0]._id);
                }
            }
            catch (err) {
                console.log("error in finding course ", err);
            }
        }
        if (user.isAdmin) {
            if (req.query.sub && req.query.sub != "All") {
                if (req.query.branch != "All") {
                    let courseId = await CourseModel.find({
                        name: req.query.sub
                    });
                    courseId = courseId[0]._id;
                    let classId = await ClassModel.find({
                        stream: req.query.branch
                    });
                    recordedLecturesList = [];
                    for (let classElement of classId) {

                        let temp_list = await RecordedLecturesModel.find({
                            postedBy: user._id,
                            "classSub.course": courseId,
                            "classSub.class": classId
                        }).populate('classSub.course')
                            .populate('classSub.class')
                            .populate('classSub.group')
                            .populate('classSub.subGroup');
                        recordedLecturesList = recordedLecturesList.concat(temp_list);
                    }
                }
                else {
                    let courseId = await CourseModel.find({
                        name: req.query.sub
                    });
                    courseId = courseId[0]._id;
                    recordedLecturesList = await RecordedLecturesModel.find({
                        postedBy: user._id,
                        "classSub.course": courseId
                    })
                        .populate('classSub.course')
                        .populate('classSub.class')
                        .populate('classSub.group')
                        .populate('classSub.subGroup');
                }
            }
            else {
                recordedLecturesList = await RecordedLecturesModel.find({ postedBy: user._id })
                    .populate('classSub.course')
                    .populate('classSub.class')
                    .populate('classSub.group')
                    .populate('classSub.subGroup');
            }
        }
        else {
            for (let course of courseList) {

                let recordedLectures = await RecordedLecturesModel.find({
                    $and: [
                        {
                            "classSub.course": course,
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
                        }
                    ]
                }).populate('classSub.course');
                if (recordedLectures.length > 0) {
                    recordedLecturesList = recordedLecturesList.concat(recordedLectures);
                }
            }
        }

        if (!req.query.date || req.query.date == "Latest First") {
            recordedLecturesList.sort(function (a, b) {
                return new Date(b.createdAt) - new Date(a.createdAt);
            });
        }
        else {
            recordedLecturesList.sort(function (a, b) {
                return new Date(a.createdAt) - new Date(b.createdAt);
            });
        }
        var filterList = {
            courseName: "",
            sort: "",
            branch: ""
        };
        // console.log(req.query);
        if (req.query.sub || req.query.date) {
            filterList.courseName = req.query.sub,
                filterList.sort = req.query.date
            filterList.branch = req.query.branch
        }
        else {
            filterList.courseName = "All",
                filterList.sort = "Latest First",
                filterList.branch = "All"
        }
        branchList = []
        if (req.query.sub && req.query.sub != "All") {
            for (let classSubElement of user.classSub) {
                let course = await CourseModel.findById(classSubElement.course);
                if (course.name == req.query.sub) {
                    let branch = await ClassModel.findById(classSubElement.class);
                    branchList.push(branch);
                }
            }
        }
        else {
            filterList.branch = "All"
        }
        let mymap = new Map();

        branchList = branchList.filter(el => {
            const val = mymap.get(el.name);
            if (val) {
                if (el.id < val) {
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
        var courses = [];
        for (let course of user.courses) {
            let courseObject = await CourseModel.findById(course);
            courses.push(courseObject);
        }
        return res.render("recorded_lectures", {
            title: "Recorded Lectures",
            recordedLectures: recordedLecturesList,
            filterList: filterList,
            courseList: courses,
            courseFilters: courseFilterAdmin,
            branchList: branchList
        });
    }
    catch (err) {
        console.log("error :", err);
        return res.redirect('back');
    }
}

async function addRecordedLectures(req, res, classSubList) {
    try {
        let user = res.locals.user;
        for (let subject in classSubList) {
            for (let clas in classSubList[subject]) {
                let fullCondition = false;
                if (Object.keys(classSubList[subject][clas]).length === 0) {
                    fullCondition = true;
                }
                else {
                    let classInfo = await ClassModel.findById(clas);
                    if ((req.body.class_type == "Lecture" && classInfo.totalGroups == classSubList[subject][clas].groups.length) || (req.body.class_type == "Lab" && classInfo.totalSubGroups == classSubList[subject][clas].groups.length)) {
                        fullCondition = true;
                    }
                }
                if (fullCondition) {
                    await RecordedLecturesModel.create({
                        title: req.body.title,
                        content: req.body.message,
                        classSub: {
                            course: subject,
                            class: clas
                        },
                        recordedOn: req.body.lecture_date,
                        postedBy: user._id,
                        link: req.body.lecture_link,
                        references: req.body.lecture_references
                    })
                }
                else {
                    for (let groupItem of classSubList[subject][clas].groups) {
                        if (req.body.class_type == "Lecture") {
                            await RecordedLecturesModel.create({
                                title: req.body.title,
                                content: req.body.message,
                                classSub: {
                                    course: subject,
                                    class: clas,
                                    group: groupItem
                                },
                                recordedOn: req.body.lecture_date,
                                postedBy: user._id,
                                link: req.body.lecture_link,
                                references: req.body.lecture_references
                            })
                        }
                        else {
                            await RecordedLecturesModel.create({
                                title: req.body.title,
                                content: req.body.message,
                                classSub: {
                                    course: subject,
                                    class: clas,
                                    subGroup: groupItem
                                },
                                recordedOn: req.body.lecture_date,
                                postedBy: user._id,
                                link: req.body.lecture_link,
                                references: req.body.lecture_references
                            })
                        }
                    }
                }
            }
        }
    }
    catch (err) {
        console.log(err);

    }
}

module.exports.recordedLectureCreate = async function (req, res) {

    try {
        let user = res.locals.user
        if (req.body.subject == "All") {
            let classSubList = {};
            for (let classSubElement of user.classSub) {
                if (!classSubList[classSubElement.course]) {
                    classSubList[classSubElement.course] = {};
                }
                if (!classSubList[classSubElement.course][classSubElement.class]) {
                    classSubList[classSubElement.course][classSubElement.class] = { groups: [] }
                }
                if (req.body.class_type == "Lecture" && !classSubElement.subGroup && classSubList[classSubElement.course][classSubElement.class] != {}) {
                    if (classSubElement.group) {
                        classSubList[classSubElement.course][classSubElement.class].groups.push(classSubElement.group);
                    }
                    else {
                        classSubList[classSubElement.course][classSubElement.class] = {};
                    }
                }
                else if (req.body.class_type == "Lab" && classSubElement.subGroup) {
                    classSubList[classSubElement.course][classSubElement.class].groups.push(classSubElement.subGroup);
                }
            }
            await addRecordedLectures(req, res, classSubList);
        }
        else {
            var subject = req.body.subject;
            if (req.body.branch == "All") {
                let classSubList = {};
                for (let classSubElement of user.classSub) {
                    if (classSubElement.course == subject) {
                        if (!classSubList[classSubElement.course]) {
                            classSubList[classSubElement.course] = {};
                        }
                        if (!classSubList[classSubElement.course][classSubElement.class]) {
                            classSubList[classSubElement.course][classSubElement.class] = { groups: [] }
                        }
                        if (req.body.class_type == "Lecture" && !classSubElement.subGroup && classSubList[classSubElement.course][classSubElement.class] != {}) {
                            if (classSubElement.group) {
                                classSubList[classSubElement.course][classSubElement.class].groups.push(classSubElement.group);
                            }
                            else {
                                classSubList[classSubElement.course][classSubElement.class] = {};
                            }
                        }
                        else if (req.body.class_type == "Lab" && classSubElement.subGroup) {
                            classSubList[classSubElement.course][classSubElement.class].groups.push(classSubElement.subGroup);
                        }
                    }
                }
                await addRecordedLectures(req, res, classSubList);
            }
            else {
                var branch = req.body.branch;
                if (req.body.sub_group == "All") {
                    let classSubList = {};
                    for (let classSubElement of user.classSub) {
                        if (classSubElement.course == subject && classSubElement.class == branch) {
                            if (!classSubList[classSubElement.course]) {
                                classSubList[classSubElement.course] = {};
                            }
                            if (!classSubList[classSubElement.course][classSubElement.class]) {
                                classSubList[classSubElement.course][classSubElement.class] = { groups: [] }
                            }
                            if (req.body.class_type == "Lecture" && !classSubElement.subGroup && classSubList[classSubElement.course][classSubElement.class] != {}) {
                                if (classSubElement.group) {
                                    classSubList[classSubElement.course][classSubElement.class].groups.push(classSubElement.group);
                                }
                                else {
                                    classSubList[classSubElement.course][classSubElement.class] = {};
                                }
                            }
                            else if (req.body.class_type == "Lab" && classSubElement.subGroup) {
                                classSubList[classSubElement.course][classSubElement.class].groups.push(classSubElement.subGroup);
                            }
                        }
                    }
                    await addRecordedLectures(req, res, classSubList);
                }
                else {
                    var group = req.body.sub_group;
                    let classSubList = {};
                    for (let classSubElement of user.classSub) {
                        if (classSubElement.course == subject && classSubElement.class == branch) {
                            if (!classSubList[classSubElement.course]) {
                                classSubList[classSubElement.course] = {};
                            }
                            if (!classSubList[classSubElement.course][classSubElement.class]) {
                                classSubList[classSubElement.course][classSubElement.class] = { groups: [] }
                            }
                            if (req.body.class_type == "Lecture" && classSubElement.group == group) {
                                classSubList[classSubElement.course][classSubElement.class].groups.push(classSubElement.group);
                            }
                            else if (req.body.class_type == "Lab" && classSubElement.subGroup == group) {
                                console.log("hi");
                                classSubList[classSubElement.course][classSubElement.class].groups.push(classSubElement.subGroup);
                            }
                        }
                    }
                    await addRecordedLectures(req, res, classSubList);
                }
            }
        }
        req.flash('success', 'Recorded Lecture Posted');
        return res.redirect('back')
    }
    catch (err) {
        console.log("error while adding to Db Recorded Lectures :", err);
        return res.redirect('back');
    }
}

module.exports.recordedLectureUpdate = async function (req, res) {
    try {
        console.log(req.body);
        await RecordedLecturesModel.findByIdAndUpdate(req.params.recordedLectureId, {
            $set: {
                title: req.body.title,
                content: req.body.description,
                link: req.body.link,
                references: req.body.references

            }
        });
        return res.redirect('back');
    } catch (err) {
        console.log(err);
        return res.redirect('back');
    }
};

module.exports.recordedLectureDelete = function (req, res) {
    try{
    RecordedLecturesModel.findByIdAndDelete(req.params.id, function (err) {
        if (err) {
            console.log("error while deleting recorded lecture :", err);
            return res.redirect('back');
        }
        else {
            req.flash('success', 'Recorded Lecture Deleted');
            return res.redirect('back');
        }
    })
    }catch(err){
        console.log(err);
        return res.redirect('back');
    }
}