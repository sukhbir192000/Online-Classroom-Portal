document.addEventListener('mouseup',function(e){
    var position=document.querySelector(".profile_icon").getBoundingClientRect();
    var rect=document.querySelector(".profile").getBoundingClientRect();
    if(e.x>=position.left && e.x<=(position.left+position.width) && e.y>=position.top && e.y<=(position.top+position.height) ){
        document.querySelector(".profile").classList.toggle("show");
    }
    else if(e.x<rect.left || e.x>(rect.left+rect.width) || e.y<rect.top || e.y>(rect.top+rect.height) ){
        document.querySelector(".profile").classList.remove("show");
    }
 });

 document.addEventListener('mouseup',function(e){
    var position=document.querySelector(".hamburger_icon").getBoundingClientRect();
    var rect=document.querySelector(".navbar").getBoundingClientRect();
    if(e.x>=position.left && e.x<=(position.left+position.width) && e.y>=position.top && e.y<=(position.top+position.height) ){
        document.querySelector(".navbar").classList.toggle("show_navbar");
        document.querySelector("#black_screen").classList.toggle("show_black_screen");
    }
    else if(e.x<rect.left || e.x>(rect.left+rect.width) || e.y<rect.top || e.y>(rect.top+rect.height) ){
        document.querySelector(".navbar").classList.remove("show_navbar");
        document.querySelector("#black_screen").classList.remove("show_black_screen");
    }
 });


//  ------------------------------------ADD BUTTON------------------------------------------------
 document.querySelector(".add").addEventListener('click',function(e){
    if(document.querySelector(".add_content").textContent == "Cancel"){
        document.querySelector(".add_content").textContent = "Add";
        document.querySelector(".add_icon").innerHTML =  "<i class='fas fa-plus'></i>";
        document.getElementById("code_course").selectedIndex = "0";
        document.getElementById("choose_branch").selectedIndex = "0";
        document.getElementById("lecture_lab").selectedIndex = "0";
        document.getElementById("study_year").selectedIndex = "0";
        document.getElementById("group_class").selectedIndex = "0";
        // document.getElementById("branch_teacher").selectedIndex = "0";
        document.getElementById("name_teacher").selectedIndex = "0";
    }
    else{
        document.querySelector(".add_content").textContent = "Cancel";
        document.querySelector(".add_icon").innerHTML =  "<i class='fas fa-times'></i>";      
        // $(document).ready(function() {
        //     $('.course_code').select2();
        // });     
        // $(document).ready(function() {
        //     $('.programme').select2();
        // });  
        // $(document).ready(function() {
        //     $('.year_study').select2();
        // });  
        // $(document).ready(function() {
        //     $('.class_group').select2();
        // });  
        // $(document).ready(function() {
        //     $('.lab_group').select2();
        // });  
        // $(document).ready(function() {
        //     $('.branch').select2();
        // });  
        // $(document).ready(function() {
        //     $('.teacher_name').select2();
        // });   
    }
    document.querySelector(".add_admin").classList.toggle("showx");    
})

// var teachers_added = [];
// document.querySelector(".add_teacher_button").addEventListener("click",function(e){
//     var newDiv = document.createElement("div");
//     newDiv.classList.add("teacher_selected_div");
//     var branch = document.createElement("div");
//     branch.textContent = document.getElementById("branch_teacher").value;
//     branch.classList.add("teacher_selected_branch");
//     var teacher = document.createElement("div");
//     teacher.textContent = document.getElementById("name_teacher").value;
//     teacher.classList.add("teacher_selected_name");
//     var deleteTeacher = document.createElement("div");
//     deleteTeacher.innerHTML = "<i class='fas fa-times'></i>";
//     deleteTeacher.addEventListener("click",function(e){
//         this.parentNode.parentNode.removeChild(this.parentNode);
//     })
//     newDiv.appendChild(branch);
//     newDiv.appendChild(teacher);
//     newDiv.appendChild(deleteTeacher);
//     document.querySelector(".teacher_selected").appendChild(newDiv);
// })

