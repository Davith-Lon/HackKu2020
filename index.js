var canvas, context, controller, floor, rectangle, gameLoop, weather;

var request = new XMLHttpRequest();
request.open('GET', 'http://dataservice.accuweather.com/currentconditions/v1/328846?apikey=39KfKD60bv3lZ6CC6qCBMF5ZSfKo3ukU', true);
request.responseType = 'text';

request.onload = function () {
    if (request.readyState === request.DONE && request.status === 200) {
        weather = JSON.parse(request.responseText);
        console.log(weather[0].WeatherText);
    }
};
request.send(null);

context = document.querySelector("canvas").getContext("2d");
context.canvas.width = 1582;
context.canvas.height = 800;

rectangle = {
    jumping: true,
    height:  50,
    width: 50,
    xPos: 766,
    xVel: 0,
    yPos: 750,
    yVel: 0
};

obstacle = {
    height: 0,
    width: 0,
    xPos: context.canvas.width,
    yPos: 0,
    speed: 0,   //pixels/update
    color: (0,0,0),

    constructor(yPos, width, height, color, speed) {
        this.width = width;
        this.height = height;
        this.yPos = yPos;
        this.color = color;
        this.speed = speed;
    };

    update() {
        this.xPos -= this.speed;
        context.fillStyle = "#539af6";
        context.fillRect = (this.xPos, this.yPos, context.canvas.width, context.canvas.height)
    };

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
function moveRect(){
    if (controller.up && rectangle.jumping == false){
        rectangle.yVel -= 100;
        rectangle.jumping = true;
    }
    if (controller.left){
        rectangle.xVel -= 3;
    }
    if (controller.right){
        rectangle.xVel += 3;
    }
    rectangle.yVel += 5;
    rectangle.xPos += rectangle.xVel;
    rectangle.yPos += rectangle.yVel;
    rectangle.xVel *= 0.9;
    rectangle.yVel *= 0.9;

    if (rectangle.yPos > 700){
        rectangle.jumping = false;
        rectangle.yPos = 700;
        rectangle.yVel = 0;
    }
}

function draw(){
    context.fillStyle = "#202020";
    context.fillRect(0,0,1582,750);

    context.fillStyle = "#000000";
    context.fillRect(0, 750, 1582, 50);

    context.fillStyle = "#ff0000";
    context.beginPath();
    context.rect(rectangle.xPos, rectangle.yPos, rectangle.width, rectangle.height);
    context.fill();
}

gameLoop = function(){
    
    moveRect();
    draw();

    window.requestAnimationFrame(gameLoop);
}


window.addEventListener("keydown", controller.keyListener)
window.addEventListener("keyup", controller.keyListener)
window.requestAnimationFrame(gameLoop)