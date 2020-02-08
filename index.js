var canvas, context, controller, rectangle, gameLoop;


rectangle = {
    jumping: true,
    height:  0,
    width: 0,
    xPos: 0,
    xVel: 0,
    yPos: 0,
    yVel: 0

};
canvas = document.getElementById("gameScreen");
context = canvas.getContext("2d");

context.fillRect(30, 30, 50, 50);

context.fillStyle = '#f00';
