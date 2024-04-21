import {createRouter, createWebHistory} from 'vue-router';
import HomePage from './components/HomePage.vue';
import Response from './components/ResponsePage.vue';


const routes = [
  { path: '/', name:"Home", component: HomePage },
  { path: '/response', name:"response", component: Response }
];



const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router
