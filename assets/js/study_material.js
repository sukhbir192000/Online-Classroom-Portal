(function(){
    var boxelements = document.querySelectorAll('.box');
    for(let i=0;i<boxelements.length;i++){
        materialClass = boxelements[i].children[1].children[1];
        for(let j=0;j<materialClass.childElementCount;j++){
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


 let current_box=null,arr=[], links=[], files_temp_box = [],deleted_files=[];
let boxelements = document.querySelectorAll('.box');
for(let i=0;i<boxelements.length;i++){
    var editbutton = boxelements[i].children[1].children[3].children[0].children[0];
    editbutton.addEventListener('click',function(e){
        if(current_box!=null){
            var editbutton = current_box.children[1].children[3].children[0].children[0];
            var deletebutton = current_box.children[1].children[3].children[0].children[1];
            var savebutton =current_box.children[1].children[3].children[1].children[0];
            var title = current_box.children[0].children[1];
            var description = current_box.children[1].children[0].children[3];
            title.contentEditable="false";
            description.contentEditable="false";
            title.classList.remove("heading_edit");
            description.classList.remove("content_edit")
            deletebutton.classList.remove("hide");
            editbutton.classList.remove("hide");
            savebutton.classList.remove("show");
            title.textContent=arr[0];
            fileDeleteButtons = current_box.children[1].children[1];
            current_box.children[1].children[2].classList.remove("show_delete");
            for(let j=0;j<fileDeleteButtons.childElementCount;j++){
                fileDeleteButtons.children[j].setAttribute("download","download");
                fileDeleteButtons.children[j].href = links[j];
                fileDeleteButtons.children[j].children[2].classList.remove("show_delete");
                fileDeleteButtons.children[j].style.opacity = 1;
                fileDeleteButtons.children[j].style.pointerEvents = "auto";
            }
            files_temp_box = [];
            current_box.children[1].children[2].children[0].innerHTML = "";
            current_box=null;
            arr=[];
            links=[];
            deleted_files = [];
        }
        var editbutton = boxelements[i].children[1].children[3].children[0].children[0];
        var deletebutton = boxelements[i].children[1].children[3].children[0].children[1];
        var savebutton = boxelements[i].children[1].children[3].children[1].children[0];
        var title = boxelements[i].children[0].children[1];
        var description = boxelements[i].children[1].children[0].children[3];
        arr.push(title.textContent);
        arr.push(description.textContent);
        title.contentEditable="true";
        description.contentEditable="true";
        title.classList.add("heading_edit");
        description.classList.add("content_edit")
        deletebutton.classList.add("hide");
        editbutton.classList.add("hide");
        savebutton.classList.add("show");
        current_box=boxelements[i];
        fileDeleteButtons = current_box.children[1].children[1];
        for(let j=0;j<fileDeleteButtons.childElementCount;j++){
            fileDeleteButtons.children[j].removeAttribute("download");
            links.push(fileDeleteButtons.children[j].href);
            deleted_files.push(fileDeleteButtons.children[j].href);
            fileDeleteButtons.children[j].href= "#/";
            fileDeleteButtons.children[j].children[2].style.cursor = "pointer";
            fileDeleteButtons.children[j].children[2].classList.add("show_delete");
            current_box.children[1].children[2].classList.add("show_delete");
            fileDeleteButtons.children[j].children[2].addEventListener("click",function(e){
                deleted_files[j] = 0;
                fileDeleteButtons.children[j].children[2].classList.remove("show_delete");
                fileDeleteButtons.children[j].style.pointerEvents = "none";
                fileDeleteButtons.children[j].style.opacity = 0.5;
            });
        }

        current_box.children[1].children[2].children[1].addEventListener('change',function(e){
            var x = this;
            if(x.files.length>0){
                for(let i=0;i<x.files.length;i++){
                    var main = document.createElement("DIV");
                    main.classList.add("file_content");
                    var y = document.createElement("DIV");
                    var z = document.createElement("DIV");
                    y.textContent = x.files[i].name;
                    z.innerHTML = "<i class='fas fa-times'></i>"
                    y.classList.add("file_name");
                    z.classList.add("file_cross");
                    main.appendChild(y);
                    main.appendChild(z);
                    current_box.children[1].children[2].children[0].appendChild(main);
                    files_temp_box.push(x.files[i]);
                }
                x.value = "";
                var file_names_box =  current_box.children[1].children[2].children[0];
                for(let i=0;i<file_names_box.childElementCount;i++){
                    file_names_box.children[i].children[1].addEventListener('click',function(e){
                        file_names_box.children[i].style.display = "none";
                        files_temp_box[i] = 0;
                    })
                }
            }
        })
        savebutton.addEventListener('click',function(e){
            let i=0, j=0;
            while(i<deleted_files.length){
                if(deleted_files[i] == 0){
                    deleted_files.splice(i,1);
                }
                else{
                    i++;
                }
            }
            while(j<files_temp_box.length){
                if(files_temp_box[i] == 0){
                    files_temp_box.splice(j,1);
                }
                else{
                    j++;
                }
            }
            current_box.children[1].children[3].children[1].children[1].children[0].setAttribute('value',title.textContent);
            current_box.children[1].children[3].children[1].children[1].children[1].setAttribute('value',description.textContent);
            current_box.children[1].children[3].children[1].children[1].children[2].setAttribute('value',deleted_files);
            current_box.children[1].children[3].children[1].children[1].children[3].setAttribute('value',files_temp_box);
            current_box.children[1].children[3].children[1].children[1].submit();
        })
    })   
}




document.addEventListener('click',function(e){
    if(current_box){
        var rect = current_box.getBoundingClientRect();
        var savebutton =current_box.children[1].children[3].children[1].children[0];
        const style = getComputedStyle(savebutton);
        if((e.x<rect.left || e.x>rect.left+rect.width || e.y<rect.top || e.y>rect.top+rect.height) && style.visibility=='visible'){
            var editbutton = current_box.children[1].children[3].children[0].children[0];
            var deletebutton = current_box.children[1].children[3].children[0].children[1];
            var title = current_box.children[0].children[1];
            var description = current_box.children[1].children[0].children[3];
            title.contentEditable="false";
            description.contentEditable="false";
            title.classList.remove("heading_edit");
            description.classList.remove("content_edit")
            deletebutton.classList.remove("hide");
            editbutton.classList.remove("hide");
            savebutton.classList.remove("show");
            fileDeleteButtons = current_box.children[1].children[1];
            current_box.children[1].children[2].classList.remove("show_delete");
            for(let j=0;j<fileDeleteButtons.childElementCount;j++){
                fileDeleteButtons.children[j].setAttribute("download","download");
                fileDeleteButtons.children[j].href = links[j];
                fileDeleteButtons.children[j].children[2].classList.remove("show_delete");
                fileDeleteButtons.children[j].style.opacity = 1;
                fileDeleteButtons.children[j].style.pointerEvents = "auto";
            }
            files_temp_box = [];
            current_box.children[1].children[2].children[0].innerHTML = "";
            title.textContent=arr[0];
            description.textContent=arr[1];
            subject.textContent=arr[2];
            current_box=null;
            arr=[];
            links=[];
            deleted_files = [];
        }
    }
})


document.querySelector(".add").addEventListener('click',function(e){
    if(document.querySelector(".add_content").textContent == "Cancel"){
        document.querySelector(".add_content").textContent = "Add";
        document.querySelector(".add_icon").innerHTML =  "<i class='fas fa-plus'></i>";
        files_temp = [];
        document.getElementById("title").value="";
        document.getElementById("message").value="";
        document.querySelector(".file_names").innerHTML = "";
    }
    else{
        document.querySelector(".add_content").textContent = "Cancel";
        document.querySelector(".add_icon").innerHTML =  "<i class='fas fa-times'></i>";
    }
    document.querySelector(".add_admin").classList.toggle("showx");    
})


var files_temp = []
document.querySelector("#file").addEventListener('change',function(e){
    var x = document.getElementById("file");
    if(x.files.length>0){
        for(let i=0;i<x.files.length;i++){
            var main = document.createElement("DIV");
            main.classList.add("file_content");
            var y = document.createElement("DIV");
            var z = document.createElement("DIV");
            y.textContent = x.files[i].name;
            z.innerHTML = "<i class='fas fa-times'></i>"
            y.classList.add("file_name");
            z.classList.add("file_cross");
            main.appendChild(y);
            main.appendChild(z);
            document.querySelector(".file_names").appendChild(main);
            files_temp.push(x.files[i]);
        }
        x.value = "";
        var file_names = document.querySelector(".file_names");
        for(let i=0;i<file_names.childElementCount;i++){
            file_names.children[i].children[1].addEventListener('click',function(e){
                file_names.children[i].style.display = "none";
                files_temp[i] = 0;
            })
        }
    }
})

