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

let year_form = document.getElementById("study_year");
let course_form = document.getElementById("code_course");
let branch_form = document.getElementById("choose_branch");
let class_type_form = document.getElementById("lecture_lab");
let group_form = document.getElementById("group_class");
let teacher_form = document.getElementById("name_teacher");
course_form.disabled = true;
branch_form.disabled = true;
class_type_form.disabled = true;
group_form.disabled = true;
teacher_form.disabled = true;

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
        course_form.disabled = true;
        branch_form.disabled = true;
        class_type_form.disabled = true;
        group_form.disabled = true;
        teacher_form.disabled = true;
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

//  ------------------------------------CHANGING SELECT FIELDS------------------------------------
year_form.addEventListener('change', function(e){
    $.ajax({
        url: "/superuser/coursesassigned/form/courses",
        cache: false,
        type: "POST",
        data: {year: year_form.value},
        success: function(response){
            course_form.innerText = "";
            var opt = document.createElement('option');
            opt.innerText="---SELECT---";
            opt.value = "";
            opt.disabled = true;
            course_form.appendChild(opt);
            for(let obj of response.courseList){
                var opt = document.createElement('option');
                opt.value=obj._id;
                opt.innerText=obj.code + "  " + obj.name;
                course_form.appendChild(opt);
            }
            course_form.selectedIndex=0;
            branch_form.selectedIndex=0;
            class_type_form.selectedIndex=0;
            group_form.selectedIndex=0;
            teacher_form.selectedIndex=0;
            course_form.disabled = false;
            branch_form.disabled = true;
            class_type_form.disabled = true;
            group_form.disabled = true;
            teacher_form.disabled = true;
        }
    })
})

course_form.addEventListener('change', function(e){
    $.ajax({
        url: "/superuser/coursesassigned/form/branches",
        cache: false,
        type: "POST",
        data: {course: course_form.value, year: year_form.value},
        success: function(response){
            branch_form.innerText = "";
            var opt = document.createElement('option');
            opt.innerText="---SELECT---";
            opt.value = "";
            opt.disabled = true;
            branch_form.appendChild(opt);
            for(let obj of response.branchList){
                var opt = document.createElement('option');
                opt.value=obj._id;
                opt.innerText=obj.stream;
                branch_form.appendChild(opt);
            }
            if(response.branchList.length==1) branch_form.selectedIndex=1;
            else branch_form.selectedIndex=0;
            class_type_form.selectedIndex=0;
            group_form.selectedIndex=0;
            teacher_form.selectedIndex=0;
            branch_form.disabled = false;
            class_type_form.disabled = true;
            group_form.disabled = true;
            teacher_form.disabled = true;
        }
    })
})

branch_form.addEventListener('change', function(e){
    classTypeForm.disabled = false;
})

class_type_form.addEventListener('change', function(e){
    $.ajax({
        url: "/superuser/coursesassigned/form/groups",
        cache: false,
        type: "GET",
        success: function(response){
            $.ajax({
                url: "/superuser/coursesassigned/form/groups",
                cache: false,
                type: "POST",
                data: {course: course_form.value, year: year_form.value},
                success: function(response){

                }
            })
        }
    })
})

// -----------------------------------DELETE ICON---------------------------------------------------
var deleteIconFunction = function(deleteIcon){
    deleteIcon.addEventListener("click",function(e){
        $.ajax({
            url: "/superuser/coursesassigned/delete",
            type: "POST",
            data: {
                courseId: this.parentNode.parentNode.parentNode.id,
                index: $(this.parentNode).index()-2
            },
            success: function(response){
                if(this.parentNode.parentNode.children.length == 3){
                    this.parentNode.parentNode.children[1].style.display = "flex";
                }
                this.parentNode.parentNode.removeChild(this.parentNode);
            }
        })
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
    // e.preventDefault();
    // var container = document.createElement("div");
    // container.classList.add("subject_container");
    // var teacherName = document.createElement("div");
    // teacherName.classList.add("teacher_name_main");
    // teacherName.textContent = document.getElementById("name_teacher").value;
    // var branch = document.createElement("div");
    // branch.classList.add("branch_main");
    // branch.textContent = document.getElementById("choose_branch").value;
    // var classType = document.createElement("div");
    // classType.classList.add("class_type");
    // classType.textContent = document.getElementById("lecture_lab").value;
    // var group = document.createElement("div");
    // group.classList.add("sub_group");
    // group.textContent = document.getElementById("group_class").value;
    // var deleteIcon = document.createElement("div");
    // deleteIcon.classList.add("delete_icon_subject");
    // deleteIcon.innerHTML = "<i class='fas fa-trash'></i>";
    // deleteIconFunction(deleteIcon);
    // container.appendChild(teacherName);
    // container.appendChild(branch);
    // container.appendChild(classType);
    // container.appendChild(group);
    // container.appendChild(deleteIcon);
    
    
    // // SEARCH AND ADD IN PROPER POSITION
    // document.querySelector(".subjects_added").appendChild(container);
    // if(document.querySelector(".subjects_added").childElementCount==3){
    //     document.querySelector(".no_teacher").style.display = "none";
    // }
    // //----------------------------------------------------

    
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