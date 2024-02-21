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

// ------------------------FUNCIONES DE BASE DE DATOS USUARIO CONECTADO--------------------------
/* 
    Mira si hay un usuario conectado: 
    - Si hay un usuario conectado muestra la informacion de este y el usuario puede realizar las acciones designadas para este
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

function mostrarInformacionDelUsuarioEnLaWeb(objectUser){
    let userNameWeb = document.getElementById("userNameWeb");
    let userAvatarWeb = document.getElementById("userAvatarWeb");
    userNameWeb.textContent = objectUser.username;
    userAvatarWeb.setAttribute("src", objectUser.avatar);
    
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