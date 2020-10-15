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

// document.querySelector(".profile_icon").addEventListener("click",function(e){
//     // stopBubbling(this.event);
//     document.querySelector(".profile").classList.add("show");
// });

// document.addEventListener('mouseup',function(e){
//     // stopBubbling(this.event);
//     var container = document.getElementById('profile');
//     if(!container.contains(e.target) ){
//         document.querySelector(".profile").classList.remove("show");
//     }
//  });

document.getElementById("delete_btn").addEventListener("click", function(e){
    document.getElementById("img").setAttribute("src", "./imgs/user.png");
});

document.getElementById("delete_btn_1").addEventListener("click", function(e){
    document.getElementById("img_responsive").setAttribute("src", "./imgs/user_responsive.png");
});

document.querySelector("#pencil_btn_1").addEventListener("click", function(e){
    console.log("hiii");
    document.querySelector(".change_pic").click();
    document.querySelector(".change_pic").addEventListener("change", function(e){
        console.log(this.files);
    });
});

document.querySelector("#pencil_btn").addEventListener("click", function(e){
    console.log("hiii");
    document.querySelector(".change_pic").click();
    document.querySelector(".change_pic").addEventListener("change", function(e){
        console.log(this.files);
    });
});

document.addEventListener('mouseup',function(e){
    var container = document.getElementById('profile');
    if(!container.contains(e.target) ){
        document.querySelector(".profile").classList.remove("show");
    }
 });

 document.getElementById("submit_personal").addEventListener("click", function(e){
    if(document.getElementById("submit_personal").value == "Apply Changes"){
        // console.log("hoo");
        document.getElementById("submit_personal").value = "Edit Information";
        for(let a = 0; a<document.getElementsByClassName("personal_info_input").length; a++){
            document.getElementsByClassName("personal_info_input")[a].disabled = true;
        }
        document.getElementById("submit_personal").submit();
    }
    else{
        document.getElementById("submit_personal").value = "Apply Changes";
        for(let a = 0; a<document.getElementsByClassName("personal_info_input").length; a++){
            document.getElementsByClassName("personal_info_input")[a].disabled = false;
            console.log("hi");
        }
    }
 });

 var subject_codes = [];
 var deleted_codes = [];

 document.getElementById("add_course").addEventListener("click", function(e){
    var x = document.getElementById("course_id").selectedIndex;
    var y = document.getElementById("course_id").children[x].value;
    document.getElementById("heading_add_1").style.marginTop = "1em";
    if(y!=""){
        document.getElementById("course_none").style.display = "none";
        document.querySelector("#course_id").style.width = "70vw";
        var new_div = document.createElement("div");
        new_div.className = "course_container";
        document.querySelector(".added_course").append(new_div);
        var id = document.createElement("div");
        id.className = "subject_id_added";
        id.textContent = y;
        subject_codes.push(y);
        new_div.append(id);
        var name = document.createElement("div");
        name.className = "course_name course_name_styling";
        name.textContent = document.getElementsByClassName("course_name").value;
        new_div.append(name);
        var trash = document.createElement("i");
        trash.className = "fa fa-trash trash_icon";
        trash.id = "trash";
        new_div.append(trash);
        trash.addEventListener("click", function(e){
            var index = Array.prototype.indexOf.call(this.parentNode.parentNode.children, this.parentNode);
            subject_codes.splice(index, 1);
            // console.log(index);
            deleted_codes.push(subject_codes[index-1]);
            console.log(deleted_codes);
            for(let i = 0; i<deleted_codes.length; i++){
                var count = 0;
                for(let j = 0; j<subject_codes.length; j++){
                    if(deleted_codes[i] == subject_codes[j] && count == 0) {
                        subject_codes.splice(j,1);
                        count++;
                    }
                }
            }
            console.log(document.getElementById("new_course").childElementCount);
            if(document.getElementById("new_course").childElementCount == 2){
                document.getElementById("course_none").style.display = "flex";
                // console.log("sksksks")
                document.getElementById("heading_add_1").style.marginTop = "10em";
            }
            this.parentNode.remove();
        });
        console.log(subject_codes);
    }
 }); 

 document.getElementById("submit_courses").addEventListener("click", function(e){
     e.preventDefault();
     if(document.getElementById("submit_courses").value == "Apply Changes"){
         document.getElementById("add_course").style.visibility = "hidden";
         for(let a = 0; a<document.getElementsByClassName("trash_icon").length; a++){
            document.getElementsByClassName("trash_icon")[a].style.visibility = "hidden";
         }
         document.getElementById("submit_courses").value = "Edit Courses";
     }
     else{
        //  console.log("skkssk");
        document.getElementById("add_course").style.visibility = "visible";
        for(let a = 0; a<document.getElementsByClassName("trash_icon").length; a++){
           document.getElementsByClassName("trash_icon")[a].style.visibility = "visible";
        }
        document.getElementById("submit_courses").value = "Apply Changes";
     }
    //  document.getElementById("course_form").submit();
 });   
 




