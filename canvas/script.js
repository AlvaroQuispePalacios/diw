let canvas = document.querySelector('#canvas');
let context;
context = canvas.getContext('2d');

// canvas.width = window.innerWidth - 100;
// context.fillRect(0, 0, 100, 50); // x, y , width, height
// context.strokeStyle = "red";

// context.strokeRect(100, 50, 100, 50);
// context.strokeStyle = "blue";
// context.translate(100, 0);
// context.strokeRect(0, 0, 100, 50);

context.beginPath();
context.moveTo(0, 0);
context.lineTo(200, 200);
context.stroke();//pintar