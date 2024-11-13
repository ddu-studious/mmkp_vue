import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import { Icon } from '@iconify/vue'

// 导入全局样式
import './assets/styles/variables/_colors.scss'
import './assets/styles/main.scss'

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(router)
app.component('Icon', Icon)

app.mount('#app') 