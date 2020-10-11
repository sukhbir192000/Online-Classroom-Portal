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



 document.addEventListener('mouseup',function(e){
    var position=document.querySelector(".filters_small").getBoundingClientRect();
    var rect=document.querySelector(".filters").getBoundingClientRect();
    var container = document.querySelector(".profile");
    if(container.contains(e.target)){
        document.querySelector(".filters_small").disabled=true;
    }
    else if(e.x>=position.left && e.x<=(position.left+position.width) && e.y>=position.top && e.y<=(position.top+position.height) ){
        document.querySelector(".filters").classList.toggle("show");
    }
    else if(e.x<rect.left || e.x>(rect.left+rect.width) || e.y<rect.top || e.y>(rect.top+rect.height) ){

        document.querySelector(".filters").classList.remove("show");
    }
 });



document.querySelector(".add").addEventListener('click',function(e){
    if(document.querySelector(".add_content").textContent == "Cancel"){
        document.querySelector(".add_content").textContent = "Add";
        document.querySelector(".add_icon").innerHTML =  "<i class='fas fa-plus'></i>";
        // branchForm.disabled=true;
        // groupForm.disabled=true;
        // subGroupForm.disabled=true;
        // subjectForm.selectedIndex=0;
        // branchForm.selectedIndex=0;
        // groupForm.selectedIndex=0;
        // subGroupForm.selectedIndex=0;
        document.getElementById("title").value="";
        document.getElementById("message").value="";
        document.querySelector("#file_names").innerHTML = "";
        document.getElementById("file_inputs").innerHTML = "";
        var newInput = document.createElement("input");
        newInput.name = 'file0';
        newInput.className = "file";
        newInput.type = "file";
        newInput.style.display = "none";
        document.getElementById("file_inputs").appendChild(newInput);
        var newButton = document.createElement("button");
        newButton.id = "add_files_button";
        newButton.textContent = "Add file";
        newButton.type = 'button';
        document.getElementById("file_inputs").appendChild(newButton);
        availableFiles = ['file1', 'file2', 'file3', 'file4','file5', 'file6', 'file7', 'file8', 'file9']
        eventListenerPresent = [false,false,false,false,false,false,false,false,false,false]
    }
    else{
        document.querySelector(".add_content").textContent = "Cancel";
        document.querySelector(".add_icon").innerHTML =  "<i class='fas fa-times'></i>";
        inputFormInitialise();
    }
    document.querySelector(".add_admin").classList.toggle("showx");
})

availableFiles = ['file1', 'file2', 'file3', 'file4','file5', 'file6', 'file7', 'file8', 'file9']
eventListenerPresent = [false,false,false,false,false,false,false,false,false,false]
function inputFormInitialise(){
    document.getElementById("add_files_button").addEventListener('click',function(e){
        var inputList = document.getElementsByClassName("file");
        var lastElement = inputList[inputList.length-1];
        lastElement.click();
        let index = lastElement.name.substr(-1);
        if(eventListenerPresent[parseInt(index)]) return;
        eventListenerPresent[parseInt(index)] = true;
        lastElement.addEventListener('change',function(e){
            var inputList = document.getElementsByClassName("file");
            var newDiv = document.createElement("div");
            newDiv.classList.add("file_content");
            newDiv.id = lastElement.getAttribute("name");
            var newDiv_title = document.createElement("DIV");
            var newDiv_icon = document.createElement("DIV");  
            newDiv_title.textContent = lastElement.files[0].name;
            newDiv_icon.innerHTML = "<i class='fas fa-times'></i>"
            newDiv_title.classList.add("file_name");
            newDiv_icon.classList.add("file_cross");
            newDiv.id = lastElement.getAttribute("name");
            newDiv.appendChild(newDiv_title);
            newDiv.appendChild(newDiv_icon);
            document.getElementById("file_names").appendChild(newDiv);
            if(availableFiles.length!=0){
                var newInput = document.createElement("input");
                newInput.name = availableFiles[0];
                newInput.className = "file";
                newInput.type = "file";
                newInput.style.display = "none";
                document.getElementById("file_inputs").appendChild(newInput);
                availableFiles.splice(0,1);
            }
            else{
                document.getElementById("add_files_button").style.display = "none";
            }
            newDiv_icon.addEventListener('click',function(e){
                var id = newDiv.id;
                document.getElementsByName(id)[0].remove();
                newDiv.remove();
                availableFiles.push(id);
                eventListenerPresent[parseInt(id.substr(-1))] = false;
                document.getElementById("add_files_button").style.display = "flex";
                if(availableFiles.length == 1 && document.getElementById("add_files_button").style.display == "none"){
                    var newInput = document.createElement("input");
                    newInput.name = availableFiles[0];
                    newInput.className = "file";
                    newInput.type = "file";
                    newInput.style.display = "none";
                    document.getElementById("file_inputs").appendChild(newInput);
                    availableFiles.splice(0,1);
                }
            })
        })
    })
}







