var rows = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];
var current_div = null;
for(let i=0;i<rows.length;i++){
    var row = document.getElementById("row" + rows[i]);
    for(let j=1;j<row.childElementCount;j++){
        if(row.children[j].textContent!=""){
            row.children[j].addEventListener('click',function(e){
                // var rect =this.getBoundingClientRect();
                // console.log(rect);
                if(current_div){
                    current_div.style.opacity = "1";
                    current_div = null;
                }
                var x = this;
                document.getElementById("info").style.display = "flex";
                document.getElementById("info").style.top = this.offsetTop+"px";
                document.getElementById("info").style.left = this.offsetLeft+"px";
                // var newDiv = document.createElement("div");
                // newDiv.style.position = "absolute";
                // newDiv.style.top = this.offsetTop;
                // newDiv.style.left = this.offsetLeft;
                // newDiv.textContent = "i am a new div";
                // this.parentNode.appendChild(newDiv);
                this.style.opacity = "0.2";
                current_div = this;
            })
        }
    }
}

document.addEventListener('click',function(e){
    if(current_div){
        var rect = current_div.getBoundingClientRect();
        if((e.x<rect.left || e.x>rect.left+rect.width || e.y<rect.top || e.y>rect.top+rect.height)){
            current_div.style.opacity = "1";
            document.getElementById("info").style.display = "none";
            current_div = null;
        }
    }
})
