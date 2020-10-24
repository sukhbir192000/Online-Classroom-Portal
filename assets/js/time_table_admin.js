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
    
    if(!inProcess && offset > 0){
        
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
                            rowDiv.innerHTML = rowDiv.innerHTML + `<div class="table_column" id="${response.timetableItems[j][8+i]._id}" style="height:${4*response.timetableItems[j][8+i].duration}em !important; z-index:2;">${response.timetableItems[j][8+i].classSub.course.name}</div>`
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
                            rowDiv.innerHTML = rowDiv.innerHTML + `<div class="table_column" id="${response.timetableItems[j][8+i]._id}" style="height:${4*response.timetableItems[j][8+i].duration}em !important; z-index:2;">${response.timetableItems[j][8+i].classSub.course.name}</div>`
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
        let newDiv=document.createElement('div');
        newDiv.innerHTML=`
        <div id="info">
            <div class="subject_name">Computer Architecture and OrganizationComputer Architecture and Organization</div>
            <div class="class_group"><b>Class Group: &nbsp; </b>2</div>
            <div class="lab_group"><b>Lab group: &nbsp;</b> All</div>
            <div class="timings"><b>Time:&nbsp; </b> 2:00PM - 3:00PM</div>
            <div class="buttons_edit">
                <button type="button" class="cancel_button">Cancel class</button>
                <button type="button" class="reschedule_button">Reschedule class</button>
            </div>
        </div>`
        document.getElementsByClassName('main_content')[0].appendChild(newDiv);
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
              
                let classId=this.id;
                document.getElementById("info").children[4].children[1].addEventListener("click", function(e){
                    console.log("hiiiiiii2");
                    document.getElementById("reschedule_class").style.display = "flex";
                    document.getElementById("reschedule_class").style.top = '50%';
                    document.getElementById("reschedule_class").style.left = '50%';
                    document.getElementById("reschedule_class").style.transform = 'translate(-50%, -50%)';
                })
                document.getElementById('info').children[4].children[0].addEventListener('click',function(){
                    $.ajax({
                        url:`/content/timetable/delete/${classId}`,
                        type:"GET",
                        success:function(response){
                            document.getElementById('info').parentNode.removeChild(document.getElementById('info'));
                            current_div.style.opacity = "1";
                            document.getElementById("reschedule_class").style.display = "none";
                            document.querySelector(".table").style.opacity="1";
                            current_div.classList.remove("font_size_remove");
                            current_div.isActive = (!current_div.isActive);
                            current_div = null;
                        }
                    })
                   
                })
            
               

            
                current_div = this;
            }
        }
        else{
            if(current_div ){
                current_div.style.opacity = "1";
                document.getElementById("info").style.display = "none";
                document.getElementById("reschedule_class").style.display = "none";
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
        // a.style.opacity=0.6;
        a.style.backgroundColor="#640e1f";
        a.style.color ="white";
        a.style.transition = "all 0.5s";
       
        // a.style.transform ="rotatex(360deg)"
    })        
    a.addEventListener("mouseleave",function(e){
        a.innerHTML = prevText;
        prevText="";
        // a.style.opacity=1;
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

    var rect = document.getElementById("info")
    if(rect){
        rect=rect.getBoundingClientRect();
        if(current_div && (e.x<rect.left || e.x>rect.left+rect.width || e.y<rect.top || e.y>rect.top+rect.height)){
            var rectinner = current_div.getBoundingClientRect();
            if((e.x<rectinner.left || e.x>rectinner.left+rectinner.width || e.y<rectinner.top || e.y>rectinner.top+rectinner.height) && current_div.classList.contains("font_size_remove")){
                current_div.style.opacity = "1";
                // document.getElementById("info").style.display = "none";
                document.getElementById("reschedule_class").style.display = "none";
                document.querySelector(".table").style.opacity="1";
                current_div.classList.remove("font_size_remove");
                current_div.isActive = (!current_div.isActive);
                
                current_div = null;
                document.getElementById('info').parentNode.removeChild(document.getElementById('info'));
    
            }
        }
    }
    
})


document.querySelector(".add").addEventListener('click',function(e){
    if(document.querySelector(".add_content").textContent == "Cancel"){
        document.querySelector(".add_content").textContent = "Add Class";
        document.querySelector(".add_icon").innerHTML =  "<i class='fas fa-plus'></i>"; 
        document.getElementById("duration_hr").value = "";
        document.getElementById("lecture_date").value = "";
        subjectForm.selectedIndex = 0;
        branchForm.selectedIndex=0;
        classTypeForm.selectedIndex=0;
        subGroupForm.selectedIndex=0;
        slotForm.selectedIndex=0;
        durationForm.value=1;
        classTypeForm.disabled=true;
        subGroupForm.disabled=true;
        branchForm.disabled=true;
        dateForm.disabled=true;
        durationForm.disabled=true;
        slotForm.disabled = true;
    }
    else{
        document.querySelector(".add_content").textContent = "Cancel";
        document.querySelector(".add_icon").innerHTML =  "<i class='fas fa-times'></i>";  
        // $(document).ready(function() {
        //     $('#subject').select2();
        // });  
        // $(document).ready(function() {
        //     $('#branch').select2();
        // });  
        // $(document).ready(function() {
        //     $('#group').select2();
        // });  
        // $(document).ready(function() {
        //     $('#sub_group').select2();
        // });  
        // $(document).ready(function() {
        //     $('#slots_available').select2();
        // });     
    }
    document.querySelector(".add_admin").classList.toggle("showx");    
})

