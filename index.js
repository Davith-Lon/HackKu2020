var screen, controller, rectangle, gameLoop;

screen = document.querySelector("canvas").getContext("2d");
screen.canvas.height = 200;
screen.canvas.width = 400;
rectangle = {
    jumping: true,
    height:  0,
    width: 0,
    xPos: 0,
    xVel: 0,
    yPos: 0,
    yVel: 0

};
let canvas = document.getElementById("gameScreen");
let context = canvas.getContext("2d");

context.fillRect(30, 30, 50, 50);

context.fillStyle = '#f00';
