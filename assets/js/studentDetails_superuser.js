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

const program_select = document.getElementById('program');
const year_select = document.getElementById('graduating_year');
const dets = document.querySelectorAll('.dets');
const edits = document.querySelectorAll('.edit_dets');
const dob = document.querySelectorAll('.dob');
const codes = document.querySelectorAll('.codes_holder');
const trashIcon = document.querySelectorAll('.delete_icon');
const list = document.querySelectorAll('.student_dets');
const ColorList = document.querySelectorAll('.student_list');
const checkOpen = document.querySelectorAll('.name_arrow');
const ticks = document.querySelectorAll('.save_changes');
const dels = document.querySelectorAll('.cross');
const editBtn = document.querySelectorAll('.btn_edit');

let prog_check = 'Select';
let year_check = 'Select';

var courses = [];
var deletedCourse = [];
var originalData = {};
var changesMade = {};
const studentName = document.querySelectorAll('.name_of_student');
studentName.forEach((student, i) => {
    originalData[student.innerHTML] = {};
    changesMade[student.innerHTML] = {};
    const studentAttribute = document.querySelectorAll('.students')[i];
    for (let j = 0; j < studentAttribute.childElementCount; j++) {
        let editable = studentAttribute.children[j].children[1];
        let nonEditable = studentAttribute.children[j].children[0];
        if (editable.tagName == 'SELECT') {
            originalData[student.innerHTML][nonEditable.innerHTML] = editable.value;
            changesMade[student.innerHTML][nonEditable.innerHTML] = editable.value;
        }
        else {
            originalData[student.innerHTML][nonEditable.innerHTML] = editable.innerHTML;
            changesMade[student.innerHTML][nonEditable.innerHTML] = editable.innerHTML;
        }
    }
});

trashIcon.forEach((trash, j) => {
    trash.addEventListener('click', (e) => {
        deletedCourse.push(trash.parentNode.children[0].innerHTML);
        trash.parentNode.remove();
    });
});


editBtn.forEach((edit, i) => {
    deletedCourse = [];
    
    const studentAttribute = document.querySelectorAll('.students')[i];
    const child = studentAttribute;
    const nonChild = studentAttribute;
    const editButton = document.querySelectorAll('.btn_edit');
    edit.addEventListener('click', (e) => {
        edit.parentNode.parentNode.children[1].style.display = 'flex';
        edit.parentNode.parentNode.children[0].style.visibility = 'hidden';
        ticks[i].parentNode.parentNode.children[1].style.display = 'flex';
        editButton[i].style.visibility = 'hidden';
        courses = [];
        for(let j = 0; j<codes[i].childElementCount; j++){
            courses.push(codes[i].children[j].children[0].id);
        }
        for (let j = 0; j < codes[i].childElementCount; j++) {
            codes[i].children[j].children[1].classList.add('icon_hover');
            codes[i].children[j].children[1].style.pointerEvents = 'auto';
            codes[i].children[j].children[1].style.cursor = 'pointer';
        }
        for (let j = 0; j < studentAttribute.childElementCount; j++) {
            let editable = studentAttribute.children[j].children[1];
            let nonEditable = studentAttribute.children[j].children[0];
            if (editable.tagName == 'DIV') {
                editable.setAttribute('contentEditable', true);
                editable.style.border = 'solid 0.01em #000';
                if (i % 2 != 0) {
                    editable.style.backgroundColor = '#F1FAEE';
                }
            }
            else {
                editable.disabled = false;
                editable.style.border = 'solid 0.01em #000';
            }

            if (i % 2 == 0) nonEditable.style.border = 'solid 0.01em #FFF';
            else nonEditable.style.border = 'solid 0.01em #F1FAEE';
        }
    });
})

