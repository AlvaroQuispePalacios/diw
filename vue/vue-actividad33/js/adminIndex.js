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
        leerDatosDeLosUsuariosDeUsuarios();

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

// ------------------------FUNCIONES DE BASE DE DATOS USUARIOS--------------------------
function leerDatosDeLosUsuariosDeUsuarios() {
    let transaccion = usuarios.transaction(["usuarios"], "readonly");
    let coleccionDeObjetos = transaccion.objectStore("usuarios");
    let conexion = coleccionDeObjetos.openCursor();
    conexion.onsuccess = (e) => {
        let cursor = e.target.result;
        if (cursor) {
            // console.log(cursor.value);
            mostrarInformacionDeLosUsuariosEnLaWeb(cursor.value);
            cursor.continue();
        } else {
            console.log("Se acabaron");
        }
    }
}

function mostrarInformacionDeLosUsuariosEnLaWeb(usuario) {
    let usuariosDeDbUsuarios = document.getElementById("usuariosDeDbUsuarios");
    let contrasenyaDesencriptada = desencriptar(usuario.password, SECRET_KEY);
    usuariosDeDbUsuarios.innerHTML +=
        `<tr>
        <td><img src="${usuario.avatar}" style="width:100px;border-radius:50px;"></td>
        <td>${usuario.email}</td>
        <td>${usuario.username}</td>
        <td><input type="password" value="${contrasenyaDesencriptada}" readonly></td>
        <td>${usuario.rol}</td>
        <td>
            <button onclick=popupInformacionUsuario("${usuario.email}","${usuario.username}","${usuario.password}","${usuario.rol}","${usuario.avatar}")>
            <svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" fill="white" viewBox="0 0 512 512">
            <path
              d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160V416c0 53 43 96 96 96H352c53 0 96-43 96-96V320c0-17.7-14.3-32-32-32s-32 14.3-32 32v96c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H96z"
            />
          </svg>
            </button>
            <button onclick=msgEliminarCuenta("${usuario.email}") style="background-color: rgb(185, 50, 50);">Eliminar Cuenta</button>
        </td>
    </tr>`;
}

function popupInformacionUsuario(email, username, password, rol, avatar) {
    // Mostrar y cerrar POPUP
    let popupUsuarioDeUsuarios = document.querySelector(".datosUsuarioDeUsuarios");
    let cerrarPopupUsuarioDeUsuarios = document.querySelector(".datosUsuarioDeUsuarios .cerrar-popup")
    popupUsuarioDeUsuarios.style = "display:block";
    cerrarPopupUsuarioDeUsuarios.addEventListener("click", () => {
        popupUsuarioDeUsuarios.style = "display:none";
    });
    // Mostrar datos en el popup
    let userDataEmailEdit = document.getElementById("userDataEmailEdit");
    let userDataUsernameEdit = document.getElementById("userDataUsernameEdit");
    let userDataPasswordEdit = document.getElementById("userDataPasswordEdit");
    let userDataAvatarEdit = document.getElementById("userDataAvatarEdit");
    let inputRol = document.getElementById("inputRol");
    let inputsRol = document.querySelectorAll(".userDataRolEdit");
    userDataEmailEdit.value = email;
    userDataUsernameEdit.value = username;
    userDataPasswordEdit.value = desencriptar(password, SECRET_KEY);
    userDataAvatarEdit.value = avatar
    inputsRol.forEach((input) => {
        if (input.value == rol) {
            input.checked = true;
            inputRol.value = input.value;
        }
    });

    // console.log(email, username, password, rol, avatar);
}

// ----------------------------TOMAR INFORMACION DEL FORMULARIO PARA ACTUALIZAR LOS DATOS-----------------------
// Recoge la informacion del usuario en el register

// Toma la informacion del formulario donde se actualizara los datos del usuario
const inputsRol = document.querySelectorAll(".userDataRolEdit");
const inputRol = document.getElementById("inputRol");
let rol;
inputsRol.forEach((input) => {
    input.addEventListener("click", () => {
        rol = input.value;
        inputRol.value = rol;
        console.log(rol);
    })
});

const imagesUserDataEdit = document.getElementById("imagesUserDataEdit");
let avatar;

imagesUserDataEdit.addEventListener("click", (e) => {
    if (e.target.classList.contains("avatar")) {
        avatar = e.target.getAttribute("ruta");
    }
});

