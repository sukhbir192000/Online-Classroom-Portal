document.addEventListener('mouseup', function (e) {
    var position = document.querySelector(".profile_icon").getBoundingClientRect();
    var rect = document.querySelector(".profile").getBoundingClientRect();
    if (e.x >= position.left && e.x <= (position.left + position.width) && e.y >= position.top && e.y <= (position.top + position.height)) {
        document.querySelector(".profile").classList.toggle("show");
    }
    else if (e.x < rect.left || e.x > (rect.left + rect.width) || e.y < rect.top || e.y > (rect.top + rect.height)) {
        document.querySelector(".profile").classList.remove("show");
    }
});

document.addEventListener('mouseup', function (e) {
    var position = document.querySelector(".hamburger_icon").getBoundingClientRect();
    var rect = document.querySelector(".navbar").getBoundingClientRect();
    if (e.x >= position.left && e.x <= (position.left + position.width) && e.y >= position.top && e.y <= (position.top + position.height)) {
        document.querySelector(".navbar").classList.toggle("show_navbar");
        document.querySelector("#black_screen").classList.toggle("show_black_screen");
    }
    else if (e.x < rect.left || e.x > (rect.left + rect.width) || e.y < rect.top || e.y > (rect.top + rect.height)) {
        document.querySelector(".navbar").classList.remove("show_navbar");
        document.querySelector("#black_screen").classList.remove("show_black_screen");
    }
});


//  ------------------------------------ADD BUTTON------------------------------------------------
document.querySelector(".add").addEventListener('click', function (e) {
    if (document.querySelector(".add_content").textContent == "Cancel") {
        document.querySelector(".add_content").textContent = "Add";
        document.querySelector(".add_icon").innerHTML = "<i class='fas fa-plus'></i>";
        document.getElementById("programme_name").value = "";
        document.getElementById("year").value = "";
        document.getElementById("class_groups").value = "";
        document.getElementById("lab_groups").value = "";
    }
    else {
        document.querySelector(".add_content").textContent = "Cancel";
        document.querySelector(".add_icon").innerHTML = "<i class='fas fa-times'></i>";
    }
    document.querySelector(".add_admin").classList.toggle("showx");
})


// -------------------------------------EDIT ICON-----------------------------------------------------
var currentEditIcon = null, arr = [];
var editIconFunction = function (editIcon) {
    editIcon.addEventListener("click", function (e) {
        if (currentEditIcon != null) {
            currentEditIcon.style.display = "flex";
            currentEditIcon.parentNode.children[5].style.visibility = "visible";
            currentEditIcon.parentNode.children[6].style.display = "none";
            currentEditIcon.parentNode.children[0].textContent = arr[0];
            currentEditIcon.parentNode.children[1].textContent = arr[1];
            currentEditIcon.parentNode.children[2].textContent = arr[2];
            currentEditIcon.parentNode.children[3].textContent = arr[3];
            currentEditIcon.parentNode.children[0].contentEditable = "false";
            currentEditIcon.parentNode.children[0].classList.remove("content_color");
            currentEditIcon.parentNode.children[0].style.border = "none";
            currentEditIcon.parentNode.children[1].contentEditable = "false";
            currentEditIcon.parentNode.children[1].classList.remove("content_color");
            currentEditIcon.parentNode.children[1].style.border = "none";
            currentEditIcon.parentNode.children[2].contentEditable = "false";
            currentEditIcon.parentNode.children[2].classList.remove("content_color");
            currentEditIcon.parentNode.children[2].style.border = "none";
            currentEditIcon.parentNode.children[3].contentEditable = "false";
            currentEditIcon.parentNode.children[3].classList.remove("content_color");
            currentEditIcon.parentNode.children[3].style.border = "none";
            currentEditIcon = null;
            arr = [];
        }
        this.style.display = "none";
        this.parentNode.children[5].style.visibility = "hidden";
        this.parentNode.children[6].style.display = "flex";
        arr.push(this.parentNode.children[0].textContent);
        arr.push(this.parentNode.children[1].textContent);
        arr.push(this.parentNode.children[2].textContent);
        arr.push(this.parentNode.children[3].textContent);
        this.parentNode.children[0].contentEditable = "true";
        this.parentNode.children[0].classList.add("content_color");
        this.parentNode.children[0].style.border = "1px solid black";
        this.parentNode.children[1].contentEditable = "true";
        this.parentNode.children[1].classList.add("content_color");
        this.parentNode.children[1].style.border = "1px solid black";
        this.parentNode.children[2].contentEditable = "true";
        this.parentNode.children[2].classList.add("content_color");
        this.parentNode.children[2].style.border = "1px solid black";
        this.parentNode.children[3].contentEditable = "true";
        this.parentNode.children[3].classList.add("content_color");
        this.parentNode.children[3].style.border = "1px solid black";
        currentEditIcon = editIcon;
    })
}

