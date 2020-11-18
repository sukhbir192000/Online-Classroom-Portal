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

let presentMinutes=new Date(Date.now()).getMinutes();
if(presentMinutes==0){
    setClasses();
}
else{
    ajaxClassFunc();
    setTimeout(setClasses, (60-currentMinutes)*60000);
}
function setClasses(){
    ajaxClassFunc();
    setInterval(ajaxClassFunc,3600000);
}

function ajaxClassFunc(){
    $.ajax({
        type:'GET',
        url:'/content/announcements/getClasses',
        cache:false,
        success:function(response){
            let sidebox = document.getElementById('class_sidebox');
            while(sidebox.childElementCount>1){
                sidebox.removeChild(sidebox.lastElementChild);
            }
            for(let i in response.data){
                let content_div = document.createElement('div');
                content_div.classList.add("sidebar_content");
                let title_div = document.createElement('div');
                title_div.classList.add("sidebar_title");
                title_div.innerText = response.data[i].classSub.course.name;
                let time_div = document.createElement('div');
                time_div.classList.add("sidebar_time");
                time_div.innerText = response.data[i].startingTime + ":00";
                content_div.appendChild(title_div);
                content_div.appendChild(time_div);
                sidebox.appendChild(content_div);
            }
        }
    })
}