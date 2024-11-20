import { createRouter, createWebHistory } from 'vue-router'
import GitGuide from '@/pages/GitGuide.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: () => import('@/pages/Articles.vue')
    },
    {
      path: '/articles',
      component: () => import('@/pages/Articles.vue')
    },
    {
      path: '/categories',
      component: () => import('@/pages/Categories.vue')
    },
    {
      path: '/tags',
      component: () => import('@/pages/Tags.vue')
    },
    {
      path: '/about',
      component: () => import('@/pages/About.vue')
    },
    {
      path: '/git-guide',
      name: 'GitGuide',
      component: GitGuide
    }
  ]
})

export default router
