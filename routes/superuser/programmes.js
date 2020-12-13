const programmesController=require('../../controllers/superuser_programmes_controller');
const express=require('express');
const Router=express.Router();
Router.get('/',programmesController.programme);
Router.post('/create',programmesController.programmeCreate);
Router.post('/delete',programmesController.programmeDelete);
// Router.post('/update',programmesController.programmeUpdate);
module.exports = Router;