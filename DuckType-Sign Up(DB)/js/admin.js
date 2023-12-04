let dbUsuarioConectado;
let db;
const userImg = document.querySelector('#userImg');
const userName = document.querySelector('#userName');
const logOut = document.querySelector('#logOut');
let contador = 0;
function iniciardbUsuarioConectado() {
    /* 
        Conexion a la base de datos.
        indexDB.open('NombreBaseDeDatos', Version(Opcional))
    */
    let conexion = indexedDB.open("UsuarioConectado");

    conexion.addEventListener("error", mostrarErrorUsuarioConectado);

    //Si la base de datos existe va ir por aca
    conexion.addEventListener("success", (evento) => {
        iniciarUsuarioConectado(evento);
        comprobarUsuarioConectado();
    });

    // Si la base de datos no existe va a ser creada y luego abierta y mostrada por conexion.addEventListener('succes', funcion);
    // conexion.addEventListener("upgradeneeded", crearAlmacenUsuarioConectado);

}

function mostrarErrorUsuarioConectado(evento) {
    console.log("Tenemos un error: " + evento.code + " / " + evento.message);
}

function iniciarUsuarioConectado(evento) {
    dbUsuarioConectado = evento.target.result;
    console.log("Base de datos fue abierta", dbUsuarioConectado);
}

function comprobarUsuarioConectado() {
    let transaccion = dbUsuarioConectado.transaction(["usuarioConectado"], "readonly");
    let almacen = transaccion.objectStore("usuarioConectado");

    let conexion = almacen.openCursor();
    conexion.onsuccess = (e) => {
        let cursor = e.target.result;
        if (cursor) {
            contador = 1;
        }

        if (contador == 1) {
            userName.textContent = cursor.value.username;
            userImg.setAttribute('src', cursor.value.image);
        } else {
            location.href = '/DuckType-Sign Up(DB)/index.html';
        }

    };
}

function usuarioLogOut() {
    let transaccion = dbUsuarioConectado.transaction(["usuarioConectado"], "readwrite");
    let almacen = transaccion.objectStore("usuarioConectado");
    let conexion = almacen.clear();
    contador = 0;
}

logOut.addEventListener('click', usuarioLogOut)

// 
const contenedorUsuarios = document.querySelector('.contenedorUsuarios');

function iniciarBaseDeDatos() {
    /* 
        Conexion a la base de datos.
        indexDB.open('NombreBaseDeDatos', Version(Opcional))
            */
    var conexion = indexedDB.open("Alvaro");

    conexion.addEventListener("error", mostrarError);

    //Si la base de datos existe va ir por aca
    conexion.addEventListener("success", (evento) => {
        iniciar(evento);
        obtenerUsuarios();
    });


}

function mostrarError(evento) {
    console.log("Tenemos un error: " + evento.code + " / " + evento.message);
}

function iniciar(evento) {
    db = evento.target.result;
    console.log("Base de datos fue abierta", db);
    // mostrar();
}

function obtenerUsuarios() {
    let transaccion = db.transaction(["users"], "readonly");
    let almacen = transaccion.objectStore("users");
    let conexion = almacen.openCursor();

    let usuario = document.querySelector('.usuario');

    conexion.onsuccess = (e) => {
        let cursor = e.target.result;
        if (cursor) {
            usuario.innerHTML +=
            `
                <tr>
                    <td>${cursor.value.email}</td>
                    <td>${cursor.value.username}</td>
                    <td>${cursor.value.image}</td>
                    <td>${cursor.value.rol}</td>
                    <td>
                        <button onclick="llenarDatos('${cursor.value.email}')">Editar</button>
                        <button onclick="eliminarUsuario('${cursor.value.email}')">Eliminar</button>
                    </td>
                </tr>
            `;

            cursor.continue();
        }
    }
};

function llenarDatos(email){
    let guardarCambios = document.querySelector('.guardarCambios');
    guardarCambios.style = 'display:block;';
    
    let userEmail = document.querySelector('.userEmail');

    let userUserName = document.querySelector('.userUserName');

    let userImage = document.querySelector('.userImage');
    let userRol = document.querySelector('.userRol');

    let userPassword = document.querySelector('.userPassword')

    let transaccion = db.transaction(["users"], "readonly");
    let almacen = transaccion.objectStore("users");
    let conexion = almacen.get(email);

    conexion.addEventListener('success', () => {
        userEmail.value = conexion.result.email;
        userUserName.value = conexion.result.username;
        userImage.value = conexion.result.image;
        userRol.value = conexion.result.rol;
        userPassword.value = conexion.result.password;
        console.log(userPassword.value);
    });
    

}

function eliminarUsuario(email){
    let transaccion = db.transaction(["users"], "readwrite");
    let almacen = transaccion.objectStore("users");
    transaccion.addEventListener('complete', actualizarTablaUsuarios)

    let solicitud = almacen.delete(email);
}

let guardarCambiosUsuario = document.querySelector('.guardarCambios');
guardarCambiosUsuario.addEventListener('click', () => {

    let userEmail = document.querySelector('.userEmail');
    let userUserName = document.querySelector('.userUserName');
    let userImage = document.querySelector('.userImage');
    let userRol = document.querySelector('.userRol');
    let userPassword = document.querySelector('.userPassword')

    let transaccion = db.transaction(["users"], "readwrite");
    let almacen = transaccion.objectStore("users");

    almacen.put({
        'email': userEmail.value,
        'image': userImage.value,
        'password': userPassword.value,
        'rol': userRol.value,
        'username': userUserName.value
    });

    userEmail.value = "";
    userEmail.textContent = "";

    userUserName.value = "";
    userUserName.textContent = "";

    userImage.value = "";
    userImage.textContent = "";

    userRol.value = "";
    userRol.textContent = "";

    userPassword.value = "";
    userPassword.textContent = "";

    actualizarTablaUsuarios();
});


function actualizarTablaUsuarios(){
    let transaccion = db.transaction(["users"], "readonly");
    let almacen = transaccion.objectStore("users");
    let conexion = almacen.openCursor();

    let usuario = document.querySelector('.usuario');
    usuario.innerHTML = "<tr><td>Email</td><td>Username</td><td>Image</td><td>Rol</td><td>Actions</td></tr>";

    conexion.onsuccess = (e) => {
        let cursor = e.target.result;
        if (cursor) {
            usuario.innerHTML +=
            `
                <tr>
                    <td>${cursor.value.email}</td>
                    <td>${cursor.value.username}</td>
                    <td>${cursor.value.image}</td>
                    <td>${cursor.value.rol}</td>
                    <td>
                        <button onclick="llenarDatos('${cursor.value.email}')">Editar</button>
                        <button onclick="eliminarUsuario('${cursor.value.email}')">Eliminar</button>
                    </td>
                </tr>
            `;

            cursor.continue();
        }
    }
}


// const actualizar = document.getElementById('actualizar');
// actualizar.addEventListener('click', () => {
//     console.log("actualizar");
// });


window.addEventListener("load", () => {
    iniciarBaseDeDatos();
    iniciardbUsuarioConectado();
});

