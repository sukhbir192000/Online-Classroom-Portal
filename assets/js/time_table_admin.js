let week_shift_div = document.getElementById('week_shift');
let offset = 0;
let inProcess = false;
let daysRow=document.getElementsByClassName('table_row')[0];
let startDate=new Date(document.getElementById("starting_date").value);
function setDates(){
    
    for(let i=0;i<7;i++){
        daysRow.children[i+1].children[0].innerText= new Intl.DateTimeFormat('en-GB', { year: 'numeric', month: 'numeric', day: '2-digit'}).format(startDate);
        startDate.setDate(startDate.getDate()+1);
    }
    startDate.setDate(startDate.getDate()-7);
}
setDates();
week_shift_div.children[0].addEventListener('click', function(e){
    
    if(!inProcess){
        
        offset--;
        inProcess = true;
        $.ajax({
            url: "/content/timetable/?offset="+offset,
            cache: false,
            type: "GET",
            success: function(response){
                startDate.setDate(startDate.getDate()-7);
                setDates();
                // console.log(response);
                let container = document.getElementsByClassName("timetable_content_container")[0];
                let container_parent = container.parentNode;
                container.style.marginRight = "-100%";
                setTimeout(function(){
                    container.parentNode.removeChild(container.parentNode.children[1]);
                    inProcess = false;
                    addFunctions();
                }, 400)
                let new_container = document.createElement('div');
                
                for(let i=0;i<9;i++){
                    new_container.innerHTML = new_container.innerHTML + `<div class="table_row" id="row${i+1}"></div>`;
                    let rowDiv = new_container.children[new_container.childElementCount - 1];
                    rowDiv.innerHTML = `<div class="table_column table_heading">${8+i}:00 - ${9+i}:00</div>`;
                    for(let j=0;j<7;j++){
                        if(response.timetableItems[j][8+i]){

                            rowDiv.innerHTML = rowDiv.innerHTML + `<div class="table_column" id="${response.timetableItems[j][8+i]._id}">${response.timetableItems[j][8+i].classSub.course.name}</div>`
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
                console.log(response);
                let container = document.getElementsByClassName("timetable_content_container")[0];
                let container_parent = container.parentNode;
                container.style.marginLeft = "-100%";
                setTimeout(function(){
                    container.parentNode.removeChild(container.parentNode.children[0]);
                    inProcess = false;
                    addFunctions();
                }, 400)
                let new_container = document.createElement('div');
                for(let i=0;i<9;i++){
                    new_container.innerHTML = new_container.innerHTML + `<div class="table_row" id="row${i+1}"></div>`;
                    let rowDiv = new_container.children[new_container.childElementCount - 1];
                    rowDiv.innerHTML = `<div class="table_column table_heading">${8+i}:00 - ${9+i}:00</div>`;
                    for(let j=0;j<7;j++){
                        if(response.timetableItems[j][8+i]){
                            rowDiv.innerHTML = rowDiv.innerHTML + `<div class="table_column" id="${response.timetableItems[j][8+i]._id}">${response.timetableItems[j][8+i].classSub.course.name}</div>`
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


//----------------------options for admin-------------------------------


var current_div = null, prevText = "";
var clickAddFunction = function (a){
    a.addEventListener('click',function(e){
        // var rect =this.getBoundingClientRect();
        // console.log(rect);
        if(a.isActive){
            if(document.getElementById("info").style.display == "none" || document.getElementById("info").style.display == ""){
                if(current_div){
                    current_div.style.opacity = "1";
                    current_div = null;
                }
                var x = this;
                // var coordinates = window.getBoundingClientRect();

                this.classList.add("font_size_remove");
                document.getElementById("info").style.display = "flex";
                document.getElementById("info").style.top = '50%';
                document.getElementById("info").style.left = '50%';
                document.getElementById("info").style.transform = 'translate(-50%, -50%)';
                document.querySelector(".table").style.opacity="0.2";
                console.log(this.id);
                // var newDiv = document.createElement("div");
                // newDiv.style.position = "absolute";
                // newDiv.style.top = this.offsetTop;
                // newDiv.style.left = this.offsetLeft;
                // newDiv.textContent = "i am a new div";
                // this.parentNode.appendChild(newDiv);
                // this.style.opacity = "0.2";
                // this.appendChild(document.getElementById("info"));
                current_div = this;
            }
        }
        else{
            if(current_div){
                current_div.style.opacity = "1";
                document.getElementById("info").style.display = "none";
                document.querySelector(".table").style.opacity="1";
                current_div.classList.remove("font_size_remove");
                current_div = null;
            }
        }
        a.isActive = (!a.isActive);
    })      
    a.addEventListener("mouseenter",function(e){
        prevText = a.innerHTML;
        a.innerHTML ="<div>Group:1</div><div>Lab Group: 2</div>";
        a.style.opacity=0.6;
        a.style.backgroundColor="black";
        a.style.color ="white";
        a.style.transition = "all 0.5s";
       
        // a.style.transform ="rotatex(360deg)"
    })        
    a.addEventListener("mouseleave",function(e){
        a.innerHTML = prevText;
        prevText="";
        a.style.opacity=1;
        a.style.backgroundColor="white";
        a.style.color="black";
        a.style.transition = "all 0.5s";
        
        // a.style.transform ="rotatex(0deg)";
    })
}

var addFunctions = function(){
    var rows = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];
    for(let i=0;i<rows.length;i++){
        var row = document.getElementById("row" + rows[i]);
        for(let j=1;j<row.childElementCount;j++){
            if(row.children[j].textContent!="" ){
                row.children[j].isActive = true;
                clickAddFunction(row.children[j]);
            }
        }
    }
}


addFunctions();
document.addEventListener('click',function(e){
    var rect = document.getElementById("info").getBoundingClientRect();
    if(current_div && (e.x<rect.left || e.x>rect.left+rect.width || e.y<rect.top || e.y>rect.top+rect.height)){
        var rectinner = current_div.getBoundingClientRect();
        if((e.x<rectinner.left || e.x>rectinner.left+rectinner.width || e.y<rectinner.top || e.y>rectinner.top+rectinner.height) && current_div.classList.contains("font_size_remove")){
            current_div.style.opacity = "1";
            document.getElementById("info").style.display = "none";
            document.querySelector(".table").style.opacity="1";
            current_div.classList.remove("font_size_remove");
            current_div.isActive = (!current_div.isActive);
            current_div = null;
        }
    }
})
let buttonOptions=document.getElementById('info');
buttonOptions.children[0].addEventListener('click',function(){
    // $.ajax({
    //     url:"",
    //     data:{
    //         id:this.parentNode.parentNode.id
    //     },
    //     succgess:function(){
    //         this.parentNode.parentNode.innerHTML="";
    //         this.parentNode.parentNode.removeAttribute("id");
    //     }
    // })
});

