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
            current_box.children[1].children[0].children[8].children[1].children[1].children[0].setAttribute('value',arr[0]);
            current_box.children[1].children[0].children[8].children[1].children[1].children[1].setAttribute('value',arr[1]);
            current_box.children[1].children[0].children[8].children[1].children[1].children[2].setAttribute('value',arr[2]);
            current_box.children[1].children[0].children[8].children[1].children[1].children[3].setAttribute('value',arr[3]);
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
    }
    else{
        document.querySelector(".add_content").textContent = "Cancel";
        document.querySelector(".add_icon").innerHTML =  "<i class='fas fa-times'></i>";
    }
    document.querySelector(".add_admin").classList.toggle("showx");    
})