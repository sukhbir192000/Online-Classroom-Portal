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


let week_shift_div = document.getElementById('week_shift');
let offset = 0;
let inProcess = false;
let daysRow = document.getElementsByClassName('table_row')[0];
let startDate = new Date(document.getElementById("starting_date").value);
function setDates() {
    if (offset == 0) {
        week_shift_div.children[0].classList.add("hide_prev_week");
    }
    else {
        week_shift_div.children[0].classList.remove("hide_prev_week");
    }
    for (let i = 0; i < 7; i++) {
        daysRow.children[i + 1].children[0].innerText = new Intl.DateTimeFormat('en-GB', { year: 'numeric', month: 'numeric', day: '2-digit' }).format(startDate);
        startDate.setDate(startDate.getDate() + 1);
    }
    startDate.setDate(startDate.getDate() - 7);
}
setDates();
week_shift_div.children[0].addEventListener('click', function (e) {

    if (!inProcess && offset > 0) {

        offset--;
        inProcess = true;
        $.ajax({
            url: "/content/timetable/?offset=" + offset,
            cache: false,
            type: "GET",
            success: function (response) {
                startDate.setDate(startDate.getDate() - 7);
                setDates();
                // console.log(response);
                let container = document.getElementsByClassName("timetable_content_container")[0];
                let container_parent = container.parentNode;
                container.style.marginRight = "-100%";
                setTimeout(function () {
                    container.parentNode.removeChild(container.parentNode.children[1]);
                    inProcess = false;
                    addFunctions();
                }, 400)
                let new_container = document.createElement('div');

                for (let i = 0; i < 9; i++) {
                    new_container.innerHTML = new_container.innerHTML + `<div class="table_row" id="row${i + 1}"></div>`;
                    let rowDiv = new_container.children[new_container.childElementCount - 1];
                    rowDiv.innerHTML = `<div class="table_column table_heading">${8 + i}:00 - ${9 + i}:00</div>`;
                    for (let j = 0; j < 7; j++) {
                        if (response.timetableItems[j][8 + i]) {
                            rowDiv.innerHTML = rowDiv.innerHTML + `<div class="table_column" id="${response.timetableItems[j][8 + i]._id}" style="height:${4 * response.timetableItems[j][8 + i].duration}em !important; z-index:2;">${response.timetableItems[j][8 + i].classSub.course.name}</div>`
                            let inner_var = rowDiv.children[rowDiv.childElementCount - 1];
                            inner_var.innerHTML+=`<div class="groupDisplay" style="display: none;"></div>`
                            let inner_inner_var = inner_var.children[inner_var.childElementCount-1];
                            if(response.timetableItems[j][8+i].classSub.group){
                                inner_inner_var.innerHTML+=`Group: <span class="groupNumber" id="${response.timetableItems[j][8+i].classSub.group}">${response.timetableItems[j][8+i].classSub.group.groupNumber}</span>`
                            }
                            if(response.timetableItems[j][8+i].classSub.subGroup){
                                inner_inner_var.innerHTML+=`Lab Group: <span class="subGroupNumber" id="${response.timetableItems[j][8+i].classSub.subGroup}">${response.timetableItems[j][8+i].classSub.subGroup.subGroupNumber}</span>`
                            }
                            inner_inner_var.innerHTML+=`<span class="typeDisplay">${response.timetableItems[j][8+i].classType}</span>`
                            console.log("new container: ",rowDiv.innerHTML);
                        }
                        else {
                            rowDiv.innerHTML = rowDiv.innerHTML + `<div class="table_column"></div>`
                        }

                    }
                    
                }
                new_container.classList.add("timetable_content_container");
                new_container.style.marginLeft = "-100%";
                container_parent.prepend(new_container);
                setTimeout(function () {
                    new_container.style.marginRight = "0";
                    new_container.style.marginLeft = "0";

                }, 100);

            }
        })
    }

})

