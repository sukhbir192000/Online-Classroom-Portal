const coursesController=require('../../controllers/superuser_courses_assigned_controller');
const express=require('express');
const Router=express.Router();
Router.get('/',coursesController.courses_assgn);
module.exports = Router;