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
    redirect: '/drug/search',
    component: { render: h => h('router-view', '') },
    children: [
      {
        path: 'search',
        name: 'DrugSearch',
        component: () =>
          import(/* webpackChunkName: "drug" */ '../views/drug/index.vue')
      },
      {
        path: 'detail',
        name: 'DrugDetail',
        component: () =>
          import(/* webpackChunkName: "drug" */ '../views/drug/detail.vue')
      }
    ]
  },
  {
    path: '/error',
    name: '/error',
    component: () =>
      import(/* webpackChunkName: "error" */ '../views/error.vue')
  },
  {
    path: '/:catchAll(.*)',
    name: '/404',
    component: () => import(/* webpackChunkName: "404" */ '../views/404.vue')
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router;