week_shift_div.children[1].addEventListener('click', function (e) {

    if (!inProcess) {
        offset++;
        inProcess = true;
        $.ajax({
            url: "/content/timetable/?offset=" + offset,
            cache: false,
            type: "GET",
            success: function (response) {
                startDate.setDate(startDate.getDate() + 7);
                setDates();
                console.log(response);
                let container = document.getElementsByClassName("timetable_content_container")[0];
                let container_parent = container.parentNode;
                container.style.marginLeft = "-100%";
                setTimeout(function () {
                    container.parentNode.removeChild(container.parentNode.children[0]);
                    inProcess = false;
                    console.log("hi");
                    addFunctions();
                }, 400)
                let new_container = document.createElement('div');
                for (let i = 0; i < 9; i++) {
                    new_container.innerHTML = new_container.innerHTML + `<div class="table_row" id="row${i + 1}"></div>`;
                    let rowDiv = new_container.children[new_container.childElementCount - 1];
                    rowDiv.innerHTML = `<div class="table_column table_heading">${8 + i}:00 - ${9 + i}:00</div>`;
                    for (let j = 0; j < 7; j++) {
                        if (response.timetableItems[j][8 + i]) {
                            rowDiv.innerHTML = rowDiv.innerHTML + `<div class="table_column" id="${response.timetableItems[j][8 + i]._id}" style="height:${4 * response.timetableItems[j][8 + i].duration}em !important; z-index:2;">${response.timetableItems[j][8 + i].classSub.course.name}</div>`
                            let inner_var = rowDiv.children[rowDiv.childElementCount - 1];
                            inner_var.innerHTML+=`<div class="groupDisplay" style="display: none;"></div>`
                            let inner_inner_var = inner_var.children[inner_var.childElementCount-1];
                            if(response.timetableItems[j][8+i].classSub.group){
                                inner_inner_var.innerHTML+=`Group: <span class="groupNumber" id="${response.timetableItems[j][8+i].classSub.group}">${response.timetableItems[j][8+i].classSub.group.groupNumber}</span>`
                            }
                            if(response.timetableItems[j][8+i].classSub.subGroup){
                                inner_inner_var.innerHTML+=`Lab Group: <span class="subGroupNumber" id="${response.timetableItems[j][8+i].classSub.subGroup}">${response.timetableItems[j][8+i].classSub.subGroup.subGroupNumber}</span>`
                            }
                            inner_inner_var.innerHTML+=`<span class="typeDisplay">${response.timetableItems[j][8+i].classType}</span>`
                        }
                        else {
                            rowDiv.innerHTML = rowDiv.innerHTML + `<div class="table_column"></div>`
                        }

                    }
                }
                new_container.classList.add("timetable_content_container");
                new_container.style.marginRight = "-100%";
                container_parent.appendChild(new_container)
                setTimeout(function () {
                    new_container.style.marginRight = "0";
                    new_container.style.marginLeft = "0";

                }, 100);
                console.log("hi2");
            }
        })
    }

})


//----------------------options for admin-------------------------------


