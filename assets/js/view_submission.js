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
    materialClassAll = document.querySelectorAll(".material");
    for(let materialClass of materialClassAll){
        for(let j=0;j<materialClass.childElementCount;j++){
            console.log("hi",materialClass.children[j].href);

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

var files_container=document.querySelectorAll('.submission');
for(let file_container of files_container){
   
    file_container.addEventListener('click',function(e){
        this.children[0].children[0].children[0].children[0].classList.toggle('rotate_arrow');
        this.children[1].classList.toggle('submission_files_show');
    })
}
(function(){
    materialClassAll = document.querySelectorAll(".submission_files");
    for(let files of materialClassAll){
        for(let i=0;i<files.children.length;i++){

            let extension = files.children[i].href.split('.').pop().toLowerCase();
            icon(files.children[i].children[0],extension);  
        }
        
    }
})()
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