document.addEventListener("click", function (e) {
    if (currentEditIcon != null) {
        var rect = currentEditIcon.parentNode.getBoundingClientRect();
        if ((e.x < rect.left || e.x > rect.left + rect.width || e.y < rect.top || e.y > rect.top + rect.height)) {
            currentEditIcon.style.display = "flex";
            currentEditIcon.parentNode.children[5].style.visibility = "visible";
            currentEditIcon.parentNode.children[6].style.display = "none";
            currentEditIcon.parentNode.children[0].textContent = arr[0];
            currentEditIcon.parentNode.children[1].textContent = arr[1];
            currentEditIcon.parentNode.children[2].textContent = arr[2];
            currentEditIcon.parentNode.children[3].textContent = arr[3];
            currentEditIcon.parentNode.children[0].contentEditable = "false";
            currentEditIcon.parentNode.children[0].classList.remove("content_color");
            currentEditIcon.parentNode.children[0].style.border = "none";
            currentEditIcon.parentNode.children[1].contentEditable = "false";
            currentEditIcon.parentNode.children[1].classList.remove("content_color");
            currentEditIcon.parentNode.children[1].style.border = "none";
            currentEditIcon.parentNode.children[2].contentEditable = "false";
            currentEditIcon.parentNode.children[2].classList.remove("content_color");
            currentEditIcon.parentNode.children[2].style.border = "none";
            currentEditIcon.parentNode.children[3].contentEditable = "false";
            currentEditIcon.parentNode.children[3].classList.remove("content_color");
            currentEditIcon.parentNode.children[3].style.border = "none";
            currentEditIcon = null;
            arr = [];
        }
    }
})

var editIconPrev = document.querySelectorAll(".edit_icon");
for (let i = 0; i < editIconPrev.length; i++) {
    editIconFunction(editIconPrev[i]);
}


// -----------------------------------------SAVE ICON--------------------------------------------
var saveIconFunction = function(saveicon){
    saveicon.addEventListener("click", function(e){
        currentEditIcon.style.display = "flex";
        currentEditIcon.parentNode.children[5].style.visibility = "visible";
        currentEditIcon.parentNode.children[6].style.display = "none";
        // currentEditIcon.parentNode.children[0].textContent = arr[0];
        // currentEditIcon.parentNode.children[1].textContent = arr[1];
        // currentEditIcon.parentNode.children[2].textContent = arr[2];
        // currentEditIcon.parentNode.children[3].textContent = arr[3];
        currentEditIcon.parentNode.children[0].contentEditable = "false";
        currentEditIcon.parentNode.children[0].classList.remove("content_color");
        currentEditIcon.parentNode.children[0].style.border = "none";
        currentEditIcon.parentNode.children[1].contentEditable = "false";
        currentEditIcon.parentNode.children[1].classList.remove("content_color");
        currentEditIcon.parentNode.children[1].style.border = "none";
        currentEditIcon.parentNode.children[2].contentEditable = "false";
        currentEditIcon.parentNode.children[2].classList.remove("content_color");
        currentEditIcon.parentNode.children[2].style.border = "none";
        currentEditIcon.parentNode.children[3].contentEditable = "false";
        currentEditIcon.parentNode.children[3].classList.remove("content_color");
        currentEditIcon.parentNode.children[3].style.border = "none";
        currentEditIcon = null;
        arr = [];
    })
}

