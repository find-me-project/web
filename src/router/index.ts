import Vue from 'vue';
import type { RouteConfig } from 'vue-router';
import VueRouter from 'vue-router';
import Home from '../views/HomePage.vue';

Vue.use(VueRouter);

export const route = {
  home: 'Home',
  profile: 'Profile',
};

const routes: RouteConfig[] = [
  {
    path: '/',
    name: route.home,
    component: Home,
  },
  {
    path: '/profile',
    name: route.profile,
    component: async () => import(/* webpackChunkName: "profile" */ '@/views/Profile/Profile.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: routes,
});

export default router;
