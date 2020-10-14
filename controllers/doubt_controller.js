const DoubtsModel=require('../models/doubt');
const CourseModel=require('../models/course');
const ClassModel=require('../models/class');
const GroupModel=require('../models/group');
const SubGroupModel=require('../models/sub-group');
const ReplyModel=require('../models/reply');
const UserModel=require('../models/user');
module.exports.doubts=async function(req,res){
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
        let doubtsList=[];
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
                    doubtsList = await DoubtsModel.find({
                        postedFor: user._id,
                        "classSub.course":courseId,
                        "classSub.class":classId
                    }).populate('classSub.course')
                    .populate('classSub.class')
                    .populate('replies')
                    .populate('postedBy');
                    
                    
                }
                else{
                    let courseId=await CourseModel.find({
                        name:req.query.sub
                    });
                    courseId = courseId[0]._id;
                    doubtsList = await DoubtsModel.find({
                        postedFor: user._id,
                        "classSub.course": courseId
                    })
                    .populate('classSub.course')
                    .populate('classSub.class')
                    .populate('replies')
                    .populate('postedBy');
                    
                }
            }
            else{
                doubtsList = await DoubtsModel.find({postedFor: user._id})
                .populate('classSub.course')
                .populate('classSub.class')
                .populate('replies')
                .populate('postedBy');
               
            }
        }
        else{
            for(let course of courseList){

                let doubts=await DoubtsModel.find({
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
                        },
                        {
                            $or:[
                                {
                                    isPrivate:false
                                },
                                {
                                    postedBy:res.locals.user
                                }
                            ]
                        }
                    ]
                }).populate('classSub.course')
                .populate('replies')
                .populate('postedBy');
                if(doubts.length>0){
                    doubtsList = doubtsList.concat(doubts);
                }
            }
        }
        
        if(!req.query.date || req.query.date=="Latest First"){
            doubtsList.sort(function(a,b){
                return new Date(b.createdAt) - new Date(a.createdAt);
            });
        }
        else{
            doubtsList.sort(function(a,b){
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
        console.log(doubtsList);
        return res.render("doubts",{
            title:"Doubts",
            doubts:doubtsList,
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

module.exports.doubtCreate=async function(req,res){
    try{
        console.log(req.body);
        let user=res.locals.user
        var subject = req.body.subject;
        let privateCheck;
        if(req.body.isPrivate=="on"){
            privateCheck=true;
        }
        else{
            privateCheck=false;
        }
        
        let teachers=(await CourseModel.findById(subject)).teachers;
        let teachersList=teachers.filter(async function(teacherId){
            let conditionTeacher=false;
            let teacher=await UserModel.findById(teacherId);
            if((
                    teacher.classSub.class==user.classs
                )&&(
                    (!teacher.classSub.group)||(
                        (teacher.classSub.group==user.group)&&(
                            (!teacher.classSub.subGroup)||(teacher.classSub.subGroup==user.subGroup)
                        )
                    )
            )){
                conditionTeacher=true;
            }
            return conditionTeacher;
        })

        await DoubtsModel.create({
            title: req.body.title,
            content: req.body.message,
            classSub: {
                course: subject,
                class: user.class,
                group: user.group,
                subGroup: user.subGroup
            },
            isPrivate:privateCheck,
            postedBy: user._id,
            postedFor:teachersList
          
        })
    
    
        req.flash('success', 'Doubt Posted');
        return res.redirect('back')
    }
    catch(err){
        console.log("error while adding to Db Recorded Lectures :",err);
        return res.redirect('back');    
    }
}

module.exports.replyCreate=async function(req,res){
    try{
        // console.log("hi");
        if(req.xhr){
            let doubt=await DoubtsModel.findById(req.body.doubtId);
            let newReply=await ReplyModel.create({
                content:req.body.content,
                postedBy:res.locals.user._id,

            })
            doubt.replies.push(newReply._id);
            doubt.save();
            return res.status(200).json({
                msg:"added reply",
                user:res.locals.user.name 
            })
        }
    }
    catch(err){
        console.log("Error while creating reply");
        return res.status(400).json({
            msg:"file not found"
        })
    }
}