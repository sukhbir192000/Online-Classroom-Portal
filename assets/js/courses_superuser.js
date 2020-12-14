

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
        document.getElementById("subject_name").value = "";
        document.getElementById("subject_code").value = "";
        document.getElementById("subject_credits").value = "";
        document.getElementById("active_course").checked = false;
        var branch_names = document.getElementsByClassName("subject_select");
        for(let i=0;i<branch_names.length;i++){
            branch_names[i].children[0].checked = false;
        }
        var yearSelect = document.getElementsByClassName("year_select");
        for(let i=0;i<yearSelect.length;i++){
            yearSelect[i].children[0].checked = false;
        }
        document.getElementById("year_container").style.display = "none";
    }
    else{
        document.querySelector(".add_content").textContent = "Cancel";
        document.querySelector(".add_icon").innerHTML =  "<i class='fas fa-times'></i>";            
    }
    document.querySelector(".add_admin").classList.toggle("showx");    
})

// --------------------------------ACTIVE ICON-----------------------------------------------------
var active_display = false;
var activeIconFunction = function(activeIcon){
    activeIcon.addEventListener("mouseup",function(e){
        
        let state=activeIcon.classList.contains('icon_color_change');

        var submitFunction = function(e){
            var years = [];
            var year_selected = document.getElementsByClassName("new_year_select");
            for(let i=0;i<year_selected.length;i++){
                if(year_selected[i].children[0].checked){
                    years.push(year_selected[i].children[0].name);
                }
            }
            if(years.length>0){
                $.ajax({
                    type:"POST",
                    url:"/superuser/courses/update",
                    data:{
                        id:activeIcon.parentNode.id,
                        state:state,
                        year:years
                    },
                    success:function(response){
                        console.log("activated");
                        activeIcon.classList.toggle("icon_color_change");
                        year_select_container.style.display = "none";
                        document.getElementsByClassName("box_layout")[0].style.opacity = "1";
                        active_display = false;
                        document.removeEventListener("click",displayFunction);
                        var checkboxes = document.getElementsByClassName("new_year_select");
                        for(let i=0;i<checkboxes.length; i++){
                            checkboxes[i].children[0].checked = false;
                        }
                    
                        var year_display = activeIcon.parentNode.parentNode.children[1].children[1].children[1];
                        year_display.innerHTML = "<b>Year:&nbsp;<b>";
                        for(let i=0;i<years.length;i++){
                            year_display.innerHTML+=years[i];
                            year_display.innerHTML+=", "
                        }
                        year_display.innerHTML = year_display.innerHTML.slice(0,-2);

                        year_display.classList.remove("hide");
                        document.getElementsByClassName("new_year_button")[0].removeEventListener("click",submitFunction);
                    }
                })
            }
            else{
                alert("Please select atleast one year.");
            }
        }
        if(!state){
            console.log("hii");
            document.addEventListener("mousedown",displayFunction);
            document.getElementById("new_year_container_id").style.display = "flex";
            document.getElementsByClassName("box_layout")[0].style.opacity = "0.2";
            active_display = true;
            // ---------------------------------SUBMIT YEAR------------------------------------------
            document.getElementsByClassName("new_year_button")[0].addEventListener("click",submitFunction);
        }
        else{
            $.ajax({
                type:"POST",
                url:"/superuser/courses/update",
                data:{
                    id:activeIcon.parentNode.id,
                    state:state
                },
                success:function(response){
                    activeIcon.classList.toggle("icon_color_change");
                    activeIcon.parentNode.parentNode.children[1].children[1].children[1].classList.add("hide");
                }
            })
        }
        
        // -----------------------------------------------------------------------------------------
        
        
    })
}


var year_select_container = document.getElementById("new_year_container_id");
var displayFunction = function(f){
    var coordinates = year_select_container.getBoundingClientRect();
    
    if( active_display && (f.x<coordinates.left || f.x>coordinates.left+coordinates.width || f.y<coordinates.top || f.y>coordinates.top+coordinates.height)) {
        console.log("hello");
        year_select_container.style.display = "none";
        document.getElementsByClassName("box_layout")[0].style.opacity = "1";
        active_display = false;
        document.removeEventListener("click",displayFunction);
    }
}







var activeIconPrev = document.querySelectorAll(".active_icon");
for(let i=0;i<activeIconPrev.length;i++){

    if(activeIconPrev[i].children[0].value=="true"){
        activeIconPrev[i].classList.add("icon_color_change");
    }
    activeIconFunction(activeIconPrev[i]);
}

// -----------------------------------DELETE ICON---------------------------------------------------
var deleteIconFunction = function(deleteIcon){
    deleteIcon.addEventListener("click",function(e){
        if(this.parentNode.parentNode.parentNode.children.length == 3){
            document.querySelector(".no_courses").style.display = "flex";
        }
        let deleteButton=this;
        $.ajax({
            type:"POST",
            url:"/superuser/courses/delete",
            data:{
                id:deleteButton.parentNode.id
            },
            success:function(response){
                deleteButton.parentNode.parentNode.parentNode.removeChild(deleteButton.parentNode.parentNode);
            }
        })
        
        
    })
}

var deleteIconPrev = document.querySelectorAll(".delete_icon");
for(let i=0;i<deleteIconPrev.length;i++){
    deleteIconFunction(deleteIconPrev[i]);
}


// ----------------------------------NO COURSES-------------------------------------------------
if(document.querySelector(".subject_container").childElementCount==2){
    document.querySelector(".no_courses").style.display = "flex";
}
else{
    document.querySelector(".no_courses").style.display = "none";
}


