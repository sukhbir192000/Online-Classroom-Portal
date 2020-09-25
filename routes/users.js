const express=require('express');
const router=express.Router();
const usersController = require('../controllers/users_controller');
const passport=require('passport');
router.get('/auth/google',passport.authenticate(
    'google',
    {scope:['profile','email']}
));
router.get('/auth/google/callback',passport.authenticate(
    'google',
    {failureRedirect:'/users/sign-in'}
),usersController.createSession);
router.get('/logout',usersController.destroySession);
module.exports=router;
