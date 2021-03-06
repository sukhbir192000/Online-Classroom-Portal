const programmesController=require('../../controllers/superuser_programmes_controller');
const express=require('express');
const Router=express.Router();
Router.get('/',programmesController.programme);
Router.get('/students/:classId',programmesController.studentDetails);
Router.post('/students/getDetails',programmesController.getDetails);
Router.post('/students/updateDetails',programmesController.updateDetails);
Router.post('/create',programmesController.programmeCreate);
Router.post('/delete',programmesController.programmeDelete);
// Router.post('/update',programmesController.programmeUpdate);
module.exports = Router;