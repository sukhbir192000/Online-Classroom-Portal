const mongoose = require('mongoose');
// const multer=require('multer');
const path = require('path');
const file_path=path.join('/uploads/study_material/');
const classSubSchema = require('./class-sub');

const studyMaterialSchema = new mongoose.Schema({
    title: {
        type: String
    },
    content: {
        type: String
    },
    classSub: classSubSchema,
    postedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    files:[
        {
            url:{
                type:String
            },
            name:{
                type:String
            }
            
        }
    ]
}, {
    timestamps: true
});
// let storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//       cb(null, path.join(__dirname,'..',file_path));
//     },
//     filename: function (req, file, cb) {
//       cb(null, file.fieldname + '-' + Date.now());
//     }
// });
// studyMaterialSchema.statics.fileUploaded=multer({
//     storage:storage
// }).single('files');
studyMaterialSchema.statics.filePath=file_path;


const StudyMaterial = mongoose.model('Study Material', studyMaterialSchema);
module.exports = StudyMaterial;