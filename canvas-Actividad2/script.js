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
  },
];

let canvas = document.getElementById("canvas");
let ctx;
ctx = canvas.getContext("2d");

// Units
ctx.beginPath();
ctx.moveTo(50, 10);
ctx.lineTo(50, 400);
ctx.fillText("UNITS", 15, 200);
ctx.stroke();


// Products
ctx.beginPath();
ctx.moveTo(50, 400);
ctx.lineTo(450, 400);
ctx.fillText("PRODUCT", 220, 450);
ctx.stroke();


// Products(BASKETBALL)
ctx.beginPath();
ctx.fillText(json[0].product.toUpperCase(), 80, 420);
ctx.stroke();

// RECTANGLE PRODUCT(BASKETBALL)
let grdBasketball = ctx.createLinearGradient(0, 0, 200, 0);
grdBasketball.addColorStop(0, "orange");
grdBasketball.addColorStop(1, "white");
ctx.fillStyle = grdBasketball;
ctx.fillRect(70, 399, 80, -json[0].units);

// Products(BASEBALL)
ctx.fillStyle = "black";
ctx.translate(100, 0);
ctx.beginPath();
ctx.fillText(json[1].product.toUpperCase(), 100, 420);
ctx.stroke();

// RECTANGLE PRODUCT(BASEBALL)
let grdBaseball = ctx.createLinearGradient(0, 0, 200, 0);
grdBaseball.addColorStop(0, "blue");
grdBaseball.addColorStop(1, "white");
ctx.fillStyle = grdBaseball;
ctx.fillRect(90, 399, 80, -json[1].units);

// Products(football)
ctx.fillStyle = "black";
ctx.translate(120, 0);
ctx.beginPath();
ctx.fillText(json[2].product.toUpperCase(), 100, 420);
ctx.stroke();

// RECTANGLE PRODUCT(BASEBALL)
let grdFotball = ctx.createLinearGradient(0, 0, 200, 0);
grdFotball.addColorStop(0, "red");
grdFotball.addColorStop(1, "white");
ctx.fillStyle = grdFotball;
ctx.fillRect(90, 399, 80, -json[2].units);


