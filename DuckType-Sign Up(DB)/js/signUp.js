// API
var indexedDB =
    window.indexedDB ||
    window.mozIndexedDB ||
    window.webkitIndexedDB ||
    window.msIndexedDB ||
    window.shimIndexedDB;
// var database = "usersDB";
// const DB_STORE_NAME = 'users';
// const DB_VERSION = 1;
// var db;
// var opened = false;
// const EDIT_USER = "Edit user";
// const NEW_USER = "New user";
// const ADD_USER = "Add user";

let saluda = "hola";

let db;
let dbUsuarioConectado;

let cajaMostrar;
let usuarioLogin;

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
    conexion.addEventListener("upgradeneeded", crearAlmacenUsuarioConectado);

}

function mostrarErrorUsuarioConectado(evento) {
    console.log("Tenemos un error: " + evento.code + " / " + evento.message);
}

function iniciarUsuarioConectado(evento) {
    dbUsuarioConectado = evento.target.result;
    console.log("Base de datos fue abierta", dbUsuarioConectado);
    // mostrar();
}

function crearAlmacenUsuarioConectado(evento) {
    let baseDeDatos = evento.target.result;
    console.log("Base de datos fue creada", dbUsuarioConectado);
    let almacen = baseDeDatos.createObjectStore("usuarioConectado", { keyPath: "email" });

}

// -------------------------------------------------

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

    // Si la base de datos no existe va a ser creada y luego abierta y mostrada por conexion.addEventListener('succes', funcion);
    conexion.addEventListener("upgradeneeded", crearAlmacen);

}

function mostrarError(evento) {
    console.log("Tenemos un error: " + evento.code + " / " + evento.message);
}

function iniciar(evento) {
    db = evento.target.result;
    console.log("Base de datos fue abierta", db);
    // mostrar();
}

function crearAlmacen(evento) {
    var baseDeDatos = evento.target.result;
    console.log("Base de datos fue creada", db);
    var almacen = baseDeDatos.createObjectStore("users", { keyPath: "email" });
    // almacen.createIndex('username','username', {unique: false});
    // almacen.createIndex('password','password', {unique: false});
    // almacen.createIndex('email','email', {unique: false});
}

let username = document.getElementById("username");
let password = document.getElementById("password");
let email = document.getElementById("email");
let img;
let rol;

let images = document.getElementById("images");
images.addEventListener("click", (e) => {
    if (e.target.classList.contains("avatar")) {
        img = e.target.getAttribute("ruta");
        console.log(img);
    }
});

let roles = document.getElementById("roles");
roles.addEventListener("click", (e) => {
    if (e.target.value == "admin") {
        rol = "admin";
        console.log(rol);
    } else if (e.target.value == "user") {
        rol = "user";
        console.log(rol);
    }
});


function guardarUsuario() {

    let transaccion = db.transaction(["users"], "readwrite");
    let almacen = transaccion.objectStore("users");

    almacen.add({
        'username': username.value,
        'password': password.value,
        'email': email.value,
        'image': img,
        'rol': rol
    });

    let transaccion2 = dbUsuarioConectado.transaction(['usuarioConectado'], 'readwrite');
    let almacen2 = transaccion2.objectStore('usuarioConectado');

    almacen2.add({
        'username': username.value,
        'password': password.value,
        'email': email.value,
        'image': img,
        'rol': rol
    });


    if(rol == 'admin'){
        location.href = '/DuckType-Sign Up(DB)/pages/admin.html';
    }else if(rol == 'user'){
        location.href = '/DuckType-Sign Up(DB)/pages/user.html';
    }

    document.getElementById("username").value = "";
    document.getElementById("password").value = "";
    document.getElementById("password2").value = "";
    document.getElementById("email").value = "";
}

function comprobarUsuarioConectado(){

    let transaccion = dbUsuarioConectado.transaction(["usuarioConectado"], "readonly");
    let almacen = transaccion.objectStore("usuarioConectado");
    let conexion = almacen.openCursor();

    console.log('Usuario Conectado');

    conexion.onsuccess = (e) => {
        let cursor = e.target.result;

        if (cursor) {
            console.log(cursor.value);
            cursor.continue();
        } else {
            console.log("D:");
        }
    };

}
/* 
 
*/
function obtenerUsuarios() {
    let transaccion = db.transaction(["users"], "readonly");
    let almacen = transaccion.objectStore("users");
    let conexion = almacen.openCursor();

    conexion.onsuccess = (e) => {
        let cursor = e.target.result;

        if (cursor) {
            // console.log(cursor.value.email);
            console.log(cursor.value);
            cursor.continue();
        } else {
            console.log("D:");
        }
    };
}

function actualizarUsuario(objeto) {
    let transaccion = db.transaction(["users"], "readwrite");
    let almacen = transaccion.objectStore("users");
    let conexion = almacen.put(objeto);

    conexion.onsuccess = () => {
        obtenerUsuarios();
    };
}


window.addEventListener("load", () => {
    iniciarBaseDeDatos();
    iniciardbUsuarioConectado();
});

let form = document.getElementById("form");
form.addEventListener("submit", (e) => {
    e.preventDefault();
    // 
    guardarUsuario();

    console.log("Usuario Guardado");
});

