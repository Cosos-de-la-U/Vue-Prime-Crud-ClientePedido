import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
  {
    path: "/",
    redirect: "/persona",
  },
  {
    path: "/persona",
    name: "persona",
    component: () =>
      import(/* webpackChunkName: "clientes" */ "@/components/CrudPersona.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
