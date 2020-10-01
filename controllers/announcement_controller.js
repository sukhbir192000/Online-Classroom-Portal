const AnnouncementsModel=require('../models/announcement');
   
module.exports.announcement=async function(req,res){
    try{
        let user=res.locals.user;

        let announcementsList=[]; // await AnnouncementsModel.find({}).sort('-createdAt');
        for(let course of user.courses){
            let announcements=await AnnouncementsModel.find({
                $and: [
                    {
                        "classSub.course":course,
                        "classSub.class":user.class
                    },
                    {
                        $or: [
                            {"classSub.group": undefined},
                            {
                                $and: [
                                    {"classSub.group": user.group},
                                    {$or: [
                                        {"classSub.subGroup": undefined},
                                        {"classSub.subGroup": user.subGroup}
                                    ]}
                                ]
                            }
                        ]
                    }
                ]
            });
            if(announcements.length>0){
                announcementsList = announcementsList.concat(announcements);
            }
            
        }
        console.log(announcementsList);
        announcementsList.sort(function(a,b){
            return new Date(b.createdAt) - new Date(a.createdAt);
          });
        var filterList={
            courseName:"",
            sort:""
        };
        // console.log(req.query);
        if(req.query.sub||req.query.date){
            filterList.courseName=req.query.sub,
            filterList.sort=req.query.date
        }
        else{
            filterList.courseName="All",
            filterList.sort="Latest First"
        }
        // console.log(filterList);
        res.locals.user=await res.locals.user.populate('Courses').execPopulate();
        return res.render("announcements",{
            title:"Announcements",
            announcements:announcementsList,
            filterList:filterList
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
            content:req.body.message,
            classSub:{
                course:"5f6e2a1e78a45c07ec7d6a84",
                class:"5f6e2a1e78a45c07ec7d6a84",//req.body.branch,
                
            }
        });
        return res.redirect('back')
    }
    catch(err){
        console.log("error while adding to Db announcements :",err);
        return res.redirect('back');    
    }

    
}
module.exports.announcementDelete=function(req,res){
    console.log(req.params.id);
    AnnouncementsModel.findByIdAndDelete(req.params.id,function(err){
        if(err){
            console.log("error while deleting announcement :",err);
            return res.redirect('back');
        }
        else{
            console.log("deleted Announcement");
            return res.redirect('back');
        }
    })
    
}