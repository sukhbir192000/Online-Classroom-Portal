module.exports.timetable=function(req,res){
    return res.render('superuser/timetable',{
        title: 'Timetable',
        timetableItems: [[],[],[],[],[],[],[]]
    });
}