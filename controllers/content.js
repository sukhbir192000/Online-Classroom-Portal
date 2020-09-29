const AnnouncementsModel=require('../models/announcement');
   
module.exports.announcement=async function(req,res){
    try{
        let user=res.locals.user;

        let announcementsList=await AnnouncementsModel.find({}).sort('-createdAt');
        for(let course of user.courses){
            
            
            let announcements=await AnnouncementsModel.find({
                // "classSub.course":course,
                // "classSub.class":user.class,
                // "classSub.group":user.group,
                // "classSub.subGroup":user.subGroup
            }).sort('-createdAt');
            if(announcements){
                announcementsList.append(announcements);
            }  
            
        }
        
        
        return res.render("announcements",{
            title:"Announcements",
            announcements:announcementsList
        });  
    }
    catch(err){
        console.log("error :",err);
        return res.redirect('back');
    }
}

module.exports.announcementCreate=async function(req,res){
    console.log(req.body);
    try{
        let post=await AnnouncementsModel.create({
            title:req.body.title,
            content:req.body.content
        });
        return res.redirect('back')
    }
    catch(err){
        console.log("error while adding to Db announcements :",err);
        return res.redirect('back');    
    }

    
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