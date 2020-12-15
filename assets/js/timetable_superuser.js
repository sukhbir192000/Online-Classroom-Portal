var lab_groups = [], lecture_groups = [];
var map_group = {}, map_sub_group = {}, map_course = {};
document.addEventListener('mouseup', function (e) {
    var position = document.querySelector(".profile_icon").getBoundingClientRect();
    var rect = document.querySelector(".profile").getBoundingClientRect();
    if (e.x >= position.left && e.x <= (position.left + position.width) && e.y >= position.top && e.y <= (position.top + position.height)) {
        document.querySelector(".profile").classList.toggle("show");
    }
    else if (e.x < rect.left || e.x > (rect.left + rect.width) || e.y < rect.top || e.y > (rect.top + rect.height)) {
        document.querySelector(".profile").classList.remove("show");
    }
});

document.addEventListener('mouseup', function (e) {
    var position = document.querySelector(".hamburger_icon").getBoundingClientRect();
    var rect = document.querySelector(".navbar").getBoundingClientRect();
    if (e.x >= position.left && e.x <= (position.left + position.width) && e.y >= position.top && e.y <= (position.top + position.height)) {
        document.querySelector(".navbar").classList.toggle("show_navbar");
        document.querySelector("#black_screen").classList.toggle("show_black_screen");
    }
    else if (e.x < rect.left || e.x > (rect.left + rect.width) || e.y < rect.top || e.y > (rect.top + rect.height)) {
        document.querySelector(".navbar").classList.remove("show_navbar");
        document.querySelector("#black_screen").classList.remove("show_black_screen");
    }
});

// var today = new Date();
// var yyyy = today.getFullYear();
// for(let i=0;i<10;i++){
//     var option_new = document.createElement("option");
//     option_new.value = yyyy+i;
//     option_new.textContent = yyyy+i;
//     document.getElementsByName('graduation_year')[0].appendChild(option_new)
// }

// ---------------- ISHJOT'S CODE ----------------------

const mainContent = document.querySelector('.main_content');
const table = document.querySelector('.table');
const rows = document.querySelectorAll('.table_row');
const tableBox = document.querySelectorAll('.table_column');
const modifyBox = document.querySelector('.add_container');
const addButton = document.querySelector('.add_button');
const cancelButton = document.querySelectorAll('.cancel_button');
const subCode = document.querySelector('.subject_code');
const typeClass = document.querySelector('.class_type');
const group = document.querySelector('.lab_group');
const duration = document.querySelector('.duration');
const trash = document.querySelector('.del_btn');
const applyButton = document.getElementById('apply_tt_btn');
// ============== New Consts =====================

const classes = document.querySelector('.classes');
const classDetails = document.querySelectorAll('.class_details');
const addNewClass = document.querySelector('.added_class');
const addClass = document.querySelector('.add_class');
const cancel = document.querySelector('.cancel_btn');
const allBlocks = document.querySelector('.all_blocks');
const block = document.querySelector('.block');
const deleteIcon = document.querySelectorAll('.delete_icon');
const disable = document.querySelector('.disable_event');
const filterData = document.querySelector('.filterData')
const year_select = filterData.children[1];

var allDetails = [[], [], [], [], [], [], []];
for (let k = 0; k < allDetails.length; k++) {
    let index = k;
    for (let j = 8; j < 17; j++) {
        allDetails[k][j] = [];
        if (tableBox[index + 9].innerHTML == '') {
            allDetails[k][j] = [''];
        }
        else {
            allDetails[k][j].push(boxArray[index + 9]);
        }
        index += 8;
    }
}

var boxNumber = -1;
var boxArray = [];

let year_check = 'Select';

function displayBox() {
    table.style.display = 'flex';
}

