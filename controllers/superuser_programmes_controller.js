const ClassModel=require('../models/class');
const GroupModel=require('../models/group');
const SubGroupModel=require('../models/sub-group');
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
