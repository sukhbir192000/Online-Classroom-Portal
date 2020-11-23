const CourseModel = require("../models/course");

module.exports.courses=function(req,res){
    return res.render('superuser/courses', {
        title: 'Courses'
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