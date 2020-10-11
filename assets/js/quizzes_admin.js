document.querySelector(".add").addEventListener('click',function(e){
    if(document.querySelector(".add_content").textContent == "Cancel"){
        document.querySelector(".add_content").textContent = "Add";
        document.querySelector(".add_icon").innerHTML =  "<i class='fas fa-plus'></i>";
        document.getElementById("lecture_title").value="";
        document.getElementById("lecture_message").value="";
        document.getElementById("lecture_date").value="";
        document.getElementById("lecture_link").value="";
        document.getElementById("lecture_references").value="";
        branchForm.disabled=true;
        groupForm.disabled=true;
        subGroupForm.disabled=true;
        subjectForm.selectedIndex=0;
        branchForm.selectedIndex=0;
        groupForm.selectedIndex=0;
        subGroupForm.selectedIndex=0;
    }
    else{
        document.querySelector(".add_content").textContent = "Cancel";
        document.querySelector(".add_icon").innerHTML =  "<i class='fas fa-times'></i>";
    }
    document.querySelector(".add_admin").classList.toggle("showx");    
})
