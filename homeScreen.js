var homeAnimation, button1;
button1 = document.querySelector("startButton").getContext("2d");

function start(){
    window.location="index.html";
}

var homeAnimation = document.getElementById("homeAnimate");   
  var pos = 0;
  var id = setInterval(frame, 5);
  function frame() {
    if (pos == 350) {
      clearInterval(id);
      
    } else {
      pos++; 
      elem.style.top = pos + "px"; 
      elem.style.left = pos + "px"; 
    }
  }
