(function(){
    var boxelements = document.querySelectorAll('.box');
    for(let i=0;i<boxelements.length;i++){
        materialClass = boxelements[i].children[1].children[1];
        for(let j=0;j<materialClass.childElementCount;j++){
            // console.log(materialClass.children[j].href);
            let extension = materialClass.children[j].href.split('.').pop().toLowerCase();
            if( extension == 'pptx' || extension == 'ppt' || extension == 'pptm'){
                materialClass.children[j].children[0].innerHTML = "<i class='fas fa-file-powerpoint'></i>";
                materialClass.children[j].children[0].classList.add("color_ppt");
            }
            else if(extension == 'docx' || extension == 'doc' || extension == 'docm'){
                materialClass.children[j].children[0].innerHTML = "<i class='fas fa-file-word'></i>";
                materialClass.children[j].children[0].classList.add("color_word");
            }
            else if(extension == 'pdf'){
                materialClass.children[j].children[0].innerHTML = "<i class='fas fa-file-pdf'></i>";
                materialClass.children[j].children[0].classList.add("color_pdf");
            }
            else if(extension == 'jpg' || extension == 'png' || extension == 'jpeg' || extension == 'gif' || extension == 'tiff'|| extension == 'psd'){
                materialClass.children[j].children[0].innerHTML = "<i class='fas fa-file-image'></i>";
                materialClass.children[j].children[0].classList.add("color_image");
            }
            else if(extension == 'xlsx' || extension == 'xlsm' || extension == 'xlsb' || extension == 'xls' || extension == 'xml'){
                materialClass.children[j].children[0].innerHTML = "<i class='fas fa-file-excel'></i>";
                materialClass.children[j].children[0].classList.add("color_excel"); 
            }
            else if(extension == 'mp4' || extension == 'mpeg-4' || extension == 'mov' || extension == 'wmv' || extension == 'flv' || extension == 'avi'){
                materialClass.children[j].children[0].innerHTML = "<i class='fas fa-file-video'></i>";
                materialClass.children[j].children[0].classList.add("color_video"); 
            }
            else if(extension == 'pcm' || extension == 'wav' || extension == 'mp3' || extension == 'wma' ){
                materialClass.children[j].children[0].innerHTML = "<i class='fas fa-file-audio'></i>";
                materialClass.children[j].children[0].classList.add("color_audio"); 
            }
            else{
                materialClass.children[j].children[0].innerHTML = "<i class='fas fa-file-alt'></i>";
                materialClass.children[j].children[0].classList.add("color_file");
            }
        }
    }
})();

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










// --------------------------------REPLY BACK AND VIEW REPLIES-----------------------

// var replyButtonFunction = function(){
//     var x = document.querySelectorAll(".reply_button");
//     for(let i=0;i<x.length;i++){
//         x[i].children[0].addEventListener("click",function(e){
//             $.ajax({
//                 url: "/content/doubts/viewReplies/" + x[i].parentNode.children[3].children[0].children[2].value,
//                 type:"GET",
//                 success: function(response){
                    
//                 }
//             })
//             if(x[i].parentNode.children[3].children[1]){
//                 x[i].parentNode.children[3].children[1].style.display = "flex";
//             }
//             this.style.display = "none";
//         })
//         x[i].children[1].addEventListener("click",function(e){
//             x[i].parentNode.children[3].children[0].style.display = "flex";
//             this.style.display = "none";
//         })
//     }
// }
// replyButtonFunction();

var replyButtonFunction = function(a){
    a.children[0].addEventListener("click",function(e){
        // console.log(this.textContent.split('(').pop());
        if(this.textContent.split(' ')[0] == "View"){
            $.ajax({
                url: "/content/doubts/viewReplies/" + a.parentNode.children[3].children[0].children[2].value,
                type:"GET",
                success: function(response){
                    let i=4;
                    while(a.parentNode.children[i]!=null){
                        a.parentNode.removeChild(a.parentNode.children[i]);
                    }
                    for(let responseItem of response.replyList){
                        createReplyFunction(responseItem,a.parentNode.children[3].children[0]);
                    }
                }
            })
            if(a.parentNode.children[3].children[1]){
                a.parentNode.children[3].children[1].style.display = "flex";
            }
            this.textContent = "Hide Replies("+this.textContent.split('(').pop();
        }
        else{
            let i=4;
            while(this.parentNode.parentNode.children[i]!=null){
                this.parentNode.parentNode.removeChild(this.parentNode.parentNode.children[i]);
            }
            this.textContent = "View Replies("+this.textContent.split('(').pop();
        }
    })
    a.children[1].addEventListener("click",function(e){
        a.parentNode.children[3].children[0].style.display = "flex";
        this.style.display = "none";
    })
}

var x = document.querySelectorAll(".reply_button");
for(let i=0;i<x.length;i++){
    replyButtonFunction(x[i]);
}


var cancelIconFunction = function(a){
    a.addEventListener("click",function(e){
        a.parentNode.style.display = "none";
        a.parentNode.parentNode.parentNode.children[2].children[1].style.display = "flex";
        a.parentNode.children[0].value="";
    })
}

var y = document.querySelectorAll(".cancel_icon");
for(let i=0;i<y.length;i++){
    cancelIconFunction(y[i]);
}

// var cancelIconFunction = function(){
//     var x = document.querySelectorAll(".cancel_icon");
//     for(let i=0;i<x.length;i++){
//         x[i].addEventListener("click",function(e){
//             x[i].parentNode.style.display = "none";
//             x[i].parentNode.parentNode.parentNode.children[2].children[1].style.display = "flex";
//             x[i].parentNode.children[0].value="";
//         })
//     }
// }
// cancelIconFunction();

