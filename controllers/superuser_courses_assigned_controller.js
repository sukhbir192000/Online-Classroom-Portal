module.exports.courses_assgn=function(req,res){
    return res.render('superuser/courses_assigned',{
        title: 'Courses assigned'
    });
}