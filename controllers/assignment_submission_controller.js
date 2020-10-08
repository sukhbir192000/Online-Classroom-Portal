const path = require('path');
const fs = require('fs');
const AssignmentSubmissionModel=require('../models/assignment_submission');
const AssignmentModel=require('../models/assignment');
const CourseModel=require('../models/course');
const ClassModel=require('../models/class');
const GroupModel=require('../models/group');
const SubGroupModel=require('../models/sub-group');
const FileModel=require('../models/file');


module.exports.assignmentSubmission=async function(req,res){
    try{
        let assignment=await AssignmentModel.findById(req.params.assignmentId)
        .populate('classSub.course');
        let submission=await AssignmentSubmissionModel.findOne({
            postedBy:res.locals.user,
            assignmentId:req.params.assignmentId
        });
        if(!submission){
            submission=await AssignmentSubmissionModel.create({
                postedBy:res.locals.user,
                assignmentId:req.params.assignmentId
            });
        }
        return res.render('assignment_submission',{
            title:"Submission",
            assignment:assignment,
            submission:submission
        })
        
    }
    catch(err){
        console.log("Error while making assignment submission :",err);
    }
}


module.exports.assignmentSubmissionCreate=async function(req,res){
    console.log("HI: ", req.body);
    return res.send("RESPONSE");
    // try{
    //     let user=res.locals.user
    //     console.log(req.files);
    //     let count = 0;
    //     if(req.body.subject=="All"){
    //         for(let subjects of user.classSub){
    //             let assignment=await AssignmentModel.create({
    //                 title: req.body.title,
    //                 content: req.body.message,
    //                 classSub: subjects,
    //                 postedBy: user._id,
    //                 weightage:req.body.weightage,
    //                 deadline:req.body.lecture_deadline
    //             })
    //             count++;
    //             if(req.files){
    //                 console.log("Files added");
    //                 for(let file in req.files){
    //                     assignment.files.push({
    //                         url:AssignmentModel.filePath+req.files[file][0].filename,
    //                         name:req.files[file][0].originalname
    //                     });
    //                 }
    //             }
    //             assignment.save();
    //         }
    //     }
    //     else{
    //         var subject = req.body.subject;
    //         if(req.body.branch=="All"){
    //             for(let classSubElement of user.classSub){
    //                 if(subject==classSubElement.course){
    //                     let assignment=await AssignmentModel.create({
    //                         title: req.body.title,
    //                         content: req.body.message,
    //                         classSub: classSubElement,
    //                         postedBy: user._id,
    //                         weightage:req.body.weightage,
    //                         deadline:req.body.lecture_deadline
    //                     })
    //                     count++;
    //                     if(req.files){
    //                         console.log("Files added");
    //                         for(let file in req.files){
    //                             assignment.files.push({
    //                                 url:AssignmentModel.filePath+req.files[file][0].filename,
    //                                 name:req.files[file][0].originalname
    //                             });
    //                         }
    //                     }
    //                     assignment.save();
    //                 }
    //             }
    //         }
    //         else{
    //             var branch = req.body.branch;
    //             if(req.body.group == "All"){
    //                 for(let classSubElement of user.classSub){
    //                     if(subject==classSubElement.course && branch==classSubElement.class){
    //                         let assignment=await AssignmentModel.create({
    //                             title: req.body.title,
    //                             content: req.body.message,
    //                             classSub: classSubElement,
    //                             postedBy: user._id,
    //                             weightage:req.body.weightage,
    //                             deadline:req.body.lecture_deadline
    //                         })
    //                         count++;
    //                         if(req.files){
    //                             console.log("Files added");
    //                             for(let file in req.files){
    //                                 assignment.files.push({
    //                                     url:AssignmentModel.filePath+req.files[file][0].filename,
    //                                     name:req.files[file][0].originalname
    //                                 });
    //                             }
    //                         }
    //                         assignment.save();
    //                     }
    //                 }
    //             }
    //             else{
    //                 var group = req.body.group;
    //                 if(req.body.sub_group == "All"){
    //                     for(let classSubElement of user.classSub){
    //                         if(subject==classSubElement.course && branch==classSubElement.class && group==classSubElement.group){
    //                             let assignment=await AssignmentModel.create({
    //                                 title: req.body.title,
    //                                 content: req.body.message,
    //                                 classSub: classSubElement,
    //                                 postedBy: user._id,
    //                                 weightage:req.body.weightage,
    //                                 deadline:req.body.lecture_deadline
                                    
    //                             })
    //                             count++;
    //                             if(req.files){
    //                                 console.log("Files added");
    //                                 for(let file in req.files){
    //                                     assignment.files.push({
    //                                         url:AssignmentModel.filePath+req.files[file][0].filename,
    //                                         name:req.files[file][0].originalname
    //                                     });
    //                                 }
    //                             }
    //                             assignment.save();
    //                         }
    //                     }
    //                 }
    //                 else{
    //                     let assignment=await AssignmentModel.create({
    //                         title: req.body.title,
    //                         content: req.body.message,
    //                         classSub: {
    //                             course: subject,
    //                             class: branch,
    //                             group: group,
    //                             subGroup: req.body.sub_group
    //                         },
    //                         postedBy: user._id,
    //                         weightage:req.body.weightage,
    //                         deadline:req.body.lecture_deadline
    //                     })
    //                     count++;
    //                     if(req.files){
    //                         console.log("Files added");
    //                         for(let file in req.files){
    //                             assignment.files.push({
    //                                 url:AssignmentModel.filePath+req.files[file][0].filename,
    //                                 name:req.files[file][0].originalname
    //                             });
    //                         }
    //                     }
    //                     assignment.save();
    //                 }
    //             }
    //         }
    //     }
    //     if(req.files){
    //         for(let file in req.files){
    //             await FileModel.create({
    //                 url:AssignmentModel.filePath+req.files[file][0].filename,
    //                 timesUsed: count
    //             });
    //         }
    //     }
    //     req.flash('success', 'Assignment Posted');
    //     return res.redirect('back');
    // }
    // catch(err){
    //     console.log("error while adding to Db assignment :",err);
    //     return res.redirect('back');    
    // }
}

module.exports.assignmentSubmissionUpdate=async function(req,res){
    try{
        // console.log(req.body);
        let assignment=await AssignmentModel.findById(req.params.assignmentId);
        assignment.title=req.body.title;
        assignment.content=req.body.description;
        let delete_files=(req.body.after_delete_files).split(',');
        
     
        for(let i=0;i<delete_files.length;i++){
            // console.log(delete_files[i]);
            let pathTry=new URL(delete_files[i]);
            let pathName=pathTry.pathname
            pathName=path.normalize(pathName);
            delete_files[i]=pathName;
            
        }
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

