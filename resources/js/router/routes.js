import { createRouter, createWebHistory } from 'vue-router';
import { useHttpStore } from '../Store/HttpStore';
import { useUserStore } from '../Store/UserStore';

const routes = [
    {
        path: "/",
        component: () => import("../Pages/HomePage.vue"),
        name: "home",
        meta: {
            AuthRequired: true
        }
    },
    {
        path: "/login",
        component: () => import("../Pages/LoginPage.vue"),
        name: "login",
        meta: {
            AuthRequired: false
        }
    },
    {
        path: "/register",
        component: () => import("../Pages/RegisterPage.vue"),
        name: "register",
        meta: {
            AuthRequired: false
        }
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach( async (to, from, next) => {
    if(to.meta.AuthRequired) {
        if(localStorage.getItem('access_token') && localStorage.getItem('access_token') != "") {
            const http = useHttpStore();
            http.httpRequest(
                'GET',
                '/api/user',
                {
                    'Authorization': 'Bearer ' + localStorage.getItem('access_token')
                },
                {},
                false
            ).then((response) => {
                const user = useUserStore();
                console.log(response);
                user.setNome(response.name);
                user.setEmail(response.email);
                return next();
            }).catch((error) => {
                console.log(error);
                return next({name: 'login'});
            })
        } else {
            return next({name: 'login'});
        }
    }

    return next();
})

export default router


