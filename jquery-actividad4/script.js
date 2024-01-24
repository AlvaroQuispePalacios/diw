$(document).ready(function () {
    $("#prueba").draggable();
    let contadorId = 0;
    let contadorPostItRed = 0;
    let contadorPostItBlue = 0;

    function getRandom() {
        return Math.floor(Math.random() * (2 - 1 + 1) + 1);
    }


    // Crear Post-It
    $("#crearPost").on("click", () => {
        console.log("Post-it creado");
        let numeroRandom = getRandom();

        if (numeroRandom == 1) {
            $(".post-its")
                .append(`<div class="square post-it-red" id="postIt${contadorId}">
            <section class="post-it-menu">
                <h4 class="post-it-menu-title">Post-it</h4>
                <article class="post-it-menu-actions">
                    <button>#</button>
                    <button onclick="callClosePostIt(${contadorId})">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" width="12px" height="12px"><path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"/></svg>
                    </button>
                </article>
            </section>
            <section class="post-it-content">
                <textarea></textarea>
            </section>
        </div>`);
        } else if (numeroRandom == 2) {
            $(".post-its").append(
                `<div class='square post-it-blue' id=postIt${contadorId}></div>`
            );
        }

        $(`#postIt${contadorId}`).draggable().data("contado", false);

        contadorId++;
    });

    $("#tableRed").droppable({
        accept: ".post-it-red",
        drop: function (event, e) {
            // Verificar si el elemento esta contado
            if (e.draggable.data("contado") == false) {
                e.draggable.removeData("contado");
                e.draggable.data("contado", true);
                contadorPostItRed++;
            }
            $(this).text("Post-Its: " + contadorPostItRed);
        },
        out: function (event, e) {
            if (e.draggable.data("contado") == true) {
                e.draggable.removeData("contado");
                e.draggable.data("contado", false);
                contadorPostItRed--;
            }
            $(this).text("Post-Its: " + contadorPostItRed);
        },
    });

    $("#tableBlue").droppable({
        accept: ".post-it-blue",
        drop: function (event, e) {
            // Verificar si el elemento esta contado
            if (e.draggable.data("contado") == false) {
                e.draggable.removeData("contado");
                e.draggable.data("contado", true);
                contadorPostItBlue++;
            }
            $(this).text("Post-Its: " + contadorPostItBlue);
        },
        out: function (event, e) {
            if (e.draggable.data("contado") == true) {
                e.draggable.removeData("contado");
                e.draggable.data("contado", false);
                contadorPostItBlue--;
            }
            $(this).text("Post-Its: " + contadorPostItBlue);
        },
    });
});


function callClosePostIt(idPostIt){
    // console.log(idPostIt);
    $("#postIt"+idPostIt).hide();
}