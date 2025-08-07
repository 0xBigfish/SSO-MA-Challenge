import { createRouter, createWebHistory } from 'vue-router';
import AuthorizationCode from '../views/AuthorizationCode.vue';

const routes = [
    { path: '/', component: AuthorizationCode },
];

export default createRouter({
    history: createWebHistory(),
    routes,
});
