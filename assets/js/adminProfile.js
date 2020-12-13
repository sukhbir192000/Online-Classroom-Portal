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
//     document.querySelector(".profile").classList.add("show");
// });

// document.addEventListener('mouseup',function(e){
//     // stopBubbling(this.event);
//     var container = document.getElementById('profile');
//     if(!container.contains(e.target) ){
//         document.querySelector(".profile").classList.remove("show");
//     }
//  });

// document.getElementById("delete_btn").addEventListener("click", function(e){
//     document.getElementById("img").setAttribute("src", "./imgs/user.png");
// });

// document.getElementById("delete_btn_1").addEventListener("click", function(e){
//     document.getElementById("img_responsive").setAttribute("src", "./imgs/user_responsive.png");
// });

// document.querySelector("#pencil_btn_1").addEventListener("click", function(e){
//     // console.log("hiii");
//     document.querySelector(".change_pic").click();
//     document.querySelector(".change_pic").addEventListener("change", function(e){
//         console.log(this.files);
//     });
// });

// document.querySelector("#pencil_btn").addEventListener("click", function(e){
//     // console.log("hiii");
//     document.querySelector(".change_pic").click();
//     document.querySelector(".change_pic").addEventListener("change", function(e){
//         console.log(this.files);
//     });
// });



document.getElementById("submit_personal").addEventListener("click", function (e) {
    if (document.getElementById("submit_personal").value == "Apply Changes") {
        $.ajax({
            url: "../profile/edit",
            type: 'POST',
            cache: false,
            data: {
                contact: document.getElementById('contact_id').value,

            },
            success: function (obj) {
                document.getElementById("submit_personal").value = "Edit Information";
                document.getElementById("contact_id").disabled = true;
                document.getElementById("contact_id").classList.remove("personal_info_input_edit");
                document.getElementById("contact_id").classList.add("personal_info_input");
            }
        })


    }
    else {
        document.getElementById("submit_personal").value = "Apply Changes";
        document.getElementById("contact_id").disabled = false;
        document.getElementById("contact_id").classList.add("personal_info_input_edit");
        document.getElementById("contact_id").classList.remove("personal_info_input");
    }
});

let rect = [];
var original = [];
let changes = null;
document.getElementById("add_course").addEventListener("click", function (e) {
    var updated = [], idList = [];

    changes = document.getElementById("add_course").getBoundingClientRect();
    // for(let i=0; i<document.getElementsByClassName("class_link").length; i++){
    //     beforeedit.push(document.getElementsByClassName("class_link")[i].textContent);
    // }
    if (document.getElementById("add_course").value == "Edit Links") {
        var linkClass = document.getElementsByClassName("class_link");
        let iter = 0;
        document.getElementById("add_course").value = "Apply Changes";
        document.getElementById("add_course").innerHTML = "Apply Changes";
        for (let i = 0; i < linkClass.length; i++) {
            original.push(linkClass[i].textContent);
            linkClass[i].setAttribute("contenteditable", true);
            linkClass[i].classList.add("class_link_edit");
            document.querySelectorAll(".anchor_class")[i].removeAttribute("href");
            var ignore = linkClass;
            document.addEventListener("click", function (e) {
                var isClickInsideElement = true;
                for (let ign of ignore) {
                    if (ign.contains(e.target)) {
                        isClickInsideElement = true;
                        break;
                    }
                    else {
                        isClickInsideElement = false;
                    }
                }
                if (document.getElementById("add_course").value == "Apply Changes" && !isClickInsideElement && (e.x < changes.left || e.x > changes.left + changes.width || e.y < changes.top || e.y > changes.top + changes.height)) {
                    linkClass[i].textContent = original[i];
                }
            });
            iter++;
        }
    }
    else {
        
        for (let i = 0; i < document.getElementsByClassName("class_link").length; i++) {
            if (document.getElementsByClassName("anchor_class")[i].textContent != original[i]) {

                updated.push(document.getElementsByClassName("anchor_class")[i].textContent);
                idList.push(i);
            }
        }
       
        $.ajax({
            url: '../courseLinks/edit',
            type: "POST",
            data: {
                idList: idList,
                updated: updated
            },
            success: function (obj) {
                
                document.getElementById("add_course").value = "Edit Links";
                document.getElementById("add_course").innerHTML = "Edit Links";
                for (let i = 0; i < document.getElementsByClassName("class_link").length; i++) {
                    document.getElementsByClassName("class_link")[i].setAttribute("contenteditable", false);
                    document.getElementsByClassName("anchor_class")[i].setAttribute("href", document.getElementsByClassName("anchor_class")[i].textContent);
                    document.getElementsByClassName("class_link")[i].classList.remove("class_link_edit");
                }
                document.getElementById("link_form").children[0].setAttribute("value", updated);

                original = [];
                var linkClass = document.getElementsByClassName("class_link");
                for (let i = 0; i < linkClass.length; i++) {
                    original.push(linkClass[i].textContent);
                }
            }
        })

    }
});






