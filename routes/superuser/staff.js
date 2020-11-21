const staffController=require('../../controllers/superuser_staff_controller');
const express=require('express');
const Router=express.Router();
Router.get('/',staffController.staff);
module.exports = Router;