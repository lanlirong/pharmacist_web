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
    path: '/interaction',
    name: 'Interaction',
    redirect: '/interaction/search',
    component: { render: h => h('router-view', '') },
    children: [
      {
        path: 'search',
        name: 'InteractionSearch',
        component: () =>
          import(
            /* webpackChunkName: "interaction" */ '../views/interaction/index.vue'
          )
      },
      {
        path: 'detail',
        name: 'InteractionDetail',
        component: () =>
          import(
            /* webpackChunkName: "interaction" */ '../views/interaction/detail.vue'
          )
      }
    ]
  },
  {
    path: '/disease',
    name: 'Disease',
    redirect: '/disease/search',
    component: { render: h => h('router-view', '') },
    children: [
      {
        path: 'search',
        name: 'DiseaseSearch',
        component: () =>
          import(/* webpackChunkName: "disease" */ '../views/disease/index.vue')
      },
      {
        path: 'detail',
        name: 'DiseaseDetail',
        component: () =>
          import(
            /* webpackChunkName: "disease" */ '../views/disease/detail.vue'
          )
      }
    ]
  },
  {
    path: '/consult',
    name: 'Consult',
    redirect: '/consult/search',
    component: { render: h => h('router-view', '') },
    children: [
      {
        path: 'search',
        name: 'ConsultSearch',
        component: () =>
          import(/* webpackChunkName: "consult" */ '../views/consult/index.vue')
      },
      {
        path: 'detail',
        name: 'ConsultDetail',
        component: () =>
          import(
            /* webpackChunkName: "consult" */ '../views/consult/detail.vue'
          )
      }
    ]
  },
  {
    path: '/science',
    name: 'science',
    redirect: '/science/search',
    component: { render: h => h('router-view', '') },
    children: [
      {
        path: 'search',
        name: 'scienceSearch',
        component: () =>
          import(/* webpackChunkName: "science" */ '../views/science/index.vue')
      },
      {
        path: 'detail',
        name: 'scienceDetail',
        component: () =>
          import(
            /* webpackChunkName: "science" */ '../views/science/detail.vue'
          )
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
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
});

export default router;
