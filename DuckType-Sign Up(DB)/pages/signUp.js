// API
var indexedDB =
  window.indexedDB ||
  window.mozIndexedDB ||
  window.webkitIndexedDB ||
  window.msIndexedDB ||
  window.shimIndexedDB;
// var database = "usersDB";
// const DB_STORE_NAME = 'users';
// const DB_VERSION = 1;
// var db;
// var opened = false;
// const EDIT_USER = "Edit user";
// const NEW_USER = "New user";
// const ADD_USER = "Add user";

let db;
let cajaMostrar;
let usuarioLogin;

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
		comprobarUsuarioConectado();
		console.log(comprobarUsuarioConectado());
	});

	// Si la base de datos no existe va a ser creada y luego abierta y mostrada por conexion.addEventListener('succes', funcion);
	conexion.addEventListener("upgradeneeded", crearAlmacen);

}

function mostrarError(evento) {
  console.log("Tenemos un error: " + evento.code + " / " + evento.message);
}

function iniciar(evento) {
  db = evento.target.result;
  console.log("Base de datos fue abierta", db);
  // mostrar();
}

function crearAlmacen(evento) {
  var baseDeDatos = evento.target.result;
  console.log("Base de datos fue creada", db);
  var almacen = baseDeDatos.createObjectStore("users", { keyPath: "email" });
  // almacen.createIndex('username','username', {unique: false});
  // almacen.createIndex('password','password', {unique: false});
  // almacen.createIndex('email','email', {unique: false});
}

let img;
let images = document.getElementById("images");
images.addEventListener("click", (e) => {
  if (e.target.classList.contains("avatar")) {
    img = e.target.getAttribute("ruta");
    console.log(img);
  }
});

let rol;
let roles = document.getElementById("roles");
roles.addEventListener("click", (e) => {
  if (e.target.value == "admin") {
    rol = "admin";
    console.log(rol);
  } else if (e.target.value == "user") {
    rol = "user";
    console.log(rol);
  }
});

function guardarUsuario() {
  let username = document.getElementById("username").value;
  let password = document.getElementById("password").value;
  let email = document.getElementById("email").value;

  let transaccion = db.transaction(["users"], "readwrite");
  let almacen = transaccion.objectStore("users");

  almacen.add({
    'username': username,
    'password': password,
    'email': email,
    'image': img,
    'rol': rol,
    'login': true
  });

  // if(rol == 'user'){
  //     location.href = '/DuckType-Sign Up(DB)/index.html';
  // }

  // if(rol == 'admin'){
  //     location.href = '/DuckType-Sign Up(DB)/pages/admin.html';
  // }else if(rol == 'user'){
  //     location.href = '';
  // }
  document.getElementById("username").value = "";
  document.getElementById("password").value = "";
  document.getElementById("password2").value = "";
  document.getElementById("email").value = "";
}

function obtenerUsuarioMedianteEmail(email) {
  let transaccion = db.transaction(["users"], "readonly");
  let almacen = transaccion.objectStore("users");
  let conexion = almacen.get(email);

  conexion.onsuccess = () => {
    console.log(conexion.result);
  };
}

function obtenerUsuarioConectado() {
  let transaccion = db.transaction(["users"], "readonly");
  let almacen = transaccion.objectStore("users");
  let conexion = almacen.openCursor();

  conexion.onsuccess = (e) => {
    let cursor = e.target.result;

    if (cursor) {
		if(cursor.value.login === true){
			usuarioLogin = cursor.value;
			console.log(usuarioLogin);
		}
    	cursor.continue();

    }
  };
}

function comprobarUsuarioConectado() {
  
	let transaccion = db.transaction(["users"], "readonly");
	let almacen = transaccion.objectStore("users");
	let conexion = almacen.openCursor();

	conexion.onsuccess = (e) => {
		let cursor = e.target.result;

		if (cursor) {

			if (cursor.value.login == true) {
				return true;
			}else {
				cursor.continue();
			}
		}
	};
		return false;
}
/* 

*/
function obtenerUsuarios() {
  let transaccion = db.transaction(["users"], "readonly");
  let almacen = transaccion.objectStore("users");
  let conexion = almacen.openCursor();

  conexion.onsuccess = (e) => {
    let cursor = e.target.result;

    if (cursor) {
      // console.log(cursor.value.email);
      console.log(cursor.value);
      cursor.continue();
    } else {
      console.log("D:");
    }
  };
}

function actualizarUsuario(objeto) {
  let transaccion = db.transaction(["users"], "readwrite");
  let almacen = transaccion.objectStore("users");
  let conexion = almacen.put(objeto);

  conexion.onsuccess = () => {
    obtenerUsuarios();
  };
}


window.addEventListener("load", () =>{
	iniciarBaseDeDatos();
	
});

let form = document.getElementById("form");
form.addEventListener("submit", (e) => {
	e.preventDefault();
	// 

	guardarUsuario();

	console.log("Usuario Guardado");
});
