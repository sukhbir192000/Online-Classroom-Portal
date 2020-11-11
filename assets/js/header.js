
let currentMinutes=new Date(Date.now()).getMinutes();
if(currentMinutes==0){
    setBanner();//set for ik ghanta
}
else{
    ajaxFunc();
    setTimeout(setBanner(),(60-currentMinutes)*60000);
}
function setBanner(){
    ajaxFunc();
    setInterval(ajaxFunc,3600000);
}

function ajaxFunc(){
    $.ajax({
        type:'GET',
        url:'/content/getCurrentClass',
        cache:false,
        success:function(response){
            $('#class_name_banner').html(response.className);
            
        }
    })
}