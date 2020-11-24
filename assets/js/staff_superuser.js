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

// -----------------------------------------ADD BUTTON--------------------------------------------
document.querySelector(".add").addEventListener('click',function(e){
    if(document.querySelector(".add_content").textContent == "Cancel"){
        document.querySelector(".add_content").textContent = "Add";
        document.querySelector(".add_icon").innerHTML =  "<i class='fas fa-plus'></i>";
        document.getElementById("teacher_name").value = "";
        document.getElementById("position_add").value = "";
    }
    else{
        document.querySelector(".add_content").textContent = "Cancel";
        document.querySelector(".add_icon").innerHTML =  "<i class='fas fa-times'></i>";            
    }
    document.querySelector(".add_admin").classList.toggle("showx");    
})

// -------------------------------------EDIT ICON-----------------------------------------------------
var currentEditIcon = null, arr = [];
var editIconFunction = function(editIcon){
    editIcon.addEventListener("click",function(e){
        if(currentEditIcon!=null){
            currentEditIcon.style.display = "flex";
            currentEditIcon.parentNode.children[3].style.visibility="visible";
            currentEditIcon.parentNode.children[4].style.display = "none";
            currentEditIcon.parentNode.children[0].textContent = arr[0];
            currentEditIcon.parentNode.children[1].textContent = arr[1];
            currentEditIcon.parentNode.children[0].contentEditable = "false";
            currentEditIcon.parentNode.children[0].classList.remove("content_color");
            currentEditIcon.parentNode.children[0].style.border = "none";
            currentEditIcon.parentNode.children[1].contentEditable = "false";
            currentEditIcon.parentNode.children[1].classList.remove("content_color");
            currentEditIcon.parentNode.children[1].style.border = "none";
            currentEditIcon = null;
            arr=[];
        }
        this.style.display = "none";
        this.parentNode.children[3].style.visibility="hidden";
        this.parentNode.children[4].style.display = "flex";
        arr.push(this.parentNode.children[0].textContent);
        arr.push(this.parentNode.children[1].textContent);
        this.parentNode.children[0].contentEditable = "true";
        this.parentNode.children[0].classList.add("content_color");
        this.parentNode.children[0].style.border = "1px solid black";
        this.parentNode.children[1].contentEditable = "true";
        this.parentNode.children[1].classList.add("content_color");
        this.parentNode.children[1].style.border = "1px solid black";
        currentEditIcon = editIcon;
    })
}

document.addEventListener("click",function(e){
    if(currentEditIcon!=null){
        var rect = currentEditIcon.parentNode.getBoundingClientRect();
        if((e.x<rect.left || e.x>rect.left+rect.width || e.y<rect.top || e.y>rect.top+rect.height)){
            currentEditIcon.style.display = "flex";
            currentEditIcon.parentNode.children[3].style.visibility="visible";
            currentEditIcon.parentNode.children[4].style.display = "none";
            currentEditIcon.parentNode.children[0].textContent = arr[0];
            currentEditIcon.parentNode.children[1].textContent = arr[1];
            currentEditIcon.parentNode.children[0].contentEditable = "false";
            currentEditIcon.parentNode.children[0].classList.remove("content_color");
            currentEditIcon.parentNode.children[0].style.border = "none";
            currentEditIcon.parentNode.children[1].contentEditable = "false";
            currentEditIcon.parentNode.children[1].classList.remove("content_color");
            currentEditIcon.parentNode.children[1].style.border = "none";
            currentEditIcon = null;
            arr=[];
        }
    }
})

var editIconPrev = document.querySelectorAll(".edit_icon");
for(let i=0;i<editIconPrev.length;i++){
    editIconFunction(editIconPrev[i]);
}


