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
                path: "/home/page1",
                name: "page1",
                component: () => import("../pages/Echart/page1.vue")
            },
            {
                path: "/home/game1",
                name: "game1",
                component: () => import("../pages/Game/game1.vue")
            }
            ,
            {
                path: "/home/game2",
                name: "game2",
                component: () => import("../pages/Game/game2.vue")
            },
            {
                path: "/home/game3",
                name: "game3",
                component: () => import("../pages/Game/game3.vue")
            },
            {
                path: "/home/game4",
                name: "game4",
                component: () => import("../pages/Game/game4.vue")
            }
        ],
        },
        {
            path : '/login',
            name: "Login",
            component: () => import("../components/login/Login.vue")
        }
    ]
})

export default router