var current_div = null, prevText = "", subjectName = "";
var clickAddFunction = function (a) {
    if (a.textContent != "") {
        a.style.cursor = "pointer";
    }
    a.addEventListener('click', function (e) {
        let current_subject_name = subjectName;
        let newDiv = document.createElement('div');
        newDiv.innerHTML = `
            <div class="subject_name">${current_subject_name.split('<div')[0]}</div>`;
        let groupNumber = a.getElementsByClassName("groupNumber");
        let subGroupNumber = a.getElementsByClassName("subGroupNumber");
        let startingTime = 8 + Array.prototype.indexOf.call(a.parentNode.parentNode.children, a.parentNode);
        let duration = parseInt(a.style.height) / 4;
        if (groupNumber.length != 0) {
            newDiv.innerHTML += `<div class="class_group"><b>Class Group: &nbsp; </b>${groupNumber[0].innerText}</div>`
        }
        else {
            newDiv.innerHTML += `<div class="class_group" style="display:none"><b>Class Group: &nbsp; </b></div>`
        }
        if (subGroupNumber.length != 0) {
            newDiv.innerHTML += `<div class="lab_group"><b>Lab group: &nbsp;</b> ${subGroupNumber[0].innerText}</div>`
        }
        else {
            newDiv.innerHTML += `<div class="lab_group" style="display:none"><b>Lab group: &nbsp;</b></div>`
        }
        newDiv.innerHTML += `
            <div class="timings"><b>Time:&nbsp; </b> ${startingTime}:00PM - ${startingTime + duration}:00PM</div>
            <div class="buttons_edit">
                <button type="button" class="cancel_button">Cancel class</button>
                <button type="button" class="reschedule_button">Reschedule class</button>
            </div>
        `;
        newDiv.innerHTML = `<div id="info">${newDiv.innerHTML}</div>`;
        document.getElementsByClassName('main_content')[0].appendChild(newDiv);
        if (a.isActive) {
            if (document.getElementById("info").style.display == "none" || document.getElementById("info").style.display == "") {
                if (current_div) {
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
                document.querySelector(".table").style.opacity = "0.2";

                let classId = this.id;
                document.getElementById("info").children[4].children[1].addEventListener("click", function (e) {
                    document.getElementById("info").style.display = "none";
                    let rescheduleContainer = document.getElementById("reschedule_class")
                    rescheduleContainer.style.display = "flex";
                    rescheduleContainer.style.top = '50%';
                    rescheduleContainer.style.left = '50%';
                    rescheduleContainer.style.transform = 'translate(-50%, -50%)';
                    rescheduleContainer.children[0].innerText = current_subject_name.split('<div')[0];
                    let groupNumber = a.getElementsByClassName("groupNumber");
                    let subGroupNumber = a.getElementsByClassName("subGroupNumber");
                    if (groupNumber.length != 0) {
                        rescheduleContainer.children[1].style.display = "flex";
                        rescheduleContainer.children[1].children[1].innerText = groupNumber[0].innerText;
                    }
                    else {
                        rescheduleContainer.children[1].style.display = "none";
                    }
                    console.log(rescheduleContainer);
                    if (subGroupNumber.length != 0) {
                        rescheduleContainer.children[2].style.display = "flex";
                        rescheduleContainer.children[2].children[1].innerText = subGroupNumber[0].innerText;
                    }
                    else {
                        rescheduleContainer.children[2].style.display = "none";
                    }

                    document.getElementById("slots_available_reschedule").addEventListener("focus", function (e) {
                        enable = true;
                    });
                    document.getElementById("slots_available_reschedule").addEventListener("blur", function (e) {
                        enable = false;
                    });

                    let reschedule_form = document.getElementById("reschedule_form");
                    let date_form_res = document.getElementById("date_reschedule");
                    let duration_form_res = document.getElementById("duration_reschedule");
                    let slot_form_res = document.getElementById("slots_available_reschedule");
                    date_form_res.value = "";
                    duration_form_res.value = parseInt(a.style.height) / 4;
                    slot_form_res.selectedIndex = 0;
                    slot_form_res.disabled = true;
                    var today = new Date();
                    var dd = today.getDate();
                    var mm = today.getMonth() + 1;
                    var yyyy = today.getFullYear();
                    if (dd < 10) {
                        dd = '0' + dd
                    }
                    if (mm < 10) {
                        mm = '0' + mm
                    }

                    today = yyyy + '-' + mm + '-' + dd;
                    document.getElementById("date_reschedule").setAttribute("min", today);
                    $.ajax({
                        url: `/content/timetable/getInfo/${classId}`,
                        type: "GET",
                        cache: false,
                        success: function (response) {
                            date_form_res.addEventListener('change', function (e) {
                                console.log("hi");
                                if (response.data.classType == "Lecture")
                                    findSlots(response.data.classSub.class, response.data.classType, response.data.classSub.group, date_form_res, duration_form_res, slot_form_res);
                                else
                                    findSlots(response.data.classSub.class, response.data.classType, response.data.classSub.subGroup, date_form_res, duration_form_res, slot_form_res);
                            })
                            duration_form_res.addEventListener('change', function (e) {
                                if (response.data.classType == "Lecture")
                                    findSlots(response.data.classSub.class, response.data.classType, response.data.classSub.group, date_form_res, duration_form_res, slot_form_res);
                                else
                                    findSlots(response.data.classSub.class, response.data.classType, response.data.classSub.subGroup, date_form_res, duration_form_res, slot_form_res);
                            })
                            reschedule_form.children[0].value = response.data.classSub.course;
                            reschedule_form.children[1].value = response.data.classType;
                            reschedule_form.children[2].value = response.data.classSub.class
                            if (response.data.classType == "Lecture")
                                reschedule_form.children[3].value = response.data.classSub.group;
                            else
                                reschedule_form.children[3].value = response.data.classSub.subGroup;
                            if (reschedule_form.children[3].value == 'undefined') reschedule_form.children[3].value = "All";
                            reschedule_form.children[4].value = true;
                            document.getElementsByClassName("submit_button_reschedule")[0].addEventListener('click', function (e) {
                                e.preventDefault();
                                $.ajax({
                                    url: `/content/timetable/delete/${classId}`,
                                    type: "GET",
                                    success: function (response) {
                                        reschedule_form.submit();
                                    }
                                })
                            })
                        }
                    })
                })

                document.getElementById('info').children[4].children[0].addEventListener('click', function () {
                    $.ajax({
                        url: `/content/timetable/delete/${classId}`,
                        type: "GET",
                        success: function (response) {
                            document.getElementById('info').parentNode.removeChild(document.getElementById('info'));
                            current_div.style.opacity = "1";
                            document.getElementById("reschedule_class").style.display = "none";
                            document.querySelector(".table").style.opacity = "1";
                            current_div.classList.remove("font_size_remove");
                            current_div.isActive = (!current_div.isActive);
                            let emptyDiv = document.createElement('div');
                            emptyDiv.classList.add('table_column');
                            current_div.parentNode.replaceChild(emptyDiv, current_div);
                            current_div = null;
                        }
                    })
                })
                current_div = this;
            }
        }
        else {
            if (current_div) {
                current_div.style.opacity = "1";
                document.getElementById("info").style.display = "none";
                document.getElementById("reschedule_class").style.display = "none";
                document.querySelector(".table").style.opacity = "1";
                current_div.classList.remove("font_size_remove");
                current_div = null;
            }
        }
        a.isActive = (!a.isActive);
    })
    if (a.innerText) {
        a.addEventListener("mouseenter", function (e) {
            a.style.backgroundColor = "#640e1f";
            a.style.color = "white";
            a.style.transition = "all 0.5s";
            subjectName = a.innerHTML;
            a.innerHTML = a.children[0].innerHTML;
        })
        a.addEventListener("mouseleave", function (e) {
            a.style.backgroundColor = "white";
            a.style.color = "black";
            a.style.transition = "all 0.5s";
            a.innerHTML = subjectName;
            subjectName = "";
        })
    }
}

var addFunctions = function () {
    var rows = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];
    for (let i = 0; i < rows.length; i++) {
        var row = document.getElementById("row" + rows[i]);
        for (let j = 1; j < row.childElementCount; j++) {
            if (row.children[j].textContent) {
                row.children[j].isActive = true;
                clickAddFunction(row.children[j]);
            }
        }
    }
}

