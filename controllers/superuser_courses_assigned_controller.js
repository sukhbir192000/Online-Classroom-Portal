const CourseModel = require("../models/course");
const ClassModel = require("../models/class");
const GroupModel = require("../models/group");
const SubGroupModel = require("../models/sub-group");
const UserModel = require("../models/user");
const LinkModel = require('../models/link');

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
        console.log("Add request: ", req.body);
        let course = await CourseModel.findById(req.body.code_course);
        let teacher = await UserModel.findById(req.body.name_teacher);
        if(req.body.group_class == "All"){
            course.teachers.push({
                teacher: req.body.name_teacher,
                classSub: {
                    course: req.body.code_course,
                    class: req.body.choose_branch
                },
                classType: req.body.lecture_lab
            });
            const link = await LinkModel.create({link: ""});
            teacher.classSub.push({
                course: req.body.code_course,
                class: req.body.choose_branch,
                link: link._id
            });
        }
        else{
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
                const link = await LinkModel.create({link: ""});
                teacher.classSub.push({
                    course: req.body.code_course,
                    class: req.body.choose_branch,
                    group: req.body.group_class,
                    link: link._id
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
                const link = await LinkModel.create({link: ""});
                teacher.classSub.push({
                    course: req.body.code_course,
                    class: req.body.choose_branch,
                    subGroup: req.body.group_class,
                    link: link._id
                });
            }
        }
        await course.save();
        await teacher.save();
        return res.redirect('back');
    }
    catch(err){
        console.log("Error while assigning teacher", err);
        return res.redirect('back');
    }
}

module.exports.courses_assgnDelete = async function(req,res){
    try{
        let course = await CourseModel.findById(req.body.courseId);
        let teacher = await UserModel.findById(course.teachers[req.body.index].teacher);
        let req_classSub = course.teachers[req.body.index].classSub, teacher_index;
        
        for(let i=0;i<teacher.classSub.length;i++){
            let classSubObj = teacher.classSub[i];
            
            if(String(classSubObj.course)==String(req_classSub.course) && 
                String(classSubObj.class)==String(req_classSub.class) && 
                String(classSubObj.group)==String(req_classSub.group) && 
                String(classSubObj.subGroup)==String(req_classSub.subGroup)){
                    teacher_index = i;
                    break;
                }
                
        }
        
        await LinkModel.findByIdAndDelete(teacher.classSub[teacher_index].link);
        teacher.classSub.splice(teacher_index, 1);
        course.teachers.splice(req.body.index,1);
        teacher.save();
        course.save();
        return res.status(200).json({});
    }
    catch(err){
        console.log("Error while deleting assigned teacher", err);
        return res.status(400);
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
    console.log(req.body);
    let groupList = [];
    if(req.body.class_type == "Lecture"){
        groupList = await GroupModel.find({class: req.body.branch})
    }
    else{
        groupList = await SubGroupModel.find({class: req.body.branch})
    }
    return res.status(200).json({
        groupList: groupList
    });
}
