import {
    createRouter,
    createWebHashHistory
} from 'vue-router'

const routes = [{
        path: '/',
        name: 'home',
        component: () => import( /* webpackChunkName: "clientes" */ '@/components/CrudCliente.vue')
    },
    {
        path: '/clientes',
        name: 'clientes',
        component: () => import( /* webpackChunkName: "clientes" */ '@/components/CrudCliente.vue')
    },
    {
        path: '/pedidos',
        name: 'pedidos',
        component: () => import( /* webpackChunkName: "clientes" */ '@/components/CrudPedido.vue')
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router;