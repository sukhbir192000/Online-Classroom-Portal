const programmesController=require('../../controllers/superuser_programmes_controller');
const express=require('express');
const Router=express.Router();
Router.get('/',programmesController.programme);
module.exports = Router;