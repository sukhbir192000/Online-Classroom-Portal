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

 
let week_shift_div = document.getElementById('week_shift');
let offset = 0;
let inProcess = false;
let daysRow=document.getElementsByClassName('table_row')[0];
let startDate=new Date(document.getElementById("starting_date").value);
function setDates(){
    if(offset == 0){
        week_shift_div.children[0].classList.add("hide_prev_week");
    }
    else{
        week_shift_div.children[0].classList.remove("hide_prev_week");
    }
    for(let i=0;i<7;i++){
        daysRow.children[i+1].children[0].innerText= new Intl.DateTimeFormat('en-GB', { year: 'numeric', month: 'numeric', day: '2-digit'}).format(startDate);
        startDate.setDate(startDate.getDate()+1);
    }
    startDate.setDate(startDate.getDate()-7);
}
setDates();
week_shift_div.children[0].addEventListener('click', function(e){
    console.log("outside",offset);
    if(!inProcess && offset > 0){
        console.log(offset);
        offset--;
        inProcess = true;
        $.ajax({
            url: "/content/timetable/?offset="+offset,
            cache: false,
            type: "GET",
            success: function(response){
                startDate.setDate(startDate.getDate()-7);
                setDates();
                let container = document.getElementsByClassName("timetable_content_container")[0];
                let container_parent = container.parentNode;
                container.style.marginRight = "-100%";
                setTimeout(function(){
                    container.parentNode.removeChild(container.parentNode.children[1]);
                    inProcess = false;
                    
                }, 400)
                let new_container = document.createElement('div');
                for(let i=0;i<9;i++){
                    new_container.innerHTML = new_container.innerHTML + `<div class="table_row" id="row${i+1}"></div>`;
                    let rowDiv = new_container.children[new_container.childElementCount - 1];
                    rowDiv.innerHTML = `<div class="table_column table_heading">${8+i}:00 - ${9+i}:00</div>`;
                    for(let j=0;j<7;j++){
                        if(response.timetableItems[j][8+i]){
                            rowDiv.innerHTML = rowDiv.innerHTML + `<div class="table_column" style="height:${4*response.timetableItems[j][8+i].duration}em !important; z-index:2;">${response.timetableItems[j][8+i].classSub.course.name}</div>`
                        }
                        else{
                            rowDiv.innerHTML = rowDiv.innerHTML + `<div class="table_column"></div>`
                        }
                        
                    }
                }
                new_container.classList.add("timetable_content_container");
                new_container.style.marginLeft = "-100%";
                container_parent.prepend(new_container);
                setTimeout(function(){
                    new_container.style.marginRight = "0";
                    new_container.style.marginLeft = "0";
                    
                }, 100);
                
            }
        })
    }
    
})

week_shift_div.children[1].addEventListener('click', function(e){
    
    if(!inProcess){
        offset++;
        inProcess = true;
        $.ajax({
            url: "/content/timetable/?offset="+offset,
            cache: false,
            type: "GET",
            success: function(response){
                startDate.setDate(startDate.getDate()+7);
                setDates();
                let container = document.getElementsByClassName("timetable_content_container")[0];
                let container_parent = container.parentNode;
                container.style.marginLeft = "-100%";
                setTimeout(function(){
                    container.parentNode.removeChild(container.parentNode.children[0]);
                    inProcess = false;
               
                }, 400)
                let new_container = document.createElement('div');
                for(let i=0;i<9;i++){
                    new_container.innerHTML = new_container.innerHTML + `<div class="table_row" id="row${i+1}"></div>`;
                    let rowDiv = new_container.children[new_container.childElementCount - 1];
                    rowDiv.innerHTML = `<div class="table_column table_heading">${8+i}:00 - ${9+i}:00</div>`;
                    for(let j=0;j<7;j++){
                        if(response.timetableItems[j][8+i]){
                            rowDiv.innerHTML = rowDiv.innerHTML + `<div class="table_column" style="height:${4*response.timetableItems[j][8+i].duration}em !important; z-index:2;">${response.timetableItems[j][8+i].classSub.course.name}</div>`
                        }
                        else{
                            rowDiv.innerHTML = rowDiv.innerHTML + `<div class="table_column"></div>`
                        }
                        
                    }
                }
                new_container.classList.add("timetable_content_container");
                new_container.style.marginRight = "-100%";
                container_parent.appendChild(new_container)
                setTimeout(function(){
                    new_container.style.marginRight = "0";
                    new_container.style.marginLeft = "0";
                    
                }, 100);
                
            }
        })
    }
    
})