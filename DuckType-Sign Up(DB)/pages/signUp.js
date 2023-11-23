var indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB || window.shimIndexedDB;
// var database = "usersDB";
// const DB_STORE_NAME = 'users';
// const DB_VERSION = 1;
// var db;
// var opened = false;
// const EDIT_USER = "Edit user";
// const NEW_USER = "New user";
// const ADD_USER = "Add user";

var db;

function iniciarBaseDeDatos(){
    // Poner nombre a la base da datos
    var solicitud = indexedDB.open('Alvaro');

    solicitud.addEventListener('error', mostrarError);
    solicitud.addEventListener('success', iniciar);
    solicitud.addEventListener('upgradeneeded', crearAlmacen);


}

function mostrarError(evento){
    console.log('Tenemos un error: '+ evento.code + ' / ' + evento.message);
}

function iniciar(evento){
    db = evento.target.result;
}

function crearAlmacen(evento){
    var baseDeDatos = evento.target.result;
    var almacen = baseDeDatos.createObjectStore('users', {keyPath: 'id'});
    almacen.createIndex('username','username', {unique: false});
    almacen.createIndex('password','password', {unique: false});
    almacen.createIndex('email','email', {unique: false});

}

window.addEventListener('load', iniciarBaseDeDatos);
