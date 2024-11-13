<template>
  <div v-if="error" class="error-message" role="alert">
    <div class="error-content">
      <svg class="error-icon" viewBox="0 0 24 24">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
      </svg>
      <p>{{ error }}</p>
    </div>
    <button v-if="retry" @click="retry" class="retry-button">
      重试
    </button>
  </div>
</template>

<script setup lang="ts">
interface Props {
  error: string
  retry?: () => void
}

defineProps<Props>()
</script>

<style scoped lang="scss">
.error-message {
  background: var(--error);
  color: white;
  border-radius: 8px;
  padding: 1rem;
  margin: 1rem 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.error-content {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.error-icon {
  width: 24px;
  height: 24px;
  fill: currentColor;
}

.retry-button {
  background: rgba(255, 255, 255, 0.2);
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background: rgba(255, 255, 255, 0.3);
  }
}
</style> 