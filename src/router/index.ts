import { createRouter, createWebHistory } from 'vue-router';
import TaskView from "@/views/task/TaskView.vue";
import LoginView from "@/views/auth/LoginView.vue";
import RegisterView from "@/views/auth/RegisterView.vue";
import AuthService from "@/views/auth/service/AuthService.ts";
import NotFound from "@/views/pages/NotFound.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: to => {
        return AuthService.isAuthenticated() ? { name: 'home' } : { name: 'login' };
      },
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
      meta: { requiresGuest: true }, 
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView,
      meta: { requiresGuest: true }, 
    },
    {
      path: '/main',
      name: 'home',
      component: TaskView,
      meta: { requiresAuth: true },
    },
    {
      path: '/:pathMatch(.*)*', 
      name: 'not-found',
      component: NotFound,
    },
  ],
});

router.beforeEach((to, from, next) => {
  const isAuthenticated = AuthService.isAuthenticated();
  
  if (isAuthenticated && (to.name === 'login' || to.name === 'register')) {
    next({ name: 'home' });
  }
  else if (to.meta.requiresAuth && !isAuthenticated) {
    next({ name: 'login' });
  }
  else if (to.meta.requiresGuest && isAuthenticated) {
    next({ name: 'home' });
  } 
  else {
    next();
  }
});

export default router;
