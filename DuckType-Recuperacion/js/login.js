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
    conexion.onupgradeneeded = (e) => {
        usuarios = e.target.result;
        console.log("Base de datos creada", usuarios);
        let baseDeDatosUsuarios = usuarios.createObjectStore("usuarios", { keyPath: "email" });
    }

    // 
    conexion.onsuccess = () => {
        usuarios = conexion.result;
        console.log("Base de datos abierta", usuarios);
        // 
        let btnLogin = document.getElementById("btnLogin");
        btnLogin.addEventListener("click", buscarUsuarioEnUsuarios);

    }

    conexion.onerror = (error) => {
        console.log("Error: ", error);
    }
}

//  ------------------------------BASE DE DATOS USUARIO CONECTADO------------------
function crearBaseDeDatosUsuarioConectado() {
    let conexion = indexedDB.open("usuarioConectado", 1);

    // Crea o actualiza la estructura de la base de datos
    conexion.onupgradeneeded = (e) => {
        usuarioConectado = e.target.result;
        console.log("Base de datos creada", usuarioConectado);
        let baseDeDatosUsuarioConectado = usuarioConectado.createObjectStore("usuarioConectado", { keyPath: "email" });
    }

    // 
    conexion.onsuccess = () => {
        usuarioConectado = conexion.result;
        console.log("Base de datos abierta", usuarioConectado);
        leerDatosDelUsuarioDeUsuarioConectado();
    }

    conexion.onerror = (error) => {
        console.log("Error: ", error);
    }
}

// --------------------------ENCRIPTAR CONTRASEÑA----------------------
const SECRET_KEY = "calabaza";

// Función para encriptar texto
function encriptar(text, key) {
    let encriptado = CryptoJS.AES.encrypt(text, key);
    return encriptado.toString();
}

// Función para desencriptar texto
function desencriptar(encryptedText, key) {
    let desencriptado = CryptoJS.AES.decrypt(encryptedText, key);
    return desencriptado.toString(CryptoJS.enc.Utf8);
}

// ----------------------------TOMAR INFORMACION DEL FORMULARIO-----------------------

function datosLoginUsuario() {
    const userEmailLogin = document.getElementById("userEmailLogin");
    const userPasswordLogin = document.getElementById("userPasswordLogin");
    let datosUsuario = new Array();
    datosUsuario.userEmail = userEmailLogin.value;
    datosUsuario.userPassword = userPasswordLogin.value;
    return datosUsuario;
}

// --------------------------FUNCIONES BASE DE DATOS USUARIO----------------------
// Buscamos el usuario, si el usuario existe entonces desencriptamos la contraseña del usuarioDB encontrado y la comparamos con la introducida por el usuarioLogin
function buscarUsuarioEnUsuarios() {
    let datosUsuario = datosLoginUsuario();
    let transaccion = usuarios.transaction(["usuarios"], "readonly");
    let coleccionDeObjetos = transaccion.objectStore("usuarios");
    let conexion = coleccionDeObjetos.get(datosUsuario.userEmail);
    conexion.onsuccess = () => {
        let usuarioRecuperado = conexion.result;
        if(usuarioRecuperado){
            if(comprobarPassword(datosUsuario.userPassword, usuarioRecuperado.password)){
                agregarUsuarioAUsuarioConectado(usuarioRecuperado);
                if(usuarioRecuperado.rol == "admin"){
                    window.location.href = "../pages/admin.html";
                }else if(usuarioRecuperado.rol == "user"){
                    window.location.href = "../pages/userIndex.html";
                }
            }
        }else{
            console.log("El usuario no se encuentra");
        }
    };

}

function comprobarPassword(passwordEntered, databasePassword){
    let databasePasswordDecrypt = desencriptar(databasePassword, SECRET_KEY);
    if(passwordEntered == databasePasswordDecrypt){
        return true;
    }else {
        console.log("Vuelva a escribir la contraseña");
        return false;
    }
}

// --------------------------FUNCIONES BASE DE DATOS USUARIO CONECTADO----------------------
function agregarUsuarioAUsuarioConectado(datosUsuario) {
    let transaccion = usuarioConectado.transaction(["usuarioConectado"], "readwrite");
    let coleccionDeObjetos = transaccion.objectStore("usuarioConectado");
    let conexion = coleccionDeObjetos.add(
        {
            "email": datosUsuario.email,
            "username": datosUsuario.username,
            "password": encriptar(datosUsuario.password, SECRET_KEY),
            "rol": datosUsuario.rol,
            "avatar": datosUsuario.avatar
        }
    );
}
// Comprueba si hay un usuario conectado, si hay un usuario conectado lo manda al inicio dependiendo de su rol
function leerDatosDelUsuarioDeUsuarioConectado(){
    let transaccion = usuarioConectado.transaction(["usuarioConectado"], "readonly");
    let coleccionDeObjetos = transaccion.objectStore("usuarioConectado");
    let conexion = coleccionDeObjetos.openCursor();
    conexion.onsuccess = (e) => {
        let cursor = e.target.result;
        if(cursor){
            console.log(cursor.value);
            if(cursor.value.rol == "admin"){
                window.location.href = "../pages/admin.html"
            }else if(cursor.value.rol == "user"){
                window.location.href = "../pages/userIndex.html"
            }
        }else{
            console.log("No conectados");
        }
    };
}


crearBaseDeDatosUsuarios();
crearBaseDeDatosUsuarioConectado();