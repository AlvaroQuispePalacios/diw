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
let password2 = document.getElementById('password2');
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
        window.location.href = "/DuckType-SignUp(DB)2/pages/admin.html";
    }else if(rol == 'user'){
        window.location.href = '/DuckType-SignUp(DB)2/pages/user.html';
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

function esObligatorio(inputArray){

    inputArray.forEach((input) => {
        if(input.value.trim() === ''){
            muestraError(input,`${prenNomInput(input)} es obligatorio` );
        } else {
            muestraCorrecto(input);
        }

    });
}

function compruebaLongitud(input, min, max){
    if(input.value.length < min){
        muestraError(input, `tiene que tener un minimo de ${min} caracteres`);
    }else if (input.value.length > max) {
        muestraError(input, `tiene que tener un max de ${max} caracteres`);
    }else {
        muestraCorrecto(input);
    }
}

function esEmailValido(input){
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;


    if(re.test(input.value.trim())) {
        muestraCorrecto(input);

    } else{
        
        let mensaje = `${prenNomInput(input)}  no tiene el formato correcto`;
        muestraError(input ,mensaje);
    };
}

function comprobarContrasenyaSonIguales(input1, input2){
    if(input1.value != input2.value){
        let mensaje = `${prenNomInput(input2)}  tiene que ser iguales ${prenNomInput(input1)}`; 
        muestraError(input2 ,mensaje);
    }else{
        muestraCorrecto(input2);
    }
}

function muestraError(input , mensaje){

    // Guarda el padre del elemento, en este caso accedemos al padre de nombreusuario el cual es form-control
    const formularioControl = input.parentElement;
    //Le da el nombre a su clase como .form-control.error
    formularioControl.className = 'formulario-control error';
    const label = formularioControl.querySelector('label');
    const small = formularioControl.querySelector('small');
    small.innerText = label.innerText + ' ' + mensaje;

}


function muestraCorrecto(input){
    const formularioControl = input.parentElement;
    formularioControl.className = 'formulario-control correcto';
}

function prenNomInput(input){
    return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}


let form = document.getElementById("form");

form.addEventListener("submit", (e) => {
    e.preventDefault();
    // 
    esObligatorio([username, email, password, password2])
    
    compruebaLongitud(username, 3, 15);
    compruebaLongitud(password, 6, 25);
    
    esEmailValido(email);
    comprobarContrasenyaSonIguales(password, password2);

    guardarUsuario();
    console.log("Usuario Guardado");
});


window.addEventListener("load", () => {
    iniciarBaseDeDatos();
    iniciardbUsuarioConectado();
});
