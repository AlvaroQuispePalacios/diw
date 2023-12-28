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
        leerDatosDelUsuarioDeUsuarioConectado();

    }

    conexion.onerror = (error) =>{
        console.log("Error: ", error);
    }
}

// -----------------------------------------------------------------------------------------------
function mostrarInformacionDelUsuarioEnLaWeb(objectUser){
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
function datosActualizarInformacion(){
    let userDataEmailEdit = document.getElementById("userDataEmailEdit");
    let userDataUsernameEdit = document.getElementById("userDataUsernameEdit");
    let userDataPasswordEdit = document.getElementById("userDataPasswordEdit");
    let userDataRolEdit = document.getElementById("userDataRolEdit");
    let userDataAvatarEdit = document.getElementById("userDataAvatarEdit");
    let datosUsuario = new Array();
    datosUsuario.userEmailEdit = userDataEmailEdit.value;
    datosUsuario.userNameEdit = userDataUsernameEdit.value;
    datosUsuario.userPasswordEdit = userDataPasswordEdit.value;
    datosUsuario.userRolEdit = userDataRolEdit.value;
    console.log(datosUsuario.userEmailEdit);
    console.log(datosUsuario.userNameEdit);
    console.log(datosUsuario.userPasswordEdit);
    console.log(datosUsuario.userRolEdit);
    if(avatar == null || avatar == undefined || avatar == ""){
        datosUsuario.userAvatarEdit = userDataAvatarEdit.value;
    }else{
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
let envoltorioPopup = document.querySelector(".envoltorio-popup") ;
let cerrarPopup = document.querySelector(".cerrar-popup");
btnEditUser.addEventListener("click", () => {
    envoltorioPopup.style = "display:block";
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

// 
function esValido() {
    let datosUsuario = datosActualizarInformacion();

    let comprobarUsername = esObligatorio(datosUsuario.userNameEdit);
    let emailValido = esEmailValido(datosUsuario.userEmailEdit);
    let contrasenyaValida = esContrasenyaValida(datosUsuario.userPasswordEdit);
    // let contrasenyaSonIguales = comprobarContrasenyaSonIguales(datosUsuario.userPassword, datosUsuario.userPassword2);
    // let comprobarRol = esObligatorio(datosUsuario.rol);
    // let comprobarAvatar = esObligatorio(datosUsuario.avatar);

    return comprobarUsername && emailValido && contrasenyaValida;
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
                mostrarInformacionDelUsuarioEnLaWeb(cursor.value);
            }
        }else{
            console.log("No hay usuario conectado en este momento");
            window.location.href = "../index.html";
        }
    };
}
// Buscamos el usuario conectado y tomamos su email, lo buscamos en la base datos Usuarios y si existe actualizamos los datos ff
function buscarUsuarioEnUsuarioConectado(){
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
                buscarUsuarioEnUsuarios(cursor.value.email); 
            }
        }else{
            console.log("No hay usuario conectado en este momento");
            window.location.href = "../index.html";
        }
    };
}

// -----------------------FUNCIONES DE BASE DE DATOS USUARIOS--------------------------------
function buscarUsuarioEnUsuarios(email){
    let transaccion = usuarios.transaction(["usuarios"], "readwrite");
    let coleccionDeObjetos = transaccion.objectStore("usuarios");
    let conexion = coleccionDeObjetos.get(email);
    conexion.onsuccess= () => {
        console.log(`objecto de la base de datos usuarios `);
        console.log(conexion.result);
        let usuario = conexion.result;
        guardarCambiosUsuarioEnUsuarios(usuario);
    };
    console.log(email);
}

function guardarCambiosUsuarioEnUsuarios(usuario){
    let transaccion = usuarios.transaction(["usuarios"], "readwrite");
    let coleccionDeObjetos = transaccion.objectStore("usuarios");
    let conexion = coleccionDeObjetos.put(usuario);
    conexion.onsuccess = (e) => {
        if (esValido()) {
            let datosUsuario = datosActualizarInformacion();
            comprobarEmailRepetido(datosUsuario.userEmailEdit, usuario.email, function (emailRepetido, emailsIguales, error) {
                if (error) {
                    console.error("Error:", error);
                } else {
                    console.log(datosUsuario);
                    console.log(usuario.email);
                    console.log(datosUsuario.userEmailEdit);

                    if (emailRepetido) {
                        console.log("El email no puede ser modificado.");
                    } else if (emailsIguales) {
                        // FALLA
                        console.log("El email puede ser modificado y es igual al original.");
                        coleccionDeObjetos.put({
                            "email":datosUsuario.userEmailEdit,
                            "username": datosUsuario.userNameEdit,
                            "password": encriptar(datosUsuario.userPasswordEdit, SECRET_KEY),
                            "rol": datosUsuario.userRolEdit,
                            "avatar": datosUsuario.userAvatarEdit
                        });
                        console.log(datosUsuario.userPasswordEdit);
                    } else {
                        console.log("El email puede ser modificado.");
                        coleccionDeObjetos.put({
                            "email":datosUsuario.userEmailEdit,
                            "username": datosUsuario.userNameEdit,
                            "password": encriptar(datosUsuario.userPasswordEdit, SECRET_KEY),
                            "rol": datosUsuario.userRolEdit,
                            "avatar": datosUsuario.userAvatarEdit
                        });
                    }
                }
            });
        }
    };

    conexion.onerror = (event) => {
        console.error("Error al guardar cambios en usuario:", event.target.error);
    };
}

function comprobarEmailRepetido(emailRegister, emailOriginal, callback) {
    let transaccion = usuarios.transaction(["usuarios"], "readonly");
    let coleccionDeObjetos = transaccion.objectStore("usuarios");
    let solicitudGet = coleccionDeObjetos.get(emailRegister);

    solicitudGet.onsuccess = () => {
        let usuario = solicitudGet.result;
        if (usuario) {
            // Se encontró el email
            let emailRepetido = (emailRegister !== emailOriginal) ? true : false;
            let emailsIguales = (emailRegister === emailOriginal) ? true : false;
            callback(emailRepetido, emailsIguales);
        } else {
            // No se encontró el email
            callback(false, false);
        }
    };

    solicitudGet.onerror = (event) => {
        console.error("Error al comprobar email repetido:", event.target.error);
        callback(null, null, event.target.error);
    };
}

// --------------------------------------------------------------------------------------------
let btnSaveChangeUserData = document.getElementById("btnSaveChangeUserData");
// btnSaveChangeUserData.addEventListener("click", datosActualizarInformacion);
btnSaveChangeUserData.addEventListener("click", buscarUsuarioEnUsuarioConectado);

// -------------------------LOGOUT-------------------------------
let logOut = document.getElementById("logOut");
function closeSession(){
    let transaccion = usuarioConectado.transaction(["usuarioConectado"], "readwrite");
    let coleccionDeObjetos = transaccion.objectStore("usuarioConectado");
    let eliminarUsuario = coleccionDeObjetos.clear();
}
logOut.addEventListener("click", closeSession);

// 
crearBaseDeDatosUsuarios();
crearBaseDeDatosUsuarioConectado();