var enable = false;


addFunctions();

document.addEventListener('click', function (e) {
    var rect = document.getElementById("reschedule_class");
    if (rect.style.display == "flex") {
        rect = rect.getBoundingClientRect();
        if (current_div && (e.x < rect.left || e.x > rect.left + rect.width || e.y < rect.top || e.y > rect.top + rect.height)) {
            var rectinner = current_div.getBoundingClientRect();
            if (!enable && (e.x < rectinner.left || e.x > rectinner.left + rectinner.width || e.y < rectinner.top || e.y > rectinner.top + rectinner.height) && current_div.classList.contains("font_size_remove")) {
                current_div.style.opacity = "1";
                // console.log("hi2");
                // document.getElementById("info").style.display = "none";
                document.getElementById("reschedule_class").style.display = "none";
                document.getElementById("reschedule_class").innerHTML = `
                    <div class="subject_name_reschedule"></div>
                    <div class="class_group_reschedule">
                        <div class="cg_reschedule_heading"><b>Class Group:&nbsp;</b></div>
                        <div class="cg_reschedule_content"></div>
                    </div>
                    <div class="lab_group_reschedule">
                        <div class="lg_reschedule_heading"><b>Lab group:&nbsp;</b></div> 
                        <div class="lg_reschedule_content"></div>
                    </div>
                    <form id="reschedule_form" action="/content/timetable/create" method="POST">
                        <input type="hidden" name="subject">
                        <input type="hidden" name="class_type">
                        <input type="hidden" name="branch">
                        <input type="hidden" name="sub_group">
                        <input type="hidden" name="reschedule">
                        <div>
                            <label class="date_reschedule_label"><b>Date:</b></label>
                            <input type="date" name="date_reschedule" id="date_reschedule" required>
                        </div>
                        <div>
                            <label class="duration_reschedule_label"><b>Duration:</b></label>
                            <input type="number" min="1" name="duration_reschedule" id="duration_reschedule" required>
                        </div>
                        <div>
                            <label class="slots_available_label_reschedule"><b>Available slots:</b></label>
                            <select id="slots_available_reschedule" name="slots_available_reschedule" required>
                                <option value="" disabled selected>--Select an option--</option>
                            </select>
                        </div>
                        <div class="buttons_reschedule">
                            <button type="submit" class="submit_button_reschedule">Reschedule</button>
                        </div>
                    </form>
                `;
                document.querySelector(".table").style.opacity = "1";
                current_div.classList.remove("font_size_remove");
                current_div.isActive = (!current_div.isActive);
                current_div = null;
                document.getElementById('info').parentNode.removeChild(document.getElementById('info'));
            }
        }

    }
    else {
        // console.log("hello");
        rect = document.getElementById("info");
        if (rect) {
            rect = rect.getBoundingClientRect();
            if (current_div && (e.x < rect.left || e.x > rect.left + rect.width || e.y < rect.top || e.y > rect.top + rect.height)) {
                var rectinner = current_div.getBoundingClientRect();
                if ((e.x < rectinner.left || e.x > rectinner.left + rectinner.width || e.y < rectinner.top || e.y > rectinner.top + rectinner.height) && current_div.classList.contains("font_size_remove")) {
                    current_div.style.opacity = "1";
                    // document.getElementById("info").style.display = "none";
                    document.getElementById("reschedule_class").style.display = "none";
                    document.querySelector(".table").style.opacity = "1";
                    current_div.classList.remove("font_size_remove");
                    current_div.isActive = (!current_div.isActive);

                    current_div = null;
                    document.getElementById('info').parentNode.removeChild(document.getElementById('info'));
                }
            }
        }
    }

})


