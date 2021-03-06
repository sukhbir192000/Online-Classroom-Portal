var today = new Date();
var dd = today.getDate();
var mm = today.getMonth()+1;
var yyyy = today.getFullYear();
if(dd<10){
    dd='0'+dd;
} 
if(mm<10){
    mm='0'+mm;
} 
var hh = today.getHours();
if(hh<10){
    hh = '0'+hh;
}
var minutes = today.getMinutes();
if(minutes<10){
    minutes = '0'+minutes;
}

today = yyyy+'-'+mm+'-'+dd+'T'+hh+':'+minutes;
document.getElementById("lecture_deadline").setAttribute("min", today);


let current_box=null,arr=[], links=[],deleted_files=[];
let boxelements = document.querySelectorAll('.box');
for(let i=0;i<boxelements.length;i++){
    var editbutton = boxelements[i].children[1].children[3].children[0].children[0];
    editbutton.addEventListener('click',function(e){
        console.log("hii");
        if(current_box!=null){
            var editbutton = current_box.children[1].children[3].children[0].children[0];
            var deletebutton = current_box.children[1].children[3].children[0].children[1];
            var savebutton =current_box.children[1].children[3].children[1].children[0];
            var title = current_box.children[0].children[1];
            var points = current_box.children[0].children[2].children[1];
            var description = current_box.children[1].children[0].children[4];
            var deadline_content = current_box.children[1].children[0].children[0].children[1];
            var deadline_input = current_box.children[1].children[0].children[0].children[2];
            deadline_content.style.display = "flex";
            deadline_input.style.display = "none";
            title.contentEditable="false";
            points.contentEditable = "false"
            description.contentEditable="false";
            title.classList.remove("heading_edit");
            points.classList.remove("heading_edit");
            description.classList.remove("content_edit")
            deletebutton.classList.remove("hide");
            editbutton.classList.remove("hide");
            savebutton.classList.remove("show");
            title.textContent=arr[0];
            description.textContent=arr[1];
            points.textContent = arr[2];
            deadline_content.textContent = arr[3];
            current_box.children[1].children[2].style.display = "flex"
            fileDeleteButtons = current_box.children[1].children[1];
            // current_box.children[1].children[2].classList.remove("show_delete");
            for(let j=0;j<fileDeleteButtons.childElementCount;j++){
                fileDeleteButtons.children[j].setAttribute("download","download");
                fileDeleteButtons.children[j].href = links[j];
                fileDeleteButtons.children[j].children[2].classList.remove("show_delete");
                fileDeleteButtons.children[j].style.opacity = 1;
                fileDeleteButtons.children[j].style.pointerEvents = "auto";
            }
            // current_box.children[1].children[2].children[0].innerHTML = "";
            current_box=null;
            arr=[];
            links=[];
            deleted_files = [];c
            console.log("inside");
        }
        var editbutton = boxelements[i].children[1].children[3].children[0].children[0];
        var deletebutton = boxelements[i].children[1].children[3].children[0].children[1];
        var savebutton = boxelements[i].children[1].children[3].children[1].children[0];
        var title = boxelements[i].children[0].children[1];
        var points = boxelements[i].children[0].children[2].children[1];
        var description = boxelements[i].children[1].children[0].children[4];
        var deadline_content = boxelements[i].children[1].children[0].children[0].children[1];
        var deadline_input = boxelements[i].children[1].children[0].children[0].children[2];
        arr.push(title.textContent);
        arr.push(description.textContent);
        arr.push(points.textContent);
        arr.push(deadline_content.textContent);
        deadline_content.style.display = "none";
        deadline_input.style.display = "flex";
        document.getElementById("deadline_current").setAttribute("min", today);
        title.contentEditable="true";
        points.contentEditable="true";
        description.contentEditable="true";
        title.classList.add("heading_edit");
        title.setAttribute("title-text","Enter title");
        points.classList.add("heading_edit");
        description.classList.add("content_edit");
        description.setAttribute("description-text", "Enter description");
        deletebutton.classList.add("hide");
        editbutton.classList.add("hide");
        savebutton.classList.add("show");
        console.log("inside");
        current_box=boxelements[i];
        current_box.children[1].children[2].style.display = "none"
        fileDeleteButtons = current_box.children[1].children[1];
        for(let j=0;j<fileDeleteButtons.childElementCount;j++){
            fileDeleteButtons.children[j].removeAttribute("download");
            links.push(fileDeleteButtons.children[j].href);
            fileDeleteButtons.children[j].href= "#/";
            fileDeleteButtons.children[j].children[2].style.cursor = "pointer";
            fileDeleteButtons.children[j].children[2].classList.add("show_delete");
            // current_box.children[1].children[2].classList.add("show_delete");
            fileDeleteButtons.children[j].children[2].addEventListener("click",function(e){
                deleted_files.push(links[j]);
                fileDeleteButtons.children[j].children[2].classList.remove("show_delete");
                fileDeleteButtons.children[j].style.pointerEvents = "none";
                fileDeleteButtons.children[j].style.opacity = 0.5;
            });
        }
        savebutton.addEventListener('click',function(e){
            current_box.children[1].children[3].children[1].children[1].children[0].setAttribute('value',title.textContent);
            current_box.children[1].children[3].children[1].children[1].children[1].setAttribute('value',description.textContent);
            current_box.children[1].children[3].children[1].children[1].children[2].setAttribute('value',deleted_files);
            current_box.children[1].children[3].children[1].children[1].children[3].setAttribute('value',points.textContent);
            current_box.children[1].children[3].children[1].children[1].children[4].setAttribute('value',deadline_input.value);
            // current_box.children[1].children[3].children[1].children[1].submit();
            $.ajax({
                url: current_box.children[1].children[3].children[1].children[1].action,
                data: {
                    title: title.textContent,
                    description: description.textContent,
                    after_delete_files: deleted_files,
                    points: points.textContent,
                    deadline_input: deadline_input.value
                },
                type: "POST",
                success: function(response){
                    location.reload();
                }
            })
        })
    })   
}

