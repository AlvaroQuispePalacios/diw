import ListPosts from "./ListPosts.js";
import Formcreateeditpost from "./Formcreateeditpost.js";
const routes = [
    {
        path: "/",
        name: "ListPosts",
        component: ListPosts
    },
    {
        path: "/form",
        name: "Formcreateeditpost",
        component: Formcreateeditpost
    },
    {
        path: "/form/:btnCreatePost?/a/:btnSetPost?",
        name: "Formcreateeditpost",
        component: Formcreateeditpost
    },
    {
        path: "/form/:btnCreatePost?/a/:btnSetPost?/i/:index?",
        name: "Formcreateeditpost",
        component: Formcreateeditpost
    }

];

const router = VueRouter.createRouter({
    history: VueRouter.createWebHistory(),
    routes
});

export default router;