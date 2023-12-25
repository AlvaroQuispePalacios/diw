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
        let btnRegistrarUsuario = document.getElementById("btnRegistrarUsuario");
        btnRegistrarUsuario.addEventListener("click", agregarUsuario);
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
    }

    conexion.onerror = (error) => {
        console.log("Error: ", error);
    }
}

// ----------------------------TOMAR INFORMACION DEL FORMULARIO-----------------------
// Recoge la informacion del usuario en el register
const roles = document.getElementById("roles");
const images = document.getElementById("images");
let rol;
let avatar;

roles.addEventListener("click", (e) => {
    if (e.target.value == "admin") {
        rol = "admin";
    } else if (e.target.value == "user") {
        rol = "user";
    }
});

images.addEventListener("click", (e) => {
    if (e.target.classList.contains("avatar")) {
        avatar = e.target.getAttribute("ruta");
    }
});

function datosRegistroUsuario() {
    const userName = document.getElementById("userName");
    const userPassword = document.getElementById("userPassword");
    const userPassword2 = document.getElementById("userPassword2");
    const userEmail = document.getElementById("userEmail");
    let datosUsuario = new Array();
    datosUsuario.userEmail = userEmail.value;
    datosUsuario.userName = userName.value;
    datosUsuario.userPassword = userPassword.value;
    datosUsuario.userPassword2 = userPassword2.value;
    datosUsuario.rol = rol;
    datosUsuario.avatar = avatar;
    return datosUsuario;
}
//--------------------------------------------VALIDACION ---------------------------------
function esObligatorio(datoUsuario) {
    if (datoUsuario === null || datoUsuario === undefined || datoUsuario.trim() === "") {
        console.log("Todos los campos son obligatorios");
        return false;
    }else{
        console.log("Esta completo");
    }
    return true;
}

function esEmailValido(datoUsuario) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if(esObligatorio(datoUsuario)){
        if(re.test(datoUsuario.trim())) {
            // muestraCorrecto(input);
            console.log("El email es valido");
            return true;
        } else{
            // let mensaje = `${prenNomInput(input)}  no tiene el formato correcto`;
            // muestraError(input ,mensaje);
            console.log("El email no es valido");
            return false;
        };
    }else{
        return false;
    }
}

function esContrasenyaValida(datoUsuario) {
    // Requisitos: al menos 8 caracteres, una letra minúscula, una letra mayúscula, un número y un carácter especial
    const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]).{8,}$/;

    if(esObligatorio(datoUsuario)){
        if (re.test(datoUsuario)) {
            console.log("La contraseña es válida");
            return true;
        } else {
            console.log("La contraseña no cumple con los requisitos");
            return false;
        }
    }else{
        return false;
    }
}

function comprobarContrasenyaSonIguales(password, password2){
    if(esObligatorio(password2)){
        if(password != password2){
            // let mensaje = `${prenNomInput(input2)}  tiene que ser iguales ${prenNomInput(input1)}`; 
            // muestraError(input2 ,mensaje);
            console.log("Las contraseñas tienen que ser iguales");
            return false;
        }else{
            console.log("Las contraseñas son iguales");
            return true;
        }
    }else{
        return false;
    }
}

// 
function esValido(){
    let datosUsuario = datosRegistroUsuario();

    let comprobarUsername = esObligatorio(datosUsuario.userName);
    let emailValido = esEmailValido(datosUsuario.userEmail);
    let contrasenyaValida = esContrasenyaValida(datosUsuario.userPassword);
    let contrasenyaSonIguales = comprobarContrasenyaSonIguales(datosUsuario.userPassword, datosUsuario.userPassword2);
    let comprobarRol = esObligatorio(datosUsuario.rol);
    let comprobarAvatar = esObligatorio(datosUsuario.avatar);

    return comprobarUsername && emailValido && contrasenyaValida && contrasenyaSonIguales && comprobarRol && comprobarAvatar;
}

// --------------------------FUNCIONES BASE DE DATOS USUARIO----------------------

// Agrega el usuario el usuario en la base de datos
function agregarUsuario() {
    if(esValido()){
        /* 
        25-12-2023
        Creado
        - crearBasesDeDatos.js
        - register.js
        Hecho
        - Crear base de datos en index y sign-up 
        - sign-up Se crea la validacion de formulario
        Para 26-12-2023
        Intentar
        - Agregar el usuario registrado a la base de datos usuarios y usuario conectado
        - Mostrar informacion del lado del usuario y mostrar los usuarios al administrador
        - Hacer el logOut
        */
        let datosUsuario = datosRegistroUsuario();
        let datosUsuarioKeys = Object.keys(datosUsuario);
        datosUsuarioKeys.forEach((e) => {
            let datoUsuario = datosUsuario[e];
            console.log('Clave: ' + e + ', Valor: ' + datoUsuario);
    
        });
        let boolean = esValido();
        console.log(boolean);
        // Agregar la validación del formulario Aquí
        // console.log(datosUsuario.userEmail);
    }
}
crearBaseDeDatosUsuarios();
crearBaseDeDatosUsuarioConectado();