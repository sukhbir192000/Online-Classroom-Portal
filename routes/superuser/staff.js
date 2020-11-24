const staffController=require('../../controllers/superuser_staff_controller');
const express=require('express');
const Router=express.Router();
Router.get('/',staffController.staff);
Router.post('/create',staffController.staffCreate);
Router.post('/update',staffController.staffUpdate);
Router.post('/delete',staffController.staffDelete);
module.exports = Router;
