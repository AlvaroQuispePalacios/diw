import Containerposts from "./Containerposts.js";
import Formcreatepost from "./Formcreatepost.js";
const routes = [
    {
        path: "/",
        component: Containerposts
    },
    {
        path: "/createPost",
        component: Formcreatepost
    }
]

const router = VueRouter.createRouter({
    history: VueRouter.createWebHistory(),
    routes
})

export default router;