// API
var indexedDB =
    window.indexedDB ||
    window.mozIndexedDB ||
    window.webkitIndexedDB ||
    window.msIndexedDB ||
    window.shimIndexedDB;

// Bases de datos 
let usuarios;
let usuarioConectado;

//  ------------------------------BASE DE DATOS USUARIOS------------------
function crearBaseDeDatosUsuarios() {
    let conexion = indexedDB.open("usuarios", 1);

    // Crea o actualiza la estructura de la base de datos
    conexion.onupgradeneeded = (e) =>{
        usuarios = e.target.result;
        console.log("Base de datos creada", usuarios);
        let baseDeDatosUsuarios = usuarios.createObjectStore("usuarios",{keyPath: "email"});
    }

    // 
    conexion.onsuccess = () => {
        usuarios = conexion.result;
        console.log("Base de datos abierta", usuarios);
    }

    conexion.onerror = (error) =>{
        console.log("Error: ", error);
    }
}

//  ------------------------------BASE DE DATOS USUARIO CONECTADO------------------
function crearBaseDeDatosUsuarioConectado(){
    let conexion = indexedDB.open("usuarioConectado", 1);

    // Crea o actualiza la estructura de la base de datos
    conexion.onupgradeneeded = (e) =>{
        usuarioConectado = e.target.result;
        console.log("Base de datos creada", usuarioConectado);
        let baseDeDatosUsuarioConectado = usuarioConectado.createObjectStore("usuarioConectado",{keyPath: "email"});
    }

    // 
    conexion.onsuccess = () => {
        usuarioConectado = conexion.result;
        console.log("Base de datos abierta", usuarioConectado);
    }

    conexion.onerror = (error) =>{
        console.log("Error: ", error);
    }
}

crearBaseDeDatosUsuarios();
crearBaseDeDatosUsuarioConectado();