import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import { useThemeStore } from './stores/theme'
import type { Component } from 'vue'

// 导入样式
import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/dark/css-vars.css'
import '@/assets/styles/main.scss'

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)

// 初始化主题
const themeStore = useThemeStore()
themeStore.initTheme()

// 注册所有 Element Plus 图标
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component as Component)
}

app.use(ElementPlus)
app.use(router)

app.mount('#app') 