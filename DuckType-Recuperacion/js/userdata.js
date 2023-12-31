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

// -----------------------------------------------------------------------------------------------
function mostrarInformacionDelUsuarioEnLaWeb(objectUser) {
    //--------------------- HEADER-----------------------
    let userNameWeb = document.getElementById("userNameWeb");
    let userAvatarWeb = document.getElementById("userAvatarWeb");
    userNameWeb.textContent = objectUser.username;
    userAvatarWeb.setAttribute("src", objectUser.avatar);
    //--------------------- BODY ------------------------
    // CARD
    let usernameCard = document.getElementById("usernameCard");
    let userImageCard = document.getElementById("userImageCard");
    usernameCard.textContent = objectUser.username;
    userImageCard.setAttribute("src", objectUser.avatar);
    // FORM (Mostrar Informacion)
    let userDataEmailForm = document.getElementById("userDataEmailForm");
    let userDataUsernameForm = document.getElementById("userDataUsernameForm");
    let userDataAvatarForm = document.getElementById("userDataAvatarForm");
    let userDataRolForm = document.getElementById("userDataRolForm");
    let userDataPasswordForm = document.getElementById("userDataPasswordForm");
    userDataEmailForm.value = objectUser.email;
    userDataUsernameForm.value = objectUser.username;
    userDataAvatarForm.value = objectUser.avatar;
    userDataRolForm.value = objectUser.rol;
    userDataPasswordForm.value = desencriptar(objectUser.password, SECRET_KEY);
    // FORM (EDITAR INFORMACION)
    let userDataEmailEdit = document.getElementById("userDataEmailEdit");
    let userDataUsernameEdit = document.getElementById("userDataUsernameEdit");
    let userDataPasswordEdit = document.getElementById("userDataPasswordEdit");
    let userDataRolEdit = document.getElementById("userDataRolEdit");
    let userDataAvatarEdit = document.getElementById("userDataAvatarEdit");
    userDataEmailEdit.value = objectUser.email;
    userDataUsernameEdit.value = objectUser.username;
    userDataPasswordEdit.value = desencriptar(objectUser.password, SECRET_KEY);
    userDataRolEdit.value = objectUser.rol;
    userDataAvatarEdit.value = objectUser.avatar;

    // Falta agregar los settings que el usuario pueda modificar sus datos
}

// ----------------------------TOMAR INFORMACION DEL FORMULARIO PARA ACTUALIZAR LOS DATOS-----------------------
// Recoge la informacion del usuario en el register

// Toma la informacion del formulario donde se actualizara los datos del usuario
function datosActualizarInformacion() {
    let userDataUsernameEdit = document.getElementById("userDataUsernameEdit");
    let userDataPasswordEdit = document.getElementById("userDataPasswordEdit");
    let userDataRolEdit = document.getElementById("userDataRolEdit");
    let userDataAvatarEdit = document.getElementById("userDataAvatarEdit");
    let datosUsuario = new Array();
    datosUsuario.userNameEdit = userDataUsernameEdit.value;
    datosUsuario.userPasswordEdit = userDataPasswordEdit.value;
    datosUsuario.userRolEdit = userDataRolEdit.value;
    console.log(datosUsuario.userNameEdit);
    console.log(datosUsuario.userPasswordEdit);
    console.log(datosUsuario.userRolEdit);

    if (avatar == null || avatar == undefined || avatar == "") {
        datosUsuario.userAvatarEdit = userDataAvatarEdit.value;
    } else {
        datosUsuario.userAvatarEdit = avatar;
    }
    console.log(datosUsuario.userAvatarEdit);
    return datosUsuario;
}


const imagesUserDataEdit = document.getElementById("imagesUserDataEdit");
let avatar;

imagesUserDataEdit.addEventListener("click", (e) => {
    if (e.target.classList.contains("avatar")) {
        avatar = e.target.getAttribute("ruta");
    }
});

//------------------- POPUP PARA EDITAR USUARIO ------------------------
let btnEditUser = document.getElementById("btnEditUser");
let envoltorioPopup = document.querySelector(".envoltorio-popup");
let cerrarPopup = document.querySelector(".cerrar-popup");
btnEditUser.addEventListener("click", () => {
    envoltorioPopup.style = "display:block";
    leerDatosDelUsuarioDeUsuarioConectado();
});

cerrarPopup.addEventListener("click", () => {
    envoltorioPopup.style = "display:none";
});

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

// 
function esValido() {
    let datosUsuario = datosActualizarInformacion();
    let comprobarUsername = esObligatorio(datosUsuario.userNameEdit);
    // let emailValido = esEmailValido(datosUsuario.userEmailEdit);
    let contrasenyaValida = esContrasenyaValida(datosUsuario.userPasswordEdit);

    return comprobarUsername && contrasenyaValida;
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

// ------------------------FUNCIONES DE BASE DE DATOS USUARIO CONECTADO--------------------------
/* 

*/
function leerDatosDelUsuarioDeUsuarioConectado() {
    let transaccion = usuarioConectado.transaction(["usuarioConectado"], "readonly");
    let coleccionDeObjetos = transaccion.objectStore("usuarioConectado");
    let conexion = coleccionDeObjetos.openCursor();
    conexion.onsuccess = (e) => {
        let cursor = e.target.result;
        if (cursor) {
            if (cursor.value.rol == "admin") {
                window.location.href = "../pages/admin.html"
            } else if (cursor.value.rol == "user") {
                console.log(cursor.value);
                mostrarInformacionDelUsuarioEnLaWeb(cursor.value);
            }
        } else {
            console.log("No hay usuario conectado en este momento");
            window.location.href = "../index.html";
        }
    };
}
// Buscamos el usuario conectado y tomamos su email, lo buscamos en la base datos Usuarios y si existe actualizamos los datos ff
function buscarUsuarioEnUsuarioConectado() {
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
                buscarUsuarioEnUsuarios(cursor.value.email);
            }
        } else {
            console.log("No hay usuario conectado en este momento");
            window.location.href = "../index.html";
        }
    };
}

