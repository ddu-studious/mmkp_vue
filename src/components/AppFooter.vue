<template>
  <footer class="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
        <!-- About Section -->
        <div class="space-y-4">
          <h3 class="text-lg font-semibold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent flex items-center space-x-2">
            <el-icon size="20" class="text-blue-500"><InfoFilled /></el-icon>
            <span>关于博客</span>
          </h3>
          <p class="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
            分享技术经验，记录学习心得，共同成长进步。专注于前端开发、后端技术、云原生等领域。
          </p>
        </div>

        <!-- Quick Links -->
        <div class="space-y-4">
          <h3 class="text-lg font-semibold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent flex items-center space-x-2">
            <el-icon size="20" class="text-blue-500"><Link /></el-icon>
            <span>快速链接</span>
          </h3>
          <div class="flex flex-col space-y-3">
            <router-link 
              v-for="link in quickLinks" 
              :key="link.path"
              :to="link.path" 
              class="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 flex items-center space-x-2 transition-colors group"
            >
              <el-icon class="group-hover:scale-110 transition-transform">
                <component :is="link.icon" />
              </el-icon>
              <span>{{ link.name }}</span>
            </router-link>
          </div>
        </div>

        <!-- Contact -->
        <div class="space-y-4">
          <h3 class="text-lg font-semibold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent flex items-center space-x-2">
            <el-icon size="20" class="text-blue-500"><Message /></el-icon>
            <span>联系方式</span>
          </h3>
          <div class="flex flex-col space-y-3">
            <el-tooltip
              v-for="contact in contacts"
              :key="contact.name"
              :content="contact.tooltip"
              placement="top"
              :show-after="300"
            >
              <a 
                :href="contact.link" 
                :target="contact.external ? '_blank' : '_self'"
                class="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 flex items-center space-x-2 transition-colors group"
              >
                <el-icon class="group-hover:scale-110 transition-transform">
                  <component :is="contact.icon" />
                </el-icon>
                <span>{{ contact.name }}</span>
              </a>
            </el-tooltip>
          </div>
        </div>

        <!-- Subscribe -->
        <div class="space-y-4">
          <h3 class="text-lg font-semibold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent flex items-center space-x-2">
            <el-icon size="20" class="text-blue-500"><Bell /></el-icon>
            <span>订阅更新</span>
          </h3>
          <p class="text-sm text-gray-600 dark:text-gray-400">
            订阅最新文章和更新通知
          </p>
          <div class="flex space-x-2">
            <el-input 
              v-model="email" 
              placeholder="输入您的邮箱"
              size="default"
              class="flex-1"
            >
              <template #prefix>
                <el-icon><Message /></el-icon>
              </template>
            </el-input>
            <el-button 
              type="primary" 
              class="!flex items-center !h-[32px]"
              :loading="subscribing"
              @click="handleSubscribe"
            >
              <el-icon class="mr-1"><Bell /></el-icon>
              订阅
            </el-button>
          </div>
        </div>
      </div>

      <!-- Bottom Section -->
      <div class="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800">
        <div class="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div class="text-sm text-gray-500 dark:text-gray-400">
            © {{ new Date().getFullYear() }} 技术博客. 保留所有权利.
          </div>
          <div class="flex space-x-6">
            <el-tooltip
              v-for="link in bottomLinks"
              :key="link.name"
              :content="link.tooltip"
              placement="top"
              :show-after="300"
            >
              <a 
                :href="link.path" 
                class="text-sm text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 flex items-center space-x-2 transition-colors group"
              >
                <el-icon class="group-hover:scale-110 transition-transform">
                  <component :is="link.icon" />
                </el-icon>
                <span>{{ link.name }}</span>
              </a>
            </el-tooltip>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import {
  HomeFilled,
  Document,
  Collection,
  Folder,
  Message,
  Platform,
  Bell,
  Lock,
  Link,
  InfoFilled
} from '@element-plus/icons-vue'

const email = ref('')
const subscribing = ref(false)

const quickLinks = [
  { name: '首页', path: '/', icon: HomeFilled },
  { name: '文章列表', path: '/articles', icon: Document },
  { name: '分类专栏', path: '/categories', icon: Collection },
  { name: '归档', path: '/archives', icon: Folder }
]

const contacts = [
  { 
    name: '邮箱联系', 
    link: 'mailto:contact@example.com', 
    icon: Message, 
    external: false,
    tooltip: '点击发送邮件'
  },
  { 
    name: 'GitHub', 
    link: 'https://github.com/yourusername', 
    icon: Platform, 
    external: true,
    tooltip: '访问 GitHub 主页'
  }
]

const bottomLinks = [
  { name: '隐私政策', path: '/privacy', icon: Lock, tooltip: '查看隐私政策' },
  { name: '使用条款', path: '/terms', icon: Document, tooltip: '查看使用条款' }
]

const handleSubscribe = async () => {
  if (!email.value) {
    ElMessage.warning('请输入邮箱地址')
    return
  }
  
  subscribing.value = true
  try {
    // 模拟订阅请求
    await new Promise(resolve => setTimeout(resolve, 1000))
    ElMessage.success('订阅成功！')
    email.value = ''
  } catch (error) {
    ElMessage.error('订阅失败，请稍后重试')
  } finally {
    subscribing.value = false
  }
}
</script>

<style scoped>
:deep(.el-input__wrapper) {
  @apply dark:!bg-gray-800 dark:!border-gray-700;
}

:deep(.el-input__inner) {
  @apply dark:!text-gray-200 dark:placeholder:text-gray-500;
}

:deep(.el-button--primary) {
  @apply !bg-blue-600 hover:!bg-blue-700 dark:!bg-blue-500 dark:hover:!bg-blue-600;
}

:deep(.el-icon) {
  @apply transition-transform;
}
</style> 