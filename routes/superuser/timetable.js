const timetableController=require('../../controllers/superuser_timetable_controller');
const express=require('express');
const Router=express.Router();
Router.get('/',timetableController.timetable);//normal
Router.post('/',timetableController.timetable);//ajax
Router.post('/save',timetableController.saveTimeTable);
module.exports = Router;