document.querySelector(".add").addEventListener('click', function (e) {
    if (document.querySelector(".add_content").textContent == "Cancel") {
        document.querySelector(".add_content").textContent = "Add Class";
        document.querySelector(".add_icon").innerHTML = "<i class='fas fa-plus'></i>";
        document.getElementById("duration_hr").value = "";
        document.getElementById("lecture_date").value = "";
        subjectForm.selectedIndex = 0;
        branchForm.selectedIndex = 0;
        classTypeForm.selectedIndex = 0;
        subGroupForm.selectedIndex = 0;
        slotForm.selectedIndex = 0;
        durationForm.value = 1;
        subGroupForm.disabled = true;
        branchForm.disabled = true;
        dateForm.disabled = true;
        durationForm.disabled = true;
        slotForm.disabled = true;
    }
    else {
        document.querySelector(".add_content").textContent = "Cancel";
        document.querySelector(".add_icon").innerHTML = "<i class='fas fa-times'></i>";
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
        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth() + 1;
        var yyyy = today.getFullYear();
        if (dd < 10) {
            dd = '0' + dd
        }
        if (mm < 10) {
            mm = '0' + mm
        }

        today = yyyy + '-' + mm + '-' + dd;
        document.getElementById("lecture_date").setAttribute("min", today);
    }
    document.querySelector(".add_admin").classList.toggle("showx");
})

var branchForm = document.getElementById("branch")
branchForm.disabled = true;
var classTypeForm = document.getElementById("class_type")
var subGroupForm = document.getElementById("sub_group")
subGroupForm.disabled = true;
var dateForm = document.getElementById("lecture_date");
var durationForm = document.getElementById("duration_hr");
dateForm.disabled = true;
durationForm.disabled = true;
var subjectForm = document.getElementById("subject");
var slotForm = document.getElementById("slots_available");

slotForm.disabled = true;
subjectForm.addEventListener('change', function (e) {
    subGroupForm.selectedIndex = 0;
    subGroupForm.disabled = true;
    dateForm.disabled = true;
    durationForm.disabled = true;
    branchForm.disabled = false;
    let classTypeValue = classTypeForm.value;
    findSlots(branchForm.value, classTypeForm.value, subGroupForm.value, dateForm, durationForm, slotForm);
    $.ajax({
        url: "/content/announcements/form/branches",
        data: { course: subjectForm.value, class_type: classTypeForm.value },
        cache: false,
        type: "POST",
        success: function (response) {
            classTypeForm.innerText = "";
            if (response.data.lecturePresent) {
                var opt = document.createElement('option');
                opt.value = "Lecture",
                    opt.innerText = "Lecture",
                    classTypeForm.appendChild(opt);
            }
            if (response.data.labPresent) {
                var opt = document.createElement('option');
                opt.value = "Lab",
                    opt.innerText = "Lab/Tutorial",
                    classTypeForm.appendChild(opt);
            }
            classTypeForm.selectedIndex = 0;
            branchForm.innerText = "";
            var opt = document.createElement('option');
            opt.innerText = "--Select an option--";
            opt.value = "";
            opt.disabled = true;
            branchForm.appendChild(opt);
            for (let obj of response.data.branchList) {
                var opt = document.createElement('option');
                opt.value = obj.id;
                opt.innerText = obj.name;
                branchForm.appendChild(opt);
            }
            branchForm.selectedIndex = 0;
            if (classTypeValue != classTypeForm.value) {
                $.ajax({
                    url: "/content/announcements/form/branches",
                    data: { course: subjectForm.value, class_type: classTypeForm.value },
                    cache: false,
                    type: "POST",
                    success: function (response) {
                        branchForm.innerText = "";
                        var opt = document.createElement('option');
                        opt.innerText = "--Select an option--";
                        opt.value = "";
                        opt.disabled = true;
                        branchForm.appendChild(opt);
                        for (let obj of response.data.branchList) {
                            var opt = document.createElement('option');
                            opt.value = obj.id;
                            opt.innerText = obj.name;
                            branchForm.appendChild(opt);
                        }
                        branchForm.selectedIndex = 0;
                    }
                })
            }
        }
    })
})

