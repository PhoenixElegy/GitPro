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
                path: "/home/page2",
                name: "page2",
                component: () => import("../pages/Echart/page2.vue")
            },
            
            {
                path: "/home/page3",
                name: "page3",
                component: () => import("../pages/Echart/page3.vue")
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
            },
            {
                path: "/home/game5",
                name: "game5",
                component: () => import("../pages/Game/game5.vue")
            },
            {
                path: "/home/game6",
                name: "game6",
                component: () => import("../pages/Game/game6.vue")
            },
            {
                path: "/home/game7",
                name: "game7",
                component: () => import("../pages/Game/game7.vue")
            },
            {
                path: "/home/Map1",
                name: "Map1",
                component: () => import("../pages/ArcGIS/Map1.vue")
            },
            {
                path: "/home/Map2",
                name: "Map2",
                component: () => import("../pages/ArcGIS/MapCore.vue")
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