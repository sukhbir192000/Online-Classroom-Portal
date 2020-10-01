
 let current_box=null,arr=[];
 let boxelements = document.querySelectorAll('.box');
 for(let i=0;i<boxelements.length;i++){
     var editbutton = boxelements[i].children[1].children[0].children[2].children[0].children[0];
     editbutton.addEventListener('click',function(e){
         if(current_box!=null){
             var editbutton = current_box.children[1].children[0].children[2].children[0].children[0];
             var deletebutton = current_box.children[1].children[0].children[2].children[0].children[1];
             var savebutton =current_box.children[1].children[0].children[2].children[1].children[0];
             var title = current_box.children[0].children[1];
             var description = current_box.children[1].children[0].children[0];
             var subject = current_box.children[0].children[0];
             deletebutton.classList.remove("hide");
             editbutton.classList.remove("hide");
             savebutton.classList.remove("show");
             title.textContent=arr[0];
             description.textContent=arr[1];
             subject.textContent=arr[2];
             current_box=null;
             arr=[];
         }
         var editbutton = boxelements[i].children[1].children[0].children[2].children[0].children[0];
         var deletebutton = boxelements[i].children[1].children[0].children[2].children[0].children[1];
         var savebutton = boxelements[i].children[1].children[0].children[2].children[1].children[0];
         var title = boxelements[i].children[0].children[1];
         var description = boxelements[i].children[1].children[0].children[0];
         var subject = boxelements[i].children[0].children[0];
         arr.push(title.textContent);
         arr.push(description.textContent);
         arr.push(subject.textContent);
         title.contentEditable="true";
         subject.contentEditable="true";
         description.contentEditable="true";
         // deletebutton.classList.remove("show");
         deletebutton.classList.add("hide");
         // editbutton.classList.remove("show");
         editbutton.classList.add("hide");
         savebutton.classList.add("show");
         current_box=boxelements[i];
     })   
 }
 
 document.addEventListener('click',function(e){
     if(current_box){
         var rect = current_box.getBoundingClientRect();
         var savebutton =current_box.children[1].children[0].children[2].children[1].children[0];
         const style = getComputedStyle(savebutton);
         if((e.x<rect.left || e.x>rect.left+rect.width || e.y<rect.top || e.y>rect.top+rect.height) && style.visibility=='visible'){
             console.log('activated');
             var editbutton = current_box.children[1].children[0].children[2].children[0].children[0];
             var deletebutton = current_box.children[1].children[0].children[2].children[0].children[1];
             var title = current_box.children[0].children[1];
             var description = current_box.children[1].children[0].children[0];
             var subject = current_box.children[0].children[0];
             title.contentEditable="false";
             subject.contentEditable="false";
             description.contentEditable="false";
             deletebutton.classList.remove("hide");
             editbutton.classList.remove("hide");
             savebutton.classList.remove("show");
             title.textContent=arr[0];
             description.textContent=arr[1];
             subject.textContent=arr[2];
             current_box=null;
             arr=[];
         }
     }
 })
 //----------addannouncement--------------------
var branchForm=document.getElementById("branch")
branchForm.disabled=true;
var groupForm=document.getElementById("group")
groupForm.disabled=true;
var subGroupForm=document.getElementById("sub_group")
subGroupForm.disabled=true;
var subjectForm=document.getElementById("subject");
subjectForm.addEventListener('click',function(e){
    $.ajax({
        url:"/content/announcements/form/subjects",
        cache:false,
        type:"GET",
        success:function(response){
            for(let obj of response.data.subjectsId){
                    var opt = document.createElement('option');
                    opt.value=obj.id,
                    opt.innerText=obj.name,
                    subjectForm.appendChild(opt);
            }
        }
    })
    // console.log(subjectForm.value);
    if(subjectForm.value!="All"){
        branchForm.disabled=false;
    }
    else{
        branchForm.selectedIndex=0;
        groupForm.selectedIndex=0;
        subGroupForm.selectedIndex=0;
        branchForm.disabled=true;
        groupForm.disabled=true;
        subGroupForm.disabled=true;

    }
})
// ---------------------
branchForm.addEventListener('click',function(e){
    
    if(branchForm.value!="All"){
        groupForm.disabled=false;
    }
    else{
        groupForm.selectedIndex=0;
        subGroupForm.selectedIndex=0;
        groupForm.disabled=true;
        subGroupForm.disabled=true;
    }
})
groupForm.addEventListener('click',function(e){
    if(groupForm.value!="All"){
        subGroupForm.disabled=false;
    }
    else{
        subGroupForm.selectedIndex=0;
        subGroupForm.disabled=true;
    }
})
// ------------------------------------