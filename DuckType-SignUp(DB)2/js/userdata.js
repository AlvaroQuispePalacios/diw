let db;
let usuarioConectado;

const userImg = document.querySelector("#userImg");
const userName = document.querySelector("#userName");
const logOut = document.querySelector("#logOut");
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
        obtenerUsuarios();
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


function obtenerUsuarios() {
    let transaccion = db.transaction(["users"], "readonly");
    let almacen = transaccion.objectStore("users");
    let conexion = almacen.openCursor();

    conexion.onsuccess = (e) => {
        let cursor = e.target.result;
        if (cursor) {
            console.log(cursor);
            cursor.continue();
        }
    };
}

window.addEventListener("load", () => {
    iniciarBaseDeDatos();
    iniciardbUsuarioConectado();
});