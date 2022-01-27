import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        redirect: '/form',
    },
    {
        path: '/form',
        name: 'Form',
        component: () => import('../views/Form/Form.vue'),
    },

]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router
