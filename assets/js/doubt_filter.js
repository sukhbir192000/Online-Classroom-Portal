var filterSubject=document.getElementsByClassName('filter_subject');
for(let filterElement of filterSubject){
    filterElement.addEventListener('click',function(e){
        var subjectQuery=filterElement.innerText;
        var doubtQuery=document.querySelectorAll(".filter_doubts.selected")[0].innerText;
        var sortQuery=document.querySelectorAll(".filter_sort.selected")[0].innerText;
        window.location.href="/content/doubts/?sub="+subjectQuery+"&date="+sortQuery+"&doubts="+doubtQuery;
    });
}
var filterSort=document.getElementsByClassName('filter_sort');
for(let filterElement of filterSort){
    filterElement.addEventListener('click',function(e){
        var sortQuery=filterElement.innerText;
        var subjectQuery=document.querySelectorAll(".filter_subject.selected")[0].innerText;
        var doubtQuery=document.querySelectorAll(".filter_doubts.selected")[0].innerText;
        window.location.href="/content/doubts/?sub="+subjectQuery+"&date="+sortQuery+"&doubts="+doubtQuery;
    });
}
var filterDoubt=document.getElementsByClassName('filter_doubts');
for(let filterElement of filterDoubt){
    filterElement.addEventListener('click',function(e){
        var subjectQuery=document.querySelectorAll(".filter_subject.selected")[0].innerText;
        var sortQuery=document.querySelectorAll(".filter_sort.selected")[0].innerText;
        var doubtQuery=filterElement.innerText;
        window.location.href="/content/doubts/?sub="+subjectQuery+"&date="+sortQuery+"&doubts="+doubtQuery;
    });
}