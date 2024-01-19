$(document).ready(function () {
    $(".post-it-red").draggable();
    $(".post-it-blue").draggable();
    $("#dialog").dialog();

    $("#crearPost").on("click", () => {
        $(".post-its").append("<div class='square post-it-red'></div>");
        $(".post-it-red").draggable();
        $(".post-it-blue").draggable();
    });


    $("#tableRed").droppable({
        accept: ".post-it-red",
        drop: function () {
            $(this).addClass("post-it-validate ").find("div");
        },
    });

    $("#tableBlue").droppable({
        accept: ".post-it-blue",
        drop: function () {
            $(this).addClass("post-it-validate ").find("div");
        },
    });

});
