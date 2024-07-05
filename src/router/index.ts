import { createRouter, RouteRecordRaw, createWebHashHistory } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue'),
    meta: {
      keepAlive: false, //此页面需要缓存
    },

  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})


export default router