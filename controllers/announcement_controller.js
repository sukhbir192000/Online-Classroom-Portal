const AnnouncementsModel=require('../models/announcement');
const CourseModel=require('../models/course');
const ClassModel=require('../models/class');
const GroupModel=require('../models/group');
const SubGroupModel=require('../models/sub-group');


module.exports.announcement=async function(req,res){
    try{
        let user=res.locals.user;
        let courseFilterAdmin = []
        if(user.isAdmin){
            for(let classSubElement of user.classSub){
                let course = await CourseModel.findById(classSubElement.course);
                courseFilterAdmin.push(course);
            }
            let mymap = new Map();

            courseFilterAdmin = courseFilterAdmin.filter(el => { 
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
        }
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
        if(user.isAdmin){
            if(req.query.sub && req.query.sub!="All"){
                if(req.query.branch!="All"){
                    let courseId=await CourseModel.find({
                        name:req.query.sub
                    });
                    courseId = courseId[0]._id;
                    let classId=await ClassModel.find({
                        stream:req.query.branch
                    });
                    classId = classId[0]._id;
                    announcementsList = await AnnouncementsModel.find({
                        postedBy: user._id,
                        "classSub.course":courseId,
                        "classSub.class":classId
                    }).populate('classSub.course')
                    .populate('classSub.class')
                    .populate('classSub.group')
                    .populate('classSub.subGroup');
                }
                else{
                    let courseId=await CourseModel.find({
                        name:req.query.sub
                    });
                    courseId = courseId[0]._id;
                    announcementsList = await AnnouncementsModel.find({
                        postedBy: user._id,
                        "classSub.course": courseId
                    })
                    .populate('classSub.course')
                    .populate('classSub.class')
                    .populate('classSub.group')
                    .populate('classSub.subGroup');
                }
            }
            else{
                announcementsList = await AnnouncementsModel.find({postedBy: user._id})
                .populate('classSub.course')
                .populate('classSub.class')
                .populate('classSub.group')
                .populate('classSub.subGroup');
            }
        }
        else{
            for(let course of courseList){

                let announcements=await AnnouncementsModel.find({
                    $and: [
                        {
                            "classSub.course":course,
                            "classSub.class":user.class
                        },
                        {$or: [
                            {"classSub.group": undefined},
                            {"classSub.group": user.group}
                        ]},
                        {$or: [
                            {"classSub.subGroup": undefined},
                            {"classSub.subGroup": user.subGroup}
                        ]}
                    ]
                }).populate('classSub.course');
                if(announcements.length>0){
                    announcementsList = announcementsList.concat(announcements);
                }
            }
        }
        
        if(!req.query.date || req.query.date=="Latest First"){
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
            sort:"",
            branch:""
        };
        // console.log(req.query);
        if(req.query.sub||req.query.date){
            filterList.courseName=req.query.sub,
            filterList.sort=req.query.date
            filterList.branch=req.query.branch
        }
        else{
            filterList.courseName="All",
            filterList.sort="Latest First",
            filterList.branch="All"
        }
        // res.locals.user=await res.locals.user.populate('courses').execPopulate();
        branchList=[]
        if(req.query.sub && req.query.sub!="All"){
            for(let classSubElement of user.classSub){
                let course = await CourseModel.findById(classSubElement.course);
                if(course.name == req.query.sub){
                    let branch = await ClassModel.findById(classSubElement.class);
                    branchList.push(branch);
                }
            }
        }
        else{
            filterList.branch="All"
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
        var courses = [];
        for(let course of user.courses){
            let  courseObject = await CourseModel.findById(course);
            courses.push(courseObject);
        }
        return res.render("announcements",{
            title:"Announcements",
            announcements:announcementsList,
            filterList:filterList,
            courseList: courses,
            courseFilters:courseFilterAdmin,
            branchList: branchList
        });
    }
    catch(err){
        console.log("error :",err);
        return res.redirect('back');
    }
}
module.exports.getSubjects=async function(req,res){
    var subjectList=[];
    let lecturePresent = false, labPresent = false;
    for(let classSubElement of res.locals.user.classSub){
        let course=await CourseModel.findById(classSubElement.course);
        let id=classSubElement.course;
        var obj={
            name:course.name,
            id:id
        };
        if(classSubElement.subGroup) labPresent = true;
        if(classSubElement.group || (!classSubElement.group && !classSubElement.subGroup)) lecturePresent = true;
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
                lecturePresent: lecturePresent,
                labPresent: labPresent
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
        let lecturePresent = false, labPresent = false;
        for(let classSub of user.classSub){
            if(classSub.course == req.body.course){
                if((req.body.class_type=="Lab" && classSub.subGroup) || (req.body.class_type=="Lecture" && (classSub.group || (!classSub.group && !classSub.subGroup)))){
                    var branchElement = await ClassModel.findById(classSub.class);
                    branchList.push({
                        id: classSub.class,
                        name: branchElement.stream
                    })
                }
                
                if(classSub.subGroup) labPresent = true;
                if(classSub.group || (!classSub.group && !classSub.subGroup)) lecturePresent = true;        
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
                branchList:branchList,
                lecturePresent: lecturePresent,
                labPresent: labPresent
            },
            message:"Subjects Sent"
        });
    }
}
// module.exports.getGroups=async function(req,res){
//     if(req.xhr){
//         let user = res.locals.user;
//         let groupList = [];
//         for(let classSub of user.classSub){
//             if(classSub.course == req.body.course && req.body.class==classSub.class){

//                 var groupElement = await GroupModel.findById(classSub.group);
//                 groupList.push({
//                     id: classSub.group,
//                     name: groupElement.groupNumber
//                 })
//             }
//         }
//         let mymap = new Map(); 

//         groupList = groupList.filter(el => { 
//             const val = mymap.get(el.name);
//             if(val) { 
//                 if(el.id < val) { 
//                     mymap.delete(el.name); 
//                     mymap.set(el.name, el.id); 
//                     return true; 
//                 } else { 
//                     return false; 
//                 } 
//             } 
//             mymap.set(el.name, el.id); 
//             return true; 
//         });
//         return res.status(200).json({
//             data:{
//                 groupList:groupList
//             },
//             message:"Subjects Sent"
//         });
//     }
// }
module.exports.getSubGroups=async function(req,res){
    if(req.xhr){
        let user = res.locals.user;
        let groupList = [];
        for(let classSub of user.classSub){
            if(classSub.course == req.body.course && req.body.class==classSub.class){
                if(req.body.classType=="Lecture" && classSub.group){
                    var groupElement = await GroupModel.findById(classSub.group);
                    groupList.push({
                        id: classSub.group,
                        name: groupElement.groupNumber
                    })
                }
                else if(req.body.classType=="Lab" && classSub.subGroup){
                    var subGroupElement = await SubGroupModel.findById(classSub.subGroup);
                    groupList.push({
                        id: classSub.subGroup,
                        name: subGroupElement.subGroupNumber
                    })
                }
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
            message:"Sub-groups Sent"
        });
    }
}

async function addAnnouncements(req, res, classSubList){
    let user = res.locals.user;
    for(let subject in classSubList){
        for(let clas in classSubList[subject]){
            let fullCondition = false;
            if(classSubList[subject][clas]=={}){
                fullCondition = true;
            }
            else{
                let classInfo = await ClassModel.findById(clas);
                if((req.body.class_type=="Lecture" && classInfo.totalGroups == classSubList[subject][clas].groups.length) || (req.body.class_type=="Lab" && classInfo.totalSubGroups == classSubList[subject][clas].groups.length)){
                    fullCondition = true;
                }
            }
            if(fullCondition){
                await AnnouncementsModel.create({
                    title: req.body.title,
                    content: req.body.message,
                    classSub: {
                        course: subject,
                        class: clas
                    },
                    postedBy: user._id
                })
            }
            else{
                for(let groupItem of classSubList[subject][clas].groups){
                    if(req.body.class_type=="Lecture"){
                        await AnnouncementsModel.create({
                            title: req.body.title,
                            content: req.body.message,
                            classSub: {
                                course: subject,
                                class: clas,
                                group: groupItem
                            },
                            postedBy: user._id
                        })
                    }
                    else{
                        await AnnouncementsModel.create({
                            title: req.body.title,
                            content: req.body.message,
                            classSub: {
                                course: subject,
                                class: clas,
                                subGroup: groupItem
                            },
                            postedBy: user._id
                        })
                    }
                }
            }
        }
    }
}

module.exports.announcementCreate=async function(req,res){
    
    try{
        let user=res.locals.user
        if(req.body.subject=="All"){
            let classSubList = {};
            for(let classSubElement of user.classSub){
                if(!classSubList[classSubElement.course]){
                    classSubList[classSubElement.course] = {};
                }
                if(!classSubList[classSubElement.course][classSubElement.class]){
                    classSubList[classSubElement.course][classSubElement.class] = {groups:[]}
                }
                if(req.body.class_type=="Lecture" && !classSubElement.subGroup && classSubList[classSubElement.course][classSubElement.class]!={}){
                    if(classSubElement.group){
                        classSubList[classSubElement.course][classSubElement.class].groups.push(classSubElement.group);
                    }
                    else{
                        classSubList[classSubElement.course][classSubElement.class] = {};
                    }
                }
                else if(req.body.class_type=="Lab" && classSubElement.subGroup){
                    classSubList[classSubElement.course][classSubElement.class].groups.push(classSubElement.subGroup);
                }
            }
            await addAnnouncements(req, res, classSubList);
        }
        else{
            var subject = req.body.subject;
            if(req.body.branch=="All"){
                let classSubList = {};
                for(let classSubElement of user.classSub){
                    if(classSubElement.course == subject){
                        if(!classSubList[classSubElement.course]){
                            classSubList[classSubElement.course] = {};
                        }
                        if(!classSubList[classSubElement.course][classSubElement.class]){
                            classSubList[classSubElement.course][classSubElement.class] = {groups:[]}
                        }
                        if(req.body.class_type=="Lecture" && !classSubElement.subGroup && classSubList[classSubElement.course][classSubElement.class]!={}){
                            if(classSubElement.group){
                                classSubList[classSubElement.course][classSubElement.class].groups.push(classSubElement.group);
                            }
                            else{
                                classSubList[classSubElement.course][classSubElement.class] = {};
                            }
                        }
                        else if(req.body.class_type=="Lab" && classSubElement.subGroup){
                            classSubList[classSubElement.course][classSubElement.class].groups.push(classSubElement.subGroup);
                        }
                    }
                }
                await addAnnouncements(req, res, classSubList);
            }
            else{
                var branch = req.body.branch;
                if(req.body.sub_group == "All"){
                    let classSubList = {};
                    for(let classSubElement of user.classSub){
                        if(classSubElement.course == subject && classSubElement.class == branch){
                            if(!classSubList[classSubElement.course]){
                                classSubList[classSubElement.course] = {};
                            }
                            if(!classSubList[classSubElement.course][classSubElement.class]){
                                classSubList[classSubElement.course][classSubElement.class] = {groups:[]}
                            }
                            if(req.body.class_type=="Lecture" && !classSubElement.subGroup && classSubList[classSubElement.course][classSubElement.class]!={}){
                                if(classSubElement.group){
                                    classSubList[classSubElement.course][classSubElement.class].groups.push(classSubElement.group);
                                }
                                else{
                                    classSubList[classSubElement.course][classSubElement.class] = {};
                                }
                            }
                            else if(req.body.class_type=="Lab" && classSubElement.subGroup){
                                classSubList[classSubElement.course][classSubElement.class].groups.push(classSubElement.subGroup);
                            }
                        }
                    }
                    await addAnnouncements(req, res, classSubList);
                }
                else{
                    var group = req.body.sub_group;
                    let classSubList = {};
                    for(let classSubElement of user.classSub){
                        if(classSubElement.course == subject && classSubElement.class == branch){
                            if(!classSubList[classSubElement.course]){
                                classSubList[classSubElement.course] = {};
                            }
                            if(!classSubList[classSubElement.course][classSubElement.class]){
                                classSubList[classSubElement.course][classSubElement.class] = {groups:[]}
                            }
                            if(req.body.class_type=="Lecture" && classSubElement.group==group){
                                classSubList[classSubElement.course][classSubElement.class].groups.push(classSubElement.group);
                            }
                            else if(req.body.class_type=="Lab" && classSubElement.subGroup==group){
                                console.log("hi");
                                classSubList[classSubElement.course][classSubElement.class].groups.push(classSubElement.subGroup);
                            }
                        }
                    }
                    await addAnnouncements(req, res, classSubList);
                }
            }
        }
        req.flash('success', 'Announcement Posted');
        return res.redirect('back');
    }
    catch(err){
        console.log("error while adding to Db announcements :",err);
        return res.redirect('back');    
    }
}

module.exports.announcementUpdate=async function(req,res){
    await AnnouncementsModel.findByIdAndUpdate(req.params.announcementId,{
        $set: {
            title: req.body.title,
            content: req.body.description
        }
    });
    return res.redirect('back');
};

module.exports.announcementDelete=function(req,res){
    AnnouncementsModel.findByIdAndDelete(req.params.id,function(err){
        if(err){
            console.log("error while deleting announcement :",err);
            return res.redirect('back');
        }
        else{
            req.flash('success', 'Announcement Deleted');
            return res.redirect('back');
        }
    })
    
}