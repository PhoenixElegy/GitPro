import { createRouter, createWebHashHistory } from "vue-router"
const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            path: "/:catchAll(.*)",
            component: () => import("../pages/NotFound.vue")
        },
        {
            path: "/home",
            name: "Home",
            component: () => import("../components/home/Home.vue")
        },
        {
            path : '/login',
            name: "Login",
            component: () => import("../components/login/Login.vue")
        },

    ]
})

export default router