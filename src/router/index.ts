import { createRouter, createWebHistory } from 'vue-router';
import Devices from '../views/Devices.vue';

const routes = [
  {
    path: '/',
    name: 'devices',
    component: Devices
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
