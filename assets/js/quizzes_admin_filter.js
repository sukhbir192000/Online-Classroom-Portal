var filterSubject=document.getElementsByClassName('filter_subject');
for(let filterElement of filterSubject){
    filterElement.addEventListener('click',function(e){
        var subjectQuery=filterElement.innerText;
        var classQuery=document.querySelectorAll(".filter_branch.selected")[0].innerText;
        var sortQuery=document.querySelectorAll(".filter_sort.selected")[0].innerText;
        window.location.href="/content/quizzes/?sub="+subjectQuery+"&date="+sortQuery+"&branch=All";
    });
}
var filterSort=document.getElementsByClassName('filter_sort');
for(let filterElement of filterSort){
    filterElement.addEventListener('click',function(e){
        var sortQuery=filterElement.innerText;
        var classQuery=document.querySelectorAll(".filter_branch.selected")[0].innerText;
        var subjectQuery=document.querySelectorAll(".filter_subject.selected")[0].innerText;

        window.location.href="/content/quizzes/?sub="+subjectQuery+"&date="+sortQuery+"&branch="+classQuery;
    });
}
var filterBranch=document.getElementsByClassName('filter_branch');
for(let filterElement of filterBranch){
    filterElement.addEventListener('click',function(e){
        var subjectQuery=document.querySelectorAll(".filter_subject.selected")[0].innerText;
        var classQuery=filterElement.innerText;
        var sortQuery=document.querySelectorAll(".filter_sort.selected")[0].innerText;
        window.location.href="/content/quizzes/?sub="+subjectQuery+"&date="+sortQuery+"&branch="+classQuery;
    });
}