// -----------------------------YEAR SELECT CONTAINER---------------------------------------------
document.getElementById("active_course").addEventListener("change", function(e){
    if(this.checked){
        document.getElementById("year_container").style.display = "flex";
    }
    else{
        document.getElementById("year_container").style.display = "none";
    }
})


// ---------------------------------------------ADD COURSE-----------------------------------------
document.getElementById("button_submit").addEventListener("click", function(e){
    e.preventDefault();
    let branch_input = document.getElementById("branch_input");
    let offered_to = [];
    for(let i=0;i<branch_input.childElementCount;i++){
        if(branch_input.children[i].children[0].checked){
            offered_to.push(branch_input.children[i].children[0].name);
        }
    }
    let year_list = [], year_input = $(".year_select");
    for(let i=0;i<year_input.length;i++){
        if(year_input[i].children[0].checked) year_list.push(i+1);
    }
    $.ajax({
        url: "/superuser/courses/create",
        type: "POST",
        data:{
            code: document.getElementById("subject_code").value,
            name: document.getElementById("subject_name").value,
            credits: document.getElementById("subject_credits").value,
            isActive: document.getElementById("active_course").checked,
            dept:document.getElementById('top_banner_dept').value,
            offered_to: offered_to,
            year: year_list
        },
        success: function(response){
            console.log(response);
            if(!response.err){
                var subjectRow = document.createElement("div");
                subjectRow.classList.add("subject_row");
                var offeredToContainer = document.createElement("div");
                offeredToContainer.classList.add("offered_to_container");
                var activeIconNew = document.createElement("div");
                activeIconNew.classList.add("active_icon");
                activeIconNew.innerHTML = "<i class='fas fa-check'></i>";
                activeIconNew.style.visibility = "hidden";
                var offered_to_div = document.createElement("div");
                offered_to_div.classList.add("offered_to");
                var offeredTo = document.createElement("div");
                offeredTo.innerHTML = "<b>Offered to:&nbsp;</b>";
                var branch_names = document.getElementsByClassName("subject_select");
                for(let i=0;i<branch_names.length;i++){
                    if(branch_names[i].children[0].checked){
                        offeredTo.innerHTML += branch_names[i].children[0].name;
                        offeredTo.innerHTML += ",";
                    }
                }
                offeredTo.innerHTML = offeredTo.innerHTML.slice(0,-1);

                var yearActive = false;
                var yearShow = document.createElement("div");
                yearShow.classList.add("year_show");
                var year_display = document.getElementsByClassName("year_select");
                yearShow.innerHTML = "<b>Year:&nbsp;<b>";
                for(let i=0;i<year_display.length;i++){
                    if(year_display[i].children[0].checked){
                        yearActive = true;
                        yearShow.innerHTML+=year_display[i].children[0].name;
                        yearShow.innerHTML+=",";
                    }
                }
                yearShow.innerHTML = yearShow.innerHTML.slice(0,-1);
                if(yearActive){
                    yearShow.style.display = "flex";
                }
                else{
                    yearShow.style.display = "none";
                }
                offered_to_div.appendChild(offeredTo);
                offered_to_div.appendChild(yearShow);
                var deleteIconNew = document.createElement("div");
                deleteIconNew.classList.add("delete_icon");
                deleteIconNew.innerHTML = "<i class='fas fa-trash'></i>";
                deleteIconNew.style.visibility = "hidden";
                offeredToContainer.appendChild(activeIconNew);
                offeredToContainer.appendChild(offered_to_div);
                offeredToContainer.appendChild(deleteIconNew);

                var subject = document.createElement("div");
                subject.classList.add("subject");
                var activeIcon = document.createElement("div");
                activeIcon.classList.add("active_icon");
                activeIcon.innerHTML = "<i class='fas fa-check'></i>";
                if(document.getElementById("active_course").checked){
                    activeIcon.classList.add("icon_color_change");
                }
                activeIconFunction(activeIcon);
                var codeSubject = document.createElement("div");
                codeSubject.classList.add("code_subject");
                codeSubject.textContent = response.code;
                var nameSubject = document.createElement("div");
                nameSubject.classList.add("name_subject");
                nameSubject.textContent = response.name;
                var credits = document.createElement("div");
                credits.classList.add("credits");
                credits.textContent = response.credits;
                var deleteIcon = document.createElement("div");
                deleteIcon.classList.add("delete_icon");
                deleteIcon.innerHTML = "<i class='fas fa-trash'></i>";
                deleteIconFunction(deleteIcon);
                subject.appendChild(activeIcon);
                subject.appendChild(codeSubject);
                subject.appendChild(nameSubject);
                subject.appendChild(credits);
                subject.appendChild(deleteIcon);
                subject.id=response._id;
                subjectRow.appendChild(subject);
                subjectRow.appendChild(offeredToContainer);
                document.querySelector(".subject_container").appendChild(subjectRow);
                if(document.querySelector(".subject_container").childElementCount>2){
                    document.querySelector(".no_courses").style.display = "none";
                }
                document.querySelector(".add_content").textContent = "Add";
                document.querySelector(".add_icon").innerHTML =  "<i class='fas fa-plus'></i>";
                document.getElementById("subject_name").value = "";
                document.getElementById("subject_code").value = "";
                document.getElementById("subject_credits").value = "";
                document.getElementById("active_course").checked = false;
                var branch_names = document.getElementsByClassName("subject_select");
                for(let i=0;i<branch_names.length;i++){
                    branch_names[i].children[0].checked = false;
                }
                var yearSelect = document.getElementsByClassName("year_select");
                for(let i=0;i<yearSelect.length;i++){
                    yearSelect[i].children[0].checked = false;
                }
                document.getElementById("year_container").style.display = "none";
                document.querySelector(".add_admin").classList.remove("showx");
            }
            else{
                window.alert("Unable to add course!!!");
            }
        }
    })
})