ticks.forEach((tick, i) => {
    tick.addEventListener('click', (e) => {
        const studentAttribute = document.querySelectorAll('.students')[i];
        const dispDet = document.querySelectorAll('.student_details');
        const editButton = document.querySelectorAll('.btn_edit');
        tick.parentNode.parentNode.children[1].style.display = 'none';
        editButton[i].style.visibility = 'visible';
        for (let j = 0; j < codes[i].childElementCount; j++) {
            codes[i].children[j].children[1].classList.remove('icon_hover');
            codes[i].children[j].children[1].style.pointerEvents = 'none';
        }
        for (let j = 0; j < studentAttribute.childElementCount; j++) {
            let editable = studentAttribute.children[j].children[1];
            let nonEditable = studentAttribute.children[j].children[0];
            if (editable.tagName == 'DIV') {
                changesMade[studentName[i].innerHTML][nonEditable.innerHTML] = editable.innerHTML;
                editable.setAttribute('contentEditable', false);
                editable.style.border = 'none';
                if (i % 2 != 0) {
                    editable.style.backgroundColor = '#F1FAEE';
                }
            }
            else {
                changesMade[studentName[i].innerHTML][nonEditable.innerHTML] = editable.value;
                editable.disabled = true;
            }
            
            editable.style.border = 'none';
            nonEditable.style.border = 'none';
        }
        var name = studentName[i].innerHTML;
        let item = 0;
        for (var data in originalData[name]) {
            if (originalData[name][data] != changesMade[name][data]) {
                originalData[name][data] = changesMade[name][data];
            }
        }
        console.log(courses);
        $.ajax({
            url:'/programmes/students/updateDetails',
            method:"POST",
            data:{
                student_id: dispDet[i].id,
                group: changesMade[studentName[i].innerHTML]["Group:"],
                subGroup: changesMade[studentName[i].innerHTML]["Lab Group:"],
                sid: changesMade[studentName[i].innerHTML]["Student ID:"],
                courses: courses
            },
            success:function(obj){

            } 
        })
        deletedCourse = [];
    });
})

dels.forEach((del, i) => {
    del.addEventListener('click', (e) => {
        const editButton = document.querySelectorAll('.btn_edit');
        deleteChanges(i);
        cancelEdit(i);
        ticks[i].parentNode.parentNode.children[1].style.display = 'none';
        editButton[i].style.visibility = 'visible';
    });
})

function displayBox() {
    const ele = document.querySelector('.filtered');
    ele.style.display = 'flex';
    for (let i = 0; i < ColorList.length; i++) {
        if (i % 2 == 0) {
            ColorList[i].style.backgroundColor = '#FFF';
        }
    }
}
displayBox();

// program_select.addEventListener('change', function(e){
//     prog_check = program_select.value;
//     if(prog_check != 'Select' && year_check != 'Select'){
//         displayBox();
//     }
// });

// year_select.addEventListener('change', function(e){
//     year_check = program_select.value;
//     if(prog_check != 'Select' && year_check != 'Select'){
//         displayBox();
//     }
// });

dob.forEach((date, i) => {
    if (i % 2 != 0) {
        date.style.backgroundColor = '#F1FAEE';
    }
});

dets.forEach((det, i) => {
    det.addEventListener('click', (e) => {
        const icon = det.parentNode.parentNode;
        if (!det.open) {
            icon.children[3].style.visibility = 'visible';
        }
        else if (e.target == document.querySelectorAll('.summary')[i] && det.open) {
            icon.children[3].style.visibility = 'hidden';
        }
    });
});

function deleteChanges(i) {
    deletedCourse.forEach((course, k) => {
        var editCodes = document.createElement('div');
        editCodes.classList.add("edit_codes");
        codes[i].appendChild(editCodes);
        editCodes.innerHTML += `<div class="course_codes">${course}</div> <i class="fa fa-trash delete_icon"></i>`;
        editCodes.addEventListener('click', (e) => {
            if (editBtn[i].style.visibility == 'hidden') {
                deletedCourse.push(editCodes.children[0].innerHTML);
                editCodes.remove();
            }
        })
    });
    for (let j = 0; j < codes[i].childElementCount; j++) {
        codes[i].children[j].children[1].classList.add('icon_hover');
        codes[i].children[j].children[1].style.pointerEvents = 'auto';
        codes[i].children[j].children[1].style.cursor = 'pointer';
    }

    const studentAttribute = document.querySelectorAll('.students')[i];
    for (let j = 0; j < studentAttribute.childElementCount; j++) {
        let editable = studentAttribute.children[j].children[1];
        let nonEditable = studentAttribute.children[j].children[0];
        if (editable.tagName == 'DIV') {
            changesMade[studentName[i].innerHTML][nonEditable.innerHTML] = editable.innerHTML;
        }
        else {
            changesMade[studentName[i].innerHTML][nonEditable.innerHTML] = editable.value;
        }

    }
    var name = studentName[i].innerHTML;
    let item = 0;
    for (var data in originalData[name]) {
        if (studentAttribute.children[item].children[1].tagName == 'SELECT') studentAttribute.children[item].children[1].value = originalData[name][data];
        else studentAttribute.children[item].children[1].innerHTML = originalData[name][data];
        item += 1;
    }
    deletedCourse = [];
}

