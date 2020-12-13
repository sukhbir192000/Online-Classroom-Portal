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

var today = new Date();
var yyyy = today.getFullYear();
for(let i=0;i<10;i++){
    var option_new = document.createElement("option");
    option_new.value = yyyy+i;
    option_new.textContent = yyyy+i;
    document.getElementsByName('graduation_year')[0].appendChild(option_new)
}

// ---------------- ISHJOT'S CODE ----------------------

const mainContent = document.querySelector('.main_content');
const table = document.querySelector('.table');
const rows = document.querySelectorAll('.table_row');
const tableBox = document.querySelectorAll('.table_column');
const modifyBox = document.querySelectorAll('.add_container');
const addButton = document.querySelectorAll('.add_button');
const cancelButton = document.querySelectorAll('.cancel_button');
const subCode = document.querySelectorAll('.subject_code');
const typeClass = document.querySelectorAll('.class_type');
const group = document.querySelectorAll('.lab_group');
const duration = document.querySelectorAll('.duration');
const trash = document.querySelector('.del_btn');

var boxNumber = -1;

tableBox.forEach((box, i)=>{
    box.addEventListener('mouseover', (e)=>{
        let classCode = subCode[0].children[1].innerHTML;
        let classType = typeClass[0].children[1].innerHTML;
        let groupNum = group[0].children[1].innerHTML;
        let classDuration = duration[0].children[1].innerHTML;
        if(!box.classList.contains('table_heading') && box.innerHTML != ''){
            box.style.backgroundColor = "#640e1f";
            box.style.color = "white";
            box.style.transition = 'all 0.5s';
            box.children[0].children[0].classList.add('class_no_display');
            box.children[0].children[0].classList.remove('class_yes_display');
            box.children[0].children[1].classList.add('class_yes_display');
            box.children[0].children[1].classList.remove('class_no_display');
        }
    });
})

tableBox.forEach((box, i)=>{
    box.addEventListener('click', (e)=>{
        let classCode = subCode[1].children[1].value;
        let classType = typeClass[1].children[1].value;
        let groupNum = group[1].children[1].value;
        let classDuration = duration[1].children[1].value;

        boxNumber = i;

        if(!box.classList.contains('table_heading')){
            setTimeout(()=>{
                mainContent.style.filter = 'opacity(0.6)';
                table.style.filter = 'blur(0.1em)';
            }, 200);
            if(box.innerHTML == ''){
                modifyBox[0].style.display = 'none';
                setTimeout(()=>{
                    modifyBox[1].style.display = 'flex';
                }, 200);
            }
            else if(!box.innerHTML == ''){
                setTimeout(()=>{
                    modifyBox[0].style.display = 'flex';
                }, 200);
                modifyBox[1].style.display = 'none';
                subCode[0].children[1].innerHTML = classCode;
                typeClass[0].children[1].innerHTML = classType;
                group[0].children[1].innerHTML = groupNum;
                duration[0].children[1].innerHTML = classDuration;
            }
        }
    });
})


tableBox.forEach((box, i)=>{
    box.addEventListener('mouseout', (e)=>{
        if(!box.classList.contains('table_heading') && box.innerHTML != ''){
            box.style.backgroundColor = "white";
            box.style.color = "black";
            box.style.transition = 'all 0.5s';
            box.children[0].children[0].classList.add('class_yes_display');
            box.children[0].children[0].classList.remove('class_no_display');
            box.children[0].children[1].classList.add('class_no_display');
            box.children[0].children[1].classList.remove('class_yes_display');
        }
    });
})

addButton[1].addEventListener('click', (e)=>{
    let classCode = subCode[1].children[1].value;
    let classType = typeClass[1].children[1].value;
    let groupNum = group[1].children[1].value;
    let classDuration = duration[1].children[1].value;
    if(!tableBox[boxNumber].classList.contains('table_heading')){
        if(tableBox[boxNumber].innerHTML == ""){
            let num = boxNumber;
            var rowNum = -1;
            let alertGenerated = false;
            for(let j = 0; j<rows.length; j++){
                if(num<8*(j+1)) {
                    rowNum = j;
                    break;
                }
            }
            var heightMax =(tableBox[boxNumber].offsetHeight);
            for(let j = 0; j<classDuration; j++){
                if(rowNum+j < rows.length){
                    if(rows[rowNum+j].children[0].innerHTML == '16:00 - 17:00' && j !=classDuration-1){
                        alert("Cannot Hold Class After 5pm!");
                        alertGenerated = true;
                    }
                }
            }
            if(!alertGenerated){
                tableBox[boxNumber].innerHTML = `<div style = "display:flex; flex-direction: column; font-size: 0.8em"><div class = "class_yes_display">${classCode}</div> <div class = "class_no_display">${classType}</div></div>`;
                rows[rowNum].style.maxHeight = `${heightMax}`;
                tableBox[boxNumber].style.height = classDuration*(tableBox[boxNumber].offsetHeight);
                tableBox[boxNumber].style.zIndex = '1';
            }
        }
        
    }
    mainContent.style.filter = 'blur(0)';
    table.style.filter = 'opacity(1)';
    modifyBox[1].style.display = 'none';
});

cancelButton.forEach((cancel,i)=>{
    cancel.addEventListener('click', (e)=>{
        cancel.parentNode.parentNode.style.display = 'none';
        mainContent.style.filter = 'blur(0)';
        table.style.filter = 'opacity(1)';
    });
})

trash.addEventListener('click', (e)=>{
    let classDuration = duration[0].children[1].innerHTML;
    modifyBox[0].style.display = 'none';
    subCode[0].children[1].innerHTML = '';
    typeClass[0].children[1].innerHTML = '';
    group[0].children[1].innerHTML = '';
    duration[0].children[1].innerHTML = '';
    tableBox[boxNumber].innerHTML = '';
    mainContent.style.filter = 'blur(0)';
    table.style.filter = 'opacity(1)';
    tableBox[boxNumber].style.height = (tableBox[boxNumber].offsetHeight)/classDuration;
});

document.addEventListener('click', (e)=>{
    let isClickedInside = modifyBox[0].contains(e.target) || modifyBox[1].contains(e.target);
    if(!isClickedInside){
        mainContent.style.filter = 'blur(0)';
        table.style.filter = 'opacity(1)';
        modifyBox[0].style.display = 'none';
        modifyBox[1].style.display = 'none';
    } 
});

