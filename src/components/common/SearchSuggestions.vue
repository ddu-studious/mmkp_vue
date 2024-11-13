<template>
  <div 
    v-if="showSuggestions" 
    class="search-suggestions"
    v-click-outside="closeSuggestions"
  >
    <div v-if="loading" class="suggestions-loading">
      <LoadingSpinner :loading="true" />
    </div>
    <div v-else-if="error" class="suggestions-error">
      <ErrorMessage :error="error" />
    </div>
    <template v-else>
      <div v-if="suggestions.length" class="suggestions-list">
        <button
          v-for="suggestion in suggestions"
          :key="suggestion.id"
          class="suggestion-item"
          @click="selectSuggestion(suggestion)"
        >
          <span class="suggestion-title" v-html="highlightMatch(suggestion.title)"></span>
          <span class="suggestion-category">{{ suggestion.category }}</span>
        </button>
      </div>
      <div v-else class="no-suggestions">
        没有找到相关内容
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useSearch } from '@/composables/useSearch'
import LoadingSpinner from './LoadingSpinner.vue'
import ErrorMessage from './ErrorMessage.vue'
import type { SearchResult } from '@/types'

interface Props {
  query: string
  minLength?: number
  maxSuggestions?: number
}

const props = withDefaults(defineProps<Props>(), {
  minLength: 2,
  maxSuggestions: 5
})

const emit = defineEmits<{
  (e: 'select', suggestion: SearchResult): void
  (e: 'close'): void
}>()

const showSuggestions = ref(false)
const suggestions = ref<SearchResult[]>([])
const loading = ref(false)
const error = ref<string | null>(null)

const { searchSuggestions } = useSearch()

const fetchSuggestions = async () => {
  if (props.query.length < props.minLength) {
    suggestions.value = []
    return
  }

  loading.value = true
  error.value = null

  try {
    const results = await searchSuggestions(props.query)
    suggestions.value = results.slice(0, props.maxSuggestions)
    showSuggestions.value = true
  } catch (e) {
    error.value = e instanceof Error ? e.message : '搜索失败'
  } finally {
    loading.value = false
  }
}

const selectSuggestion = (suggestion: SearchResult) => {
  emit('select', suggestion)
  closeSuggestions()
}

const closeSuggestions = () => {
  showSuggestions.value = false
  emit('close')
}

const highlightMatch = (text: string) => {
  if (!props.query) return text
  const regex = new RegExp(`(${props.query})`, 'gi')
  return text.replace(regex, '<mark>$1</mark>')
}

watch(() => props.query, fetchSuggestions)
</script>

<style scoped lang="scss">
.search-suggestions {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  margin-top: 0.5rem;
  background: var(--bg-primary);
  border: 1px solid var(--border-color);
  border-radius: 8px;
  box-shadow: var(--shadow-lg);
  max-height: 300px;
  overflow-y: auto;
  z-index: 1000;
}

.suggestions-loading,
.suggestions-error,
.no-suggestions {
  padding: 1rem;
  text-align: center;
  color: var(--text-secondary);
}

.suggestion-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 0.75rem 1rem;
  border: none;
  background: none;
  text-align: left;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background: var(--bg-secondary);
  }

  &:not(:last-child) {
    border-bottom: 1px solid var(--border-color);
  }
}

.suggestion-title {
  color: var(--text-primary);
  font-weight: 500;

  :deep(mark) {
    background: var(--primary-light);
    color: var(--primary-color);
    padding: 0.1em 0.2em;
    border-radius: 2px;
  }
}

.suggestion-category {
  font-size: 0.875rem;
  color: var(--text-tertiary);
  padding: 0.25rem 0.5rem;
  background: var(--bg-secondary);
  border-radius: 4px;
}
</style> 