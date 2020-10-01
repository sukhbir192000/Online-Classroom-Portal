
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