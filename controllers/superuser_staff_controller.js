const UserModel = require('../models/user');
const Crypto=require('crypto');

module.exports.staff= async function(req,res){
    let faculty = await UserModel.find({
        isAdmin: true,
        isSuperUser: false,
        dept: res.locals.user.dept
    });
    return res.render('superuser/staff', {
        title: 'Faculty',
        facultyList: faculty
    });
}

module.exports.staffCreate=async function(req,res){
    try{
        let faculty = await UserModel.create({
            email: req.body.email,
            isAdmin: true,
            name: req.body.name,
            dept: res.locals.user.dept,
            password: Crypto.randomBytes(20).toString('hex')
        });
        return res.status(200).json(faculty);
    }
    catch(err){
        console.log("Error while adding faculty ", err);
        return res.status(200).json({
            err: true
        });
    }
}

module.exports.staffUpdate=async function(req,res){
    try{
        let faculty=await UserModel.findById(req.body.id);
        faculty.name = req.body.name;
        faculty.email = req.body.email;
        faculty.save();
        return res.status(200).json({
            faculty:faculty
        });
    }
    catch(err){
        console.log(err);
        return res.status(400);
    }
}

module.exports.staffDelete=async function(req,res){
    try{
        let faculty=await UserModel.findById(req.body.id);
        if(faculty.classSub.length==0){
            await UserModel.findByIdAndDelete(req.body.id);
        }
        else{
            return res.status(200).json({
                err: true
            })
        }
        return res.status(200).json({
            faculty:faculty   
        });
    }
    catch(err){
        console.log(err);
        return res.status(400);
    }
}