// -----------------------------------DELETE ICON---------------------------------------------------

var deleteIconFunction = function(deleteIcon){
    deleteIcon.addEventListener("click",function(e){
        if(this.parentNode.parentNode.children.length == 3){
            this.parentNode.parentNode.children[1].style.display = "flex";
        }
        // console.log(this.parentNode.parentNode.children.length);
        this.parentNode.parentNode.removeChild(this.parentNode);
        
    })
}

var deleteIconPrev = document.querySelectorAll(".delete_icon_subject");
for(let i=0;i<deleteIconPrev.length;i++){
    deleteIconFunction(deleteIconPrev[i]);
}



// ----------------------------------NO TEACHER ASSIGNED-------------------------------------------------
var subjectsAdded = document.getElementsByClassName("subjects_added");
var noTeacher = document.getElementsByClassName("no_teacher");
for(let i=0;i<subjectsAdded.length;i++){
    if(subjectsAdded[i].childElementCount == 2){
        noTeacher[i].style.display = "flex";
    }
    else{
        noTeacher[i].style.display = "none";
    }
}



// ---------------------------------------------ADD TEACHER-----------------------------------------
document.getElementById("button_submit").addEventListener("click", function(e){
    e.preventDefault();
    var container = document.createElement("div");
    container.classList.add("subject_container");
    var teacherName = document.createElement("div");
    teacherName.classList.add("teacher_name_main");
    teacherName.textContent = document.getElementById("name_teacher").value;
    var branch = document.createElement("div");
    branch.classList.add("branch_main");
    branch.textContent = document.getElementById("choose_branch").value;
    var classType = document.createElement("div");
    classType.classList.add("class_type");
    classType.textContent = document.getElementById("lecture_lab").value;
    var group = document.createElement("div");
    group.classList.add("sub_group");
    group.textContent = document.getElementById("group_class").value;
    var deleteIcon = document.createElement("div");
    deleteIcon.classList.add("delete_icon_subject");
    deleteIcon.innerHTML = "<i class='fas fa-trash'></i>";
    deleteIconFunction(deleteIcon);
    container.appendChild(teacherName);
    container.appendChild(branch);
    container.appendChild(classType);
    container.appendChild(group);
    container.appendChild(deleteIcon);
    
    
    // SEARCH AND ADD IN PROPER POSITION
    document.querySelector(".subjects_added").appendChild(container);
    if(document.querySelector(".subjects_added").childElementCount==3){
        document.querySelector(".no_teacher").style.display = "none";
    }
    //----------------------------------------------------

    
    document.getElementById("code_course").selectedIndex = "0";
    document.getElementById("choose_branch").selectedIndex = "0";
    document.getElementById("lecture_lab").selectedIndex = "0";
    document.getElementById("study_year").selectedIndex = "0";
    document.getElementById("group_class").selectedIndex = "0";
    // document.getElementById("branch_teacher").selectedIndex = "0";
    document.getElementById("name_teacher").selectedIndex = "0";
})


var currentArrowIcon = null;
var arrowIconFunction = function(teacherDiv, arrowIcon){
    teacherDiv.addEventListener("click", function(e){
        if(currentArrowIcon!=null && currentArrowIcon!=arrowIcon){
            currentArrowIcon.classList.toggle("rotate_arrow");
            currentArrowIcon.parentNode.parentNode.children[1].classList.toggle("show_container");
            currentArrowIcon = null;
        }
        setTimeout(() => {arrowIcon.classList.toggle("rotate_arrow");
        arrowIcon.parentNode.parentNode.children[1].classList.toggle("show_container");
        if(currentArrowIcon==arrowIcon){
            currentArrowIcon=null;
        }
        else{
        currentArrowIcon = arrowIcon;} }, 300);
    })
}

var teacherMainPrev = document.querySelectorAll(".teacher_main");
var arrowIcon = document.querySelectorAll(".arrow_icon");
for(let i=0;i<teacherMainPrev.length;i++){
    arrowIconFunction(teacherMainPrev[i], arrowIcon[i+1]);
}