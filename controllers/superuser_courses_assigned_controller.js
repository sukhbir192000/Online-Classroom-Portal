const CourseModel = require("../models/course");
const ClassModel = require("../models/class");
let UserModel = require("../models/user");
const User = require("../models/user");

module.exports.courses_assgn = async function(req,res){
    let courseList=await CourseModel.find({
        isActive: true,
        offered_to: res.locals.user.dept
    }).sort('code')
    .populate('teachers.teacher')
    .populate('teachers.classSub.class')
    .populate('teachers.classSub.group')
    .populate('teachers.classSub.subGroup');

    // --------------------------FINDING TEACHER LIST FOR POPULATING IN ADD SECTION--------------------------
    let teacher_list = await UserModel.find({
        isSuperUser: false,
        isAdmin: true,
        dept: res.locals.user.dept
    });
    console.log(teacher_list);
    return res.render('superuser/courses_assigned',{
        title: 'Courses assigned',
        courseList: courseList,
        teacher_list: teacher_list
    });
}

module.exports.courses_assgnCreate = async function(req,res){
    try{
        let course = await CourseModel.findById(req.body.code_course);
        let teacher = await UserModel.findById(req.body.name_teacher);
        if(req.body.lecture_lab == "Lecture"){
            course.teachers.push({
                teacher: req.body.name_teacher,
                classSub: {
                    course: req.body.code_course,
                    class: req.body.choose_branch,
                    group: req.body.group_class
                },
                classType: req.body.lecture_lab
            });

            teacher.classSub.push({
                course: req.body.code_course,
                class: req.body.choose_branch,
                group: req.body.group_class
            });
        }
        else{
            course.teachers.push({
                teacher: req.body.name_teacher,
                classSub: {
                    course: req.body.code_course,
                    class: req.body.choose_branch,
                    subGroup: req.body.group_class
                },
                classType: req.body.lecture_lab
            });

            teacher.classSub.push({
                course: req.body.code_course,
                class: req.body.choose_branch,
                subGroup: req.body.group_class
            });
        }
        course.save();
        teacher.save();
        return res.redirect('back');
    }
    catch(err){
        console.log("Error while assigning teacher", err);
        return res.render('back');
    }
}

module.exports.courses_assgnDelete = async function(req,res){
    try{
        let course = await CourseModel.findById(req.body.courseId);
        let teacher = await UserModel.findById(course.teachers[req.body.index].teacher);
        let req_classSub = course.teachers[req.body.index].classSub, teacher_index;
        for(let i=0;i<teacher.classSub.length;i++){
            classSubObj = teacher.classSub[i];
            if(classSubObj.course==req_classSub.course && 
                classSubObj.class==req_classSub.class && 
                classSubObj.group==req_classSub.group && 
                classSubObj.subGroup==req_classSub.subGroup){
                    teacher_index = i;
                    break;
                }
        }
        teacher.classSub.splice(teacher_index, 1);
        course.teachers.splice(req.body.index,1);
        teacher.save();
        course.save();
        res.status(200);
    }
    catch(err){
        console.log("Error while deleting assigned teacher", err);
        res.status(400);
    }
}

module.exports.getCourses = async function(req,res){
    let courseList = await CourseModel.find({
        isActive: true,
        year: req.body.year,
        dept: res.locals.user.dept
    });
    return res.status(200).json({
        courseList: courseList
    })
}

module.exports.getBranches = async function(req,res){
    let course = await CourseModel.findById(req.body.course);
    let present_date = new Date();
    let req_year = present_date.getFullYear()+4-req.body.year;
    if(present_date.getMonth()>5) req_year++;
    let branchList = await ClassModel.find({
        stream: {$in: course.offered_to},
        passingOutYear: req_year
    })
    return res.status(200).json({
        branchList: branchList
    })
}

module.exports.getGroups = async function(req,res){
    let req_class = await ClassModel.findById(req.body.branch);
    let group_num;
    if(req.body.class_type == "Lecture") group_num = req_class.totalGroups;
    else group_num = req_class.totalSubGroups;
    return res.status(200).json({
        group_num: group_num
    });
}
