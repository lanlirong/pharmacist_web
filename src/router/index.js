import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'Home',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "home" */ '../views/home/index.vue')
  },
  {
    path: '/drug',
    name: 'Drug',
    component: () =>
      import(/* webpackChunkName: "drug" */ '../views/drug/index.vue')
  },
  {
    path: '/:catchAll(.*)',
    name: '/404',
    component: () => import(/* webpackChunkName: "about" */ '../views/404.vue')
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router;
