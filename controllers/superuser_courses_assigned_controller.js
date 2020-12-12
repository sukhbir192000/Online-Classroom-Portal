const CourseModel = require("../models/course");
const ClassModel = require("../models/class")

module.exports.courses_assgn = async function(req,res){
    let courseList=await CourseModel.find({
        isActive: true,
        offered_to: res.locals.user.dept
    }).sort('code')
    .populate('teachers.teacher')
    .populate('teachers.classSub.class')
    .populate('teachers.classSub.group')
    .populate('teachers.classSub.subGroup');
    return res.render('superuser/courses_assigned',{
        title: 'Courses assigned',
        courseList: courseList
    });
}

module.exports.courses_assgnCreate = async function(req,res){
    try{
        // let course = await CourseModel.findById(req.body.code_course);
        // if(req.body.lecture_lab == "Lecture"){
        //     course.teachers.push({
        //         teacher: req.body.name_teacher,
        //         classSub: {
        //             course: req.body.code_course,
        //             class: ,
        //             group: 
        //         },
        //         classType: req.body.lecture_lab
        //     })
        // }
        // else{
        //     course.teachers.push({
        //         teacher: req.body.name_teacher,
        //         classSub: {
        //             course: req.body.code_course,
        //             class: ,
        //             subGroup: 
        //         },
        //         classType: req.body.lecture_lab
        //     })
        // }
        // Add in teacher


        
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
        course.teachers.splice(req.body.index,1);
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
    let course = await CourseModel.findById();
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

    return res.status(200).json({
        groupList: groupList
    })
}
