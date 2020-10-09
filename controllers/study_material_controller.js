const path = require('path');
const fs = require('fs');
const StudyMaterialsModel=require('../models/study-material');
const CourseModel=require('../models/course');
const ClassModel=require('../models/class');
const GroupModel=require('../models/group');
const SubGroupModel=require('../models/sub-group');
const FileModel=require('../models/file');


module.exports.studyMaterial=async function(req,res){
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
        let studyMaterialList=[]; // await StudyMaterialsModel.find({}).sort('-createdAt');
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
                    studyMaterialList = await StudyMaterialsModel.find({
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
                    studyMaterialList = await StudyMaterialsModel.find({
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
                studyMaterialList = await StudyMaterialsModel.find({postedBy: user._id})
                .populate('classSub.course')
                .populate('classSub.class')
                .populate('classSub.group')
                .populate('classSub.subGroup');
            }
        }
        else{
            for(let course of courseList){

                let material=await StudyMaterialsModel.find({
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
                    studyMaterialList = studyMaterialList.concat(material);
                }
            }
        }
        
        if(!req.query.date || req.query.date=="Latest First"){
            studyMaterialList.sort(function(a,b){
                return new Date(b.createdAt) - new Date(a.createdAt);
            });
        }
        else{
            studyMaterialList.sort(function(a,b){
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
        return res.render("study_material",{
            title:"Study Material",
            studyMaterials:studyMaterialList,
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
module.exports.studyMaterialCreate=async function(req,res){
    try{
        let user=res.locals.user
        console.log(req.files);
        let count = 0;
        if(req.body.subject=="All"){
            for(let subjects of user.classSub){
                let studyMaterial=await StudyMaterialsModel.create({
                    title: req.body.title,
                    content: req.body.message,
                    classSub: subjects,
                    postedBy: user._id
                })
                count++;
                if(req.files){
                    console.log("Files added");
                    for(let file in req.files){
                        studyMaterial.files.push({
                            url:StudyMaterialsModel.filePath+req.files[file][0].filename,
                            name:req.files[file][0].originalname
                        });
                    }
                }
                studyMaterial.save();
            }
        }
        else{
            var subject = req.body.subject;
            if(req.body.branch=="All"){
                for(let classSubElement of user.classSub){
                    if(subject==classSubElement.course){
                        let studyMaterial=await StudyMaterialsModel.create({
                            title: req.body.title,
                            content: req.body.message,
                            classSub: classSubElement,
                            postedBy: user._id
                        })
                        count++;
                        if(req.files){
                            console.log("Files added");
                            for(let file in req.files){
                                studyMaterial.files.push({
                                    url:StudyMaterialsModel.filePath+req.files[file][0].filename,
                                    name:req.files[file][0].originalname
                                });
                            }
                        }
                        studyMaterial.save();
                    }
                }
            }
            else{
                var branch = req.body.branch;
                if(req.body.group == "All"){
                    for(let classSubElement of user.classSub){
                        if(subject==classSubElement.course && branch==classSubElement.class){
                            let studyMaterial=await StudyMaterialsModel.create({
                                title: req.body.title,
                                content: req.body.message,
                                classSub: classSubElement,
                                postedBy: user._id
                            })
                            count++;
                            if(req.files){
                                console.log("Files added");
                                for(let file in req.files){
                                    studyMaterial.files.push({
                                        url:StudyMaterialsModel.filePath+req.files[file][0].filename,
                                        name:req.files[file][0].originalname
                                    });
                                }
                            }
                            studyMaterial.save();
                        }
                    }
                }
                else{
                    var group = req.body.group;
                    if(req.body.sub_group == "All"){
                        for(let classSubElement of user.classSub){
                            if(subject==classSubElement.course && branch==classSubElement.class && group==classSubElement.group){
                                let studyMaterial=await StudyMaterialsModel.create({
                                    title: req.body.title,
                                    content: req.body.message,
                                    classSub: classSubElement,
                                    postedBy: user._id
                                })
                                count++;
                                if(req.files){
                                    console.log("Files added");
                                    for(let file in req.files){
                                        studyMaterial.files.push({
                                            url:StudyMaterialsModel.filePath+req.files[file][0].filename,
                                            name:req.files[file][0].originalname
                                        });
                                    }
                                }
                                studyMaterial.save();
                            }
                        }
                    }
                    else{
                        let studyMaterial=await StudyMaterialsModel.create({
                            title: req.body.title,
                            content: req.body.message,
                            classSub: {
                                course: subject,
                                class: branch,
                                group: group,
                                subGroup: req.body.sub_group
                            },
                            postedBy: user._id
                        })
                        count++;
                        if(req.files){
                            console.log("Files added");
                            for(let file in req.files){
                                studyMaterial.files.push({
                                    url:StudyMaterialsModel.filePath+req.files[file][0].filename,
                                    name:req.files[file][0].originalname
                                });
                            }
                        }
                        studyMaterial.save();
                    }
                }
            }
        }
        if(req.files){
            for(let file in req.files){
                await FileModel.create({
                    url:StudyMaterialsModel.filePath+req.files[file][0].filename,
                    timesUsed: count
                });
            }
        }
        req.flash('success', 'Study Material Posted');
        return res.redirect('back');
    }
    catch(err){
        console.log("error while adding to Db study materials :",err);
        return res.redirect('back');    
    }
}

module.exports.studyMaterialUpdate=async function(req,res){
    try{
        // console.log(req.body);
        let studyMaterial=await StudyMaterialsModel.findById(req.params.studyMaterialId);
        studyMaterial.title=req.body.title;
        studyMaterial.content=req.body.description;
        let delete_files=(req.body.after_delete_files).split(',');
        
     
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
        console.log(delete_files);
        for(let i=0;i<studyMaterial.files.length;i++){
         
            if(delete_files.includes(studyMaterial.files[i].url)){
                var fileElement = await FileModel.findOne({url: studyMaterial.files[i].url});
                if(fileElement.timesUsed>1){
                    fileElement.timesUsed--;
                    fileElement.save();
                }
                else{
                    fs.unlinkSync(path.join(__dirname,'..',studyMaterial.files[i].url));
                    await FileModel.findByIdAndDelete(fileElement._id);
                }
                studyMaterial.files.splice(i,1);
                i--;
                console.log("edited array")
            }
            
        }
        studyMaterial.save();
        return res.redirect('back');
    }  
    catch(err){
        console.log("error while updating study material:",err);
        return res.redirect('back');
    }
};

module.exports.studyMaterialDelete=async function(req,res){
    var studyMaterial = await StudyMaterialsModel.findById(req.params.id);
    for(let file of studyMaterial.files){
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
    await StudyMaterialsModel.findByIdAndDelete(studyMaterial._id);
    req.flash('success', 'Study Material Deleted');
    return res.redirect('back');
}