let contadorId = 0;
let contadorPostItRed = 0;
let contadorPostItBlue = 0;

function getRandom() {
    return Math.floor(Math.random() * (2 - 1 + 1) + 1);
}

// Funcion que crea postIts de forma aleatoria
function createPostIt() {
    let numberRandom = getRandom();
    let postItColor;
    if(numberRandom == 1){
        postItColor = "red";
    }else if(numberRandom == 2){
        postItColor = "blue";
    }
    return `
        <div class="square post-it-${postItColor}" id="postIt${contadorId}">
            <section class="post-it-menu">
                <h4 class="post-it-menu-title">Post-it</h4>
                <article class="post-it-menu-actions">
                    <button onclick="maximizePostIt(${contadorId})">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="12px" height="12px"><path d="M.3 89.5C.1 91.6 0 93.8 0 96V224 416c0 35.3 28.7 64 64 64l384 0c35.3 0 64-28.7 64-64V224 96c0-35.3-28.7-64-64-64H64c-2.2 0-4.4 .1-6.5 .3c-9.2 .9-17.8 3.8-25.5 8.2C21.8 46.5 13.4 55.1 7.7 65.5c-3.9 7.3-6.5 15.4-7.4 24zM48 224H464l0 192c0 8.8-7.2 16-16 16L64 432c-8.8 0-16-7.2-16-16l0-192z"/></svg>
                    </button>
                    <button onclick="minimizePostIt(${contadorId})">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="12px" height="12px"><path d="M32 416c-17.7 0-32 14.3-32 32s14.3 32 32 32H480c17.7 0 32-14.3 32-32s-14.3-32-32-32H32z"/></svg>
                    </button>
                    <button onclick="callPopUpClosePostIt(${contadorId})">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" width="12px" height="12px"><path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"/></svg>
                    </button>
                </article>
            </section>
            <section class="post-it-content">
                <textarea></textarea>
            </section>
        </div>`
    ;
}

function minimizePostIt(idPostIt){
    $("#postIt" + idPostIt + "> .post-it-content").hide();
}

function maximizePostIt(idPostIt){
    $("#postIt" + idPostIt + "> .post-it-content").show();
}

function callPopUpClosePostIt(idPostIt) {
    $(".envoltorio-popup").show();

    $("#deletePostIt").on("click", () => {
        if ($("#postIt" + idPostIt).hasClass("post-it-red")) {
            if ((contadorPostItRed > 0) && ($("#postIt"+idPostIt).data("contado") == true)) {
                contadorPostItRed--;
            }
        } else if ($("#postIt" + idPostIt).hasClass("post-it-blue")) {
            if ((contadorPostItBlue > 0) && (($("#postIt"+idPostIt).data("contado") == true))) {
                contadorPostItBlue--;
            }
        }
        $("#tableRed").text("Post-Its: " + contadorPostItRed);
        $("#tableBlue").text("Post-Its: " + contadorPostItBlue);

        $("#postIt" + idPostIt).remove();
        $(".envoltorio-popup").hide();
    });
}

$(".cerrar-popup").on("click", () => {
    $(".envoltorio-popup").hide();
});

$("#closePopup").on("click", () => {
    $(".envoltorio-popup").hide();
});

// Crear Post-It
$("#crearPost").on("click", () => {
    $(".post-its").append(createPostIt());
    $(`#postIt${contadorId}`).draggable().data("contado", false);

    contadorId++;
});

// Contenedores de los post-Its

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
            if(contadorPostItRed > 0){
                contadorPostItRed--;
            }
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
            if(contadorPostItBlue > 0){
                contadorPostItBlue--;
            }
        }
        $(this).text("Post-Its: " + contadorPostItBlue);
    },
});
