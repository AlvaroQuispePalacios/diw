// Importamos los componentes
import Componente from "./Componente.js";
import Goodbyee from "./Goodbyee.js";
// 
const Home = { template: `<div>Home</div>`};
let router = VueRouter.createRouter({
    history: VueRouter.createWebHistory(),
    // Nombre de la ruta que aparecera (URL) que queramos, nombre, componente asociado
    // Hay dos fomar de pasar parametros: params y query
    routes: [
        {path: '/', name: "Home", component: Home},
        // Params
        {path: '/componentenoimportaelnombre/', name: "Componente", component: Componente},
        {path: '/componentenoimportaelnombre/:message', name: "Componente", component: Componente},
        // Tiene que coincidir con Componente.js
        {path: '/bye', name: "Goodbyee", component: Goodbyee}
    ]

});

export default router;