// 
function datosActualizarInformacion() {
    let userDataEmailEdit = document.getElementById("userDataEmailEdit");
    let userDataUsernameEdit = document.getElementById("userDataUsernameEdit");
    let userDataPasswordEdit = document.getElementById("userDataPasswordEdit");
    let inputRol = document.getElementById("inputRol");
    let userDataAvatarEdit = document.getElementById("userDataAvatarEdit");
    let datosUsuario = new Array();
    datosUsuario.userEmailEdit = userDataEmailEdit.value
    datosUsuario.userNameEdit = userDataUsernameEdit.value;
    datosUsuario.userPasswordEdit = userDataPasswordEdit.value;
    datosUsuario.userRolEdit = inputRol.value;

    // console.log(datosUsuario.userEmailEdit);
    // console.log(datosUsuario.userNameEdit);
    // console.log(datosUsuario.userPasswordEdit);
    // console.log(datosUsuario.userRolEdit);

    if (avatar == null || avatar == undefined || avatar == "") {
        datosUsuario.userAvatarEdit = userDataAvatarEdit.value;
    } else {
        datosUsuario.userAvatarEdit = avatar;
    }
    // console.log(datosUsuario.userAvatarEdit);
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



function leerDatosDeLosUsuariosDeUsuariosDDA() {
    let transaccion = usuarios.transaction(["usuarios"], "readonly");
    let coleccionDeObjetos = transaccion.objectStore("usuarios");
    let conexion = coleccionDeObjetos.openCursor();
    let usuariosDeDbUsuarios = document.getElementById("usuariosDeDbUsuarios");
    usuariosDeDbUsuarios.innerHTML =
    `
    <table class="usuario w-100 text-center">
        <tr>
            <th>Avatar</th>
            <th>Email</td>
            <th>Username</th>
            <th>Password</th>
            <th>Rol</th>
            <th>Actions</th>
        </tr>
    `
    conexion.onsuccess = (e) => {
        let cursor = e.target.result;
        if (cursor) {
            // console.log(cursor.value);
            mostrarInformacionDeLosUsuariosEnLaWebDDA(cursor.value);
            cursor.continue();
        } else {
            console.log("Se acabaron");
            usuariosDeDbUsuarios.innerHTML += `</table>`
        }
    }
}

function mostrarInformacionDeLosUsuariosEnLaWebDDA(usuario) {
    let usuariosDeDbUsuarios = document.getElementById("usuariosDeDbUsuarios");
    let contrasenyaDesencriptada = desencriptar(usuario.password, SECRET_KEY);

    usuariosDeDbUsuarios.innerHTML +=
        `
        <tr>
            <td><img src="${usuario.avatar}" style="width:100px;border-radius:50px;"></td>
            <td>${usuario.email}</td>
            <td>${usuario.username}</td>
            <td><input type="password" value="${contrasenyaDesencriptada}" readonly></td>
            <td>${usuario.rol}</td>
            <td>
                <button onclick=popupInformacionUsuario("${usuario.email}","${usuario.username}","${usuario.password}","${usuario.rol}","${usuario.avatar}")>
                <svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" fill="white" viewBox="0 0 512 512">
                <path
                  d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160V416c0 53 43 96 96 96H352c53 0 96-43 96-96V320c0-17.7-14.3-32-32-32s-32 14.3-32 32v96c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H96z"
                />
              </svg>
                </button>
                <button onclick=msgEliminarCuenta("${usuario.email}") style="background-color: rgb(185, 50, 50);">Eliminar Cuenta</button>
            </td>
        </tr>
    `
        ;
}

function buscarUsuarioEnUsuarios() {
    let datosUsuario = datosActualizarInformacion();
    let transaccion = usuarios.transaction(["usuarios"], "readwrite");
    let coleccionDeObjetos = transaccion.objectStore("usuarios");
    let conexion = coleccionDeObjetos.get(datosUsuario.userEmailEdit);
    conexion.onsuccess = () => {
        console.log(`objecto de la base de datos usuarios `);
        console.log(conexion.result);
        let usuarioEmail = conexion.result.email;
        guardarCambiosUsuarioEnUsuarios(usuarioEmail);
    };
    // console.log(email);
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
            leerDatosDeLosUsuariosDeUsuariosDDA();
            buscarUsuarioEnUsuarioConectado(usuarioEmail, objetoActualizado);
            msgCambiosValidos();
            console.log("Objeto actualizado con éxito");
        };

        // Manejar el evento de error de la solicitud de actualización
        peticionDeActualizacion.onerror = (error) => {
            console.error("Error al actualizar el objeto:", error.target.error);
        };
    }
}

// MENSAJES
function msgCambiosValidos() {
    let popupUsuarioDeUsuarios = document.querySelector(".datosUsuarioDeUsuarios");
    let msgCambiosValidosPopup = document.querySelector(".msgCambiosValidosPopup");
    let cerrarMsgCambiosValidosPopup = document.querySelector(".msgCambiosValidosPopup .cerrar-popup");
    msgCambiosValidosPopup.style = "display:block";
    popupUsuarioDeUsuarios.style = "display:none";
    cerrarMsgCambiosValidosPopup.addEventListener("click", () => {
        msgCambiosValidosPopup.style = "display:none";
    });
}

