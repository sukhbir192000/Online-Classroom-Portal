const coursesController=require('../../controllers/superuser_courses_controller');
const express=require('express');
const Router=express.Router();
Router.get('/',coursesController.courses);
Router.post('/create',coursesController.courseCreate);
module.exports = Router;