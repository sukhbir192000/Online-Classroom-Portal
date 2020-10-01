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

 

//---------------- filters-------------- 



var filterSubject=document.getElementsByClassName('filter_subject');
for(let filterElement of filterSubject){
    filterElement.addEventListener('click',function(e){
        var subjectQuery=filterElement.innerText;
        
        var sortQuery=document.querySelectorAll(".filter_sort.selected")[0].innerText;
        window.location.href="/content/announcements/?sub="+subjectQuery+"&date="+sortQuery;
    });
}
var filterSort=document.getElementsByClassName('filter_sort');
for(let filterElement of filterSort){
    filterElement.addEventListener('click',function(e){
        var sortQuery=filterElement.innerText;
        var subjectQuery=document.querySelectorAll(".filter_subject.selected")[0].innerText;

        window.location.href="/content/announcements/?sub="+subjectQuery+"&date="+sortQuery;
    });
}



//-----------------filters-end---------------