module.exports.announcement=function(req,res){
    return res.render("announcements",{
        title:"Announcements"
    });  
}

module.exports.studyMaterial=function(req,res){
    return res.render("study_material",{
        title:"Study Material"
    }); 
}

module.exports.recordedLectures=function(req,res){
    return res.render("recorded_lectures",{
        title:"Recorded Lectures"
    });
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