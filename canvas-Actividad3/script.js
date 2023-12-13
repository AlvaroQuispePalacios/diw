let canvas;
let context;
// let sound = document.querySelector("#boing");
let buttonStop = document.querySelector(".buttonStop");
let buttonStart = document.querySelector(".buttonStart");
let speedX = document.querySelector(".speedX");
let speedY = document.querySelector(".speedY");
let inputs = document.querySelectorAll(".speed");
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


function start(x, y){

    directionX  = x;
    directionY = y;

    interval = setInterval(function(){
      if (ballX > 490 || ballX < 10){
        directionX *= -1;
        // sound.play();
      }
    
      if (ballY < 10 || ballY > 290){
        directionY *= -1;
        // sound.play();
      }
    
      ballX += directionX;
      ballY += directionY;
      clearCanvas();
      draw(ballX, ballY);
    
    }, 1);

    buttonStart.setAttribute('disabled', 'disabled');
}

function stop(){
    clearInterval(interval);
    directionX = 0;
    directionY = 0;
    buttonStart.removeAttribute('disabled');
}

draw(ballX, ballY);
start(2, 2);
buttonStart.addEventListener('click', start);
buttonStop.addEventListener('click', stop);

inputs.forEach((input) => {
    input.addEventListener('change', () => {
        stop();
        start(Number(speedX.value), Number(speedY.value));
    })
    console.log(input);
});
