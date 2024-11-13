<template>
  <div class="layout">
    <AppNav />
    
    <main class="main-content">
      <router-view />
    </main>

    <AppFooter />
  </div>
</template>

<script setup lang="ts">
import AppNav from '@/components/common/AppNav.vue'
import AppFooter from '@/components/common/AppFooter.vue'
</script>

<style scoped lang="scss">
.layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: var(--bg-primary);
}

.main-content {
  flex: 1;
  display: flex;
  flex-direction: column;
}
</style> 