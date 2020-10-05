let current_box=null,arr=[];
let boxelements = document.querySelectorAll('.box');
for(let i=0;i<boxelements.length;i++){
    var editbutton = boxelements[i].children[1].children[0].children[8].children[0].children[0];
    editbutton.addEventListener('click',function(e){
        if(current_box!=null){
            var editbutton = current_box.children[1].children[0].children[8].children[0].children[0];
            var deletebutton = current_box.children[1].children[0].children[8].children[0].children[1];
            var savebutton = current_box.children[1].children[0].children[8].children[1].children[0];
            var title = current_box.children[0].children[1];
            var description = current_box.children[1].children[0].children[6];
            var references = current_box.children[1].children[0].children[5];
            var link = current_box.children[1].children[0].children[4];
            title.contentEditable="false";
            description.contentEditable="false";
            references.contentEditable="false";
            link.contentEditable="false";
            title.classList.remove("heading_edit");
            description.classList.remove("content_edit")
            references.classList.remove("content_edit")
            link.classList.remove("content_edit")
            deletebutton.classList.remove("hide");
            editbutton.classList.remove("hide");
            savebutton.classList.remove("show");
            title.textContent=arr[0];
            description.textContent=arr[1];
            references.textContent=arr[2];
            link.textContent=arr[3];
            current_box=null;
            arr=[];
        }
        var editbutton = boxelements[i].children[1].children[0].children[8].children[0].children[0];
        var deletebutton = boxelements[i].children[1].children[0].children[8].children[0].children[1];
        var savebutton = boxelements[i].children[1].children[0].children[8].children[1].children[0];
        var title = boxelements[i].children[0].children[1];
        var description = boxelements[i].children[1].children[0].children[6];
        var references = boxelements[i].children[1].children[0].children[5];
        var link = boxelements[i].children[1].children[0].children[4];
        arr.push(title.textContent);
        arr.push(description.textContent);
        arr.push(references.textContent);
        arr.push(link.textContent);
        if(title.textContent!=""){
            title.contentEditable="true";
            title.classList.add("heading_edit");
        }
        if(description.textContent!=""){
            description.contentEditable="true";
            description.classList.add("content_edit")
        }
        if(references.textContent!=""){
            references.contentEditable="true";
            references.classList.add("content_edit")
        }
        if(link.textContent!=""){
            link.contentEditable="true";
            link.classList.add("content_edit")
        }
        deletebutton.classList.add("hide");
        editbutton.classList.add("hide");
        savebutton.classList.add("show");
        current_box=boxelements[i];
        savebutton.addEventListener('click',function(e){
            current_box.children[1].children[0].children[8].children[1].children[1].children[0].setAttribute('value',title.textContent);
            current_box.children[1].children[0].children[8].children[1].children[1].children[1].setAttribute('value',description.textContent);
            current_box.children[1].children[0].children[8].children[1].children[1].children[2].setAttribute('value',references.textContent);
            current_box.children[1].children[0].children[8].children[1].children[1].children[3].setAttribute('value',link.textContent);
            current_box.children[1].children[0].children[8].children[1].children[1].submit();
        })
     })   
 }
 
document.addEventListener('click',function(e){
    if(current_box){
        var rect = current_box.getBoundingClientRect();
        var savebutton =current_box.children[1].children[0].children[8].children[1].children[0];
        const style = getComputedStyle(savebutton);
        if((e.x<rect.left || e.x>rect.left+rect.width || e.y<rect.top || e.y>rect.top+rect.height) && style.visibility=='visible'){
            var editbutton = current_box.children[1].children[0].children[8].children[0].children[0];
            var deletebutton = current_box.children[1].children[0].children[8].children[0].children[1];
            var savebutton = current_box.children[1].children[0].children[8].children[1].children[0];
            var title = current_box.children[0].children[1];
            var description = current_box.children[1].children[0].children[6];
            var references = current_box.children[1].children[0].children[5];
            var link = current_box.children[1].children[0].children[4];
            title.contentEditable="false";
            description.contentEditable="false";
            references.contentEditable="false";
            link.contentEditable="false";
            title.classList.remove("heading_edit");
            description.classList.remove("content_edit")
            references.classList.remove("content_edit")
            link.classList.remove("content_edit")
            deletebutton.classList.remove("hide");
            editbutton.classList.remove("hide");
            savebutton.classList.remove("show");
            title.textContent=arr[0];
            description.textContent=arr[1];
            references.textContent=arr[2];
            link.textContent=arr[3];
            current_box=null;
            arr=[];
        }
    }
})
 


document.querySelector(".add").addEventListener('click',function(e){
    if(document.querySelector(".add_content").textContent == "Cancel"){
        document.querySelector(".add_content").textContent = "Add";
        document.querySelector(".add_icon").innerHTML =  "<i class='fas fa-plus'></i>";
        document.getElementById("lecture_title").value="";
        document.getElementById("lecture_message").value="";
        document.getElementById("lecture_date").value="";
        document.getElementById("lecture_link").value="";
        document.getElementById("lecture_references").value="";
        branchForm.disabled=true;
        groupForm.disabled=true;
        subGroupForm.disabled=true;
        subjectForm.selectedIndex=0;
        branchForm.selectedIndex=0;
        groupForm.selectedIndex=0;
        subGroupForm.selectedIndex=0;
    }
    else{
        document.querySelector(".add_content").textContent = "Cancel";
        document.querySelector(".add_icon").innerHTML =  "<i class='fas fa-times'></i>";
    }
    document.querySelector(".add_admin").classList.toggle("showx");    
})
//----------addlecture--------------------
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
