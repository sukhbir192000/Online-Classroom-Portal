const GroupModel = require('../models/group');
const SubGroupModel = require('../models/sub-group');
const User = require('../models/user');
const UserModel = require('../models/user');
const CourseModel = require('../models/course');
const Course = require('../models/course');
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
        if (res.locals.user.isAdmin) {
            return res.render('adminProfile', {
                title: "Profile"
            })
        }
        else {
            let userCourseList = await CourseModel.find({
                _id: { $in: res.locals.user.courses }
            })
            console.log("mycourses:", userCourseList);
            let courseList = await CourseModel.find({
                isActive:true,
                year:res.locals.user.currentYear,
                offered_to:res.locals.user.dept
            })
            let group = (await GroupModel.findById(res.locals.user.group)).groupNumber
            let subGroup = (await SubGroupModel.findById(res.locals.user.subGroup)).subGroupNumber;
            return res.render('profile', {
                title: "Profile",
                courseList: courseList,
                userCourseList: userCourseList,
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
        if (req.xhr) {
            // console.log(req.body);
            let user = await User.findById(res.locals.user._id);
            user.contact = req.body.contact;
            user.dob = req.body.date;
            user.currentYear = req.body.currentYear

            user.save();
            return res.response(200).json({
                msg: "updated Details"
            })
        }
    }
    catch (err) {
        return res.redirect('back');
    }
}
module.exports.editCourses = async function (req, res) {
    try {
        if (req.xhr) {
            let user = await UserModel.findById(res.locals.user._id);
            console.log(req.body);
            if (req.body.deleted_codes) {
                for (let deleteItem of req.body.deleted_codes) {
                    for (let i = 0; i < user.courses.length; i++) {
                        if (user.courses[i] == deleteItem) {
                            user.courses.splice(i, 1);
                            i--;
                        }
                    }
                }
            }

            if (req.body.subject_codes) {
                user.courses = user.courses.concat(req.body.subject_codes);
            }
            console.log(user.courses);
            user.save();
            return res.status(200).json({
                message: "updated courses array"
            })


        }
    }
    catch (err) {
        console.log("error", err);
        return res.redirect('back');
    }
}
