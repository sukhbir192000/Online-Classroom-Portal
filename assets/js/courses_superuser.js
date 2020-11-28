

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
    }
    else{
        document.querySelector(".add_content").textContent = "Cancel";
        document.querySelector(".add_icon").innerHTML =  "<i class='fas fa-times'></i>";            
    }
    document.querySelector(".add_admin").classList.toggle("showx");    
})

// --------------------------------ACTIVE ICON-----------------------------------------------------
var activeIconFunction = function(activeIcon){
    activeIcon.addEventListener("click",function(e){
        
        let state=activeIcon.classList.contains('icon_color_change');
       
        $.ajax({
            type:"POST",
            url:"/superuser/courses/update",
            data:{
                id:activeIcon.parentNode.id,
                state:state
            },
            success:function(response){
              
                activeIcon.classList.toggle("icon_color_change");
            }
        })
        
        
    })
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
        if(this.parentNode.parentNode.children.length == 3){
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
                deleteButton.parentNode.parentNode.removeChild(deleteButton.parentNode);
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
    $.ajax({
        url: "/superuser/courses/create",
        type: "POST",
        data:{
            code: document.getElementById("subject_code").value,
            name: document.getElementById("subject_name").value,
            credits: document.getElementById("subject_credits").value,
            isActive: document.getElementById("active_course").checked,
            dept:document.getElementById('top_banner_dept').value,
            offered_to: offered_to
        },
        success: function(response){
            console.log(response);
            if(!response.err){
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
                document.querySelector(".subject_container").appendChild(subject);
                if(document.querySelector(".subject_container").childElementCount>2){
                    document.querySelector(".no_courses").style.display = "none";
                }
                document.querySelector(".add_content").textContent = "Add";
                document.querySelector(".add_icon").innerHTML =  "<i class='fas fa-plus'></i>";
                document.getElementById("subject_name").value = "";
                document.getElementById("subject_code").value = "";
                document.getElementById("subject_credits").value = "";
                document.getElementById("active_course").checked = false;
                document.querySelector(".add_admin").classList.remove("showx");
            }
            else{
                window.alert("Unable to add course!!!");
            }
        }
    })
})