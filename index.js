var canvas, context, controller, floor, rectangle, gameLoop;


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
floor = canvas.getContext("2d");

floor.fillRect(0, 750, 1582, 50);
context.fillRect(766, 700, 50, 50);

floor.fillStyle = '#FF0000';
context.fillStyle = '#f35';

