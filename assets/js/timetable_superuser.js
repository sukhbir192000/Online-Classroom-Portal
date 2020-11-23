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

var today = new Date();
var yyyy = today.getFullYear();
for(let i=0;i<10;i++){
    var option_new = document.createElement("option");
    option_new.value = yyyy+i;
    option_new.textContent = yyyy+i;
    document.getElementsByName('graduation_year')[0].appendChild(option_new)
}


// -------------------DELETE TEACHER-------------------------
function teacherDeleteFucntion(teacher){
    console.log(teacher);
    console.log(teacher.parentNode);
    teacher.parentNode.parentNode.removeChild(teacher.parentNode);
}

var teacher_delete = document.getElementsByClassName("delete_icon");
for(let i=0;i<teacher_delete.length;i++){
    teacher_delete[i].addEventListener("click",function(e){
        teacherDeleteFucntion(teacher_delete[i]);
    });
}
