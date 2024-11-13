<template>
  <div class="tag-select">
    <div class="selected-tags">
      <span
        v-for="tag in modelValue"
        :key="tag"
        class="tag"
      >
        {{ tag }}
        <button
          @click="removeTag(tag)"
          class="remove-tag"
          aria-label="移除标签"
        >
          ×
        </button>
      </span>
    </div>
    
    <div class="tag-input-wrapper">
      <input
        ref="inputRef"
        v-model="inputValue"
        type="text"
        :placeholder="placeholder"
        @focus="showSuggestions = true"
        @keydown.enter.prevent="addTag"
        @keydown.backspace="handleBackspace"
      >
      
      <div
        v-if="showSuggestions && filteredSuggestions.length"
        class="tag-suggestions"
        v-click-outside="closeSuggestions"
      >
        <button
          v-for="suggestion in filteredSuggestions"
          :key="suggestion"
          class="suggestion-item"
          @click="selectSuggestion(suggestion)"
        >
          {{ suggestion }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

interface Props {
  modelValue: string[]
  suggestions?: string[]
  placeholder?: string
  maxTags?: number
}

const props = withDefaults(defineProps<Props>(), {
  suggestions: () => [],
  placeholder: '添加标签...',
  maxTags: Infinity
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: string[]): void
}>()

const inputRef = ref<HTMLInputElement>()
const inputValue = ref('')
const showSuggestions = ref(false)

const filteredSuggestions = computed(() => {
  if (!inputValue.value) return props.suggestions
  return props.suggestions.filter(tag => 
    tag.toLowerCase().includes(inputValue.value.toLowerCase()) &&
    !props.modelValue.includes(tag)
  )
})

const addTag = () => {
  const tag = inputValue.value.trim()
  if (tag && !props.modelValue.includes(tag) && props.modelValue.length < props.maxTags) {
    emit('update:modelValue', [...props.modelValue, tag])
    inputValue.value = ''
  }
}

const removeTag = (tagToRemove: string) => {
  emit('update:modelValue', props.modelValue.filter(tag => tag !== tagToRemove))
}

const selectSuggestion = (tag: string) => {
  if (!props.modelValue.includes(tag) && props.modelValue.length < props.maxTags) {
    emit('update:modelValue', [...props.modelValue, tag])
  }
  inputValue.value = ''
  showSuggestions.value = false
}

const handleBackspace = (event: KeyboardEvent) => {
  if (!inputValue.value && props.modelValue.length) {
    event.preventDefault()
    removeTag(props.modelValue[props.modelValue.length - 1])
  }
}

const closeSuggestions = () => {
  showSuggestions.value = false
}
</script>

<style scoped lang="scss">
.tag-select {
  border: 1px solid var(--border-color);
  border-radius: 8px;
  padding: 0.5rem;
  background: var(--bg-primary);
}

.selected-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
}

.tag {
  display: inline-flex;
  align-items: center;
  padding: 0.25rem 0.5rem;
  background: var(--primary-light);
  color: var(--primary-color);
  border-radius: 4px;
  font-size: 0.875rem;
}

.remove-tag {
  margin-left: 0.25rem;
  padding: 0 0.25rem;
  background: none;
  border: none;
  color: currentColor;
  cursor: pointer;
  font-size: 1rem;
  line-height: 1;
  opacity: 0.7;

  &:hover {
    opacity: 1;
  }
}

.tag-input-wrapper {
  position: relative;

  input {
    width: 100%;
    padding: 0.5rem;
    border: 1px solid var(--border-color);
    border-radius: 4px;
    background: var(--bg-secondary);
    color: var(--text-primary);

    &:focus {
      outline: none;
      border-color: var(--primary-color);
    }
  }
}

.tag-suggestions {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  margin-top: 0.5rem;
  background: var(--bg-primary);
  border: 1px solid var(--border-color);
  border-radius: 4px;
  box-shadow: var(--shadow-md);
  max-height: 200px;
  overflow-y: auto;
  z-index: 1000;
}

.suggestion-item {
  width: 100%;
  padding: 0.5rem 1rem;
  text-align: left;
  background: none;
  border: none;
  color: var(--text-primary);
  cursor: pointer;

  &:hover {
    background: var(--bg-secondary);
  }

  &:not(:last-child) {
    border-bottom: 1px solid var(--border-color);
  }
}
</style> 