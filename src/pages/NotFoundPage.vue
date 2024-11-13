<template>
  <div class="not-found">
    <div class="content">
      <div class="error-code">404</div>
      <h1>页面未找到</h1>
      <p>抱歉，您访问的页面不存在或已被移除</p>
      <div class="actions">
        <router-link to="/" class="btn btn-primary">返回首页</router-link>
        <button @click="goBack" class="btn btn-outline">返回上一页</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()
const goBack = () => router.back()
</script>

<style scoped lang="scss">
.not-found {
  min-height: 60vh;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 2rem;
}

.content {
  max-width: 600px;
}

.error-code {
  font-size: 8rem;
  font-weight: 700;
  color: var(--primary-color);
  line-height: 1;
  margin-bottom: 1rem;
  font-family: "楷体", "STKaiti", serif;
  text-shadow: 4px 4px 0 var(--border-color);
}

h1 {
  font-size: 2rem;
  color: var(--text-primary);
  margin-bottom: 1rem;
}

p {
  color: var(--text-secondary);
  margin-bottom: 2rem;
}

.actions {
  display: flex;
  gap: 1rem;
  justify-content: center;
}
</style> 