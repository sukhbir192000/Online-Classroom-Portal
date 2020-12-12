document.querySelector(".profile_icon").addEventListener("click",function(e){
    document.querySelector(".profile").classList.add("show");
});

document.addEventListener('mouseup',function(e){
    // stopBubbling(this.event);
    var container = document.getElementById('profile');
    if(!container.contains(e.target) ){
        document.querySelector(".profile").classList.remove("show");
    }
 });

document.getElementById("delete_btn").addEventListener("click", function(e){
    document.getElementById("img").setAttribute("src", "./imgs/user.png");
});

document.getElementById("delete_btn_1").addEventListener("click", function(e){
    document.getElementById("img_responsive").setAttribute("src", "./imgs/user_responsive.png");
});

document.querySelector("#pencil_btn_1").addEventListener("click", function(e){
    // console.log("hiii");
    document.querySelector(".change_pic").click();
    document.querySelector(".change_pic").addEventListener("change", function(e){
        console.log(this.files);
    });
});

document.querySelector("#pencil_btn").addEventListener("click", function(e){
    // console.log("hiii");
    document.querySelector(".change_pic").click();
    document.querySelector(".change_pic").addEventListener("change", function(e){
        console.log(this.files);
    });
});

// document.addEventListener('mouseup',function(e){
//     var container = document.getElementById('profile');
//     if(!container.contains(e.target) ){
//         document.querySelector(".profile").classList.remove("show");
//     }
//  });

 document.getElementById("submit_personal").addEventListener("click", function(e){
    if(document.getElementById("submit_personal").value == "Apply Changes"){
        document.getElementById("submit_personal").value = "Edit Information";
        for(let a = 0; a<document.getElementsByClassName("personal_info_input").length; a++){
            document.getElementsByClassName("personal_info_input")[a].disabled = true;
        }
    }
    else{
        document.getElementById("submit_personal").value = "Apply Changes";
        for(let a = 0; a<document.getElementsByClassName("personal_info_input").length; a++){
            if(a != 2){
                document.getElementsByClassName("personal_info_input")[a].disabled = false;
            } 
        }
    }
 });

 let rect = [];
 let changes = null;
 document.getElementById("add_course").addEventListener("click", function(e){
    var updated = [];
    changes = document.getElementById("add_course").getBoundingClientRect();
    if(document.getElementById("add_course").value == "Edit Links"){
        var linkClass = document.getElementsByClassName("class_link");
        var original = [];
        let iter = 0;
        for(let i = 0; i<linkClass.length; i++){
            original.push(linkClass[i].textContent);
            console.log(iter);
            // console.log(text);
            document.getElementById("add_course").value = "Apply Changes";
            document.getElementById("add_course").innerHTML = "Apply Changes";  
            linkClass[i].setAttribute("contenteditable", true);
            linkClass[i].classList.add("class_link_edit");
            document.querySelectorAll(".anchor_class")[i].removeAttribute("href");
            var ignore = linkClass;
            document.addEventListener("click", function(e){
                var isClickInsideElement = true;
                for(let ign of ignore){
                     if(ign.contains(e.target)){
                         isClickInsideElement = true;
                         break;
                     }
                     else{
                         isClickInsideElement = false;
                     }
                }
                if(document.getElementById("add_course").value == "Apply Changes" && !isClickInsideElement && (e.x<changes.left || e.x>changes.left+changes.width || e.y<changes.top || e.y>changes.top+changes.height)){
                    linkClass[i].textContent = original[i];
                }
            });
            iter++;
        }
    }
    else{
        for(let i = 0; i<document.getElementsByClassName("class_link").length; i++){
            document.getElementById("add_course").value = "Edit Links";
            document.getElementById("add_course").innerHTML = "Edit Links";  
            document.getElementsByClassName("class_link")[i].setAttribute("contenteditable", false);
            document.getElementsByClassName("anchor_class")[i].setAttribute("href", document.getElementsByClassName("anchor_class")[i].textContent);
            document.getElementsByClassName("class_link")[i].classList.remove("class_link_edit");
        }
        for(let i = 0; i<document.getElementsByClassName("class_link").length; i++){
            updated.push(document.getElementsByClassName("anchor_class")[i].textContent);
            
        }
        document.getElementById("link_form").children[0].setAttribute("value", updated);
        document.getElementById("link_form").submit();
    }
 });

 




