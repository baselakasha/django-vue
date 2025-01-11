import { createRouter, createWebHistory } from 'vue-router'
import { isLoggedIn } from 'axios-jwt'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue')
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/RegisterView.vue')
    }
  ]
})

router.beforeEach(async (to, from, next) => {
  const publicPages = ['/login', '/register']
  const authRequired = !publicPages.includes(to.path)
  const loggedIn = await isLoggedIn()

  if ((to.path === '/login' || to.path == '/register') && loggedIn) {
    return next('/')
  }

  if (authRequired && !loggedIn) {
    return next('/login')
  }

  next()
})

export default router
