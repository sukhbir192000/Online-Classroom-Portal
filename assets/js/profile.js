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

document.getElementById("delete_btn").addEventListener("click", function (e) {
    document.getElementById("img").setAttribute("src", "./imgs/user.png");
});

document.getElementById("delete_btn_1").addEventListener("click", function (e) {
    document.getElementById("img_responsive").setAttribute("src", "./imgs/user_responsive.png");
});

document.querySelector("#pencil_btn_1").addEventListener("click", function (e) {
    console.log("hiii");
    document.querySelector(".change_pic").click();
    document.querySelector(".change_pic").addEventListener("change", function (e) {
        console.log(this.files);
    });
});

document.querySelector("#pencil_btn").addEventListener("click", function (e) {
    console.log("hiii");
    document.querySelector(".change_pic").click();
    document.querySelector(".change_pic").addEventListener("change", function (e) {
        console.log(this.files);
    });
});

document.addEventListener('mouseup', function (e) {
    var container = document.getElementById('profile');
    if (!container.contains(e.target)) {
        document.querySelector(".profile").classList.remove("show");
    }
});

document.getElementById("submit_personal").addEventListener("click", function (e) {

    if (document.getElementById("submit_personal").value == "Apply Changes") {
        // console.log("hoo");
        document.getElementById("submit_personal").value = "Edit Information";
        let objectList = document.getElementsByClassName("personal_info_input");
        $.ajax({
            url: '../profile/edit',
            type: 'POST',
            cache: false,
            data: {
                contact: document.getElementById('user_contact').value,
                date: document.getElementById('user_date').value,
                currentYear:document.getElementById('user_currentYear').value
            },
            success: function (obj) {
                for (let a = 0; a < objectList.length; a++) {
                    objectList[a].disabled = true;
                    objectList[a].classList.toggle('personal_info_input_css');
                    objectList[a].classList.toggle('personal_info_input_edit');
                }
            }
        })

        // document.getElementById("submit_personal").submit();
    }
    else {

        document.getElementById("submit_personal").value = "Apply Changes";
        let objectList = document.getElementsByClassName("personal_info_input");
        for (let a = 0; a < objectList.length; a++) {
            objectList[a].disabled = false;
            objectList[a].classList.toggle('personal_info_input_css');
            objectList[a].classList.toggle('personal_info_input_edit');
        }


    }
});
//codes already with user
var subject_codes = [];//codes being added
var deleted_codes = [];//codes being removed
function notPresentInArrays(courseId){
    let courseListCurrent=document.getElementById('new_course').children;
    // console.log(courseListCurrent,courseId);
    for(let i in courseListCurrent){
        if(courseListCurrent[i].id==courseId){
            return false;
        }
        
    }
    return true;

}
document.getElementById("add_course").addEventListener("click", function (e) {
    var x = document.getElementById("course_id").selectedIndex;
    var y = document.getElementById("course_id").children[x].value;
    var courseId=document.getElementById("course_id").children[x].id;
    var courseName=document.getElementById("course_id").children[x].innerText;
    // document.getElementById("heading_add_1").style.marginTop = "1em";
    if (y != "" && (notPresentInArrays(courseId))) {
        document.getElementById("course_none").style.display = "none";
        // document.querySelector("#course_id").style.width = "70vw";
        var new_div = document.createElement("div");
        new_div.className = "course_container";
        new_div.id=document.getElementById("course_id").children[x].id;
        document.querySelector(".added_course").append(new_div);
        var id = document.createElement("div");
        id.className = "subject_id_added";
        id.textContent = y;
        subject_codes.push(courseId);
        new_div.append(id);
        var name = document.createElement("div");
        name.className = "course_name course_name_styling";
        name.textContent = courseName;
        new_div.append(name);
        var trash = document.createElement("i");
        trash.className = "fa fa-trash trash_icon";
        // trash.id = "trash";
        new_div.append(trash);
        trash.addEventListener("click", function (e) {
            // var index = Array.prototype.indexOf.call(this.parentNode.parentNode.children, this.parentNode);
            // subject_codes.splice(index, 1);
            // // console.log(index);
            // deleted_codes.push(subject_codes[index - 1]);
            // console.log(deleted_codes);
            // for (let i = 0; i < deleted_codes.length; i++) {
            //     var count = 0;
            //     for (let j = 0; j < subject_codes.length; j++) {
            //         if (deleted_codes[i] == subject_codes[j] && count == 0) {
            //             subject_codes.splice(j, 1);
            //             count++;
            //         }
            //     }
            // }
            var deletedId=this.parentNode.id;
            if(subject_codes.includes(deletedId)){
                subject_codes.splice(subject_codes.findIndex((element)=>{
                    return element==deletedId;
                }),1);
            }
            else{
                deleted_codes.push(deletedId);
            }
            console.log(subject_codes,deleted_codes);
            // console.log(document.getElementById("new_course").childElementCount);
            if (document.getElementById("new_course").childElementCount == 2) {
                document.getElementById("course_none").style.display = "flex";
                // console.log("sksksks")
                // document.getElementById("heading_add_1").style.marginTop = "10em";
            }
            this.parentNode.remove();
        });
        console.log(subject_codes);
    }
});

document.getElementById("submit_courses").addEventListener("click", function (e) {
    e.preventDefault();
    if (document.getElementById("submit_courses").value == "Apply Changes") {
        $.ajax({
            url:'../courses/edit',
            data:{
                subject_codes:subject_codes,
                deleted_codes:deleted_codes
            },
            type:'POST',
            success:function(obj){
                document.getElementById("course_select_container").style.display = "none";
                for (let a = 0; a < document.getElementsByClassName("trash_icon").length; a++) {
                    document.getElementsByClassName("trash_icon")[a].style.display = "none";
                }
        
                document.getElementById("submit_courses").value = "Edit Courses";
            }
        })
        
    }
    else {
        //  console.log("skkssk");
        document.getElementById("course_select_container").style.display = "flex";
        for (let a = 0; a < document.getElementsByClassName("trash_icon").length; a++) {
            document.getElementsByClassName("trash_icon")[a].style.display = "flex";
        }
        document.getElementById("submit_courses").value = "Apply Changes";
    }
    //  document.getElementById("course_form").submit();
});

document.getElementById("course_select_container").style.display = "none";
for (let a = 0; a < document.getElementsByClassName("trash_icon").length; a++) {
    document.getElementsByClassName("trash_icon")[a].style.display = "none";
}
document.getElementById("submit_courses").value = "Edit Courses";

if (document.getElementById("new_course").childElementCount == 2) {
    document.getElementById("course_none").style.display = "flex";
    // console.log("sksksks")
    // document.getElementById("heading_add_1").style.marginTop = "10em";
}
else{
    document.getElementById("course_none").style.display = "none"; 
}

let trashButtons=document.getElementsByClassName('trash_icon');
for(let trashItems of trashButtons){
    trashItems.addEventListener("click", function (e) {
       
        var deletedId=this.parentNode.id;
        if(subject_codes.includes(deletedId)){
            subject_codes.splice(subject_codes.findIndex((element)=>{
                return element==deletedId;
            }),1);
        }
        else{
            deleted_codes.push(deletedId);
        }
        console.log(subject_codes,deleted_codes);
        // console.log(document.getElementById("new_course").childElementCount);
        if (document.getElementById("new_course").childElementCount == 2) {
            document.getElementById("course_none").style.display = "flex";
            // console.log("sksksks")
            // document.getElementById("heading_add_1").style.marginTop = "10em";
        }
        this.parentNode.remove();
    });
}

