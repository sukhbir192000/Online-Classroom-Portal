module.exports.announcement=function(req,res){
    return res.send("announcements");  
}

module.exports.studyMaterial=function(req,res){
    return res.send("studyMaterial");  
}

module.exports.recordedLectures=function(req,res){
    return res.send("recordedLectures");  
}

module.exports.assignments=function(req,res){
    return res.render("assgn",{
        title:'Assignments'
    });  
}

module.exports.timeTable=function(req,res){
    return res.send("timeTable");  
}
module.exports.doubts=function(req,res){
    return res.send("doubts");  
}