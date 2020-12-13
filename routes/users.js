const express=require('express');
const router=express.Router();
const usersController = require('../controllers/users_controller');
const passport=require('passport');
const firstTimeCheck=require('../controllers/firstTimeController');
router.get('/auth/google',passport.authenticate(
    'google',
    {scope:['profile','email']}
));

router.get('/auth/google/callback',passport.authenticate(
    'google',
    {failureRedirect:'/users/login'}
),usersController.createSession);

router.get('/login', usersController.login);
router.get('/logout',passport.checkAuthentication,usersController.destroySession);
router.get('/profile/view',passport.checkAuthentication,passport.checkNotSuperUser,usersController.getProfile);
router.post('/profile/edit',passport.checkAuthentication,passport.checkNotSuperUser,usersController.editProfile);
router.post('/courses/edit',passport.checkAuthentication,passport.checkNotSuperUser,usersController.editCourses)
router.get('/registerLocal',passport.checkAuthentication,firstTimeCheck.notRegistered,firstTimeCheck.registerPage);
router.post('/courseLinks/edit',passport.checkAuthentication,passport.checkNotSuperUser,usersController.editCourseLinks);
router.post('/registerLocal',passport.checkAuthentication,firstTimeCheck.registerUser);
router.get('/registerLocal/getGroups/:branch/:year',passport.checkAuthentication,firstTimeCheck.notRegistered,firstTimeCheck.getGroupNumber);
module.exports=router;
