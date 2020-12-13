const CourseModel = require("../models/course");

module.exports.courses= async function(req,res){
    let courseList=await CourseModel.find({
        dept:res.locals.user.dept
    }).sort('code');
    return res.render('superuser/courses', {
        title: 'Courses',
        courseList:courseList
    });
}

module.exports.courseCreate = async function(req,res){
    try{
        let course = await CourseModel.create(req.body);
        return res.status(200).json(course);
    }
    catch(err){
        console.log("Error while creating course ", err);
        return res.status(200).json({
            err: true
        });
    }
}
module.exports.courseDelete=async function(req,res){
    try{
        let course=await CourseModel.findByIdAndDelete(req.body.id);
        return res.status(200).json({
            course:course   
        });
    }
    catch(err){
        console.log(err);
        return res.status(400);
    }
}
module.exports.courseUpdate=async function(req,res){
    try{
        console.log(req.body);
        let course=await CourseModel.findById(req.body.id);
        if(req.body.state=='false'){
            course.isActive = true;
            course.year = req.body.year
        }
        else{
            course.isActive = false;
            course.year = [];
        }
        course.save();
        return res.status(200).json({
            course:course
        });
    }
    catch(err){
        console.log(err);
        return res.status(400);
    }
}