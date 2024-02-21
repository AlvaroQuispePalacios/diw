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
        btnRegistrarUsuario.addEventListener("click", agregarUsuarioAUsuarios);
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
    const userNameRegister = document.getElementById("userNameRegister");
    const userPasswordRegister = document.getElementById("userPasswordRegister");
    const userPassword2Register = document.getElementById("userPassword2Register");
    const userEmailRegister = document.getElementById("userEmailRegister");
    let datosUsuario = new Array();
    datosUsuario.userEmail = userEmailRegister.value;
    datosUsuario.userName = userNameRegister.value;
    datosUsuario.userPassword = userPasswordRegister.value;
    datosUsuario.userPassword2 = userPassword2Register.value;
    datosUsuario.rol = rol;
    datosUsuario.avatar = avatar;
    return datosUsuario;
}
//--------------------------------------------VALIDACION ---------------------------------
function esObligatorio(datoUsuario) {
    if (datoUsuario === null || datoUsuario === undefined || datoUsuario.trim() === "") {
        console.log("Todos los campos son obligatorios");
        return false;
    } else {
        console.log("Esta completo");
    }
    return true;
}

function esEmailValido(datoUsuario) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (esObligatorio(datoUsuario)) {
        if (re.test(datoUsuario.trim())) {
            // muestraCorrecto(input);
            console.log("El email es valido");
            return true;
        } else {
            // let mensaje = `${prenNomInput(input)}  no tiene el formato correcto`;
            // muestraError(input ,mensaje);
            console.log("El email no es valido");
            return false;
        };
    } else {
        return false;
    }
}

function esContrasenyaValida(datoUsuario) {
    // Requisitos: al menos 8 caracteres, una letra minúscula, una letra mayúscula, un número y un carácter especial
    const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]).{8,}$/;

    if (esObligatorio(datoUsuario)) {
        if (re.test(datoUsuario)) {
            console.log("La contraseña es válida");
            return true;
        } else {
            console.log("La contraseña no cumple con los requisitos");
            return false;
        }
    } else {
        return false;
    }
}

function comprobarContrasenyaSonIguales(password, password2) {
    if (esObligatorio(password2)) {
        if (password != password2) {
            // let mensaje = `${prenNomInput(input2)}  tiene que ser iguales ${prenNomInput(input1)}`; 
            // muestraError(input2 ,mensaje);
            console.log("Las contraseñas tienen que ser iguales");
            return false;
        } else {
            console.log("Las contraseñas son iguales");
            return true;
        }
    } else {
        return false;
    }
}

// 
function esValido() {
    let datosUsuario = datosRegistroUsuario();

    let comprobarUsername = esObligatorio(datosUsuario.userName);
    let emailValido = esEmailValido(datosUsuario.userEmail);
    let contrasenyaValida = esContrasenyaValida(datosUsuario.userPassword);
    let contrasenyaSonIguales = comprobarContrasenyaSonIguales(datosUsuario.userPassword, datosUsuario.userPassword2);
    let comprobarRol = esObligatorio(datosUsuario.rol);
    let comprobarAvatar = esObligatorio(datosUsuario.avatar);

    return comprobarUsername && emailValido && contrasenyaValida && contrasenyaSonIguales && comprobarRol && comprobarAvatar;
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


// --------------------------FUNCIONES BASE DE DATOS USUARIO----------------------
// Agrega el usuario el usuario en la base de datos, toma en cuenta si todos los campos del registro estan completos, cumplen con las condiciones puestas a los inputs y verifica que el email no este registrado
function agregarUsuarioAUsuarios() {
    if (esValido()) {
        let datosUsuario = datosRegistroUsuario();
        comprobarEmailRepetido(datosUsuario.userEmail, function (emailRepetido, error) {
            if (error) {
                console.error("Error:", error);
            } else {
                if (emailRepetido) {
                    console.log("El email está repetido.");
                } else {
                    console.log("El email no está repetido.");
                    // let passwordEncriptada = encriptar(datosUsuario.userPassword, SECRET_KEY);

                    let transaccion = usuarios.transaction(["usuarios"], "readwrite");
                    let coleccionDeObjetos = transaccion.objectStore("usuarios");
                    let conexion = coleccionDeObjetos.add(
                        {
                            "email": datosUsuario.userEmail,
                            "username": datosUsuario.userName,
                            "password": encriptar(datosUsuario.userPassword, SECRET_KEY),
                            "rol": datosUsuario.rol,
                            "avatar": datosUsuario.avatar
                        }
                    );
                    // 
                    agregarUsuarioAUsuarioConectado(datosUsuario);
                    // console.log(`Contraseña encriptada ${passwordEncriptada}`);
                    // console.log(`Contraseña desencriptada ${desencriptar(passwordEncriptada, SECRET_KEY)}`);

                    if (datosUsuario.rol == "admin") {
                        window.location.href = "../pages/admin.html";
                    } else if (datosUsuario.rol == "user") {
                        window.location.href = "../pages/userIndex.html";
                    }
                }
            }
        });
    } else {
        console.log("El usuario no se puede agregar");
    }
}

function comprobarEmailRepetido(emailRegister, callback) {
    let transaccion = usuarios.transaction(["usuarios"], "readonly");
    let coleccionDeObjetos = transaccion.objectStore("usuarios");
    let conexion = coleccionDeObjetos.openCursor(emailRegister);

    conexion.onsuccess = (e) => {
        let cursor = e.target.result;
        if (cursor) {
            // Se encontro el email
            callback(true);
        } else {
            // No se encontro el email
            callback(false);
        }
    }

    conexion.onerror = (e) => {
        console.error("Error al comprobar email repetido:", e.target.error);
        callback(null, e.target.error);
    };
}


// --------------------------FUNCIONES BASE DE DATOS USUARIO CONECTADO----------------------
function agregarUsuarioAUsuarioConectado(datosUsuario) {
    let transaccion = usuarioConectado.transaction(["usuarioConectado"], "readwrite");
    let coleccionDeObjetos = transaccion.objectStore("usuarioConectado");
    let conexion = coleccionDeObjetos.add(
        {
            "email": datosUsuario.userEmail,
            "username": datosUsuario.userName,
            "password": encriptar(datosUsuario.userPassword, SECRET_KEY),
            "rol": datosUsuario.rol,
            "avatar": datosUsuario.avatar
        }
    );
}

function leerDatosDelUsuarioDeUsuarioConectado() {
    let transaccion = usuarioConectado.transaction(["usuarioConectado"], "readonly");
    let coleccionDeObjetos = transaccion.objectStore("usuarioConectado");
    let conexion = coleccionDeObjetos.openCursor();
    conexion.onsuccess = (e) => {
        let cursor = e.target.result;
        if (cursor) {
            console.log(cursor.value);
            if (cursor.value.rol == "admin") {
                window.location.href = "../pages/admin.html"
            } else if (cursor.value.rol == "user") {
                window.location.href = "../pages/userIndex.html"
            }
        } else {
            console.log("No conectados");
        }
    };
}


crearBaseDeDatosUsuarios();
crearBaseDeDatosUsuarioConectado();