const express=require('express');
const Router=express.Router();
const passport=require('../config/passport-google-oauth2-strategy');
const contentController=require('../controllers/doubt_controller');

Router.get('/',contentController.doubts);


module.exports = Router;