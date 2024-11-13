<template>
  <div class="article-page">
    <article class="article-content">
      <h1>{{ article?.title }}</h1>
      <!-- 文章内容将在后续实现 -->
    </article>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const article = ref(null)

// TODO: 根据 route.params.id 获取文章详情
</script>

<style scoped lang="scss">
.article-page {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

.article-content {
  background: var(--bg-primary);
  border-radius: 16px;
  padding: 2rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
}
</style> 