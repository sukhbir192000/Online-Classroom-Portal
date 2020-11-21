const timetableController=require('../../controllers/superuser_timetable_controller');
const express=require('express');
const Router=express.Router();
Router.get('/',timetableController.timetable);
module.exports = Router;