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
// ---------------------------------------------------------------------------------------------------------------

function FileListItems (files) {
    var b = new ClipboardEvent("").clipboardData || new DataTransfer()
    for (var i = 0, len = files.length; i<len; i++) b.items.add(files[i])
    return b.files
  }
  
//   var files = [
//     new File(['content'], 'sample1.txt'),
//     new File(['abc'], 'sample2.txt')
//   ];
  
  
//   fileInput.files = new FileListItems(files)
//   console.log(fileInput.files)

// var files_temp = []
// document.querySelector("#file").addEventListener('change',function(e){
//     document.getElementById('file').textContent
//     var x = document.getElementById("file");
//     if(x.files.length>0){
//         for(let i=0;i<x.files.length;i++){
//             var main = document.createElement("DIV");
//             main.classList.add("file_content");
//             var y = document.createElement("DIV");
//             var z = document.createElement("DIV");
//             y.textContent = x.files[i].name;
//             z.innerHTML = "<i class='fas fa-times'></i>"
//             y.classList.add("file_name");
//             z.classList.add("file_cross");
//             main.appendChild(y);
//             main.appendChild(z);
//             document.querySelector(".file_names").appendChild(main);
//             files_temp.push(x.files[i]);
//         }
//         x.value = "";
//         var file_names = document.querySelector(".file_names");
//         for(let i=0;i<file_names.childElementCount;i++){
//             file_names.children[i].children[1].addEventListener('click',function(e){
//                 file_names.children[i].style.display = "none";
//                 files_temp[i] = 0;
//             })
//         }
//     }
// })


//-----------------------------add study material-----------------------------
var branchForm=document.getElementById("branch")
branchForm.disabled=true;
var groupForm=document.getElementById("group")
groupForm.disabled=true;
var subGroupForm=document.getElementById("sub_group")
subGroupForm.disabled=true;
var subjectForm=document.getElementById("subject");
var addButton=document.getElementById("addButton");
addButton.addEventListener('click',function(e){
    $.ajax({
        url:"/content/announcements/form/subjects",
        cache:false,
        type:"GET",
        success:function(response){
            subjectForm.innerText="";
            var opt = document.createElement('option');
            opt.value="All",
            opt.innerText="All",
            subjectForm.appendChild(opt);
            for(let obj of response.data.subjectsId){
                var opt = document.createElement('option');
                opt.value=obj.id,
                opt.innerText=obj.name,
                subjectForm.appendChild(opt);
            }
        }
    })
})
subjectForm.addEventListener('change',function(e){
    branchForm.selectedIndex=0;
    groupForm.selectedIndex=0;
    subGroupForm.selectedIndex=0;
    groupForm.disabled=true;
    subGroupForm.disabled=true;
    if(subjectForm.value!="All"){
        branchForm.disabled=false;
    }
    else{
        branchForm.disabled=true;
    }
    if(subjectForm.value!="All"){
        $.ajax({
            url:"/content/announcements/form/branches",
            data: {course: subjectForm.value},
            cache:false,
            type:"POST",
            success:function(response){
                branchForm.innerText="";
                var opt = document.createElement('option');
                opt.value="All",
                opt.innerText="All",
                branchForm.appendChild(opt);
                for(let obj of response.data.branchList){
                    var opt = document.createElement('option');
                    opt.value=obj.id,
                    opt.innerText=obj.name,
                    branchForm.appendChild(opt);
                }
            }
        })
    }
})
// ---------------------
branchForm.addEventListener('change',function(e){
    groupForm.selectedIndex=0;
    subGroupForm.selectedIndex=0;
    subGroupForm.disabled=true;
    if(branchForm.value!="All"){
        groupForm.disabled=false;
    }
    else{
        groupForm.disabled=true;
    }
    if(branchForm.value!="All"){
        $.ajax({
            url:"/content/announcements/form/groups",
            data: {course: subjectForm.value,class:branchForm.value},
            cache:false,
            type:"POST",
            success:function(response){
                groupForm.innerText="";
                var opt = document.createElement('option');
                opt.value="All",
                opt.innerText="All",
                groupForm.appendChild(opt);
                for(let obj of response.data.groupList){
                    var opt = document.createElement('option');
                    opt.value=obj.id,
                    opt.innerText=obj.name,
                    groupForm.appendChild(opt);
                }
            }
        })
    }
})
groupForm.addEventListener('change',function(e){
    subGroupForm.selectedIndex=0;
    if(groupForm.value!="All"){
        subGroupForm.disabled=false;
        $.ajax({
            url:"/content/announcements/form/subGroups",
            data: {course: subjectForm.value,class:branchForm.value,group:groupForm.value},
            cache:false,
            type:"POST",
            success:function(response){
                subGroupForm.innerText="";
                var opt = document.createElement('option');
                opt.value="All",
                opt.innerText="All",
                subGroupForm.appendChild(opt);
                for(let obj of response.data.subGroupList){
                    var opt = document.createElement('option');
                    opt.value=obj.id,
                    opt.innerText=obj.name,
                    subGroupForm.appendChild(opt);
                }
            }
        })
    }
    else{
        subGroupForm.disabled=true;
    }
})