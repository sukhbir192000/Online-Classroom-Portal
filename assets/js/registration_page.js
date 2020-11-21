function getGroupNumber(branch, year){
    console.log("inside function: ", branch, "   ", year);
    if(branch && year){
        console.log("inside if")
        $.ajax({
            url: "/users/registerLocal/getGroups/" + branch + "/" + year,
            type: "GET",
            cache: false,
            success: function(response){
                console.log(response);
                let group_input = document.getElementsByName("group")[0], sub_group_input = document.getElementsByName("labGroup")[0];
                group_input.innerText = "";
                sub_group_input.innerText = "";
                let opt = document.createElement('option');
                opt.value="";
                opt.innerText="Select";
                opt.disabled = true;
                group_input.appendChild(opt);
                opt = document.createElement('option');
                opt.value="";
                opt.innerText="Select";
                opt.disabled = true;
                sub_group_input.appendChild(opt);
                for(let i=1;i<=response.totalGroups;i++){
                    let opt = document.createElement('option');
                    opt.value=i;
                    opt.innerText=i;
                    group_input.appendChild(opt);
                }
                for(let i=1;i<=response.totalSubGroups;i++){
                    let opt = document.createElement('option');
                    opt.value=i;
                    opt.innerText=i;
                    sub_group_input.appendChild(opt);
                }
                group_input.selectedIndex = 0;
                sub_group_input.selectedIndex = 0;
                group_input.disabled = false;
                sub_group_input.disabled = false;
            }
        })
    }
}

let branch_input = document.getElementsByName("branch")[0];
let year_input = document.getElementsByName("year")[0];
branch_input.addEventListener('change', (e)=>{getGroupNumber(branch_input.value, year_input.value)});
year_input.addEventListener('change', (e)=>{getGroupNumber(branch_input.value, year_input.value)});
