<template>
  <Transition name="fade">
    <div 
      v-if="loading"
      class="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center"
    >
      <div class="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-xl">
        <div class="flex flex-col items-center space-y-4">
          <el-icon class="animate-spin text-blue-600 dark:text-blue-400" :size="40">
            <component :is="Loading" />
          </el-icon>
          <span class="text-gray-900 dark:text-gray-100">{{ message || '加载中...' }}</span>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { Loading } from '@element-plus/icons-vue'
import { useAppStore } from '@/stores/app'
import { storeToRefs } from 'pinia'

const appStore = useAppStore()
const { loading } = storeToRefs(appStore)

defineProps<{
  message?: string
}>()
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style> 