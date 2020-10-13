document.querySelector(".add").addEventListener('click',function(e){
    if(document.querySelector(".add_content").textContent == "Cancel"){
        document.querySelector(".add_content").textContent = "Add";
        document.querySelector(".add_icon").innerHTML =  "<i class='fas fa-plus'></i>";
        document.getElementById("date_quiz").value="";
        document.getElementById("time_quiz").value="";
        document.getElementById("quiz_link").value="";
        document.getElementById("quiz_title").value="";
        document.getElementById("quiz_instructions").value="";
        // branchForm.disabled=true;
        // groupForm.disabled=true;
        // subGroupForm.disabled=true;
        // subjectForm.selectedIndex=0;
        // branchForm.selectedIndex=0;
        // groupForm.selectedIndex=0;
        // subGroupForm.selectedIndex=0;
    }
    else{
        document.querySelector(".add_content").textContent = "Cancel";
        document.querySelector(".add_icon").innerHTML =  "<i class='fas fa-times'></i>";
    }
    document.querySelector(".add_admin").classList.toggle("showx");    
})

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
            var link = current_box.children[1].children[0].children[5];
            var duration = current_box.children[1].children[0].children[1].children[1];
            var deadline_content = current_box.children[1].children[0].children[0].children[1];
            var deadline_input = current_box.children[1].children[0].children[0].children[2];
            title.contentEditable="false";
            description.contentEditable="false";
            link.contentEditable="false";
            duration.contentEditable="false";
            title.classList.remove("heading_edit");
            description.classList.remove("content_edit")
            link.classList.remove("content_edit")
            duration.classList.remove("content_edit")
            deletebutton.classList.remove("hide");
            editbutton.classList.remove("hide");
            savebutton.classList.remove("show");
            deadline_content.style.display = "flex";
            deadline_input.style.display = "none";
            title.textContent=arr[0];
            description.textContent=arr[1];
            link.textContent=arr[2];
            duration.textContent=arr[3];
            deadline_content=arr[4];
            current_box=null;
            arr=[];
        }
        var editbutton = boxelements[i].children[1].children[0].children[8].children[0].children[0];
        var deletebutton = boxelements[i].children[1].children[0].children[8].children[0].children[1];
        var savebutton = boxelements[i].children[1].children[0].children[8].children[1].children[0];
        var title = boxelements[i].children[0].children[1];
        var description = boxelements[i].children[1].children[0].children[6];
        var link = boxelements[i].children[1].children[0].children[5];
        var duration = boxelements[i].children[1].children[0].children[1].children[1];
        var deadline_content = boxelements[i].children[1].children[0].children[0].children[1];
        var deadline_input = boxelements[i].children[1].children[0].children[0].children[2];
        arr.push(title.textContent);
        arr.push(description.textContent);
        arr.push(link.textContent);
        arr.push(duration.textContent);
        arr.push(deadline_content.textContent);
        title.contentEditable="true";
        title.setAttribute("title-text","Enter title")
        title.classList.add("heading_edit");
        description.contentEditable="true";
        description.setAttribute("description-text", "Other instructions");
        description.classList.add("content_edit")
        link.contentEditable="true";
        link.setAttribute("link-text","Enter link of quiz");
        link.classList.add("content_edit")
        duration.contentEditable = "true";
        duration.classList.add("content_edit")
        deadline_content.style.display = "none";
        deadline_input.style.display = "flex";
        deletebutton.classList.add("hide");
        editbutton.classList.add("hide");
        savebutton.classList.add("show");
        current_box=boxelements[i];
        savebutton.addEventListener('click',function(e){
            current_box.children[1].children[0].children[8].children[1].children[1].children[0].setAttribute('value',title.textContent);
            current_box.children[1].children[0].children[8].children[1].children[1].children[1].setAttribute('value',description.textContent);
            current_box.children[1].children[0].children[8].children[1].children[1].children[2].setAttribute('value',link.textContent);
            current_box.children[1].children[0].children[8].children[1].children[1].children[3].setAttribute('value',duration.value);
            current_box.children[1].children[0].children[8].children[1].children[1].children[4].setAttribute('value',deadline_input.value);
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
            var link = current_box.children[1].children[0].children[5];
            var duration = current_box.children[1].children[0].children[1].children[1];
            var deadline_content = current_box.children[1].children[0].children[0].children[1];
            var deadline_input = current_box.children[1].children[0].children[0].children[2];
            title.contentEditable="false";
            description.contentEditable="false";
            link.contentEditable="false";
            duration.contentEditable="false";
            title.classList.remove("heading_edit");
            description.classList.remove("content_edit");
            link.classList.remove("content_edit");
            duration.classList.remove("content_edit")
            deadline_content.style.display = "flex";
            deadline_input.style.display = "none";
            deletebutton.classList.remove("hide");
            editbutton.classList.remove("hide");
            savebutton.classList.remove("show");
            title.textContent=arr[0];
            description.textContent=arr[1];
            link.textContent=arr[2];
            duration.textContent=arr[3];
            deadline_content.textContent=arr[4];
            current_box=null;
            arr=[];
        }
    }
})