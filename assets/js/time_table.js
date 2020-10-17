let week_shift_div = document.getElementById('week_shift');
let offset = 0;
let inProcess = false;
week_shift_div.children[0].addEventListener('click', function(e){
    offset--;
    if(!inProcess){
        inProcess = true;
        $.ajax({
            url: "/content/timetable/?offset="+offset,
            cache: false,
            type: "GET",
            success: function(response){
                console.log(response);
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
                            rowDiv.innerHTML = rowDiv.innerHTML + `<div class="table_column">${response.timetableItems[j][8+i].classSub.course.name}</div>`
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
    offset++;
    if(!inProcess){
        inProcess = true;
        $.ajax({
            url: "/content/timetable/?offset="+offset,
            cache: false,
            type: "GET",
            success: function(response){
                console.log(response);
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
                            rowDiv.innerHTML = rowDiv.innerHTML + `<div class="table_column">${response.timetableItems[j][8+i].classSub.course.name}</div>`
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