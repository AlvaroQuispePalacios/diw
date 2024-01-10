const MAX_CARDS = 20;
const MIN_CARDS = 6;
let numeroRandom;
let cantidadCartas;

function generarCantidadCartas(){
    numeroRandom = Math.floor(Math.random() * (MAX_CARDS - MIN_CARDS) + MIN_CARDS);
    if(numeroRandom % 2 == 0){
        cantidadCartas = Array(numeroRandom);
    }else {
        generarCantidadCartas();
    }
}

function generarContenidoEnCartas(){
    
}



generarCantidadCartas();
console.log(numeroRandom);