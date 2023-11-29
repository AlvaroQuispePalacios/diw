// API
var indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB || window.shimIndexedDB;
// var database = "usersDB";
// const DB_STORE_NAME = 'users';
// const DB_VERSION = 1;
// var db;
// var opened = false;
// const EDIT_USER = "Edit user";
// const NEW_USER = "New user";
// const ADD_USER = "Add user";

let db;
let cajaMostrar;

function iniciarBaseDeDatos(){
    cajaMostrar = document.getElementById('cajaMostrar');

    // Evita el submit
    let form = document.getElementById('form');
    form.addEventListener('submit', (e) => {

        e.preventDefault();
        
        guardarUsuario();

        console.log("Usuario Guardado");
    });


    /* 
        Conexion a la base de datos.
        indexDB.open('NombreBaseDeDatos', Version(Opcional))
    */
    var conexion = indexedDB.open('Alvaro');
    
    conexion.addEventListener('error', mostrarError);
    
    //Si la base de datos existe va ir por aca
    conexion.addEventListener('success', iniciar);

    // Si la base de datos no existe va a ser creada y luego abierta y mostrada por conexion.addEventListener('succes', funcion);
    conexion.addEventListener('upgradeneeded', crearAlmacen);


}

function mostrarError(evento){
    console.log('Tenemos un error: '+ evento.code + ' / ' + evento.message);
}


function iniciar(evento){
    db = evento.target.result;
    console.log("Base de datos fue abierta", db);
    // mostrar();
}


function crearAlmacen(evento){
    var baseDeDatos = evento.target.result;
    console.log("Base de datos fue creada", db);
    var almacen = baseDeDatos.createObjectStore('users', {keyPath: 'email'});
    // almacen.createIndex('username','username', {unique: false});
    // almacen.createIndex('password','password', {unique: false});
    // almacen.createIndex('email','email', {unique: false});

}

let img;
let images = document.getElementById('images');
images.addEventListener('click', (e) => {
    if(e.target.classList.contains('avatar')){
        img = e.target.getAttribute('ruta');
        console.log(img);
    }
});

function guardarUsuario(){

    let username = document.getElementById('username').value;
    let password = document.getElementById('password').value;
    let email = document.getElementById('email').value;
   

    let transaccion = db.transaction(['users'], 'readwrite');
    let almacen = transaccion.objectStore('users');

    almacen.add({
        'username': username,
        'password': password,
        'email': email,
        'image': img
    });

    document.getElementById('username').value = "";
    document.getElementById('password').value = "";
    document.getElementById('password2').value = "";
    document.getElementById('email').value = "";
    
}

/* 

*/
// function mostrar(){
//     cajaMostrar.innerHTML = "";
//     let transaccion = db.transaction(['users']);
//     let almacen = transaccion.objectStore('users');

//     let puntero = almacen.openCursor();
//     puntero.addEventListener('success', mostrarUsuario);

// }

function mostrarUsuario(evento){
    let puntero = evento.target.result;
    if(puntero){
        cajaMostrar.innerHTML = puntero.value.username;
    }
}

// let roles = document.querySelector('.roles');
// console.log(roles);
// roles.addEventListener('click', (e) => {
//     console.log(e.target.classList.contains('option'));
    
// });





window.addEventListener('load', iniciarBaseDeDatos);