classTypeForm.addEventListener('change', function (e) {
    branchForm.selectedIndex = 0;
    subGroupForm.selectedIndex = 0;
    subGroupForm.disabled = true;
    findSlots(branchForm.value, classTypeForm.value, subGroupForm.value, dateForm, durationForm, slotForm);
    if (subjectForm.value != "All") {
        branchForm.disabled = false;
        $.ajax({
            url: "/content/announcements/form/branches",
            data: { course: subjectForm.value, class_type: classTypeForm.value },
            cache: false,
            type: "POST",
            success: function (response) {
                branchForm.innerText = "";
                var opt = document.createElement('option');
                opt.innerText = "--Select an option--";
                opt.value = "";
                opt.disabled = true;
                branchForm.appendChild(opt);
                for (let obj of response.data.branchList) {
                    var opt = document.createElement('option');
                    opt.value = obj.id;
                    opt.innerText = obj.name;
                    branchForm.appendChild(opt);
                }
                branchForm.selectedIndex = 0;
            }
        })
    }
    else {
        branchForm.disabled = true;
    }
})

branchForm.addEventListener('change', function (e) {
    subGroupForm.selectedIndex = 0;
    subGroupForm.disabled = false;
    dateForm.disabled = false;
    durationForm.disabled = false;
    findSlots(branchForm.value, classTypeForm.value, subGroupForm.value, dateForm, durationForm, slotForm);
    $.ajax({
        url: "/content/announcements/form/subGroups",
        data: { course: subjectForm.value, class: branchForm.value, classType: classTypeForm.value },
        cache: false,
        type: "POST",
        success: function (response) {
            subGroupForm.innerText = "";
            var opt = document.createElement('option');
            if (response.data.allAvailable) {
                opt.value = "All";
                opt.innerText = "All";
            }
            else {
                opt.innerText = "--Select an option--";
                opt.value = "";
                opt.disabled = true;
            }
            subGroupForm.appendChild(opt);
            for (let obj of response.data.groupList) {
                var opt = document.createElement('option');
                opt.value = obj.id;
                opt.innerText = obj.name;
                subGroupForm.appendChild(opt);
            }
            subGroupForm.selectedIndex = 0;
        }
    });
})

dateForm.addEventListener('change', function (e) {
    findSlots(branchForm.value, classTypeForm.value, subGroupForm.value, dateForm, durationForm, slotForm);
})
durationForm.addEventListener('change', function (e) {
    findSlots(branchForm.value, classTypeForm.value, subGroupForm.value, dateForm, durationForm, slotForm);
})

function findSlots(branch, classType, subGroup, dateForm, durationForm, slotForm) {
    if (!dateForm.disabled && dateForm.value != "" && !durationForm.disabled && durationForm.value != "") {
        slotForm.disabled = false;
        $.ajax({
            url: "/content/timetable/slots",
            data: {
                branch: branch,
                classType: classType,
                subGroup: subGroup,
                date: dateForm.value,
                duration: durationForm.value
            },
            cache: false,
            type: "POST",
            success: function (response) {
                slotForm.innerText = "";
                var opt = document.createElement('option');
                opt.innerText = "--Select an option--";
                opt.value = ""
                opt.disabled = true;
                slotForm.appendChild(opt);
                for (let freeTime of response.unoccupiedClasses) {
                    var opt = document.createElement('option');
                    opt.value = freeTime;
                    opt.innerText = `${freeTime}:00-${parseInt(freeTime) + parseInt(durationForm.value)}:00`;
                    slotForm.appendChild(opt);
                }
                slotForm.selectedIndex = 0;
            }
        });
    }
    else {
        slotForm.disabled = true;
        slotForm.selectedIndex = 0;
    }
}

