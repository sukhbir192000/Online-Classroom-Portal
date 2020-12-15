const path = require('path');
const fs = require('fs');
const AssignmentModel=require('../models/assignment');
const AssignmentSubmissionModel=require('../models/assignment_submission');
const CourseModel=require('../models/course');
const ClassModel=require('../models/class');
const FileModel=require('../models/file');


module.exports.assignment=async function(req,res){
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
        let assignmentList=[]; // await AssignmentModel.find({}).sort('-createdAt');
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
                    assignmentList = await AssignmentModel.find({
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
                    assignmentList = await AssignmentModel.find({
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
                assignmentList = await AssignmentModel.find({postedBy: user._id})
                .populate('classSub.course')
                .populate('classSub.class')
                .populate('classSub.group')
                .populate('classSub.subGroup');
            }
        }
        else{
            for(let course of courseList){

                let material=await AssignmentModel.find({
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
                if(material.length>0){
                    assignmentList = assignmentList.concat(material);
                }
            }
        }
        
        if(!req.query.date || req.query.date=="Latest First"){
            assignmentList.sort(function(a,b){
                return new Date(b.createdAt) - new Date(a.createdAt);
            });
        }
        else if(req.query.date=="Deadline First"){
            assignmentList.sort(function(a,b){
                return new Date(a.deadline) - new Date(b.deadline);
            });
        }
        else if(req.query.date=="Deadline Last"){
            assignmentList.sort(function(a,b){
                return new Date(b.deadline) - new Date(a.deadline);
            });
        }
        else{
            assignmentList.sort(function(a,b){
                return new Date(a.createdAt) - new Date(b.createdAt);
            });
        }
        var filterList={
            courseName:"",
            sort:"",
            branch:"",
            status:""
        };
        // console.log(req.query);
        if(req.query.sub||req.query.date){
            filterList.courseName=req.query.sub;
            filterList.sort=req.query.date;
            filterList.branch=req.query.branch;
            filterList.status=req.query.status;
        }
        else{
            filterList.courseName="All";
            filterList.sort="Latest First";
            filterList.branch="All";
            filterList.status="All";
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
        if(req.query.status && req.query.status!="All"){
            let check = false;
            if(req.query.status=="Submitted") check = true;
            for(let i=0;i<assignmentList.length;i++){
                submission = await AssignmentSubmissionModel.findOne({
                    assignmentId: assignmentList[i]._id,
                    postedBy: user._id
                });
                if(!submission || submission.turnedIn==false){
                    if(check){
                        assignmentList.splice(i,1);
                        i--;
                    }
                }
                else{
                    if(!check){
                        assignmentList.splice(i,1);
                        i--;
                    }
                }
            }
        }
        
        return res.render("assignment",{
            title:"Assignment",
            assignments:assignmentList,
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

async function addAssignments(req, res, classSubList){
    let user = res.locals.user;
    let count = 0;
    for(let subject in classSubList){
        for(let clas in classSubList[subject]){
            let fullCondition = false;
            if(Object.keys(classSubList[subject][clas]).length === 0){
                fullCondition = true;
            }
            else{
                let classInfo = await ClassModel.findById(clas);
                if((req.body.class_type=="Lecture" && classInfo.totalGroups == classSubList[subject][clas].groups.length) || (req.body.class_type=="Lab" && classInfo.totalSubGroups == classSubList[subject][clas].groups.length)){
                    fullCondition = true;
                }
            }
            if(fullCondition){
                let assignment = await AssignmentModel.create({
                    title: req.body.title,
                    content: req.body.message,
                    classSub: {
                        course: subject,
                        class: clas
                    },
                    postedBy: user._id,
                    weightage:req.body.weightage,
                    deadline:req.body.lecture_deadline
                })
                count++;
                if(req.files){
                    for(let file in req.files){
                        assignment.files.push({
                            url:AssignmentModel.filePath+req.files[file][0].filename,
                            name:req.files[file][0].originalname
                        });
                    }
                }
                assignment.save();
            }
            else{
                for(let groupItem of classSubList[subject][clas].groups){
                    if(req.body.class_type=="Lecture"){
                        let assignment = await AssignmentModel.create({
                            title: req.body.title,
                            content: req.body.message,
                            classSub: {
                                course: subject,
                                class: clas,
                                group: groupItem
                            },
                            postedBy: user._id,
                            weightage:req.body.weightage,
                            deadline:req.body.lecture_deadline
                        })
                        count++;
                        if(req.files){
                            for(let file in req.files){
                                assignment.files.push({
                                    url:AssignmentModel.filePath+req.files[file][0].filename,
                                    name:req.files[file][0].originalname
                                });
                            }
                        }
                        assignment.save();
                    }
                    else{
                        let assignment = await AssignmentModel.create({
                            title: req.body.title,
                            content: req.body.message,
                            classSub: {
                                course: subject,
                                class: clas,
                                subGroup: groupItem
                            },
                            postedBy: user._id,
                            weightage:req.body.weightage,
                            deadline:req.body.lecture_deadline
                        })
                        count++;
                        if(req.files){
                            for(let file in req.files){
                                assignment.files.push({
                                    url:AssignmentModel.filePath+req.files[file][0].filename,
                                    name:req.files[file][0].originalname
                                });
                            }
                        }
                        assignment.save();
                    }
                }
            }
        }
    }
    return count;
}

module.exports.assignmentCreate=async function(req,res){
    console.log(req.body);
    try{
        let user=res.locals.user;
        let count = 0;
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
            count = await addAssignments(req, res, classSubList);
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
                count = await addAssignments(req, res, classSubList);
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
                    count = await addAssignments(req, res, classSubList);
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
                    count = await addAssignments(req, res, classSubList);
                }
            }
        }
        if(req.files){
            for(let file in req.files){
                await FileModel.create({
                    url:AssignmentModel.filePath+req.files[file][0].filename,
                    timesUsed: count
                });
            }
        }
        req.flash('success', 'Assignment Posted');
        return res.redirect('back');
    }
    catch(err){
        console.log("error while adding to Db assignment :",err);
        return res.redirect('back');    
    }
}

module.exports.assignmentUpdate=async function(req,res){
    try{
        
        let assignment=await AssignmentModel.findById(req.params.assignmentId);
        assignment.title=req.body.title;
        assignment.content=req.body.description;
        let delete_files=(req.body.after_delete_files);
        if(delete_files){
            for(let i=0;i<delete_files.length;i++){
                if(delete_files[i]==""){
                    continue;
                }
                let pathTry=new URL(delete_files[i]);
                let pathName=pathTry.pathname
                pathName=path.normalize(pathName);
                delete_files[i]=pathName;
                delete_files[i] = decodeURI(delete_files[i]);
            }
            for(let i=0;i<assignment.files.length;i++){
             
                if(delete_files.includes(assignment.files[i].url)){
                    var fileElement = await FileModel.findOne({url: assignment.files[i].url});
                    if(fileElement.timesUsed>1){
                        fileElement.timesUsed--;
                        fileElement.save();
                    }
                    else{
                        fs.unlinkSync(path.join(__dirname,'..',assignment.files[i].url));
                        await FileModel.findByIdAndDelete(fileElement._id);
                    }
                    assignment.files.splice(i,1);
                    i--;
                }
                
            }
        }
        assignment.save();
        return res.json(200);
    }  
    catch(err){
        console.log("error while updating assignment:",err);
        return res.redirect('back');
    }
};

module.exports.assignmentDelete=async function(req,res){
    var assignment = await AssignmentModel.findById(req.params.id);
    for(let file of assignment.files){
        var fileElement = await FileModel.findOne({url: file.url});
        if(fileElement.timesUsed>1){
            fileElement.timesUsed--;
            fileElement.save();
        }
        else{
            fs.unlinkSync(path.join(__dirname,'..',file.url));
            await FileModel.findByIdAndDelete(fileElement._id);
        }
    }
    var submissions = await AssignmentSubmissionModel.find({assignmentId: assignment._id});
    for(let submission of submissions){
        for(let i=0;i<submission.files.length;i++){
            fs.unlinkSync(path.join(__dirname,'..',submission.files[i].url));
            console.log("Found and deleted file");
        }
        await AssignmentSubmissionModel.findByIdAndRemove(submission._id);
    }
    await AssignmentModel.findByIdAndDelete(assignment._id);
    req.flash('success', 'Assignment Deleted');
    return res.redirect('back');
}