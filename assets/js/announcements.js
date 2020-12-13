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


function ajaxClassFunc(){
    $.ajax({
        type:'GET',
        url:'/content/announcements/getClasses',
        cache:false,
        success:function(response){
            let sidebox = document.getElementById('class_sidebox');
            while(sidebox.childElementCount>2){
                sidebox.removeChild(sidebox.lastElementChild);
            }
            for(let i in response.data){
                if(i==0){
                    let currentTime = new Date(Date.now());
                    let current_hour = currentTime.getHours(), current_minute = currentTime.getMinutes();
                    let minutes = 60-current_minute + (response.data[i].startingTime - current_hour - 1)*60;
                    setTimeout(ajaxClassFunc, minutes*60000);
                }
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
            if(sidebox.childElementCount>2){
                sidebox.children[1].style.display = "none";
            }
            else{
                sidebox.children[1].style.display = "flex";
            }
        }
    })
}
ajaxClassFunc();

function ajaxAssignmentFunc(){
    $.ajax({
        type:'GET',
        url:'/content/announcements/getAssignments',
        cache:false,
        success:function(response){
            let sidebox = document.getElementById('assignment_sidebox');
            while(sidebox.childElementCount>2){
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
                let deadline_date = new Intl.DateTimeFormat('en-GB', { year: '2-digit', month: 'numeric', day: '2-digit'}).format(new Date(response.data[i].deadline));
                // let deadline_time = new Intl.DateTimeFormat('en-GB', { hour: 'numeric', minute: 'numeric'}).format(new Date(response.data[i].deadline));
                time_div.innerText = deadline_date;
                content_div.appendChild(title_div);
                content_div.appendChild(time_div);
                sidebox.appendChild(content_div);
            }
            if(sidebox.childElementCount>2){
                sidebox.children[1].style.display = "none";
            }
            else{
                sidebox.children[1].style.display = "flex";
            }
        }
    })
}
ajaxAssignmentFunc()

function ajaxQuizFunc(){
    $.ajax({
        type:'GET',
        url:'/content/announcements/getQuizzes',
        cache:false,
        success:function(response){
            let sidebox = document.getElementById('quiz_sidebox');
            while(sidebox.childElementCount>2){
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
                let quiz_date = new Intl.DateTimeFormat('en-GB', { year: '2-digit', month: 'numeric', day: '2-digit'}).format(new Date(response.data[i].dateTime));
                // let quiz_time = new Intl.DateTimeFormat('en-GB', { hour: 'numeric', minute: 'numeric'}).format(new Date(response.data[i].dateTime));
                time_div.innerText = quiz_date;
                content_div.appendChild(title_div);
                content_div.appendChild(time_div);
                sidebox.appendChild(content_div);
            }
            if(sidebox.childElementCount>2){
                sidebox.children[1].style.display = "none";
            }
            else{
                sidebox.children[1].style.display = "flex";
            }
        }
    })
}
ajaxQuizFunc();