document.addEventListener('click',function(e){
    if(current_box){
        var rect = current_box.getBoundingClientRect();
        var savebutton =current_box.children[1].children[3].children[1].children[0];
        const style = getComputedStyle(savebutton);
        if((e.x<rect.left || e.x>rect.left+rect.width || e.y<rect.top || e.y>(rect.top+rect.height)) && style.visibility=='visible'){
            console.log(e.x<rect.left);
            console.log(e.x>rect.left+rect.width);
            console.log(e.y<rect.top);
            console.log(e.y>rect.top+rect.height);
            var editbutton = current_box.children[1].children[3].children[0].children[0];
            var deletebutton = current_box.children[1].children[3].children[0].children[1];
            var title = current_box.children[0].children[1];
            var points = current_box.children[0].children[2].children[1];
            var description = current_box.children[1].children[0].children[4];
            var deadline_content = current_box.children[1].children[0].children[0].children[1];
            var deadline_input = current_box.children[1].children[0].children[0].children[2];
            deadline_content.style.display = "flex";
            deadline_input.style.display = "none";
            title.contentEditable="false";
            points.contentEditable="false";
            description.contentEditable="false";
            title.classList.remove("heading_edit");
            points.classList.remove("heading_edit");
            description.classList.remove("content_edit")
            deletebutton.classList.remove("hide");
            editbutton.classList.remove("hide");
            savebutton.classList.remove("show");
            current_box.children[1].children[2].style.display = "flex"
            fileDeleteButtons = current_box.children[1].children[1];
            // current_box.children[1].children[2].classList.remove("show_delete");
            for(let j=0;j<fileDeleteButtons.childElementCount;j++){
                fileDeleteButtons.children[j].setAttribute("download","download");
                fileDeleteButtons.children[j].href = links[j];
                fileDeleteButtons.children[j].children[2].classList.remove("show_delete");
                fileDeleteButtons.children[j].style.opacity = 1;
                fileDeleteButtons.children[j].style.pointerEvents = "auto";
            }
            title.textContent=arr[0];
            description.textContent=arr[1];
            points.textContent=arr[2];
            deadline_content.textContent = arr[3];
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
        branchForm.disabled=true;
        subGroupForm.disabled=true;
        subjectForm.selectedIndex=0;
        branchForm.selectedIndex=0;
        classTypeForm.selectedIndex=0;
        subGroupForm.selectedIndex=0;
        document.getElementById("title").value="";
        document.getElementById("message").value="";
        document.getElementById("lecture_deadline").value="";
        document.querySelector("#file_names").innerHTML = "";
        document.getElementById("file_inputs").innerHTML = "";
        document.getElementById("weightage_input").value = "";
        var newInput = document.createElement("input");
        newInput.name = 'file0';
        newInput.className = "file";
        newInput.type = "file";
        newInput.style.display = "none";
        document.getElementById("file_inputs").appendChild(newInput);
        var newButton = document.createElement("button");
        newButton.id = "add_files_button";
        newButton.textContent = "Add files";
        newButton.type="button";
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

var branchForm=document.getElementById("branch")
branchForm.disabled=true;
var classTypeForm=document.getElementById("class_type")
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
            classTypeForm.innerText="";
            if(response.data.lecturePresent){
                var opt = document.createElement('option');
                opt.value="Lecture",
                opt.innerText="Lecture",
                classTypeForm.appendChild(opt);
            }
            if(response.data.labPresent){
                var opt = document.createElement('option');
                opt.value="Lab",
                opt.innerText="Lab/Tutorial",
                classTypeForm.appendChild(opt);
            }
            classTypeForm.selectedIndex = 0;
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
    subGroupForm.selectedIndex=0;
    subGroupForm.disabled=true;
    if(subjectForm.value!="All"){
        branchForm.disabled=false;
        let classTypeValue = classTypeForm.value;
        $.ajax({
            url:"/content/announcements/form/branches",
            data: {course: subjectForm.value, class_type: classTypeForm.value},
            cache:false,
            type:"POST",
            success:function(response){
                classTypeForm.innerText="";
                if(response.data.lecturePresent){
                    var opt = document.createElement('option');
                    opt.value="Lecture",
                    opt.innerText="Lecture",
                    classTypeForm.appendChild(opt);
                }
                if(response.data.labPresent){
                    var opt = document.createElement('option');
                    opt.value="Lab",
                    opt.innerText="Lab/Tutorial",
                    classTypeForm.appendChild(opt);
                }
                classTypeForm.selectedIndex = 0;
                branchForm.innerText="";
                var opt = document.createElement('option');
                opt.value="All";
                opt.innerText="All";
                branchForm.appendChild(opt);
                for(let obj of response.data.branchList){
                    var opt = document.createElement('option');
                    opt.value=obj.id,
                    opt.innerText=obj.name,
                    branchForm.appendChild(opt);
                }
                branchForm.selectedIndex=0;
                if(classTypeValue != classTypeForm.value){
                    $.ajax({
                        url:"/content/announcements/form/branches",
                        data: {course: subjectForm.value, class_type: classTypeForm.value},
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
                            branchForm.selectedIndex=0;
                        }
                    })
                }
            }
        })
    }
    else{
        branchForm.disabled=true;
    }
})
// ---------------------

classTypeForm.addEventListener('change',function(e){
    branchForm.selectedIndex=0;
    subGroupForm.selectedIndex=0;
    subGroupForm.disabled=true;
    if(subjectForm.value!="All"){
        branchForm.disabled=false;
        $.ajax({
            url:"/content/announcements/form/branches",
            data: {course: subjectForm.value, class_type: classTypeForm.value},
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
                branchForm.selectedIndex=0;
            }
        })
    }
    else{
        branchForm.disabled=true;
    }
})

branchForm.addEventListener('change',function(e){
    subGroupForm.selectedIndex=0;
    if(branchForm.value!="All"){
        subGroupForm.disabled=false;
        $.ajax({
            url:"/content/announcements/form/subGroups",
            data: {course: subjectForm.value,class:branchForm.value,classType:classTypeForm.value},
            cache:false,
            type:"POST",
            success:function(response){
                subGroupForm.innerText="";
                var opt = document.createElement('option');
                opt.value="All",
                opt.innerText="All",
                subGroupForm.appendChild(opt);
                for(let obj of response.data.groupList){
                    var opt = document.createElement('option');
                    opt.value=obj.id,
                    opt.innerText=obj.name,
                    subGroupForm.appendChild(opt);
                }
            }
        });
    }
    else{
        subGroupForm.disabled=true;
    }
})