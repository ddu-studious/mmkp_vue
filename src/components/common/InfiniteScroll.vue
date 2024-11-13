<template>
  <div class="infinite-scroll" ref="scrollContainer">
    <slot></slot>
    <div class="loading-trigger" ref="loadingTrigger">
      <LoadingSpinner v-if="loading" :loading="loading" />
      <div v-else-if="error" class="error">
        <ErrorMessage :error="error" :retry="retry" />
      </div>
      <div v-else-if="!hasMore" class="no-more">
        {{ noMoreText }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import LoadingSpinner from './LoadingSpinner.vue'
import ErrorMessage from './ErrorMessage.vue'

interface Props {
  loading?: boolean
  error?: string | null
  hasMore?: boolean
  threshold?: number
  noMoreText?: string
  disabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  loading: false,
  error: null,
  hasMore: true,
  threshold: 100,
  noMoreText: '没有更多数据了',
  disabled: false
})

const emit = defineEmits<{
  (e: 'load'): void
  (e: 'retry'): void
}>()

const scrollContainer = ref<HTMLElement>()
const loadingTrigger = ref<HTMLElement>()
let observer: IntersectionObserver | null = null

const retry = () => {
  emit('retry')
}

const setupIntersectionObserver = () => {
  if (!window.IntersectionObserver) return

  observer = new IntersectionObserver(
    (entries) => {
      const target = entries[0]
      if (target.isIntersecting && !props.loading && !props.error && props.hasMore && !props.disabled) {
        emit('load')
      }
    },
    {
      root: scrollContainer.value,
      rootMargin: `${props.threshold}px`,
      threshold: 0
    }
  )

  if (loadingTrigger.value) {
    observer.observe(loadingTrigger.value)
  }
}

onMounted(() => {
  setupIntersectionObserver()
})

onUnmounted(() => {
  if (observer) {
    observer.disconnect()
    observer = null
  }
})
</script>

<style scoped lang="scss">
.infinite-scroll {
  position: relative;
  min-height: 100px;
}

.loading-trigger {
  padding: 1rem;
  text-align: center;
}

.no-more {
  padding: 1rem;
  color: var(--text-tertiary);
  font-size: 0.875rem;
  text-align: center;
}

.error {
  padding: 1rem;
}
</style> 