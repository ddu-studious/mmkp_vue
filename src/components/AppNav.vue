<script setup lang="ts">
import { RouterLink } from 'vue-router'
// 使用 Font Awesome 替代 Icon 组件
</script>

<template>
  <!-- 将 Icon 组件替换为 i 标签 -->
  <nav>
    <!-- ... 其他导航内容 ... -->
    <RouterLink to="/articles" class="nav-link">
      <i class="fas fa-book"></i>
      文章
    </RouterLink>
    <!-- ... 其他导航项 ... -->
  </nav>
</template> 