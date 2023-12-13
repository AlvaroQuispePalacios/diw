let canvas;
let context;
let sound = document.querySelector("#boing");
let buttonStop = document.querySelector(".buttonStop");
let buttonStart = document.querySelector(".buttonStart");

canvas = document.getElementById('2d-animation-canvas');
context = canvas.getContext('2d');

function draw(x, y) {
  context.fillStyle = "green";
  context.beginPath();
  context.arc(x,y,10,0,Math.PI * 2,true);
  context.fill();
}

function clearCanvas() {
  canvas.width = canvas.width;
}

let interval;
// Punto de inicio 
let ballX = 10;
let ballY = 10;
// Velocidad
let directionX = 2;
let directionY = 2;


function start(){
    directionX  = 2;
    directionY = 2;
    interval = setInterval(function(){
      if (ballX > 490 || ballX < 10){
        directionX *= -1;
        sound.play();
      }
    
      if (ballY < 10 || ballY > 290){
        directionY *= -1;
        sound.play();
      }
    
      ballX += directionX;
      ballY += directionY;
      clearCanvas();
      draw(ballX, ballY);
    
    }, 35);

    buttonStart.setAttribute('disabled', 'disabled');
}

function stop(){
    clearInterval(interval);
    directionX = 0;
    directionY = 0;
    buttonStart.removeAttribute('disabled');
}

draw(ballX, ballY);
start();
buttonStart.addEventListener('click', start);
buttonStop.addEventListener('click', stop);