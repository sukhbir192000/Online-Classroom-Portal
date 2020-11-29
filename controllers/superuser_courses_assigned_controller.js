const CourseModel = require("../models/course");

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

}

module.exports.courses_assgnDelete = async function(req,res){
    
}
