const path = require('path');
const fs = require('fs');
const StudyMaterialsModel=require('../models/study-material');
const CourseModel=require('../models/course');
const ClassModel=require('../models/class');
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

async function addStudyMaterials(req, res, classSubList){
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
                let studyMaterial = await StudyMaterialsModel.create({
                    title: req.body.title,
                    content: req.body.message,
                    classSub: {
                        course: subject,
                        class: clas
                    },
                    postedBy: user._id
                })
                count++;
                if(req.files){
                    for(let file in req.files){
                        studyMaterial.files.push({
                            url:StudyMaterialsModel.filePath+req.files[file][0].filename,
                            name:req.files[file][0].originalname
                        });
                    }
                }
                studyMaterial.save();
            }
            else{
                for(let groupItem of classSubList[subject][clas].groups){
                    if(req.body.class_type=="Lecture"){
                        let studyMaterial = await StudyMaterialsModel.create({
                            title: req.body.title,
                            content: req.body.message,
                            classSub: {
                                course: subject,
                                class: clas,
                                group: groupItem
                            },
                            postedBy: user._id
                        })
                        count++;
                        if(req.files){
                            for(let file in req.files){
                                studyMaterial.files.push({
                                    url:StudyMaterialsModel.filePath+req.files[file][0].filename,
                                    name:req.files[file][0].originalname
                                });
                            }
                        }
                        studyMaterial.save();
                    }
                    else{
                        let studyMaterial = await StudyMaterialsModel.create({
                            title: req.body.title,
                            content: req.body.message,
                            classSub: {
                                course: subject,
                                class: clas,
                                subGroup: groupItem
                            },
                            postedBy: user._id
                        })
                        count++;
                        if(req.files){
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
    }
    return count;
}

module.exports.studyMaterialCreate=async function(req,res){
    try{
        let user=res.locals.user
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
            count = await addStudyMaterials(req, res, classSubList);
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
                count = await addStudyMaterials(req, res, classSubList);
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
                    count = await addStudyMaterials(req, res, classSubList);
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
                    count = await addStudyMaterials(req, res, classSubList);
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
        let studyMaterial=await StudyMaterialsModel.findById(req.params.studyMaterialId);
        studyMaterial.title=req.body.title;
        studyMaterial.content=req.body.description;
        let delete_files=req.body.after_delete_files;
        if(delete_files){
            for(let i=0;i<delete_files.length;i++){
                let pathTry=new URL(delete_files[i]);
                let pathName=pathTry.pathname
                pathName=path.normalize(pathName);
                delete_files[i]=pathName;
                delete_files[i] = decodeURI(delete_files[i]);
            }
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
                }
                
            }
        }
        studyMaterial.save();
        return res.json(200);
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
};