const express=require('express');
const Router=express.Router();
const passport=require('../config/passport-google-oauth2-strategy');
const contentController=require('../controllers/quiz_controller');

Router.get('/',contentController.quiz);
Router.post('/create',passport.checkAdmin,contentController.quizCreate);
Router.get('/delete/:id',passport.checkAdmin,contentController.quizDelete);
Router.post('/update/:quizId',passport.checkAdmin,contentController.quizUpdate);
module.exports = Router;