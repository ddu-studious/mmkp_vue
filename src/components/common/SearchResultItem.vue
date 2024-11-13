<template>
  <div class="search-result-item" @click="handleClick">
    <div class="result-content">
      <h3 class="result-title">
        <i :class="getCategoryIcon(result.category)"></i>
        {{ result.title }}
      </h3>
      <p class="result-excerpt">{{ result.excerpt }}</p>
      <div class="result-meta">
        <span class="result-category">{{ result.category }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { SearchResult } from '@/types'

const props = defineProps<{
  result: SearchResult
}>()

const emit = defineEmits<{
  click: [result: SearchResult]
}>()

function getCategoryIcon(category: string): string {
  const icons: Record<string, string> = {
    'Vue.js': 'fab fa-vuejs',
    'React': 'fab fa-react',
    'TypeScript': 'fas fa-code',
    'Node.js': 'fab fa-node-js',
    'default': 'fas fa-file-alt'
  }
  return icons[category] || icons.default
}

function handleClick() {
  emit('click', props.result)
}
</script>

<style scoped lang="scss">
.search-result-item {
  padding: 1rem;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: var(--bg-hover);
  }
}

.result-title {
  font-size: 1rem;
  margin: 0 0 0.5rem;
  color: var(--text-primary);
  display: flex;
  align-items: center;
  gap: 0.5rem;

  i {
    color: var(--text-secondary);
    font-size: 0.9rem;
  }
}

.result-excerpt {
  font-size: 0.9rem;
  color: var(--text-secondary);
  margin: 0 0 0.5rem;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.result-meta {
  display: flex;
  align-items: center;
  gap: 1rem;
  font-size: 0.8rem;
  color: var(--text-secondary);
}

.result-category {
  padding: 0.2em 0.6em;
  background: var(--bg-secondary);
  border-radius: 4px;
}
</style> 