year_select.addEventListener('change', function (e) {
    year_check = year_select.value;
    if (year_check != 'Select') {
        $.ajax({
            url: "/superuser/timetable",
            method: "POST",
            data: {
                passingOutYear: year_check
            },
            success: function (obj) {
                map_course = {};
                map_group = {};
                map_sub_group = {};
                let course_form = document.getElementById('course_select');
                course_form.innerHTML = '';
                for (let course_obj of obj.courses) {
                    course_form.innerHTML += `<option value='${course_obj._id}'>${course_obj.code}</option>`;
                    map_course[course_obj._id] = course_obj.code;
                }
                let group_form = document.getElementById('group_select');
                group_form.innerHTML = '';
                for (let group_obj of obj.groups) {
                    group_form.innerHTML += `<option value='${group_obj._id}'>${group_obj.groupNumber}</option>`;
                    map_group[group_obj._id] = group_obj.groupNumber;
                }
                document.getElementById('type_select').selectedIndex = 0;
                lab_groups = obj.sub_groups;
                lecture_groups = obj.groups;
                for(let sub_group_obj of obj.sub_groups){
                    map_sub_group[sub_group_obj._id] = sub_group_obj.subGroupNumber;
                }
                document.getElementById('start_date').value = obj.timeTableItems.startDate;
                document.getElementById('end_date').value = obj.timeTableItems.endDate;
                console.log("fetched data: ", obj.timeTableItems);
                if (obj.timeTableItems && obj.timeTableItems.timeTableData) {
                    allDetails = obj.timeTableItems.timeTableData;

                }
                preset_data();
                displayBox();
            }


        })

    }
});

addClass.addEventListener('click', (e) => {
    modifyBox.style.display = 'flex';
    block.style.display = 'none';
});

addButton.addEventListener('click', (e) => {

    let classCode = subCode.children[1].value;
    let classType = typeClass.children[1].value;
    let groupNum = group.children[1].value;
    let classDuration = duration.children[1].value;
    let arrInput = [classCode, classType, groupNum, classDuration];

    if (tableBox[boxNumber].innerHTML == '') {
        boxArray[boxNumber] = [];
        boxArray[boxNumber].push(arrInput);
        tableBox[boxNumber].innerHTML = boxArray[boxNumber].length;
    }
    else {
        boxArray[boxNumber].push(arrInput);
        tableBox[boxNumber].innerHTML = boxArray[boxNumber].length;
    }
    console.log(boxArray[boxNumber])
    block.style.display = 'none';
    mainContent.style.filter = 'blur(0)';
    table.style.filter = 'opacity(1)';
    modifyBox.style.display = 'none';
    disable.style.zIndex = '-1';


    for (let k = 0; k < allDetails.length; k++) {
        let index = k;
        for (let j = 8; j < 17; j++) {
            allDetails[k][j] = [];
            if (tableBox[index + 9].innerHTML == '') {
                allDetails[k][j] = [''];
            }
            else {
                allDetails[k][j].push(boxArray[index + 9]);
            }
            index += 8;
        }
    }
});

tableBox.forEach((box, i) => {
    box.addEventListener('click', (e) => {
        if (!box.classList.contains('table_heading')) {

            boxNumber = i;

            block.style.display = 'flex';
            mainContent.style.filter = 'opacity(0.4)';
            table.style.filter = 'blur(0.1em)';
            disable.style.zIndex = '2';
            if (box.innerHTML == '') {
                block.children[0].children[0].style.display = 'flex';
                block.children[0].children[1].style.display = 'none';
            }
            else {
                while (addNewClass.firstChild) {
                    addNewClass.removeChild(addNewClass.firstChild);
                }
                for (let j = 0; j < boxArray[i].length; j++) {
                    var clonedNode = classes.cloneNode(true);
                    clonedNode.classList.remove('static_temp_class');
                    for (let k = 0; k < boxArray[i][j].length; k+=4) {
                        clonedNode.children[0].children[0].children[1].innerHTML = map_course[boxArray[i][j][0]];
                        clonedNode.children[0].children[1].children[1].innerHTML = boxArray[i][j][1];
                        if(boxArray[i][j][1] == "Lecture"){
                            clonedNode.children[0].children[2].children[1].innerHTML = map_group[boxArray[i][j][2]];
                        }
                        else{
                            clonedNode.children[0].children[2].children[1].innerHTML = map_sub_group[boxArray[i][j][2]];
                        }
                        clonedNode.children[0].children[3].children[1].innerHTML = boxArray[i][j][3];
                    }
                    clonedNode.style.borderBottom = 'solid 0.1em black';
                    clonedNode.style.padding = '1em';

                    clonedNode.children[1].children[0].addEventListener('click', (e) => {
                        var deleteNum = -1;
                        let number = box.innerHTML - 1;
                        if (number == 0) box.innerHTML = '';
                        else box.innerHTML = number;
                        for (let index = 0; index < addNewClass.childElementCount; index++) {
                            if (addNewClass.children[index] == e.target.parentNode.parentNode) {
                                deleteNum = index;
                                break;
                            }
                        }
                        boxArray[boxNumber].splice(deleteNum, 1);
                        e.target.parentNode.parentNode.remove();
                        if (box.innerHTML == '') {
                            block.children[0].children[0].style.display = 'flex';
                            block.children[0].children[1].style.display = 'none';
                        }

                        for (let k = 0; k < allDetails.length; k++) {
                            let index = k;
                            for (let j = 8; j < 17; j++) {
                                allDetails[k][j] = [];
                                if (tableBox[index + 9].innerHTML == '') {
                                    allDetails[k][j] = [''];
                                }
                                else {
                                    allDetails[k][j].push(boxArray[index + 9]);
                                }
                                index += 8;
                            }
                        }
                        console.log(allDetails);

                    });

                    addNewClass.appendChild(clonedNode);
                }
                block.children[0].children[0].style.display = 'none';
                block.children[0].children[1].style.display = 'flex';
            }
        }

    });
})