function cancelEdit(i) {
    const studentAttribute = document.querySelectorAll('.students')[i];
    for (let j = 0; j < codes[i].childElementCount; j++) {
        codes[i].children[j].children[1].classList.remove('icon_hover');
        codes[i].children[j].children[1].style.pointerEvents = 'none';
    }
    for (let j = 0; j < studentAttribute.childElementCount; j++) {
        let editable = studentAttribute.children[j].children[1];
        let nonEditable = studentAttribute.children[j].children[0];
        if (editable.tagName == 'DIV') {
            editable.setAttribute('contentEditable', false);
            editable.style.border = 'none';
            if (i % 2 != 0) {
                editable.style.backgroundColor = '#F1FAEE';
            }
        }
        else editable.disabled = true;
        editable.style.border = 'none';
        nonEditable.style.border = 'none';
    }
}

list.forEach((student, i) => {
    student.addEventListener('click', (e) => {
        const dispDet = document.querySelectorAll('.student_details');
        if (dispDet[i].style.display == "" || dispDet[i].style.display == 'none') {
            //show dets
            // console.log(dispDet);
            $.ajax({
                url: './getDetails',
                type: "POST",
                data: {
                    id: dispDet[i].id,
                    message: "check"
                },
                success: function (obj) {
                    dispDet[i].children[0].children[0].children[1].innerHTML = "";
                    for(let group_obj of obj.class_groups){
                        dispDet[i].children[0].children[0].children[1].innerHTML += `<option value="${group_obj._id}">${group_obj.groupNumber}</option>`
                    }
                    dispDet[i].children[0].children[1].children[1].innerHTML = "";
                    for(let group_obj of obj.class_sub_groups){
                        dispDet[i].children[0].children[1].children[1].innerHTML += `<option value="${group_obj._id}">${group_obj.subGroupNumber}</option>`
                    }
                    // console.log(obj);
                    dispDet[i].children[0].children[0].children[1].value = obj.groupNumber;
                    dispDet[i].children[0].children[1].children[1].value = obj.subGroupNumber;
                    dispDet[i].children[1].children[1].innerHTML = "";
                    for (let courseItem of obj.userReq.courses) {
                        dispDet[i].children[1].children[1].innerHTML += `<div class="edit_codes">
                        <div class="course_codes" id=${courseItem._id}>${courseItem.name}</div>
                        <i class="fa fa-trash delete_icon"></i>
                        </div>`;
                    }
                    const trashIcon = document.querySelectorAll('.delete_icon');
                    trashIcon.forEach((trash, j) => {
                        trash.addEventListener('click', (e) => {
                            deletedCourse.push(trash.parentNode.children[0].innerHTML);
                            var index = Array.prototype.indexOf.call(trash.parentNode.parentNode.children,trash.parentNode);
                            courses.splice(index,1);
                            trash.parentNode.remove();
                        });
                    });
                    dispDet[i].style.display = 'flex';
                    edits[i].style.visibility = 'visible';
                    edits[i].children[0].children[0].style.visibility = 'visible';
                    student.children[0].children[0].classList.add('fa-caret-down');
                    student.children[0].children[0].classList.remove('fa-caret-right');

                }
            })

        }
        else {
            dispDet[i].style.display = 'none';
            edits[i].style.visibility = 'hidden';
            edits[i].children[0].children[0].style.visibility = 'hidden';
            student.children[0].children[0].classList.add('fa-caret-right');
            student.children[0].children[0].classList.remove('fa-caret-down');
            if (edits[i].children[1].style.display != 'none') {
                edits[i].children[1].style.display = 'none';
                deleteChanges(i);
                cancelEdit(i);
            }
        }
        dispDet.forEach((det, j) => {
            if (i != j && dispDet[j].style.display == 'flex') {
                if (edits[j].children[1].style.display != 'none') deleteChanges(j);
                dispDet[j].style.display = 'none';
                edits[j].style.visibility = 'hidden';
                edits[j].children[0].children[0].style.visibility = 'hidden';
                edits[j].children[1].style.display = 'none';
                dispDet[j].parentNode.children[0].children[0].children[0].classList.add('fa-caret-right');
                dispDet[j].parentNode.children[0].children[0].children[0].classList.remove('fa-caret-down');
                cancelEdit(j);
                dispDet[i].style.display = 'flex';
                edits[i].style.visibility = 'visible';
                edits[i].children[0].children[0].style.visibility = 'visible';
                dispDet[i].parentNode.children[0].children[0].children[0].classList.add('fa-caret-down');
                dispDet[i].parentNode.children[0].children[0].children[0].classList.remove('fa-caret-right');

            }
        });
        deletedCourse = [];
    });
});
