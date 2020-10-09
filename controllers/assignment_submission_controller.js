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
    if(req.xhr){
        let submission = await AssignmentSubmissionModel.findOne({
            postedBy:res.locals.user,
            assignmentId:req.params.assignmentId
        });
        let urlArray = [];
        if(req.files){
            for(let file of req.files){
                submission.files.push({
                    url:AssignmentSubmissionModel.filePath+file.filename,
                    name:file.originalname
                });
                urlArray.push({
                    url:AssignmentSubmissionModel.filePath+file.filename,
                    name:file.originalname
                });
            }
        }
        submission.save();
        return res.status(200).json({
            urlArray: urlArray
        });
    }
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

module.exports.assignmentSubmissionSubmit=async function(req,res){
    try{
        let submission = await AssignmentSubmissionModel.findOne({
            postedBy:res.locals.user,
            assignmentId:req.params.assignmentId
        }); 
        submission.turnedIn=!submission.turnedIn;
        submission.save();
        return res.status('200').json({
            message:"Toggled status"
        })
    }
    catch(err){
        console.log(err);
        return res.status('404').json({
            message:"Page not found"
        })

    }
    
    
}

module.exports.assignmentSubmissionDelete=async function(req,res){
   
    try{
        let pathTry=new URL(req.body.url);
        let pathName=pathTry.pathname
        pathName=path.normalize(pathName)
        let submission = await AssignmentSubmissionModel.findOne({
            postedBy:res.locals.user,
            assignmentId:req.params.assignmentId
        }); 
        for(let i=0;i<submission.files.length;i++){
            if(submission.files[i].url==pathName){
                fs.unlinkSync(path.join(__dirname,'..',submission.files[i].url));
                submission.files.splice(i,1);
                console.log("Found and deleted file");
                break;
            }
        }
        submission.save();
        return res.status('200').json({
            message:"Deleted file"
        })
    }
    catch(err){
        console.log(err);
        return res.status('404').json({
            message:"Page not found"
        })
    }
}