var createReplyFunction = function(response,a){
    let replyBack = document.createElement("div");
    replyBack.classList.add("reply")
    let replyUser = document.createElement("div");
    replyUser.classList.add("reply_user");
    let studentName = document.createElement("div");
    studentName.classList.add("student_name");
    studentName.textContent = response.user;
    let dateUploaded = document.createElement("div");
    dateUploaded.classList.add("date_uploaded");
    dateUploaded.textContent = new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit', hour: 'numeric', minute: 'numeric'}).format(new Date(response.postedAt));
    replyUser.appendChild(studentName);
    replyUser.appendChild(dateUploaded);
    let replyContent = document.createElement("div");
    replyContent.classList.add("reply_content");
    replyContent.textContent=response.content;
    let replyButton = document.createElement("div");
    replyButton.classList.add("reply_button");
    let viewRepliesButton = document.createElement("div");
    viewRepliesButton.classList.add("view_replies_button");
    viewRepliesButton.textContent = "View Replies("+response.childCount+")";
    // -----------------------------------------------------------------------------------------------
    if(response.childCount=="0"){
        viewRepliesButton.style.display="none";
    }
    // --------------------------------------------------------------------------------------------------
    let replyBackButton = document.createElement("div");
    replyBackButton.classList.add("reply_back_button");
    replyBackButton.textContent= "Reply";
    replyButton.appendChild(viewRepliesButton);
    replyButton.appendChild(replyBackButton);
    let reply = document.createElement("div");
    reply.classList.add("reply");
    nextReply = document.createElement("div");
    nextReply.classList.add("next_reply");
    // inputDiv = document.createElement("input");
    // inputDiv.type = "text";
    // inputDiv.className="reply_input";
    // inputDiv.name = "input_reply";
    // inputDiv.placeholder="Reply";
    inputDiv = document.createElement("div");
    inputDiv.classList.add("comment_text");
    inputDiv.role = "textbox";
    inputDiv.ariaMultiline = "true";
    inputDiv.contentEditable = "true";

    inputIcon = document.createElement("div");
    inputIcon.classList.add("input_icon");
    inputIcon.innerHTML = "<i class='fas fa-caret-square-right'></i> ";
    cancelIcon = document.createElement("div");
    cancelIcon.innerHTML = "<i class='fas fa-times'></i>";
    cancelIcon.classList.add("cancel_icon");
    let hiddenInput=document.createElement('input');
    hiddenInput.type="hidden";
    hiddenInput.value=response.commentId
    nextReply.appendChild(inputDiv);
    nextReply.appendChild(inputIcon);
    nextReply.appendChild(hiddenInput);
    nextReply.appendChild(cancelIcon);
    nextReply.style.display = "none";
    reply.appendChild(nextReply);
    replyBack.appendChild(replyUser);
    replyBack.appendChild(replyContent);
    replyBack.appendChild(replyButton);
    replyBack.appendChild(reply);
    a.children[0].textContent = "";
    a.parentNode.parentNode.appendChild(replyBack);
    cancelIconFunction(cancelIcon);
    // cancelIcon.addEventListener("click",function(e){
    //     this.parentNode.style.display = "none";
    //     this.parentNode.parentNode.parentNode.children[2].children[1].style.display = "flex";
    //     this.parentNode.parentNode.children[0].value="";
    // })
    replyButtonFunction(replyButton);
    // viewRepliesButton.addEventListener("click", function(e){
    //     if(this.parentNode.parentNode.children[3].children[1]){
    //         this.parentNode.parentNode.children[3].children[1].style.display = "flex";
    //     }
    //     this.style.display = "none";
    // })
    // replyBackButton.addEventListener("click", function(e){
    //     this.parentNode.parentNode.children[3].children[0].style.display = "flex";
    //     this.style.display = "none";
    // })
    nextReplyFunction(nextReply);
}

var nextReplyFunction = function(a){
    a.children[0].addEventListener('keydown',function(e){ 
        if(e.key=="Enter" && e.shiftKey==false){
            this.parentNode.children[1].click();
        }   
    })
    a.children[1].addEventListener("click",function(e){
        
        if(a.children[0].textContent != ""){
            let doubtId=a.children[2].value;
            $.ajax({
                url:"/content/doubts/createReply",
                type:"POST",
                data:{
                    doubtId:doubtId,
                    content:a.children[0].textContent
                },
                success:function(response){
                    console.log("a hai ye: ", a);
                    if(a.parentNode.parentNode.children[2]){
                        var matches = a.parentNode.parentNode.children[2].children[0].innerText.match(/(\d+)/);
                        if(a.parentNode.parentNode.children[2].children[0].innerText.split(" ")[0]=="View"){
                            // console.log(a.parentNode.parentNode.children[2].children[0]);
                            a.parentNode.parentNode.children[2].children[0].style.display = "flex";
                            a.parentNode.parentNode.children[2].children[0].innerText = "View Replies("+(parseInt(matches[0])+1)+")";
                        }
                        else{
                            a.parentNode.parentNode.children[2].children[0].innerText = "Hide Replies("+(parseInt(matches[0])+1)+")";
                        }   
                    }
                    createReplyFunction(response, a);
                }
            })
        }
    })
}


var y = document.querySelectorAll(".next_reply");
for(let i=0;i<y.length;i++){
    nextReplyFunction(y[i]);
}
