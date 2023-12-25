let db;
let usuarioConectado;

const userImg = document.querySelector(".userImg");
const userName = document.querySelector("#userName");
const logOut = document.querySelector("#logOut");
const userImageCard = document.querySelector('.userImageCard');
const userUsernameCard = document.querySelector('.userUsernameCard');
const guardarCambiosUsuario = document.querySelector('.guardarCambiosUsuario');

const envoltorio = document.querySelector('.envoltorio-popup');
const cerrar = document.querySelector('.cerrar-popup');

//click sobre el boton para cerrar el pop-up
cerrar.addEventListener('click', () => {
    envoltorio.style.display = "none";
});

//click sobre el envoltorio cerrar el popup

envoltorio.addEventListener('click', () => {
    envoltorio.style.display = "none";
});

let contador = 0;

// --------------------------------INICIAR BASES DE DATOS------------------------------
// BASE DE DATOS ALVARO
function iniciarBaseDeDatos() {
    /* 
          Conexion a la base de datos.
          indexDB.open('NombreBaseDeDatos', Version(Opcional))
              */
    var conexion = indexedDB.open("Alvaro");

    conexion.addEventListener("error", mostrarError);

    //Si la base de datos existe va ir por aca
    conexion.addEventListener("success", (evento) => {
        iniciar(evento);
        // obtenerUsuarios();
    });
}

function mostrarError(evento) {
    console.log("Tenemos un error: " + evento.code + " / " + evento.message);
}

function iniciar(evento) {
    db = evento.target.result;
    console.log("Base de datos fue abierta", db);
}

// BASE DE DATOS USUARIO CONECTADO
function iniciardbUsuarioConectado() {
    /* 
          Conexion a la base de datos.
          indexDB.open('NombreBaseDeDatos', Version(Opcional))
      */
    let conexion = indexedDB.open("UsuarioConectado");

    conexion.addEventListener("error", mostrarErrorUsuarioConectado);

    //Si la base de datos existe va ir por aca
    conexion.addEventListener("success", (evento) => {
        iniciarUsuarioConectado(evento);
        comprobarUsuarioConectado();
        // emailUsuario = obtenerEmailUsuarioConectado();
        obtenerEmailUsuarioConectado();

    });

    // Si la base de datos no existe va a ser creada y luego abierta y mostrada por conexion.addEventListener('succes', funcion);
    // conexion.addEventListener("upgradeneeded", crearAlmacenUsuarioConectado);
}

function mostrarErrorUsuarioConectado(evento) {
    console.log("Tenemos un error: " + evento.code + " / " + evento.message);
}

function iniciarUsuarioConectado(evento) {
    dbUsuarioConectado = evento.target.result;
    console.log("Base de datos fue abierta", dbUsuarioConectado);
}

// ------------------------------------------------------

function comprobarUsuarioConectado() {
    let transaccion = dbUsuarioConectado.transaction(
        ["usuarioConectado"],
        "readonly"
    );
    let almacen = transaccion.objectStore("usuarioConectado");

    let conexion = almacen.openCursor();
    conexion.onsuccess = (e) => {
        let cursor = e.target.result;
        if (cursor) {
            contador = 1;
        }

        if (contador == 1) {
            userName.textContent = cursor.value.username;
            userImg.setAttribute("src", cursor.value.image);
        } else {
            location.href = "/DuckType-SignUp(DB)/index.html";
        }
    };
}

function usuarioLogOut() {
    let transaccion = dbUsuarioConectado.transaction(
        ["usuarioConectado"],
        "readwrite"
    );
    let almacen = transaccion.objectStore("usuarioConectado");
    let conexion = almacen.clear();
    contador = 0;
}

logOut.addEventListener("click", usuarioLogOut);

// Estas dos funciones
function obtenerEmailUsuarioConectado() {
    let transaccion = dbUsuarioConectado.transaction(
        ["usuarioConectado"],
        "readonly"
    );
    let almacen = transaccion.objectStore("usuarioConectado");
    let conexion = almacen.openCursor();
    conexion.onsuccess = (e) => {
        let cursor = e.target.result;
        if (cursor) {
            obtenerDatosUsuarioConectado(cursor.value.email);
        }
    };
}

function obtenerDatosUsuarioConectado(email) {
    let userEmail = document.querySelector('.userEmail');
    let userUserName = document.querySelector('.userUserName');
    let userUserImage = document.querySelector('.userUserImage');
    let userRol = document.querySelector('.userRol');
    let userPassword = document.querySelector('.userPassword');

    let transaccion = dbUsuarioConectado.transaction(["usuarioConectado"], "readonly");
    let almacen = transaccion.objectStore("usuarioConectado");
    let conexion = almacen.openCursor();

    conexion.onsuccess = (e) => {
        let cursor = e.target.result;
        if (cursor) {
            if (cursor.value.email == email) {
                userEmail.value = cursor.value.email;
                userUserName.value = cursor.value.username;
                userUserImage.value = cursor.value.image;
                userRol.value = cursor.value.rol;
                userPassword.value = cursor.value.password;
                userImageCard.setAttribute('src', cursor.value.image);
                userUsernameCard.textContent = cursor.value.username;
                console.log(email);
            }
            cursor.continue();
        }
    };

}


guardarCambiosUsuario.addEventListener('click', () => {
    let userEmail = document.querySelector('.userEmail');
    let userUserName = document.querySelector('.userUserName');
    let userUserImage = document.querySelector('.userUserImage');
    let userRol = document.querySelector('.userRol');
    let userPassword = document.querySelector('.userPassword');

    let transaccion = db.transaction(["users"], "readwrite");
    let almacen = transaccion.objectStore("users");

    almacen.put({
        email: userEmail.value,
        image: userUserImage.value,
        password: userPassword.value,
        rol: userRol.value,
        username: userUserName.value,
    });

    // userEmail.value = "";
    // userEmail.textContent = "";

    // userUserName.value = "";
    // userUserName.textContent = "";

    // userUserImage.value = "";
    // userUserImage.textContent = "";

    // userRol.value = "";
    // userRol.textContent = "";
    
    // userPassword.value = "";
    // userPassword.textContent = "";

});



window.addEventListener("load", () => {
    iniciarBaseDeDatos();
    iniciardbUsuarioConectado();
});