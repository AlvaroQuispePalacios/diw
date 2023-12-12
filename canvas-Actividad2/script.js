let json = [
  {
    product: "Basketballs",
    units: 150,
  },
  {
    product: "Baseballs",
    units: 125,
  },
  {
    product: "Footballs",
    units: 300,
  }
];

let canvas = document.getElementById('canvas');
let ctx;
ctx = canvas.getContext('2d');

// Units
ctx.beginPath();
ctx.moveTo(50, 10);
ctx.lineTo(50, 400);
ctx.fillText("units",25, 200);
ctx.stroke();

// Products
ctx.beginPath();
ctx.moveTo(50,400);
ctx.lineTo(450,400);
ctx.fillText("products",140, 150);
ctx.stroke();