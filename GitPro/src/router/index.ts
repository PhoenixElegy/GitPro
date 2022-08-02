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
            component: () => import("../components/home/Home.vue"),
            children: [{
                path: "/page1",
                name: "page1",
                component: () => import("../pages/Echart/page1.vue")
            }]
        },
        {
            path : '/login',
            name: "Login",
            component: () => import("../components/login/Login.vue")
        },

    ]
})

export default router