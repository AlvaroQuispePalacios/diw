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
        leerDatosDeLosUsuariosDeUsuarios();

    }

    conexion.onerror = (error) =>{
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
function leerDatosDeLosUsuariosDeUsuarios(){
    let transaccion = usuarios.transaction(["usuarios"], "readonly");
    let coleccionDeObjetos = transaccion.objectStore("usuarios");
    let conexion = coleccionDeObjetos.openCursor();
    conexion.onsuccess = (e) => {
        let cursor = e.target.result;
        if(cursor){
            console.log(cursor.value);
            mostrarInformacionDeLosUsuariosEnLaWeb(cursor.value);
            cursor.continue();
        }else{
            console.log("Se acabaron");
        }
    }
}

function mostrarInformacionDeLosUsuariosEnLaWeb(usuario){
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
            <button >Cambiar Contraseña</button>
            <button style="background-color: rgb(185, 50, 50);">Eliminar Cuenta</button>
        </td>
    </tr>`;
}

function popupInformacionUsuario(email, username, password, rol, avatar){
    let popupUsuarioDeUsuarios = document.querySelector(".datosUsuarioDeUsuarios");
    let cerrarPopupUsuarioDeUsuarios = document.querySelector(".datosUsuarioDeUsuarios .cerrar-popup")
    popupUsuarioDeUsuarios.style = "display:block";
    cerrarPopupUsuarioDeUsuarios.addEventListener("click", () => {
        popupUsuarioDeUsuarios.style = "display:none";
    });
    console.log(email, username, password, rol, avatar);
}
// ------------------------FUNCIONES DE BASE DE DATOS USUARIO CONECTADO--------------------------
/* 
    Mira si hay un usuario conectado: 
    - Si hay un usuario conectado muestra la informacion de este y el usuario puede realizar las acciones designadas para este dependiendo de su rol
    - Si no hay un usuario conectado regresa al index
    - Si el usuario que intenta entrar tiene el rol de admin este no podra entrar a user.html(Se redireccionara a la pagina de administrador)
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
                mostrarInformacionDelUsuarioEnLaWeb(cursor.value);
            }else if(cursor.value.rol == "user"){
                window.location.href = "../pages/userIndex.html"
            }
        }else{
            console.log("No hay usuario conectado en este momento");
            window.location.href = "../index.html";
        }
    };
}

function mostrarInformacionDelUsuarioEnLaWeb(objectUser){
    // HEADER
    let userNameWeb = document.getElementById("userNameWeb");
    let userAvatarWeb = document.getElementById("userAvatarWeb");
    userNameWeb.textContent = objectUser.username;
    userAvatarWeb.setAttribute("src", objectUser.avatar);
    // BODY
    // Falta agregar los settings que el usuario pueda modificar sus datos
}

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