function guardarCambiosUsuarioEnUsuarioConectado(objetoActualizado) {
    let transaccion = usuarioConectado.transaction(["usuarioConectado"], "readwrite");
    let coleccionDeObjetos = transaccion.objectStore("usuarioConectado");
    coleccionDeObjetos.put(objetoActualizado);
}



// -----------------------FUNCIONES DE BASE DE DATOS USUARIOS--------------------------------
function buscarUsuarioEnUsuarios(email) {
    let transaccion = usuarios.transaction(["usuarios"], "readwrite");
    let coleccionDeObjetos = transaccion.objectStore("usuarios");
    let conexion = coleccionDeObjetos.get(email);
    conexion.onsuccess = () => {
        console.log(`objecto de la base de datos usuarios `);
        console.log(conexion.result);
        let usuarioEmail = conexion.result.email;
        guardarCambiosUsuarioEnUsuarios(usuarioEmail);
    };
    console.log(email);
}

function guardarCambiosUsuarioEnUsuarios(usuarioEmail) {
    let transaccion = usuarios.transaction(["usuarios"], "readwrite");
    let coleccionDeObjetos = transaccion.objectStore("usuarios");

    if (esValido()) {
        let datosUsuario = datosActualizarInformacion();
        let objetoActualizado = {
            "email": usuarioEmail,
            "username": datosUsuario.userNameEdit,
            "password": encriptar(datosUsuario.userPasswordEdit, SECRET_KEY),
            "rol": datosUsuario.userRolEdit,
            "avatar": datosUsuario.userAvatarEdit
        }
        let peticionDeActualizacion = coleccionDeObjetos.put(objetoActualizado);

        // Manejar el evento de éxito de la solicitud de actualización
        peticionDeActualizacion.onsuccess = () => {
            guardarCambiosUsuarioEnUsuarioConectado(objetoActualizado);
            leerDatosDelUsuarioDeUsuarioConectado();
            msgCambiosValidos();
            console.log("Objeto actualizado con éxito");
        };

        // Manejar el evento de error de la solicitud de actualización
        peticionDeActualizacion.onerror = (error) => {
            console.error("Error al actualizar el objeto:", error.target.error);
        };
    }
}

// BOTON DE ELIMINAR CUENTA
let btnDeleteAccount = document.getElementById("btnDeleteAccount");
let msgCuentaEliminadaPopup = document.querySelector(".msgCuentaEliminada");
let contenidoMsgCuentaEliminadaPopup = document.querySelectorAll(".msgCuentaEliminada button")
let cerrarMsgCuentaEliminadaPopup = document.querySelector(".msgCuentaEliminada .cerrar-popup");

btnDeleteAccount.addEventListener("click", () => {
    msgCuentaEliminadaPopup.style = "display:block";
});
contenidoMsgCuentaEliminadaPopup[0].addEventListener("click", buscarUsuarioEnUsuarioConectadoParaEliminar);

contenidoMsgCuentaEliminadaPopup[1].addEventListener("click", () => {
    msgCuentaEliminadaPopup.style = "display:none";
});
cerrarMsgCuentaEliminadaPopup.addEventListener("click", () => {
    msgCuentaEliminadaPopup.style = "display:none";
});

function buscarUsuarioEnUsuarioConectadoParaEliminar() {
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
                eliminarCuenta(cursor.value.email);
                closeSession();
            }
        } else {
            console.log("No hay usuario conectado en este momento");
            window.location.href = "../index.html";
        }
    };
}
function eliminarCuenta(email){
    let transaccion = usuarios.transaction(["usuarios"], "readwrite");
    let coleccionDeObjetos = transaccion.objectStore("usuarios");
    let conexion = coleccionDeObjetos.delete(email);
    conexion.onsuccess = () => {
        console.log(`Usuario Eliminado`);
    };
}

// MENSAJES
function msgCambiosValidos(){
    let msgCambiosValidosPopup = document.querySelector(".msgCambiosValidosPopup");
    let cerrarMsgCambiosValidosPopup = document.querySelector(".msgCambiosValidosPopup .cerrar-popup");
    msgCambiosValidosPopup.style = "display:block";
    envoltorioPopup.style = "display:none";
    cerrarMsgCambiosValidosPopup.addEventListener("click", () => {
        msgCambiosValidosPopup.style = "display:none";
    });
}
f

// --------------------------------------------------------------------------------------------
let btnSaveChangeUserData = document.getElementById("btnSaveChangeUserData");
btnSaveChangeUserData.addEventListener("click", buscarUsuarioEnUsuarioConectado);

// -------------------------LOGOUT-------------------------------
let logOut = document.getElementById("logOut");
function closeSession() {
    let transaccion = usuarioConectado.transaction(["usuarioConectado"], "readwrite");
    let coleccionDeObjetos = transaccion.objectStore("usuarioConectado");
    let eliminarUsuario = coleccionDeObjetos.clear();
}
logOut.addEventListener("click", closeSession);

// 
crearBaseDeDatosUsuarios();
crearBaseDeDatosUsuarioConectado();