var saveIconPrev = document.querySelectorAll("save_icon");
for(let i=0;i<saveIconPrev.length;i++){
    saveIconFunction(saveIconPrev[i]);
}




// -----------------------------------DELETE ICON---------------------------------------------------

var deleteIconFunction = function (deleteIcon) {
    deleteIcon.addEventListener("click", function (e) {
        if (this.parentNode.parentNode.children.length == 3) {
            document.querySelector(".no_courses").style.display = "flex";
        }
        let deleteButton=this;
        $.ajax({
            url:"/superuser/programmes/delete",
            method:"POST",
            data:{
                id:deleteButton.parentNode.id
            },
            success:function(){
                deleteButton.parentNode.parentNode.removeChild(deleteButton.parentNode);
            }
        })
        

    })
}

var deleteIconPrev = document.querySelectorAll(".delete_icon");
for (let i = 0; i < deleteIconPrev.length; i++) {
    deleteIconFunction(deleteIconPrev[i]);
}


// ----------------------------------NO COURSES-------------------------------------------------
if (document.querySelector(".programme_container").childElementCount == 2) {
    document.querySelector(".no_courses").style.display = "flex";
}
else {
    document.querySelector(".no_courses").style.display = "none";
}


// ---------------------------------------------ADD COURSE-----------------------------------------
document.getElementById("button_submit").addEventListener("click", function (e) {
    $.ajax({
        url: "/superuser/programmes/create",
        method: "POST",
        data: {
            
            passingOutYear:document.getElementById("year").value,
            totalGroups:document.getElementById("class_groups").value,
            totalSubGroups:document.getElementById("lab_groups").value
        },
        success: function (response) {
            var programme = document.createElement("div");
            programme.id=response._id;
            programme.classList.add("programme");
            var programmeName = document.createElement("div");
            programmeName.classList.add("programme_name_main");
            programmeName.textContent ="BTECH"
            var year = document.createElement("div");
            year.classList.add("year_main");
            year.textContent = response.passingOutYear;
            var class_groups = document.createElement("div");
            class_groups.classList.add("groups_main");
            class_groups.textContent = response.totalGroups;
            var lab_groups = document.createElement("div");
            lab_groups.classList.add("sub_groups_main");
            lab_groups.textContent = response.totalSubGroups;
            var deleteIcon = document.createElement("div");
            deleteIcon.classList.add("delete_icon");
            deleteIcon.innerHTML = "<i class='fas fa-trash'></i>";
            deleteIconFunction(deleteIcon);
            var editIcon = document.createElement("div");
            editIcon.classList.add("edit_icon");
            editIcon.innerHTML = "<i class='fas fa-edit'></i>";
            editIconFunction(editIcon);
            var saveIcon = document.createElement("div");
            saveIcon.classList.add("save_icon");
            saveIcon.innerHTML = "<i class='fas fa-save'></i>";
            saveIconFunction(saveIcon);
            programme.appendChild(programmeName);
            programme.appendChild(year);
            programme.appendChild(class_groups);
            programme.appendChild(lab_groups);
            programme.appendChild(editIcon);
            programme.appendChild(deleteIcon);
            programme.appendChild(saveIcon);
            document.querySelector(".programme_container").appendChild(programme);
            if (document.querySelector(".programme_container").childElementCount > 2) {
                document.querySelector(".no_courses").style.display = "none";
            }
            document.querySelector(".add_content").textContent = "Add";
            document.querySelector(".add_icon").innerHTML = "<i class='fas fa-plus'></i>";
            document.getElementById("programme_name").value = "";
            document.getElementById("year").value = "";
            document.getElementById("class_groups").value = "";
            document.getElementById("lab_groups").value = "";
            document.querySelector(".add_admin").classList.remove("showx");
        }

    })

})