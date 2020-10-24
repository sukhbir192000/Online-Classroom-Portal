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


module.exports.assignmentCreate=async function(req,res){
    console.log(req.body);
    try{
        let user=res.locals.user
        console.log(req.files);
        let count = 0;
        if(req.body.subject=="All"){
            for(let subjects of user.classSub){
                let assignment=await AssignmentModel.create({
                    title: req.body.title,
                    content: req.body.message,
                    classSub: subjects,
                    postedBy: user._id,
                    weightage:req.body.weightage,
                    deadline:req.body.lecture_deadline
                })
                count++;
                if(req.files){
                    console.log("Files added");
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
        else{
            var subject = req.body.subject;
            if(req.body.branch=="All"){
                for(let classSubElement of user.classSub){
                    if(subject==classSubElement.course){
                        let assignment=await AssignmentModel.create({
                            title: req.body.title,
                            content: req.body.message,
                            classSub: classSubElement,
                            postedBy: user._id,
                            weightage:req.body.weightage,
                            deadline:req.body.lecture_deadline
                        })
                        count++;
                        if(req.files){
                            console.log("Files added");
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
            else{
                var branch = req.body.branch;
                if(req.body.group == "All"){
                    for(let classSubElement of user.classSub){
                        if(subject==classSubElement.course && branch==classSubElement.class){
                            let assignment=await AssignmentModel.create({
                                title: req.body.title,
                                content: req.body.message,
                                classSub: classSubElement,
                                postedBy: user._id,
                                weightage:req.body.weightage,
                                deadline:req.body.lecture_deadline
                            })
                            count++;
                            if(req.files){
                                console.log("Files added");
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
                else{
                    var group = req.body.group;
                    if(req.body.sub_group == "All"){
                        for(let classSubElement of user.classSub){
                            if(subject==classSubElement.course && branch==classSubElement.class && group==classSubElement.group){
                                let assignment=await AssignmentModel.create({
                                    title: req.body.title,
                                    content: req.body.message,
                                    classSub: classSubElement,
                                    postedBy: user._id,
                                    weightage:req.body.weightage,
                                    deadline:req.body.lecture_deadline
                                    
                                })
                                count++;
                                if(req.files){
                                    console.log("Files added");
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
                    else{
                        let assignment=await AssignmentModel.create({
                            title: req.body.title,
                            content: req.body.message,
                            classSub: {
                                course: subject,
                                class: branch,
                                group: group,
                                subGroup: req.body.sub_group
                            },
                            postedBy: user._id,
                            weightage:req.body.weightage,
                            deadline:req.body.lecture_deadline
                        })
                        count++;
                        if(req.files){
                            console.log("Files added");
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
        console.log("hi",req.body);
        let delete_files=(req.body.after_delete_files).split(',');
        console.log(delete_files);
     
        for(let i=0;i<delete_files.length;i++){
            if(delete_files[i]==""){
                continue;
            }
            // console.log(delete_files[i]);
            let pathTry=new URL(delete_files[i]);
            let pathName=pathTry.pathname
            pathName=path.normalize(pathName);
            delete_files[i]=pathName;
            
        }
        console.log("hi2");
        console.log(delete_files);
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
                console.log("edited array")
            }
            
        }
        assignment.save();
        return res.redirect('back');
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