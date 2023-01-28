import { createRouter, createWebHistory } from 'vue-router'


//路由数组的类型 RouteRecordRaw
const routes = [
  {
    path: "/",
    name: 'home', 
    component: () => import("../components/HelloWorld.vue"),
  },
 
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;

