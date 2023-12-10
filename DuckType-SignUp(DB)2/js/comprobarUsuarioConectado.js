let dbUsuarioConectado;

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
    let contador;
    let conexion = almacen.openCursor();
    conexion.onsuccess = (e) => {
        let cursor = e.target.result;
        if (cursor) {
            contador = 1;
        }else{
            contador = 0;
        }
        
        if(contador == 1 && cursor.value.rol == 'user'){
            location.href = "/DuckType-SignUp(DB)2/pages/user.html";
        }else if(contador == 1 && cursor.value.rol == 'admin'){
            location.href = "/DuckType-SignUp(DB)2/pages/admin.html"
        }

    };
}

window.addEventListener('load', () => {
    iniciardbUsuarioConectado();

});