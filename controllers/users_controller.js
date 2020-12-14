const GroupModel = require('../models/group');
const SubGroupModel = require('../models/sub-group');
const User = require('../models/user');
const UserModel = require('../models/user');
const CourseModel = require('../models/course');
const Course = require('../models/course');
const LinkModel = require('../models/link');
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
        let courseList = await UserModel.findById(res.locals.user._id)
            .populate('classSub.course')
            .populate('classSub.class')
            .populate('classSub.group')
            .populate('classSub.subGroup')
            .populate('classSub.link');
        console.log("teachercourses:", courseList.classSub);
        if (res.locals.user.isAdmin) {
            return res.render('adminProfile', {
                title: "Profile",
                courseList: courseList.classSub
            })
        }
        else {
            let userCourseList = await CourseModel.find({
                _id: { $in: res.locals.user.courses }
            })
            console.log("mycourses:", userCourseList);
            let courseList = await CourseModel.find({
                isActive: true,
                year: res.locals.user.currentYear,
                offered_to: res.locals.user.dept
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

            if (req.body.contact) {
                user.contact = req.body.contact;
            }
            if (req.body.date) {
                user.dob = req.body.date;
            }
            if (req.body.currentYear) {
                user.currentYear = req.body.currentYear;
            }



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
module.exports.editCourseLinks = async function (req, res) {
    console.log(req.body);
    try {
        if (req.body.idList) {
            const user = await UserModel.findById(res.locals.user._id);
            for (let i = 0; i < req.body.idList.length; i++) {
                let link_obj = await LinkModel.findById(user.classSub[req.body.idList[i]].link);
                link_obj.link = req.body.updated[i];
                link_obj.save();
            }
        }
        return res.status(200).json({
            message: "changed courses"
        })
    }
    catch (err) {
        console.log(err);
        return res.status(200);
    }
}