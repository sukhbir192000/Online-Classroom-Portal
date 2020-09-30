

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



module.exports.timeTable=function(req,res){
    return res.send("timeTable");  
}
module.exports.doubts=function(req,res){
    return res.send("doubts");  
}