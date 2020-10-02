const AnnouncementsModel=require('../models/announcement');
const CourseModel=require('../models/course');
const ClassModel=require('../models/class');
const GroupModel=require('../models/group');
const SubGroupModel=require('../models/sub-group');

function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
}  
   
module.exports.announcement=async function(req,res){
    try{
        let user=res.locals.user;
        
        let announcementsList=[]; // await AnnouncementsModel.find({}).sort('-createdAt');
        var courseList=[];
        if(!req.query.sub || req.query.sub=="All"){
            courseList=courseList.concat(user.courses);
        }
        else{
            try{
                let coursefind=await CourseModel.find({
                    name:req.query.sub
                });
                if(coursefind.length!=0){
                    courseList.push(coursefind[0]._id);
                }
            }
            catch(err){
                console.log("error in finding course ",err);
            }
        }
        for(let course of courseList){

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
            })
            if(announcements.length>0){
                announcementsList = announcementsList.concat(announcements);
            }
        }
        if(req.query.sort=="Oldest First"){
            announcementsList.sort(function(a,b){
                return new Date(b.createdAt) - new Date(a.createdAt);
            });   
        }
        else{
            announcementsList.sort(function(a,b){
                return new Date(a.createdAt) - new Date(b.createdAt);
            });   
        }
        
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
        res.locals.user=await res.locals.user.populate('courses').execPopulate();
        
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
module.exports.getSubjects=async function(req,res){
    var subjectList=[];
  
    for(let classSubElement of res.locals.user.classSub){
        let course=await CourseModel.findById(classSubElement.course);
        let id=classSubElement.course;
        var obj={
            name:course.name,
            id:id
        };
        
        subjectList.push(obj)

    }
    if(req.xhr){
        let mymap = new Map(); 

        subjectList = subjectList.filter(el => { 
            const val = mymap.get(el.name);
            if(val) { 
                if(el.id < val) { 
                    mymap.delete(el.name); 
                    mymap.set(el.name, el.id); 
                    return true; 
                } else { 
                    return false; 
                } 
            } 
            mymap.set(el.name, el.id); 
            return true; 
        });
        return res.status(200).json({
            data:{
                subjectsId:subjectList,
            
            },
            message:"Subjects Sent"
        });
    }
    else{
        return res.send("hi");
    }
}

module.exports.getBranches=async function(req,res){
    if(req.xhr){
        let user = res.locals.user;
        let branchList = [];
        for(let classSub of user.classSub){
            if(classSub.course == req.body.course){
                var branchElement = await ClassModel.findById(classSub.class);
                branchList.push({
                    id: classSub.class,
                    name: branchElement.stream
                })
            }
        }
        let mymap = new Map(); 

        branchList = branchList.filter(el => { 
            const val = mymap.get(el.name);
            if(val) { 
                if(el.id < val) { 
                    mymap.delete(el.name); 
                    mymap.set(el.name, el.id); 
                    return true; 
                } else { 
                    return false; 
                } 
            } 
            mymap.set(el.name, el.id); 
            return true; 
        });
        return res.status(200).json({
            data:{
                branchList:branchList
            },
            message:"Subjects Sent"
        });
    }
}
module.exports.getGroups=async function(req,res){
    if(req.xhr){
        let user = res.locals.user;
        let groupList = [];
        for(let classSub of user.classSub){
            if(classSub.course == req.body.course && req.body.class==classSub.class){

                var groupElement = await GroupModel.findById(classSub.group);
                groupList.push({
                    id: classSub.group,
                    name: groupElement.groupNumber
                })
            }
        }
        let mymap = new Map(); 

        groupList = groupList.filter(el => { 
            const val = mymap.get(el.name);
            if(val) { 
                if(el.id < val) { 
                    mymap.delete(el.name); 
                    mymap.set(el.name, el.id); 
                    return true; 
                } else { 
                    return false; 
                } 
            } 
            mymap.set(el.name, el.id); 
            return true; 
        });
        return res.status(200).json({
            data:{
                groupList:groupList
            },
            message:"Subjects Sent"
        });
    }
}
module.exports.getSubGroups=async function(req,res){
    if(req.xhr){
        let user = res.locals.user;
        let subGroupList = [];
        for(let classSub of user.classSub){
            if(classSub.course == req.body.course && req.body.class==classSub.class && req.body.group==classSub.group){
                if(classSub.subGroup){
                    var subGroupElement = await SubGroupModel.findById(classSub.subGroup);
                    subGroupList.push({
                        id: classSub.subGroup,
                        name: subGroupElement.subGroupNumber
                    })
                }
            }
        }
        let mymap = new Map(); 

        subGroupList = subGroupList.filter(el => { 
            const val = mymap.get(el.name);
            if(val) { 
                if(el.id < val) { 
                    mymap.delete(el.name); 
                    mymap.set(el.name, el.id); 
                    return true; 
                } else { 
                    return false; 
                } 
            } 
            mymap.set(el.name, el.id); 
            return true; 
        });
        return res.status(200).json({
            data:{
                subGroupList:subGroupList
            },
            message:"Sub-groups Sent"
        });
    }
}
module.exports.announcementCreate=async function(req,res){
    
    try{
        let user=res.locals.user
        if(req.body.subject=="All"){
            for(let subjects of user.classSub){
                await AnnouncementsModel.create({
                    title: req.body.title,
                    content: req.body.message,
                    classSub: subjects
                })
            }
        }
        else{
            var subject = req.body.subject;
            if(req.body.branch=="All"){
                for(let classSubElement of user.classSub){
                    if(subject==classSubElement.course){
                        await AnnouncementsModel.create({
                            title: req.body.title,
                            content: req.body.message,
                            classSub: classSubElement
                        })
                    }
                }
            }
            else{
                var branch = req.body.branch;
                if(req.body.group == "All"){
                    for(let classSubElement of user.classSub){
                        if(subject==classSubElement.course && branch==classSubElement.class){
                            await AnnouncementsModel.create({
                                title: req.body.title,
                                content: req.body.message,
                                classSub: classSubElement
                            })
                        }
                    }
                }
                else{
                    var group = req.body.group;
                    if(req.body.sub_group == "All"){
                        for(let classSubElement of user.classSub){
                            if(subject==classSubElement.course && branch==classSubElement.class && group==classSubElement.group){
                                await AnnouncementsModel.create({
                                    title: req.body.title,
                                    content: req.body.message,
                                    classSub: classSubElement
                                })
                            }
                        }
                    }
                    else{
                        await AnnouncementsModel.create({
                            title: req.body.title,
                            content: req.body.message,
                            classSub: {
                                course: course,
                                class: branch,
                                group: group,
                                subGroup: req.body.sub_group
                            }
                        })
                    }
                }
            }
        }
        return res.redirect('back')
    }
    catch(err){
        console.log("error while adding to Db announcements :",err);
        return res.redirect('back');    
    }
    // {
    //     subject: '5f7474e8ed898e4664816678',
    //     branch: '5f7439c114b9781df80b3c4f',
    //     group: '5f746dde33b7d3478095bb02',
    //     sub_group: 'All',
    //     title: 'Hello Chlidren',
    //     message: 'How are you?'
    //   }

    
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