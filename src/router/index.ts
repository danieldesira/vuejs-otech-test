import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue'),
    },
    {
      path: '/new-task',
      name: 'new-task',
      component: () => import('../views/NewTask.vue'),
    },
    {
      path: '/edit-task/:id',
      name: 'edit-task',
      component: () => import('../views/EditTask.vue'),
    },
  ],
})

export default router
