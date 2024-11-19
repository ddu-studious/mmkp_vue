<template>
  <LoadingOverlay />
  <DefaultLayout>
    <router-view v-slot="{ Component }">
      <transition name="fade" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
  </DefaultLayout>
</template>

<script setup lang="ts">
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import LoadingOverlay from '@/components/common/LoadingOverlay.vue'
</script>

<style>
@import 'element-plus/dist/index.css';
@import 'element-plus/theme-chalk/dark/css-vars.css';

/* 基础样式重置 */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

/* 主题切换过渡 */
html {
  transition: background-color 0.3s ease;
}

html.dark {
  @apply bg-gray-900;
}

body {
  transition: color 0.3s ease;
  overflow-x: hidden;
  min-width: 320px;
}

/* 链接样式 */
a {
  @apply text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300;
  text-decoration: none;
}

/* 文本选择样式 */
::selection {
  @apply bg-blue-500/20 dark:bg-blue-400/20;
}

/* 图片拖动禁用 */
img {
  -webkit-user-drag: none;
  user-select: none;
}

/* 平滑滚动 */
html {
  scroll-behavior: smooth;
  scroll-padding-top: 64px;
}

/* 移动端点击高亮禁用 */
* {
  -webkit-tap-highlight-color: transparent;
}
</style>