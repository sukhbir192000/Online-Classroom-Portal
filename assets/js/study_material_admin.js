let current_box=null,arr=[], links=[],deleted_files=[];
let boxelements = document.querySelectorAll('.box');
for(let i=0;i<boxelements.length;i++){
    var editbutton = boxelements[i].children[1].children[2].children[0].children[0];
    editbutton.addEventListener('click',function(e){
        if(current_box!=null){
            var editbutton = current_box.children[1].children[2].children[0].children[0];
            var deletebutton = current_box.children[1].children[2].children[0].children[1];
            var savebutton =current_box.children[1].children[2].children[1].children[0];
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
            current_box.children[1].children[2].children[0].innerHTML = "";
            current_box=null;
            arr=[];
            links=[];
            deleted_files = [];
        }
        var editbutton = boxelements[i].children[1].children[2].children[0].children[0];
        var deletebutton = boxelements[i].children[1].children[2].children[0].children[1];
        var savebutton = boxelements[i].children[1].children[2].children[1].children[0];
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
            fileDeleteButtons.children[j].href= "#/";
            fileDeleteButtons.children[j].children[2].style.cursor = "pointer";
            fileDeleteButtons.children[j].children[2].classList.add("show_delete");
            current_box.children[1].children[2].classList.add("show_delete");
            fileDeleteButtons.children[j].children[2].addEventListener("click",function(e){
                deleted_files.push(links[j]);
                fileDeleteButtons.children[j].children[2].classList.remove("show_delete");
                fileDeleteButtons.children[j].style.pointerEvents = "none";
                fileDeleteButtons.children[j].style.opacity = 0.5;
            });
        }
        savebutton.addEventListener('click',function(e){
            current_box.children[1].children[2].children[1].children[1].children[0].setAttribute('value',title.textContent);
            current_box.children[1].children[2].children[1].children[1].children[1].setAttribute('value',description.textContent);
            current_box.children[1].children[2].children[1].children[1].children[2].setAttribute('value',deleted_files);
            current_box.children[1].children[2].children[1].children[1].submit();
        })
    })   
}




document.addEventListener('click',function(e){
    if(current_box){
        var rect = current_box.getBoundingClientRect();
        var savebutton =current_box.children[1].children[2].children[1].children[0];
        const style = getComputedStyle(savebutton);
        if((e.x<rect.left || e.x>rect.left+rect.width || e.y<rect.top || e.y>rect.top+rect.height) && style.visibility=='visible'){
            var editbutton = current_box.children[1].children[2].children[0].children[0];
            var deletebutton = current_box.children[1].children[2].children[0].children[1];
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
        newButton.id = "new_files_button";
        newButton.textContent = "Add files";
        document.getElementById("file_inputs").appendChild(newButton);
    }
    else{
        document.querySelector(".add_content").textContent = "Cancel";
        document.querySelector(".add_icon").innerHTML =  "<i class='fas fa-times'></i>";
    }
    document.querySelector(".add_admin").classList.toggle("showx");    
})

availableFiles = ['file1', 'file2', 'file3', 'file4','file5', 'file6', 'file7', 'file8', 'file9']
eventListenerPresent = [false,false,false,false,false,false,false,false,false,false]
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