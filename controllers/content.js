const AnnouncementsModel=require('../models/announcement');
   
module.exports.announcement=async function(req,res){
    
    let user=res.locals.user;
    let announcementsList;
    for(let course in user.courses){
        let announcements=await AnnouncementsModel.find({
            "classSub.course":course,
            "classSub.class":user.class,
            "classSub.group":user.group,
            "classSub.subGroup":user.subGroup
        });
        if(announcements){
            announcementsList.append(announcements);
        }
    }
    
    return res.render("announcements",{
        title:"Announcements",
        announcements:announcementsList
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