const TimeTableModel = require('../models/timetable')
const ClassModel = require('../models/class');
const SuperUserTimeTable = require('../models/superuser_dept_timetable');
const Class = require('../models/class');
module.exports.timetable = async function (req, res) {
    try {
        if (req.xhr) {
            console.log("AJAX HIT")
            let req_class = await ClassModel.findOne({
                stream: res.locals.user.dept,
                passingOutYear: req.body.passingOutYear

            })
            let timeTableItems;
            if (req_class) {
                timeTableItems = await SuperUserTimeTable.findOne({
                    class: req_class._id
                })
            }
            return res.status(200).json({
                timeTableItems: timeTableItems
                //load this shit into js and ejs
            })

        }
        else {
            let present_classes = await ClassModel.find({stream: res.locals.user.dept}).sort('passingOutYear');
            return res.render('superuser/timetable', {
                title: 'Timetable',
                timetableItems: [[], [], [], [], [], [], []],
                present_classes: present_classes
            });
        }
    }
    catch (err) {
        console.log(err);
        if (req.xhr) {
            return res.status(400);
        }

        return res.redirect('back');
    }
}
module.exports.saveTimeTable = async function (req, res) {

    try {
        // console.log("saving data",req.body.timeTableData);
        // let parsed_data = JSON.parse(req.body);
        // console.log("after parse",parsed_data);
        let req_class = await ClassModel.findOne({
            stream: res.locals.user.dept,
            passingOutYear: req.body.passingOutYear

        })
        console.log("no data:", req_class);
        let timeTableItem = await SuperUserTimeTable.findOne({
            class: req_class._id
        })
        if (!timeTableItem) {
            timeTableItem = await SuperUserTimeTable.create({
                class: req_class._id,
                startDate: req.body.startDate,
                endDate: req.body.endDate
            })
        }
        timeTableItem.timeTableData = req.body.timeTableData
        timeTableItem.save();
        for(let i=0;i<7;i++){
            
     
            for(let j=8;j<req.body.timeTableData[i].length;j++){
                // console.log(req.body.timeTableData[i][j]);
                //starting time is j
                if(req.body.timeTableData[i][j][0]!=""){

                    let timeTableItemsArray=req.body.timeTableData[i][j][0];
                    console.log("starting at ",i,j," : ",timeTableItemsArray);
                }
            }
            
        }
        //save to teacher tt too
        return res.status(200).json({
            message: "Updated TT"
        })
    }
    catch (err) {
        console.log(err);
        return res.status(400);
    }
}