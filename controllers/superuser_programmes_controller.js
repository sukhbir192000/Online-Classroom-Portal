const ClassModel=require('../models/class');
const Group = require('../models/group');
const GroupModel=require('../models/group');
const SubGroupModel=require('../models/sub-group');
const UserModel=require('../models/user');
module.exports.programme=async function(req,res){
    let programList=await ClassModel.find({
        stream:res.locals.user.dept
    });
    return res.render('superuser/programmes',{
        title: 'Programmes',
        programList:programList
    });
}
module.exports.programmeCreate=async function(req,res){
    try{
        req.body.stream=res.locals.user.dept;
        let programme = await ClassModel.create(req.body);
        for(let i=1;i<=req.body.totalGroups;i++){
            await GroupModel.create({
                groupNumber: i,
                class: programme._id
            });
        }
        for(let i=1;i<=req.body.totalSubGroups;i++){
            await SubGroupModel.create({
                subGroupNumber: i,
                class: programme._id
            });
        }
        return res.status(200).json(programme);
    }
    catch(err){
        console.log("Error while adding class ", err);
        return res.status(200).json({
            err: true
        });
    }
}

// module.exports.programmeUpdate=async function(req,res){
//     try{
//         let programme=await ClassModel.findById(req.body.id);
      
//         programme.save();
//         return res.status(200).json({
//             programme:programme
//         });
//     }
//     catch(err){
//         console.log(err);
//         return res.status(400);
//     }
// }

module.exports.programmeDelete=async function(req,res){
    try{
        let classDeleted=await ClassModel.findById(req.body.id);
        if(classDeleted.students && classDeleted.students.length>0){
            return res.status(200).json({
                err: true
            })
        }
        else{
            await GroupModel.deleteMany({class: req.body.id});
            await SubGroupModel.deleteMany({class: req.body.id});
            classDeleted=await ClassModel.findByIdAndDelete(req.body.id);
        }
        return res.status(200).json({
            classDeleted:classDeleted   
        });
    }
    catch(err){
        console.log(err);
        return res.status(400);
    }
}
module.exports.studentDetails = async function(req,res){
    try{
        console.log("hi");
        let class_obj = await ClassModel.findById(req.params.classId).populate('student');
        // class_obj=class_obj.execPopulate('student.group')
        
        // console.log(class_obj);
        return res.render('superuser/studentDetails',{
            title:"Student Details",
            studentList: class_obj.student
        });
    }
    catch(err){
        console.log(err);
        return redirect('back');
    }
}
module.exports.getDetails=async function(req,res){
    try{
        // console.log("Ajax hit")
        // console.log(req.body);
        let userReq=await UserModel.findById(req.body.id).populate('courses');
        // console.log(userReq);
        let groupNumber=await GroupModel.findById(userReq.group);
        let subGroupNumber=await SubGroupModel.findById(userReq.subGroup);
        
        return res.status(200).json({
            groupNumber:groupNumber.groupNumber,
            subGroupNumber:subGroupNumber.subGroupNumber,
            userReq:userReq
        })
    }
    catch(err){
        // console.log("hi2",err);
        return res.status(400);

    }
}
module.exports.updateDetails=function(req,res){
    try{
        console.log(req.body);
        return res.status(200).json({});
    }
    catch(err){
        return res.status(400);
    }
    
}