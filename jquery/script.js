$(document).ready(function(){
    console.log("Hola");
    // $() -> Dentro se usan selectores css 
    console.log($("p"));
    console.log($("h1 + p")); 
    
    $("div:has(.highLight)").css("background-color", "yellow");

    $("h1:contains('Title')").addClass("title");

    $(":input").show();

    // $("#sendInfo").on("click", () => {
    //     console.log("enviado");
    // });

    // $("#sendInfo").on("mouseover", () => {
    //     console.log("mouseover");
    // });

    $("#sendInfo").on({ 
        "mouseover": () => {
        console.log("mouseover2");
    },
        "click": () => {
            console.log("click2");
            console.log("");
        }
    });

    // Pasar parametro a un evento
    $("#sendInfo").on("click", {name: "Alvaro"}, test);
    function test (event){
        console.log(event.data.name);
    }

});

// $(document).ready(":O");