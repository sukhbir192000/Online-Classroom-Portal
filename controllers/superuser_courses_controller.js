module.exports.courses=function(req,res){
    return res.render('superuser/courses', {
        title: 'Courses'
    });
}