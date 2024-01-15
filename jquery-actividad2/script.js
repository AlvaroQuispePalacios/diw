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

let arrayDesornado = Array(numeroRandom);

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
let arrayCompararCartasContenido = Array(2);
let arrayCompararCartasObjeto = Array(2);



$(".card").each((index, e) => {
    $(e).on("click", () => {
        // Mostrar contenido de la carta
        $(e).find(".card-content").css("opacity", 1);
        arrayCompararCartasContenido[contador] = $(e).find(".card-content").text();
        arrayCompararCartasObjeto[contador] = $(e);
        
        // console.log(arrayCompararCartasObjeto);
        contador++;
        
        // compararCartas(arrayCompararCartasContenido, arrayCompararCartasObjeto);
        
        if(contador > MAX_CARTAS_ELEGIDAS){
            arrayCompararCartasContenido = Array(2);
            arrayCompararCartasObjeto = Array(2);
            contador = 0;
            clearTimeout(esconderCartasContenido);
        }
        
        let esconderCartasContenido = setTimeout(() => {
            arrayCompararCartasObjeto.forEach((e) => {
                $(e).find(".card-content").css("opacity", 0);
            });
        }, 1000);
        // // Correcta
        // if((arrayCompararCartasContenido[0] == arrayCompararCartasContenido[1]) && (arrayCompararCartasObjeto[0] !== arrayCompararCartasObjeto[1])){
        //     setTimeout(() => {
        //         arrayCompararCartasObjeto[0].css("display", "none");
        //         arrayCompararCartasObjeto[1].css("display", "none");
        //     }, 1000)
        //     console.log("Es correcto");
        // };
        
        // if(contador > MAX_CARTAS_ELEGIDAS){
        //     $(".card-content").css("opacity", 0);
        //     arrayCompararCartasContenido = Array(2);
        //     arrayCompararCartasObjeto = Array(2);
        //     contador = 0;
        // }
        // contador++;
        
;
        console.log(arrayCompararCartasContenido);
        
        
    });
});