// --------------------------------REPLY BACK AND VIEW REPLIES-----------------------

var replyButtonFunction = function(){
    var x = document.querySelectorAll(".reply_button");
    for(let i=0;i<x.length;i++){
        x[i].children[0].addEventListener("click",function(e){
            if(x[i].parentNode.children[3].children[1]){
                x[i].parentNode.children[3].children[1].style.display = "flex";
            }
            this.style.display = "none";
        })
        x[i].children[1].addEventListener("click",function(e){
            x[i].parentNode.children[3].children[0].style.display = "flex";
            this.style.display = "none";
        })
    }
}
replyButtonFunction();

var cancelIconFunction = function(){
    var x = document.querySelectorAll(".cancel_icon");
    for(let i=0;i<x.length;i++){
        x[i].addEventListener("click",function(e){
            x[i].parentNode.style.display = "none";
            x[i].parentNode.parentNode.parentNode.children[2].children[1].style.display = "flex";
        })
    }
}
cancelIconFunction();



var nextReplyFunction = function(){
    var y = document.querySelectorAll(".next_reply");
    for(let i=0;i<y.length;i++){
        y[i].children[1].addEventListener("click",function(e){
            if(y[i].children[0].value != ""){
                let replyBack = document.createElement("div");
                replyBack.classList.add("reply_back")
                let replyUser = document.createElement("div");
                replyUser.classList.add("reply_user");
                let studentName = document.createElement("div");
                studentName.classList.add("student_name");
                studentName.textContent = "Anonymous";
                let dateUploaded = document.createElement("div");
                dateUploaded.classList.add("date_uploaded");
                dateUploaded.textContent = "Oct 15";
                replyUser.appendChild(studentName);
                replyUser.appendChild(dateUploaded);
                let replyContent = document.createElement("div");
                replyContent.classList.add("reply_content");
                replyContent.textContent=this.parentNode.children[0].value;
                let replyButton = document.createElement("div");
                replyButton.classList.add("reply_button");
                let viewRepliesButton = document.createElement("div");
                viewRepliesButton.classList.add("view_replies_button");
                viewRepliesButton.textContent = "View Replies(0)";
                let replyBackButton = document.createElement("div");
                replyBackButton.classList.add("reply_back_button");
                replyBackButton.textContent= "Reply";
                replyButton.appendChild(viewRepliesButton);
                replyButton.appendChild(replyBackButton);
                let reply = document.createElement("div");
                reply.classList.add("reply");
                nextReply = document.createElement("div");
                nextReply.classList.add("next_reply");
                inputDiv = document.createElement("input");
                inputDiv.type = "text";
                inputDiv.className = "input_reply";
                inputDiv.placeholder="Reply";
                inputIcon = document.createElement("div");
                inputIcon.classList.add("input_icon");
                inputIcon.innerHTML = "<i class='fas fa-caret-square-right'></i> ";
                cancelIcon = document.createElement("div");
                cancelIcon.innerHTML = "<i class='fas fa-times'></i>";
                cancelIcon.classList.add("cancel_icon");
                nextReply.appendChild(inputDiv);
                nextReply.appendChild(inputIcon);
                nextReply.appendChild(cancelIcon);
                nextReply.style.display = "none";
                reply.appendChild(nextReply);
                replyBack.appendChild(replyUser);
                replyBack.appendChild(replyContent);
                replyBack.appendChild(replyButton);
                replyBack.appendChild(reply);
                y[i].children[0].value = "";
                y[i].parentNode.appendChild(replyBack);
                y[i].parentNode.children[1].children[3].children[0].children[2].addEventListener("click",function(e){
                    this.parentNode.style.display = "none";
                    this.parentNode.parentNode.parentNode.children[2].children[1].style.display = "flex";
                })
                y[i].parentNode.children[1].children[2].children[0].addEventListener("click",function(e){
                    if(this.parentNode.parentNode.children[3].children[1]){
                        this.parentNode.parentNode.children[3].children[1].style.display = "flex";
                    }
                    this.style.display = "none";
                })
                y[i].parentNode.children[1].children[2].children[1].addEventListener("click",function(e){
                    if(this.parentNode.parentNode.children[3].children[0]){
                        this.parentNode.parentNode.children[3].children[0].style.display = "flex";
                    }
                    this.style.display = "none";
                })
                nextReplyFunction();
            }
        })
    }
}
nextReplyFunction();
