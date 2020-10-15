const RecordedLecturesModel=require('../models/recorded-lecture');
const CourseModel=require('../models/course');
const ClassModel=require('../models/class');
const GroupModel=require('../models/group');
const SubGroupModel=require('../models/sub-group');


module.exports.recordedLecture=async function(req,res){
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
        let recordedLecturesList=[];
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
                    recordedLecturesList = await RecordedLecturesModel.find({
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
                    recordedLecturesList = await RecordedLecturesModel.find({
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
                recordedLecturesList = await RecordedLecturesModel.find({postedBy: user._id})
                .populate('classSub.course')
                .populate('classSub.class')
                .populate('classSub.group')
                .populate('classSub.subGroup');
            }
        }
        else{
            for(let course of courseList){

                let recordedLectures=await RecordedLecturesModel.find({
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
                if(recordedLectures.length>0){
                    recordedLecturesList = recordedLecturesList.concat(recordedLectures);
                }
            }
        }
        
        if(!req.query.date || req.query.date=="Latest First"){
            recordedLecturesList.sort(function(a,b){
                return new Date(b.createdAt) - new Date(a.createdAt);
            });
        }
        else{
            recordedLecturesList.sort(function(a,b){
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
        return res.render("recorded_lectures",{
            title:"Recorded Lectures",
            recordedLectures:recordedLecturesList,
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

module.exports.recordedLectureCreate=async function(req,res){
    
    try{
        console.log(req.body);
        let user=res.locals.user
        if(req.body.subject=="All"){
            for(let subjects of user.classSub){
                await RecordedLecturesModel.create({
                    title: req.body.title,
                    content: req.body.message,
                    classSub: subjects,
                    recordedOn: req.body.lecture_date,
                    postedBy: user._id,
                    link: req.body.lecture_link,
                    references: req.body.lecture_references
                })
            }
        }
        else{
            var subject = req.body.subject;
            if(req.body.branch=="All"){
                for(let classSubElement of user.classSub){
                    if(subject==classSubElement.course){
                        await RecordedLecturesModel.create({
                            title: req.body.title,
                            content: req.body.message,
                            classSub: classSubElement,
                            recordedOn: req.body.lecture_date,
                            postedBy: user._id,
                            link: req.body.lecture_link,
                            references: req.body.lecture_references
                        })
                    }
                }
            }
            else{
                var branch = req.body.branch;
                if(req.body.group == "All"){
                    for(let classSubElement of user.classSub){
                        if(subject==classSubElement.course && branch==classSubElement.class){
                            await RecordedLecturesModel.create({
                                title: req.body.title,
                                content: req.body.message,
                                classSub: classSubElement,
                                recordedOn: req.body.lecture_date,
                                postedBy: user._id,
                                link: req.body.lecture_link,
                                references: req.body.lecture_references
                            })
                        }
                    }
                }
                else{
                    var group = req.body.group;
                    if(req.body.sub_group == "All"){
                        for(let classSubElement of user.classSub){
                            if(subject==classSubElement.course && branch==classSubElement.class && group==classSubElement.group){
                                await RecordedLecturesModel.create({
                                    title: req.body.title,
                                    content: req.body.message,
                                    classSub: classSubElement,
                                    recordedOn: req.body.lecture_date,
                                    postedBy: user._id,
                                    link: req.body.lecture_link,
                                    references: req.body.lecture_references
                                })
                            }
                        }
                    }
                    else{
                        await RecordedLecturesModel.create({
                            title: req.body.title,
                            content: req.body.message,
                            classSub: {
                                course: subject,
                                class: branch,
                                group: group,
                                subGroup: req.body.sub_group
                            },
                            recordedOn: req.body.lecture_date,
                            postedBy: user._id,
                            link: req.body.lecture_link,
                            references: req.body.lecture_references
                        })
                    }
                }
            }
        }
        req.flash('success', 'Recorded Lecture Posted');
        return res.redirect('back')
    }
    catch(err){
        console.log("error while adding to Db Recorded Lectures :",err);
        return res.redirect('back');    
    }
}

module.exports.recordedLectureUpdate=async function(req,res){
    console.log(req.body);
    await RecordedLecturesModel.findByIdAndUpdate(req.params.recordedLectureId,{
        $set: {
            title: req.body.title,
            content: req.body.description,
            link:req.body.link,
            references:req.body.references

        }
    });
    return res.redirect('back');
};

module.exports.recordedLectureDelete=function(req,res){
    RecordedLecturesModel.findByIdAndDelete(req.params.id,function(err){
        if(err){
            console.log("error while deleting recorded lecture :",err);
            return res.redirect('back');
        }
        else{
            req.flash('success', 'Recorded Lecture Deleted');
            return res.redirect('back');
        }
    })
    
}