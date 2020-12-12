const GroupModel = require('../models/group');
const SubGroupModel = require('../models/sub-group');
const User = require('../models/user');
const UserModel=require('../models/user');
module.exports.login = (req, res) => {
    if (req.isAuthenticated()) {
        return res.redirect('/');
    }
    return res.render('Login_page_final', {
        title: 'Login'
    });
}

module.exports.createSession = function (req, res) {
    req.flash('success', "Logged in");

    return res.redirect('/');
}
module.exports.destroySession = function (req, res) {
    req.flash('success', "Logged Out");
    req.logout();
    return res.redirect('/users/login');
}
module.exports.getProfile = async function (req, res) {
    try {
        
        // console.log("myuser", res.locals.user);
        if(res.locals.user.isAdmin){
            return res.render('adminProfile',{
                title:"Profile"
            })
        }
        else{
            let group = (await GroupModel.findById(res.locals.user.group)).groupNumber
            let subGroup = (await SubGroupModel.findById(res.locals.user.subGroup)).subGroupNumber;
            return res.render('profile', {
                title: "Profile",
                group: group,
                subGroup: subGroup
            });
        }
        
    }
    catch (err) {
        console.log(err);
        return res.redirect('back');
    }
}
module.exports.editProfile = async function (req, res) {
    try {
        if(req.xhr){
            // console.log(req.body);
            let user=await User.findById(res.locals.user._id);
            user.contact=req.body.contact;
            user.dob=req.body.date;
        
            user.save();
            return res.response(200).json({
                msg:"updated Details"
            })
        }
    }
    catch (err) {
        return res.redirect('back');
    }
}