var branchForm=document.getElementById("branch")
branchForm.disabled=true;
var classTypeForm=document.getElementById("class_type")
classTypeForm.disabled=true;
var subGroupForm=document.getElementById("sub_group")
subGroupForm.disabled=true;
var dateForm=document.getElementById("lecture_date");
var durationForm=document.getElementById("duration_hr");
dateForm.disabled=true;
durationForm.disabled=true;
var subjectForm=document.getElementById("subject");
var slotForm = document.getElementById("slots_available");

slotForm.disabled = true;
subjectForm.addEventListener('change',function(e){
    branchForm.selectedIndex=0;
    classTypeForm.selectedIndex=0;
    subGroupForm.selectedIndex=0;
    classTypeForm.disabled=true;
    subGroupForm.disabled=true;
    dateForm.disabled=true;
    durationForm.disabled=true;
    branchForm.disabled=false;
    findSlots();
    $.ajax({
        url:"/content/announcements/form/branches",
        data: {course: subjectForm.value},
        cache:false,
        type:"POST",
        success:function(response){
            branchForm.innerText="";
            var opt = document.createElement('option');
            opt.innerText="--Select an option--";
            opt.value = ""
            opt.disabled = true;
            branchForm.appendChild(opt);
            for(let obj of response.data.branchList){
                var opt = document.createElement('option');
                opt.value=obj.id;
                opt.innerText=obj.name;
                branchForm.appendChild(opt);
            }
            branchForm.selectedIndex=0;
        }
    })
})
branchForm.addEventListener('change',function(e){
    classTypeForm.selectedIndex=0;
    subGroupForm.selectedIndex=0;
    subGroupForm.disabled=true;
    classTypeForm.disabled=false;
    dateForm.disabled=false;
    durationForm.disabled=false;
    findSlots();
    $.ajax({
        url:"/content/announcements/form/groups",
        data: {course: subjectForm.value,class:branchForm.value},
        cache:false,
        type:"POST",
        success:function(response){
            classTypeForm.innerText="";
            var opt = document.createElement('option');
            opt.value="All";
            opt.innerText="All";
            classTypeForm.appendChild(opt);
            for(let obj of response.data.groupList){
                var opt = document.createElement('option');
                opt.value=obj.id;
                opt.innerText=obj.name;
                classTypeForm.appendChild(opt);
            }
        }
    })
})
classTypeForm.addEventListener('change',function(e){
    subGroupForm.selectedIndex=0;
    findSlots();
    if(classTypeForm.value!="All"){
        subGroupForm.disabled=false;
        $.ajax({
            url:"/content/announcements/form/subGroups",
            data: {course: subjectForm.value,class:branchForm.value,classType:classTypeForm.value},
            cache:false,
            type:"POST",
            success:function(response){
                subGroupForm.innerText="";
                var opt = document.createElement('option');
                opt.value="All";
                opt.innerText="All";
                subGroupForm.appendChild(opt);
                for(let obj of response.data.subGroupList){
                    var opt = document.createElement('option');
                    opt.value=obj.id;
                    opt.innerText=obj.name;
                    subGroupForm.appendChild(opt);
                }
            }
        })
    }
    else{
        subGroupForm.disabled=true;
    }
})
dateForm.addEventListener('change',function(e){
    findSlots();
})
durationForm.addEventListener('change',function(e){
    findSlots();
})

function findSlots(){
    if(dateForm.value!=""&&durationForm.value!=""){
        slotForm.disabled = false;
        $.ajax({
            url:"/content/timetable/slots",
            data:{
                branch:branchForm.value,
                classType:classTypeForm.value,
                subGroup:subGroupForm.value,
                date:dateForm.value,
                duration:durationForm.value

            },
            cache:false,
            type:"POST",
            success:function(response){
                slotForm.innerText="";
                var opt = document.createElement('option');
                opt.innerText="--Select an option--";
                opt.value = ""
                opt.disabled = true;
                slotForm.appendChild(opt);
                for(let freeTime of response.unoccupiedClasses){
                    var opt = document.createElement('option');
                    opt.value=freeTime;
                    opt.innerText=`${freeTime}:00-${parseInt(freeTime)+parseInt(durationForm.value)}:00`;
                    slotForm.appendChild(opt);
                }
                slotForm.selectedIndex = 0;
            }
        });
    }
    else{
        slotForm.disabled = true;
        slotForm.selectedIndex = 0;
    }
}
