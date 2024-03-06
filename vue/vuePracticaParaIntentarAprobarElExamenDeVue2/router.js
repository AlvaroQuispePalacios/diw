import Formpost from "./Formpost.js";
import Containerposts from "./Containerposts.js";
const routes = [
    {
        path: "/",
        name: "Containerposts",
        component: Containerposts
    },
    {
        path: "/formpost/:index?",
        name: "Formpost",
        component: Formpost 
    }

]

const router = VueRouter.createRouter({
    history: VueRouter.createWebHistory(),
    routes
})

export default router;