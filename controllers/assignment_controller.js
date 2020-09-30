const AssignmentsModel=require('../models/assignment');

module.exports.assignments=function(req,res){
    return res.render("assgn",{
        title:'Assignments'
    });  
}