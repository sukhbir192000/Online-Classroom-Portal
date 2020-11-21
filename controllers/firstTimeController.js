const UserModel=require('../models/user');
const ClassModel=require('../models/class');
const GroupModel = require('../models/group');
const SubGroupModel = require('../models/sub-group')
module.exports.checkFirstTime= async function(req,res,next){
    try{
        let user= await UserModel.findById(res.locals.user._id);
        if(user){
            if(user.sid||user.isAdmin){
                return next();
            }
            else{
                console.log("firstimers")
                return res.redirect('/users/registerLocal');
            }
        }
    }
    catch(err){
        console.log("error:",err);
        return res.redirect('back');
    }
}
module.exports.notRegistered=async function(req,res,next){
    try{
        let user= await UserModel.findById(res.locals.user._id);
        if(user){
            if(!(user.sid||user.isAdmin)){
                return next();
            }
            else{
                
                return res.redirect('/');
            }
        }
        else{
            return next();
        }
    }
    catch(err){
        console.log("error:",err);
        return res.redirect('back');
    }

}
module.exports.registerPage=function(req,res){
    return res.render('registration_page',{
        title:"Register"
    })
}
module.exports.registerUser=async function(req,res){
    let req_class = await ClassModel.findOne({
        stream: req.body.branch,
        passingOutYear: parseInt(req.body.year)
    });
    let req_group = await GroupModel.findOne({
        groupNumber: parseInt(req.body.group),
        class: req_class._id
    });
    let req_sub_group = await SubGroupModel.findOne({
        subGroupNumber: parseInt(req.body.labGroup),
        class: req_class._id
    });
    let user=await UserModel.findById(res.locals.user._id);
    user.sid=req.body.sid;
    user.name=req.body.firstName+" "+req.body.lastName;
    user.class=req_class._id;
    user.group=req_group._id;
    user.subGroup=req_sub_group._id;
    user.save();
    req_class.student.push(user._id);
    req_group.student.push(user._id);
    req_sub_group.student.push(user._id);
    req_class.save();
    req_group.save();
    req_sub_group.save();
    return res.redirect('/');
}

module.exports.getGroupNumber=async function(req, res){
    try{
        let req_class = await ClassModel.findOne({
            stream: req.params.branch,
            passingOutYear: parseInt(req.params.year)
        });
        return res.status(200).json({
            totalGroups: req_class.totalGroups,
            totalSubGroups: req_class.totalSubGroups
        })
    }
    catch(err){
        console.log("Error while getting number of groups and sub-groups \n", err);
        return res.status(400);
    }
}