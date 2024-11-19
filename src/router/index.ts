import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/pages/HomePage.vue'
import { useAppStore } from '@/stores/app'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePage
    },
    {
      path: '/articles',
      name: 'articles',
      component: () => import('@/pages/Articles.vue')
    },
    {
      path: '/article/:id',
      name: 'article',
      component: () => import('@/pages/ArticlePage.vue')
    },
    {
      path: '/categories',
      name: 'categories',
      component: () => import('@/pages/CategoriesPage.vue')
    },
    {
      path: '/tags',
      name: 'tags',
      component: () => import('@/pages/TagsPage.vue')
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('@/pages/AboutPage.vue')
    },
    {
      path: '/portfolio',
      name: 'portfolio',
      component: () => import('@/pages/PortfolioPage.vue')
    },
    {
      path: '/contact',
      name: 'contact',
      component: () => import('@/pages/ContactPage.vue')
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: () => import('@/pages/NotFoundPage.vue')
    }
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  }
})

router.beforeEach((to, from, next) => {
  const appStore = useAppStore()
  appStore.startLoading()
  next()
})

router.afterEach(() => {
  const appStore = useAppStore()
  // 添加一个小延迟，避免闪烁
  setTimeout(() => {
    appStore.stopLoading()
  }, 200)
})

router.onError((error) => {
  const appStore = useAppStore()
  appStore.setError('页面加载失败，请稍后重试')
  appStore.stopLoading()
})

export default router
