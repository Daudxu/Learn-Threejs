import { createRouter, createWebHistory } from 'vue-router'

//路由数组的类型 RouteRecordRaw
const routes = [
  {
    path: "/",
    name: 'home', 
    component: () => import("../view/home/Home.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;

