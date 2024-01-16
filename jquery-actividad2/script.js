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
        $("#game").append(
            `<div class='card'><span class='card-content'></span></div>`
        );
    }
}

let arrayDesornado = [];

function generarContenidoEnCartas(){

    // Genera el contenido del array
    for(let i = 0; i < numeroRandom/2; i++){
        arrayDesornado.push(i+1);
    }
    arrayDesornado.forEach((e) => {
        arrayDesornado.push(e);
    });
    
    // Desordena el array
    arrayDesornado = arrayDesornado.sort(() => {
        return Math.random() - 0.5;
    })
    
    // Ingresa el contenido del array 
    $(".card > span").each((index, e) => {
        $(e).text(arrayDesornado[index]);
        // console.log($(e).val());
    });
    console.log(arrayDesornado);
}

generarNumeroRandom();
generarCantidadCartas();
generarContenidoEnCartas();

const MAX_CARTAS_ELEGIDAS = 2
let contador = 0;
let arrayCompararCartasContenido = [];
let arrayCompararCartasObjeto = [];
let arrayIndex = [];

$(".card").each((index, e) => {
    $(e).on("click", () => {

        if (contador < MAX_CARTAS_ELEGIDAS) {
            arrayCompararCartasContenido[contador] = $(e).find(".card-content").text();
            arrayCompararCartasObjeto[contador] = $(e).find(".card-content"); 
            arrayIndex[contador] = index;
            arrayCompararCartasObjeto[contador].css("opacity", 1);

            contador++;

            if(arrayCompararCartasObjeto.length == 2){
                if((arrayCompararCartasContenido[0] == arrayCompararCartasContenido[1]) && (arrayIndex[0] != arrayIndex[1])){
                    arrayCompararCartasObjeto = [];
                    arrayCompararCartasContenido = [];
                    arrayIndex = [];
                    contador = 0;
                }else{
                    setTimeout(() => {
                        arrayCompararCartasObjeto[0].css("opacity", 0);
                        arrayCompararCartasObjeto[1].css("opacity", 0);
                        arrayCompararCartasObjeto = [];
                        arrayCompararCartasContenido = [];
                        arrayIndex = [];
                        contador = 0;
                     }, 500);
                }
            }

        }
    });
});