tableBox.forEach((box, i) => {
    box.addEventListener('mouseover', (e) => {
        if (!box.classList.contains('table_heading') && box.innerHTML != '') {
            box.style.backgroundColor = "#640e1f";
            box.style.color = "white";
            box.style.transition = 'all 0.5s';
        }

    });
})

tableBox.forEach((box, i) => {
    box.addEventListener('mouseout', (e) => {
        if (!box.classList.contains('table_heading') && box.innerHTML != '') {
            box.style.backgroundColor = "white";
            box.style.color = "black";
            box.style.transition = 'all 0.5s';
        }

    });
})


cancel.addEventListener('click', (e) => {
    cancel.parentNode.parentNode.parentNode.style.display = 'none';
    mainContent.style.filter = 'blur(0)';
    table.style.filter = 'opacity(1)';
    disable.style.zIndex = '-1';
});

cancelButton.forEach((cancel, i) => {
    cancel.addEventListener('click', (e) => {
        cancel.parentNode.parentNode.style.display = 'none';
        mainContent.style.filter = 'blur(0)';
        table.style.filter = 'opacity(1)';
        disable.style.zIndex = '-1';

    });
})

disable.addEventListener('click', (e) => {
    block.style.display = 'none';
    modifyBox.style.display = 'none';
    mainContent.style.filter = 'blur(0)';
    table.style.filter = 'opacity(1)';
    disable.style.zIndex = '-1';
})

applyButton.addEventListener('click', (e) => {
    console.log(allDetails);
    let startDate = document.getElementById('start_date').value;
    let endDate = document.getElementById('end_date').value;
    // if (startDate && endDate) {
    $.ajax({
        url: "/superuser/timetable/save",
        method: "POST",
        data: {
            passingOutYear: year_select.value,
            timeTableData: allDetails,
            startDate: startDate,
            endDate: endDate
        },
        success: function (obj) {
            console.log(obj);

        }
    })
    // }
    // else{
    //     alert("Please set start date and end date of semester.");
    // }
})

function preset_data() {
    for (let k = 0; k < allDetails.length; k++) {
        let index = k;
        for (let j = 8; j < 17; j++) {
            if (allDetails[k][j] == ['']) boxArray[index + 9] = '';
            else {
                boxArray[index + 9] = [];
                for (let i = 0; i < allDetails[k][j].length; i++) {
                    console.log(allDetails[k][j][i]);
                    for (let killmePls = 0; killmePls < allDetails[k][j][i].length; killmePls++) {
                        boxArray[index + 9].push(allDetails[k][j][i][killmePls]);
                    }
                }
                if (boxArray[index + 9] == '') tableBox[index + 9].innerHTML = '';
                else tableBox[index + 9].innerHTML = boxArray[index + 9].length;
            }
            index += 8;
        }
    }
}

let type_input = document.getElementById('type_select')
type_input.addEventListener('change', function (e) {
    let group_form = document.getElementById('group_select');
    group_form.innerHTML = '';
    
    if (this.value == "Lecture") {
        for (let group_obj of lecture_groups) {
            group_form.innerHTML += `<option value='${group_obj._id}'>${group_obj.groupNumber}</option>`
        }
    }
    else if (this.value == "Lab") {
        for (let group_obj of lab_groups) {
            group_form.innerHTML += `<option value='${group_obj._id}'>${group_obj.subGroupNumber}</option>`
        }
    }
})