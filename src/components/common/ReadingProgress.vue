<template>
  <div 
    class="reading-progress" 
    :style="{ width: `${progress}%` }"
    role="progressbar"
    :aria-valuenow="progress"
    aria-valuemin="0"
    aria-valuemax="100"
  ></div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const progress = ref(0)

const calculateProgress = () => {
  const windowHeight = window.innerHeight
  const documentHeight = document.documentElement.scrollHeight - windowHeight
  const scrollTop = window.scrollY
  progress.value = Math.min(Math.round((scrollTop / documentHeight) * 100), 100)
}

onMounted(() => {
  window.addEventListener('scroll', calculateProgress)
  calculateProgress()
})

onUnmounted(() => {
  window.removeEventListener('scroll', calculateProgress)
})
</script>

<style scoped lang="scss">
.reading-progress {
  position: fixed;
  top: 0;
  left: 0;
  height: 2px;
  background: var(--primary-color);
  transition: width 0.2s ease;
  z-index: 1000;
}
</style> 