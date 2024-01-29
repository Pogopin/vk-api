import { createRouter, createWebHistory } from 'vue-router';
import HomeVkPage from '../views/HomeView.vue';
import SignUpPage from '../views/SignUpPage.vue';
import SignInPage from '../views/SignInPage.vue';
import { getTokenInCookies } from '@/utils/cookies.js';

import { useUsersStore } from '@/stores/usersStore.js';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'main',
      meta: {
        authStatus: true
      },
      component: HomeVkPage
    },
    {
      path: '/signup',
      name: 'signup',
      component: SignUpPage
    },
    {
      path: '/signin',
      name: 'signin',
      component: SignInPage
    },

  ]
})
router.beforeEach(async (to, from, next) => {
  const token = getTokenInCookies();
  if(token === undefined && to.meta.authStatus) {
    next({
      path: '/signin',
    })
  }
  next();
})

export default router
