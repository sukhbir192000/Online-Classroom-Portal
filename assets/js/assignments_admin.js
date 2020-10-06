document.querySelector(".add").addEventListener('click',function(e){
    if(document.querySelector(".add_content").textContent == "Cancel"){
        document.querySelector(".add_content").textContent = "Add";
        document.querySelector(".add_icon").innerHTML =  "<i class='fas fa-plus'></i>";
        document.getElementById("title").value="";
        document.getElementById("message").value="";
        document.getElementById("lecture_deadline").value="";
        document.querySelector("#file_names").innerHTML = "";
        document.getElementById("file_inputs").innerHTML = "";
        var newInput = document.createElement("input");
        newInput.name = 'file0';
        newInput.className = "file";
        newInput.type = "file";
        newInput.style.display = "none";
        document.getElementById("file_inputs").appendChild(newInput);
        var newButton = document.createElement("button");
        newButton.id = "new_files_button";
        newButton.textContent = "Add files";
        newButton.type="button";
        document.getElementById("file_inputs").appendChild(newButton);
    }
    else{
        document.querySelector(".add_content").textContent = "Cancel";
        document.querySelector(".add_icon").innerHTML =  "<i class='fas fa-times'></i>";
    }
    document.querySelector(".add_admin").classList.toggle("showx");    
})

availableFiles = ['file1', 'file2', 'file3', 'file4','file5', 'file6', 'file7', 'file8', 'file9']
eventListenerPresent = [false,false,false,false,false,false,false,false,false,false]
function inputFormInitialise(){
    document.getElementById("add_files_button").addEventListener('click',function(e){
        var inputList = document.getElementsByClassName("file");
        var lastElement = inputList[inputList.length-1];
        lastElement.click();
        let index = lastElement.name.substr(-1);
        if(eventListenerPresent[parseInt(index)]) return;
        eventListenerPresent[parseInt(index)] = true;
        lastElement.addEventListener('change',function(e){
            var inputList = document.getElementsByClassName("file");
            var newDiv = document.createElement("div");
            newDiv.classList.add("file_content");
            newDiv.id = lastElement.getAttribute("name");
            var newDiv_title = document.createElement("DIV");
            var newDiv_icon = document.createElement("DIV");  
            newDiv_title.textContent = lastElement.files[0].name;
            newDiv_icon.innerHTML = "<i class='fas fa-times'></i>"
            newDiv_title.classList.add("file_name");
            newDiv_icon.classList.add("file_cross");
            newDiv.id = lastElement.getAttribute("name");
            newDiv.appendChild(newDiv_title);
            newDiv.appendChild(newDiv_icon);
            document.getElementById("file_names").appendChild(newDiv);
            if(availableFiles.length!=0){
                var newInput = document.createElement("input");
                newInput.name = availableFiles[0];
                newInput.className = "file";
                newInput.type = "file";
                newInput.style.display = "none";
                document.getElementById("file_inputs").appendChild(newInput);
                availableFiles.splice(0,1);
            }
            else{
                document.getElementById("add_files_button").style.display = "none";
            }
            newDiv_icon.addEventListener('click',function(e){
                var id = newDiv.id;
                document.getElementsByName(id)[0].remove();
                newDiv.remove();
                availableFiles.push(id);
                eventListenerPresent[parseInt(id.substr(-1))] = false;
                document.getElementById("add_files_button").style.display = "flex";
                if(availableFiles.length == 1 && document.getElementById("add_files_button").style.display == "none"){
                    var newInput = document.createElement("input");
                    newInput.name = availableFiles[0];
                    newInput.className = "file";
                    newInput.type = "file";
                    newInput.style.display = "none";
                    document.getElementById("file_inputs").appendChild(newInput);
                    availableFiles.splice(0,1);
                }
            })
        })
    })
}

inputFormInitialise();