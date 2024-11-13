<template>
  <nav class="pagination" role="navigation" aria-label="分页">
    <button 
      class="page-btn prev"
      :disabled="currentPage === 1"
      @click="handlePageChange(currentPage - 1)"
      aria-label="上一页"
    >
      <svg viewBox="0 0 24 24" width="16" height="16">
        <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
      </svg>
    </button>

    <div class="page-numbers">
      <button 
        v-for="page in displayedPages" 
        :key="page"
        class="page-btn number"
        :class="{ active: page === currentPage }"
        @click="handlePageChange(page)"
        :aria-current="page === currentPage ? 'page' : undefined"
      >
        {{ page }}
      </button>
    </div>

    <button 
      class="page-btn next"
      :disabled="currentPage === totalPages"
      @click="handlePageChange(currentPage + 1)"
      aria-label="下一页"
    >
      <svg viewBox="0 0 24 24" width="16" height="16">
        <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/>
      </svg>
    </button>
  </nav>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  currentPage: number
  totalPages: number
  maxDisplayed?: number
}

const props = withDefaults(defineProps<Props>(), {
  maxDisplayed: 5
})

const emit = defineEmits<{
  (e: 'page-change', page: number): void
}>()

const displayedPages = computed(() => {
  const { currentPage, totalPages, maxDisplayed } = props
  const pages: number[] = []
  
  if (totalPages <= maxDisplayed) {
    return Array.from({ length: totalPages }, (_, i) => i + 1)
  }

  const halfDisplay = Math.floor(maxDisplayed / 2)
  let start = currentPage - halfDisplay
  let end = currentPage + halfDisplay

  if (start < 1) {
    start = 1
    end = maxDisplayed
  }

  if (end > totalPages) {
    end = totalPages
    start = totalPages - maxDisplayed + 1
  }

  for (let i = start; i <= end; i++) {
    pages.push(i)
  }

  return pages
})

const handlePageChange = (page: number) => {
  if (page !== props.currentPage && page >= 1 && page <= props.totalPages) {
    emit('page-change', page)
  }
}
</script>

<style scoped lang="scss">
.pagination {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  margin: 2rem 0;
}

.page-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 2rem;
  height: 2rem;
  padding: 0 0.5rem;
  border: 1px solid var(--border-color);
  border-radius: 4px;
  background: var(--bg-primary);
  color: var(--text-primary);
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover:not(:disabled) {
    border-color: var(--primary-color);
    color: var(--primary-color);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  &.active {
    background: var(--primary-color);
    border-color: var(--primary-color);
    color: white;
  }

  svg {
    fill: currentColor;
  }
}

.page-numbers {
  display: flex;
  gap: 0.25rem;
}

@media (max-width: 640px) {
  .page-numbers .page-btn:not(.active) {
    display: none;
  }
}
</style> 