// ----------------------------------SAVE ICON---------------------------------------------
var saveIconFunction = function(saveicon){
    saveicon.addEventListener("click",function(e){
        currentEditIcon.style.display = "flex";
        currentEditIcon.parentNode.children[3].style.visibility="visible";
        currentEditIcon.parentNode.children[4].style.display = "none";
        // currentEditIcon.parentNode.children[0].textContent = arr[0];
        // currentEditIcon.parentNode.children[1].textContent = arr[1];
        currentEditIcon.parentNode.children[0].contentEditable = "false";
        currentEditIcon.parentNode.children[0].classList.remove("content_color");
        currentEditIcon.parentNode.children[0].style.border = "none";
        currentEditIcon.parentNode.children[1].contentEditable = "false";
        currentEditIcon.parentNode.children[1].classList.remove("content_color");
        currentEditIcon.parentNode.children[1].style.border = "none";
        currentEditIcon = null;
        arr=[];
    })
}
var saveIconPrev = document.getElementsByClassName("save_icon");
for(let i=0;i<saveIconPrev.length;i++){
    saveIconFunction(saveIconPrev[i]);
}



// -----------------------------------DELETE ICON---------------------------------------------------
var deleteIconFunction = function(deleteIcon){
    deleteIcon.addEventListener("click",function(e){
        if(this.parentNode.parentNode.children.length == 3){
            document.querySelector(".no_teachers").style.display = "flex";
        }
        let deleteButton=this;
        $.ajax({
            type:"POST",
            url:"/superuser/staff/delete",
            data:{
                id:deleteButton.parentNode.id
            },
            success:function(response){
                deleteButton.parentNode.parentNode.removeChild(deleteButton.parentNode);
            }
        })
    })
}

var deleteIconPrev = document.querySelectorAll(".delete_icon");
for(let i=0;i<deleteIconPrev.length;i++){
    deleteIconFunction(deleteIconPrev[i]);
}


// ----------------------------------NO TEACHERS-------------------------------------------------
if(document.querySelector(".teacher_container").childElementCount==2){
    document.querySelector(".no_teachers").style.display = "flex";
}
else{
    document.querySelector(".no_teachers").style.display = "none";
}


// -----------------------------------ADD TEACHER--------------------------------------------------
document.getElementById("button_submit").addEventListener("click", function(e){
    e.preventDefault();
    $.ajax({
        url: "/superuser/staff/create",
        type: "POST",
        data: {
            name: document.getElementById("teacher_name").value,
            email: document.getElementById("position_add").value
        },
        success: function(response){
            var teacher = document.createElement("div");
            teacher.classList.add("teacher");
            var teacherName = document.createElement("div");
            teacherName.classList.add("name_teacher");
            teacherName.textContent = response.name;
            var position = document.createElement("div");
            position.classList.add("position");
            position.textContent = response.email;
            var editIcon = document.createElement("div");
            editIcon.classList.add("edit_icon");
            editIcon.innerHTML = "<i class='fas fa-edit'></i>";
            editIconFunction(editIcon);
            var deleteIcon = document.createElement("div");
            deleteIcon.classList.add("delete_icon");
            deleteIcon.innerHTML = "<i class='fas fa-trash'></i>";
            deleteIconFunction(deleteIcon);
            var saveIcon = document.createElement("div");
            saveIcon.classList.add("save_icon");
            saveIcon.innerHTML = "<i class='fas fa-save'></i>";
            saveIconFunction(saveIcon);
            teacher.appendChild(teacherName);
            teacher.appendChild(position);
            teacher.appendChild(editIcon);
            teacher.appendChild(deleteIcon);
            teacher.appendChild(saveIcon);
            document.querySelector(".teacher_container").appendChild(teacher);
            if(document.querySelector(".teacher_container").childElementCount>2){
                document.querySelector(".no_teachers").style.display = "none";
            }
            document.getElementById("teacher_name").value = "";
            document.getElementById("position_add").value = "";
            document.querySelector(".add_content").textContent = "Add";
            document.querySelector(".add_icon").innerHTML =  "<i class='fas fa-plus'></i>";
            document.querySelector(".add_admin").classList.remove("showx");   
        }
    })
})