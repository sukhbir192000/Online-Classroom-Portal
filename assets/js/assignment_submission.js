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


(function(){
    materialClass = document.querySelector(".material");
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

})();

function icon(fileIcon, extension){
    if( extension == 'pptx' || extension == 'ppt' || extension == 'pptm'){
        fileIcon.innerHTML = "<i class='fas fa-file-powerpoint'></i>";
        fileIcon.classList.add("color_ppt");
    }
    else if(extension == 'docx' || extension == 'doc' || extension == 'docm'){
        fileIcon.innerHTML = "<i class='fas fa-file-word'></i>";
        fileIcon.classList.add("color_word");
    }
    else if(extension == 'pdf'){
        fileIcon.innerHTML = "<i class='fas fa-file-pdf'></i>";
        fileIcon.classList.add("color_pdf");
    }
    else if(extension == 'jpg' || extension == 'png' || extension == 'jpeg' || extension == 'gif' || extension == 'tiff'|| extension == 'psd'){
        fileIcon.innerHTML = "<i class='fas fa-file-image'></i>";
        fileIcon.classList.add("color_image");
    }
    else if(extension == 'xlsx' || extension == 'xlsm' || extension == 'xlsb' || extension == 'xls' || extension == 'xml'){
        fileIcon.innerHTML = "<i class='fas fa-file-excel'></i>";
        fileIcon.classList.add("color_excel"); 
    }
    else if(extension == 'mp4' || extension == 'mpeg-4' || extension == 'mov' || extension == 'wmv' || extension == 'flv' || extension == 'avi'){
        fileIcon.innerHTML = "<i class='fas fa-file-video'></i>";
        fileIcon.classList.add("color_video"); 
    }
    else if(extension == 'pcm' || extension == 'wav' || extension == 'mp3' || extension == 'wma' ){
        fileIcon.innerHTML = "<i class='fas fa-file-audio'></i>";
        fileIcon.classList.add("color_audio"); 
    }
    else{
        fileIcon.innerHTML = "<i class='fas fa-file-alt'></i>";
        fileIcon.classList.add("color_file");
    }
}

eventListenerPresent = false;
document.getElementById("add_files_button").addEventListener('click',function(e){
    document.getElementById("file0").click();
    if(eventListenerPresent){
        return;
    }
    eventListenerPresent = true;
    document.getElementById("file0").addEventListener('change',function(e){
        let filedata = new FormData();
        console.log(filedata);
        filedata.append("files", this.files[0], this.files[0].name);
        $.ajax({
            url: window.location.pathname + "/addfile",
            data: filedata,
            cache: false,
            type: "POST",
            success: function(response){
                console.log(response);
            }
        })


        for(let j=0;j<this.files.length;j++){
            var newDiv = document.createElement("div");
            newDiv.classList.add("file_inside")
            var fileIcon = document.createElement("div");
            fileIcon.classList.add("file_icon");
            icon(fileIcon,this.value.split(".").pop());
            var fileName = document.createElement("div");
            fileName.classList.add("file_title");
            fileName.textContent = this.files[j].name;
            var fileDelete = document.createElement("div");
            fileDelete.innerHTML = "<i class='fas fa-times'></i>";
            fileDelete.classList.add("file_delete");
            newDiv.appendChild(fileIcon);
            newDiv.appendChild(fileName);
            newDiv.appendChild(fileDelete);
            document.querySelector(".files_added").appendChild(newDiv);
            fileDelete.addEventListener('click',function(e){
                this.parentNode.remove();
            })
        }
    })
})

document.querySelector(".submit_button").addEventListener('click',function(e){
    if(this.textContent == "Submit"){
        var material = document.querySelector(".files_added");
        for(let i=0;i<material.childElementCount;i++){
            material.children[i].children[2].style.display ="none";
        }
        document.getElementById("add_files_button").style.pointerEvents = "none";
        document.getElementById("add_files_button").style.display = "none";
        this.textContent = "Unsubmit";
    }
    else{
        var material = document.querySelector(".files_added");
        for(let i=0;i<material.childElementCount;i++){
            material.children[i].children[2].style.display ="flex";
        }
        document.getElementById("add_files_button").style.pointerEvents = "auto";
        document.getElementById("add_files_button").style.display = "flex";
        this.textContent = "Submit";
    }
})


