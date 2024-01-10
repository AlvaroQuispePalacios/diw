const MAX_CARDS = 20;
const MIN_CARDS = 6;
let numeroRandom;
let cantidadCartas;

function generarNumeroRandom(){
    numeroRandom = Math.floor(Math.random() * (MAX_CARDS - MIN_CARDS) + MIN_CARDS);
    if(numeroRandom % 2 !== 0){
        generarNumeroRandom();
    }
}

function generarCantidadCartas(){
    for(let i = 0; i < numeroRandom; i++){
        $("#game").append("<div class='card'></div>");

    }
}

function generarContenidoEnCartas(){
    
}



generarNumeroRandom();
generarCantidadCartas();
console.log(numeroRandom);