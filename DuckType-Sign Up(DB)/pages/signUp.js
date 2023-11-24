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

function iniciarBaseDeDatos(){

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
}


function crearAlmacen(evento){
    var baseDeDatos = evento.target.result;
    console.log("Base de datos fue creada", db);
    var almacen = baseDeDatos.createObjectStore('users', {keyPath: 'users'});
    almacen.createIndex('username','username', {unique: false});
    almacen.createIndex('password','password', {unique: false});
    almacen.createIndex('email','email', {unique: false});

}

window.addEventListener('load', iniciarBaseDeDatos);
