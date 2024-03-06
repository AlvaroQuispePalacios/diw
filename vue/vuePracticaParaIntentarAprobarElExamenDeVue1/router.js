import Containerposts from "./Containerposts.js";
import Formcreatepost from "./Formcreatepost.js";
const routes = [
    {
        path: "/",
        component: Containerposts
    },
    {
        path: "/createPost/:index?/create/:isCreate?",
        component: Formcreatepost,
        name: "Formpost"
    },

]

const router = VueRouter.createRouter({
    history: VueRouter.createWebHistory(),
    routes
})

export default router;