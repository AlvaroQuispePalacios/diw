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
            `<div class='card'><span></span></div>`
        );
    }
}

function generarContenidoEnCartas(){
    let arrayDesornado = Array(numeroRandom);

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

}


generarNumeroRandom();
generarCantidadCartas();
generarContenidoEnCartas();
$(".card ").each((index, e) => {
    $(e).on("click", () => {
        console.log($(e).text());
        // $(e).css("opacity" , 0);
    });
});
