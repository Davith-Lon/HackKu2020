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