const express=require('express');
const router=express.Router();

// router.get('/',superUserController)
router.use('/courses',require('./superuser/courses'));
router.use('/programmes',require('./superuser/programmes'));
router.use('/staff',require('./superuser/staff'));
router.use('/timetable',require('./superuser/timetable'));
module.exports=router;
