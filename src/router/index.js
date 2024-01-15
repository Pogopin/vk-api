import { createRouter, createWebHistory } from 'vue-router'
import SignUpPage from '../views/SignUpPage.vue'
import SignInPage from '../views/SignInPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [   
    {
      path: '/',
      name: 'signin',
      component: SignInPage
    },
    {
      path: '/signup',
      name: 'signup',
      component: SignUpPage
    },    
    
  ]
})

export default router