function msgEliminarCuenta(email) {

    let msgCuentaEliminadaPopup = document.querySelector(".msgCuentaEliminada");
    let contenidoMsgCuentaEliminadaPopup = document.querySelectorAll(".msgCuentaEliminada button")
    let cerrarMsgCuentaEliminadaPopup = document.querySelector(".msgCuentaEliminada .cerrar-popup");

    msgCuentaEliminadaPopup.style = "display:block";

    cerrarMsgCuentaEliminadaPopup.addEventListener("click", () => {
        msgCuentaEliminadaPopup.style = "display:none";
    })

    contenidoMsgCuentaEliminadaPopup[0].addEventListener("click", () => {
        eliminarCuenta(email);
        buscarUsuarioEnUsuarioConectadoEliminar(email);
        msgCuentaEliminadaPopup.style = "display:none";
        // Se duplica la informacion por esto pongo esto
        window.location.reload();
        console.log("Cuenta Eliminada");
    });

    contenidoMsgCuentaEliminadaPopup[1].addEventListener("click", () => {
        msgCuentaEliminadaPopup.style = "display:none";
    });


}

function eliminarCuenta(email) {
    let transaccion = usuarios.transaction(["usuarios"], "readwrite");
    let coleccionDeObjetos = transaccion.objectStore("usuarios");
    let conexion = coleccionDeObjetos.delete(email);
    conexion.onsuccess = () => {
        leerDatosDeLosUsuariosDeUsuariosDDA();
        console.log(`Usuario Eliminado`);
    };
}


let btnSaveChangeUserData = document.getElementById("btnSaveChangeUserData");
btnSaveChangeUserData.addEventListener("click", buscarUsuarioEnUsuarios);




// ------------------------FUNCIONES DE BASE DE DATOS USUARIO CONECTADO--------------------------
/* 
    Mira si hay un usuario conectado: 
    - Si hay un usuario conectado muestra la informacion de este y el usuario puede realizar las acciones designadas para este dependiendo de su rol
    - Si no hay un usuario conectado regresa al index
    - Si el usuario que intenta entrar tiene el rol de admin este no podra entrar a user.html(Se redireccionara a la pagina de administrador)
*/
function leerDatosDelUsuarioDeUsuarioConectado() {
    let transaccion = usuarioConectado.transaction(["usuarioConectado"], "readonly");
    let coleccionDeObjetos = transaccion.objectStore("usuarioConectado");
    let conexion = coleccionDeObjetos.openCursor();
    conexion.onsuccess = (e) => {
        let cursor = e.target.result;
        if (cursor) {
            console.log(cursor.value);
            if (cursor.value.rol == "admin") {
                mostrarInformacionDelUsuarioEnLaWeb(cursor.value);
            } else if (cursor.value.rol == "user") {
                window.location.href = "../pages/userIndex.html"
            }
        } else {
            console.log("No hay usuario conectado en este momento");
            window.location.href = "../index.html";
        }
    };
}

function mostrarInformacionDelUsuarioEnLaWeb(objectUser) {
    // HEADER
    let userNameWeb = document.getElementById("userNameWeb");
    let userAvatarWeb = document.getElementById("userAvatarWeb");
    userNameWeb.textContent = objectUser.username;
    userAvatarWeb.setAttribute("src", objectUser.avatar);
}

function buscarUsuarioEnUsuarioConectado(email, objetoActualizado) {
    let transaccion = usuarioConectado.transaction(["usuarioConectado"], "readonly");
    let coleccionDeObjetos = transaccion.objectStore("usuarioConectado");
    let conexion = coleccionDeObjetos.get(email);
    conexion.onsuccess = (e) => {
        console.log("Usuario de usuarioConectado");
        if(conexion.result != undefined){
            console.log(conexion.result);
            guardarCambiosUsuarioEnUsuarioConectado(objetoActualizado);
            leerDatosDelUsuarioDeUsuarioConectado();

        }else{
            console.log("El usuario no esta en este momento conectado");
        }
    };

}

function buscarUsuarioEnUsuarioConectadoEliminar(email){
    let transaccion = usuarioConectado.transaction(["usuarioConectado"], "readonly");
    let coleccionDeObjetos = transaccion.objectStore("usuarioConectado");
    let conexion = coleccionDeObjetos.get(email);
    conexion.onsuccess = (e) => {
        console.log("Usuario de usuarioConectado");
        if(conexion.result != undefined){
            console.log(conexion.result);
            closeSession();
            leerDatosDelUsuarioDeUsuarioConectado();

        }else{
            console.log("El usuario no esta en este momento conectado");
        }
    };
    
}

function guardarCambiosUsuarioEnUsuarioConectado(objetoActualizado) {
    let transaccion = usuarioConectado.transaction(["usuarioConectado"], "readwrite");
    let coleccionDeObjetos = transaccion.objectStore("usuarioConectado");
    coleccionDeObjetos.put(objetoActualizado);
    console.log("objeto de usuario conectado Actualizado");
}

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