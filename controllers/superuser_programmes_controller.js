const ClassModel=require('../models/class')
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
        return res.status(200).json(programme);
    }
    catch(err){
        console.log("Error while adding class ", err);
        return res.status(200).json({
            err: true
        });
    }
}

module.exports.programmeUpdate=async function(req,res){
    try{
        let programme=await ClassModel.findById(req.body.id);
      
        programme.save();
        return res.status(200).json({
            programme:programme
        });
    }
    catch(err){
        console.log(err);
        return res.status(400);
    }
}

module.exports.programmeDelete=async function(req,res){
    try{
        let classDeleted=await ClassModel.findByIdAndDelete(req.body.id);
        return res.status(200).json({
            classDeleted:classDeleted   
        });
    }
    catch(err){
        console.log(err);
        return res.status(400);
    }
}
