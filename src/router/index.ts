import { createRouter, createWebHistory } from 'vue-router';
import Devices from '@/views/Devices.vue';

export default createRouter({
  history: createWebHistory(),
  routes: [{ path: '/', name: 'devices', component: Devices }],
});
