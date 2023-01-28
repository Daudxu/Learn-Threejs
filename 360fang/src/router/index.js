// router/index.ts

//引入路由对象
import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

//路由数组的类型 RouteRecordRaw
const routes = [
  {
    path: "/",
    name: 'Login', //router-link跳转方式需要改变 变为对象并且有对应name
    component: () => import("../components/login.vue"),
    children: [
      {
        path: "", // 默认展示
        name: 'Home', 
        component: () => import("../components/home.vue"),
      },
      {
        path: "/hello",
        name: 'Hello',
        component: () => import("../components/HelloWorld.vue"),
      },
    ]
  },
 
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;

