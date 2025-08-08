import { createRouter, createWebHistory } from 'vue-router';
import AuthorizationCode from '../views/AuthorizationCode.vue';
import TrafficLog from "../views/TrafficLog.vue";

const routes = [
    { path: '/', component: AuthorizationCode },
    { path: '/logs', component: TrafficLog },
];

export default createRouter({
    history: createWebHistory(),
    routes,
});
