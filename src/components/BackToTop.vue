<template>
  <div v-show="showBackToTop" 
       @click="scrollToTop"
       class="back-to-top">
    <i class="fas fa-arrow-up"></i>
  </div>
</template>

<style scoped>
.back-to-top {
  @apply fixed bottom-8 right-8 w-12 h-12 
         bg-blue-600 text-white rounded-full 
         flex items-center justify-center 
         cursor-pointer shadow-lg 
         hover:bg-blue-700 transition-colors
         z-50;
}
</style> 

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const showBackToTop = ref(false)

const handleScroll = () => {
  showBackToTop.value = window.scrollY > 300
}

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script> 