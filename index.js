var canvas, context, controller, floor, rectangle, gameLoop;

context = document.querySelector("canvas").getContext("2d");
context.canvas.height = 400;
context.canvas.height = 400;

rectangle = {
    jumping: true,
    height:  50,
    width: 50,
    xPos: 766,
    xVel: 0,
    yPos: 750,
    yVel: 0

};
controller = {
    left: false,
    right: false,
    up: false,
    keyListener:function(event) {
        var keys = (event.type == "keydown")?true:false;
        switch(event.keyCode){
            case 37: 
                controller.left = keys;
            break;
            case 38:
                controller.up = keys;
            break;
            case 39:
                controller.right = keys;
            break;
        }
    }
}

gameLoop = function(){
    if (controller.up && rectangle.jumping == false){
        rectangle.yVel -=20;
        rectangle.jumping = true;
    }
    if (controller.left){
        rectangle.xVel -= 0.5;
    }
    if (controller.right){
        rectangle.xVel += 0.5;
    }
    rectangle.yVel += 1.5;
    rectangle.xPos += rectangle.xVel;
    rectangle.yPos += rectangle.yVel;
    rectangle.xVel *= 0.9;
    rectangle.yVel *= 0.9;

    if (rectangle.yPos > 400){
        rectangle.jumping = false;
        rectangle.yPos = 400;
        rectangle.yVel = 0;
    }
    context.fillStyle = "#202020";
    context.fillRect(0, 750, 1582, 50);

    context.fillStyle = "#ff0000";
    context.beginPath();
    context.rect(rectangle.xPos, rectangle.yPos, rectangle.width, rectangle.height);
    context.fill();

    window.requestAnimationFrame(gameLoop);
}


window.addEventListener("keydown", controller.keyListener)
window.addEventListener("keyup", controller.keyListener)
window.requestAnimationFrame(gameLoop)