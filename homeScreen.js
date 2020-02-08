var context, canvas, button1;
let canvas = document.getElementById("homeScreen");
let upperRec = canvas.getContext("2d");
button1 = document.querySelector("startButton").getContext("2d");

upperRec.fillStyle = "#202020";
upperRec.fillRect(0,0,1582,750);

context.fillStyle = "#000000";
context.fillRect(0, 750, 1582, 50);

function start(){
    window.location="index.html";
}