var filterSubject=document.getElementsByClassName('filter_subject');
for(let filterElement of filterSubject){
    filterElement.addEventListener('click',function(e){
        var subjectQuery=filterElement.innerText;
        
        var sortQuery=document.querySelectorAll(".filter_sort.selected")[0].innerText;
        window.location.href="/content/recordedlecture/?sub="+subjectQuery+"&date="+sortQuery;
    });
}
var filterSort=document.getElementsByClassName('filter_sort');
for(let filterElement of filterSort){
    filterElement.addEventListener('click',function(e){
        var sortQuery=filterElement.innerText;
        var subjectQuery=document.querySelectorAll(".filter_subject.selected")[0].innerText;

        window.location.href="/content/recordedlecture/?sub="+subjectQuery+"&date="+sortQuery;
    });
}