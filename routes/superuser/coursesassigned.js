const coursesController=require('../../controllers/superuser_courses_assigned_controller');
const express=require('express');
const Router=express.Router();
Router.get('/',coursesController.courses_assgn);
Router.post('/create',coursesController.courses_assgnCreate);
Router.post('/delete',coursesController.courses_assgnDelete);
module.exports = Router;