const User = require('../models/user');
const UserModel=require('../models/user');
module.exports.checkFirstTime= async function(req,res,next){
    console.log(res.locals);
    try{let user= await UserModel.findById(res.locals.user._id);
        console.log("current User:",user);
        if(user){
    // console.log("current user : ",user);
            if(user.sid||user.isAdmin){
                // console.log("source url",req.url);
                return next();
            }
            else{
                console.log("firstimers")
                return res.redirect('/users/registerLocal');
            }
        }
        // else{
        //     return res.redirect('back');
        // }
    }
    catch(err){
        console.log("error:",err);
        return res.redirect('back');
    }
}
module.exports.notRegistered=async function(req,res,next){
    try{let user= await UserModel.findById(res.locals.user._id);
        console.log("current User:",user);
        if(user){
    // console.log("current user : ",user);
            if(!(user.sid||user.isAdmin)){
                // console.log("source url",req.url);
                return next();
            }
            else{
                
                return res.redirect('/');
            }
        }
        else{
            return next();
        }
        // else{
        //     return res.redirect('back');
        // }
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
    console.log("data:",req.body);
    let user=await UserModel.findById(res.locals.user._id);
    user.sid=req.body.sid;
    user.name=req.body.firstName+" "+req.body.lastName;
    user.save();

}