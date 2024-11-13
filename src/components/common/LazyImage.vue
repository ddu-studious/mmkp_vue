<template>
  <div class="lazy-image" :class="{ loaded: isLoaded }">
    <img
      ref="imageRef"
      :src="placeholder"
      :data-src="src"
      :alt="alt"
      @load="handleLoad"
      @error="handleError"
    >
    <div v-if="!isLoaded" class="placeholder">
      <LoadingSpinner :loading="true" />
    </div>
    <div v-if="error" class="error">
      <ErrorMessage :error="error" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import LoadingSpinner from './LoadingSpinner.vue'
import ErrorMessage from './ErrorMessage.vue'

interface Props {
  src: string
  alt?: string
  placeholder?: string
  threshold?: number
}

const props = withDefaults(defineProps<Props>(), {
  alt: '',
  placeholder: 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7',
  threshold: 0.5
})

const emit = defineEmits<{
  (e: 'load'): void
  (e: 'error', error: string): void
}>()

const imageRef = ref<HTMLImageElement>()
const isLoaded = ref(false)
const error = ref<string | null>(null)
let observer: IntersectionObserver | null = null

const handleLoad = () => {
  isLoaded.value = true
  emit('load')
}

const handleError = () => {
  error.value = '图片加载失败'
  emit('error', error.value)
}

const loadImage = () => {
  if (!imageRef.value) return
  
  const actualSrc = imageRef.value.dataset.src
  if (actualSrc) {
    imageRef.value.src = actualSrc
  }
}

onMounted(() => {
  if (!window.IntersectionObserver) {
    loadImage()
    return
  }

  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          loadImage()
          observer?.unobserve(entry.target)
        }
      })
    },
    {
      threshold: props.threshold
    }
  )

  if (imageRef.value) {
    observer.observe(imageRef.value)
  }
})

onUnmounted(() => {
  if (observer && imageRef.value) {
    observer.unobserve(imageRef.value)
    observer = null
  }
})
</script>

<style scoped lang="scss">
.lazy-image {
  position: relative;
  width: 100%;
  height: 0;
  padding-bottom: 56.25%; // 16:9 aspect ratio
  background: var(--bg-secondary);
  border-radius: 8px;
  overflow: hidden;

  img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  &.loaded img {
    opacity: 1;
  }
}

.placeholder {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--bg-secondary);
}

.error {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  color: var(--error);
  padding: 1rem;
}
</style> 