$(document).ready(function () {

    let contadorId = 0;
    let contadorPostItRed = 0;
    let contadorPostItBlue = 0;

    function getRandom(){
        return Math.floor(Math.random() * (2 - 1 + 1) + 1);
    }

    // Crear Post-It
    $("#crearPost").on("click", () => {
        let numeroRandom = getRandom();
        if(numeroRandom == 1){
            $(".post-its").append(`<div class='square post-it-red' id=postIt${contadorId}></div>`);
        }else if ( numeroRandom == 2){
            $(".post-its").append(`<div class='square post-it-blue' id=postIt${contadorId}></div>`)
        }
        console.log(contadorId);
        $(`#postIt${contadorId}`).draggable().data("contado", false);
        contadorId++;
        // $(".post-it-blue").draggable();
    });

    
    $("#tableRed").on("click", () => {
        console.log("hola");
    });

    $("#tableRed").droppable({
        accept: ".post-it-red",
        drop: function (event, e) {
            // Verificar si el elemento esta contado
            if(e.draggable.data("contado") == false){
                e.draggable.removeData("contado");
                e.draggable.data("contado", true);
                contadorPostItRed++;
            }
            $(this).text(contadorPostItRed);
        },
    });

    $("#tableBlue").droppable({
        accept: ".post-it-blue",
        drop: function (event, e) {
            // Verificar si el elemento esta contado
            if(e.draggable.data("contado") == false){
                e.draggable.removeData("contado");
                e.draggable.data("contado", true);
                contadorPostItBlue++;
            }
            $(this).text(contadorPostItBlue);
        },
    });

});
