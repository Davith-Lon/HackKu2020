var canvas, context, controller, rectangle, gameLoop, weather, weatherColor, Locations, key, rand;

locations = [328846]
key = '39KfKD60bv3lZ6CC6qCBMF5ZSfKo3ukU';
rand = Math.random(1);

async function getWeather() {
    const response = await fetch('https://dataservice.accuweather.com/currentconditions/v1/' + locations[rand] + '?apikey=' + key);
    const json = await response.json();
    return json.WeatherText;
}

weather = getWeather();
if (weather != "Sunny"){
    if (weather != "Rain"){
        if (weather != "Snow"){
            weather = "Sunny";
        }
    }
}

const CANVAS_WIDTH = 1418;
const CANVAS_HEIGHT = 760;

if (weather == "Sunny"){
    weatherColor = "#784814" ; //change color
}

else if (weather == "Snow"){
    weatherColor = "#FFFFFF";
}

else if (weather == "Rain"){
    weatherColor = "#14C0F3";
}

context = document.querySelector("canvas").getContext("2d");
context.canvas.width = 1582;
context.canvas.height = 800;

numObstacles = 0;
var obstacles = []
var enemy;
var jumpVel = 5;

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

    constructor(yPos, width, height, color, speed) {
        this.xPos = context.canvas.width;
        this.width = width;
        this.height = height;
        this.yPos = yPos;
        this.color = color;
        this.speed = speed;
        numObstacles += 1;
    };
    draw() {
        context.fillStyle = this.color;
        context.fillRect(this.xPos, this.yPos, this.width, this.height);
    };

    move() {
        this.xPos -= this.speed;
        context.fillStyle = "#539af6";
        context.fillRect(this.xPos, this.yPos, this.width, this.height)
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
        if (weather == "Snow"){
            rectangle.yVel -= 50;
        }
        else {
            rectangle.yVel -= 65;
        }
        rectangle.jumping = true;
    }
    if (controller.left){
        if (weather == "Snow"){
            rectangle.xVel -= 1;
        }
        else {
            rectangle.xVel -= 2;
        }
    }
    if (controller.right){
        if (weather == "Snow"){
            rectangle.xVel += 1;
        }
        else {
            rectangle.xVel += 2;
        }
    }
    rectangle.yVel += jumpVel;
    rectangle.xPos += rectangle.xVel;
    rectangle.yPos += rectangle.yVel;

    if (weather == "Rain"){
        rectangle.xVel *= 0.95;
    }
    else if (weather == "Snow" || weather == "Sunny"){
        rectangle.xVel *= 0.9;
        rectangle.yVel *= 0.9;
    }
    if (rectangle.yPos > 700){
        rectangle.jumping = false;
        rectangle.yPos = 700;
        rectangle.yVel = 0;
    }
    if(rectangle.xPos <= 0){
        window.location = "homeScreen.html";
    }
    if(rectangle.xPos >= 1535){
        rectangle.xPos = 1535;
        rectangle.xVel = 0;
    }
}

function draw(){
    context.fillStyle = "#202020"; //background
    context.fillRect(0,0,1582,750);

    context.fillStyle = weatherColor; //floor
    context.fillRect(0, 750, 1582, 50);

    context.fillStyle = "#ff0000"; //rectangle
    context.beginPath();
    context.rect(rectangle.xPos, rectangle.yPos, rectangle.width, rectangle.height);

    
    context.fill();

}

document.getElementById("TextBox").style.opacity = "1"; // Makes it so we can see the game don't touch.
document.getElementById("TextBox").style.filter = 'alpha(opacity=90)';

function dectectCollide(rect1, rect2) {
    console.log(rect1.xPos);
    if (rect1.xPos+rect1.width >= rect2.xPos &&
        rect1.xPos < rect2.xPos+rect2.width-(rect1.width-jumpVel) &&
        rect1.yPos <= rect2.yPos + rect2.height &&
        rect1.yPos+rect1.height>rect2.yPos) {
            rect1.xPos = rect2.xPos-rect1.width
            
            
            //let pos = obstacles.indexOf(rect2);
            //let removedItem = obstacles.splice(pos, 1);
            //context.clearRect(rect2.xPos, rect2.yPos, rect2.width, rect2.height)
            //numObstacles -= 1;
            //delete rect2;
        }
        
    else if (
        rect1.xPos <= rect2.xPos+rect2.width &&
        rect1.xPos > rect2.xPos+jumpVel &&
        rect1.yPos <= rect2.yPos + rect2.height &&
        rect1.yPos+rect1.height>rect2.yPos) {
            rect1.xPos = rect2.xPos + rect2.width;
            //console.log(2);
    }
    else if (rect1.xPos < rect2.xPos + rect2.width &&
            rect1.xPos + rect1.width > rect2.xPos &&
            rect1.yPos+rect1.height < rect2.yPos + rect2.height) {
                if (rect1.yPos+rect1.height>=rect2.yPos-rect1.height) {
                    rect1.yPos = rect2.yPos-rect1.height-jumpVel;
                    rect1.xVel = -rect2.speed;
                    if (rect1.yVel <= 100) {
                        rect1.yVel = 0; }
                }

    }
    }

function drawWeather(){

    if (weather == "Sunny"){
        var element = document.getElementById("sunnyHead");
            element.innerHTML = "Sunny";
    }

    else if (weather == "Snow"){
        var element = document.getElementById("sunnyHead");
            element.innerHTML = "Snowy";
    }

    else if (weather == "Rain"){
        var element = document.getElementById("sunnyHead");
            element.innerHTML = "Rainy";
    }
        

    
}

function makeObstacles() {
    if (numObstacles <= 1) {
        enemy = new Obstacle(650, 100, 100, "#539af6", 5);
        let newLength = obstacles.unshift(enemy)
    }
    
    obstacles.forEach(function(item, index, array) {
        //console.log(item, index)
        item.draw();
        item.move();
        dectectCollide(rectangle, item);
    })
}

gameLoop = function(){
    moveRect();
    draw();
    drawWeather();
    makeObstacles();
    window.requestAnimationFrame(gameLoop);
}
window.addEventListener("keydown", controller.keyListener)
window.addEventListener("keyup", controller.keyListener)
window.requestAnimationFrame(gameLoop)