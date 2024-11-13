<template>
  <div class="rating" :class="{ readonly }">
    <div class="stars">
      <button
        v-for="star in maxStars"
        :key="star"
        class="star"
        :class="{ active: star <= modelValue }"
        @click="handleRate(star)"
        :disabled="readonly"
        :aria-label="`评分 ${star} 星`"
      >
        <svg viewBox="0 0 24 24">
          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
        </svg>
      </button>
    </div>
    <div v-if="showCount" class="rating-count">
      ({{ count }})
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  modelValue: number
  maxStars?: number
  readonly?: boolean
  showCount?: boolean
  count?: number
}

const props = withDefaults(defineProps<Props>(), {
  maxStars: 5,
  readonly: false,
  showCount: false,
  count: 0
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: number): void
  (e: 'change', value: number): void
}>()

const handleRate = (value: number) => {
  if (props.readonly) return
  emit('update:modelValue', value)
  emit('change', value)
}
</script>

<style scoped lang="scss">
.rating {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.stars {
  display: flex;
  gap: 0.25rem;
}

.star {
  padding: 0;
  background: none;
  border: none;
  cursor: pointer;
  color: var(--text-tertiary);
  transition: all 0.2s ease;

  svg {
    width: 24px;
    height: 24px;
    fill: currentColor;
  }

  &.active {
    color: var(--warning);
  }

  &:hover:not(:disabled) {
    transform: scale(1.1);
  }

  &:disabled {
    cursor: default;
  }
}

.readonly {
  .star {
    cursor: default;
    
    &:hover {
      transform: none;
    }
  }
}

.rating-count {
  color: var(--text-tertiary);
  font-size: 0.875rem;
}
</style> 