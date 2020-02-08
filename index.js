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

numObstacles = 0;
var enemy;

rectangle = {
    jumping: true,
    height:  50,
    width: 50,
    xPos: 766,
    xVel: 0,
    yPos: 750,
    yVel: 0
};

class Obstacle {

    constructor(yPos, thiccness, lankiness, color, speed) {
        this.xPos = context.canvas.width;
        this.thiccness = thiccness;
        this.lankiness = lankiness;
        this.yPos = yPos;
        this.color = color;
        this.speed = speed;
        numObstacles += 1;
    };
    draw() {
        context.fillStyle = this.color;
        context.fillRect(this.xPos, this.yPos, this.thiccness, this.lankiness);
    };

    move() {
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
    context.fillStyle = "#202020"; //background
    context.fillRect(0,0,1582,750);

    context.fillStyle = "#000000"; //floor
    context.fillRect(0, 750, 1582, 50);

    context.fillStyle = "#ff0000"; //rectangle
    context.beginPath();
    context.rect(rectangle.xPos, rectangle.yPos, rectangle.width, rectangle.height);

    
    context.fill();

}

function drawWeather(){

    
}

gameLoop = function(){
    moveRect();
    draw();
    

    if (numObstacles <= 1) {
        enemy = new Obstacle(700, 50, 50, "#539af6", 5);
    }
    
    
    enemy.draw();
    context.beginPath();
    
    context.fill();
    enemy.move();
    console.log(numObstacles);

    window.requestAnimationFrame(gameLoop);
}


window.addEventListener("keydown", controller.keyListener)
window.addEventListener("keyup", controller.keyListener)
window.requestAnimationFrame(gameLoop)