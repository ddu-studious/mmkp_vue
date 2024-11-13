<template>
  <TransitionGroup
    tag="div"
    name="notification"
    class="notifications-container"
  >
    <div
      v-for="notification in notifications"
      :key="notification.id"
      class="notification"
      :class="notification.type"
      role="alert"
    >
      <div class="notification-content">
        <div class="icon">
          <i :class="getIcon(notification.type)"></i>
        </div>
        <p>{{ notification.message }}</p>
      </div>
      <button
        class="close-btn"
        @click="remove(notification.id)"
        aria-label="关闭通知"
      >
        <svg viewBox="0 0 24 24" width="16" height="16">
          <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
        </svg>
      </button>
    </div>
  </TransitionGroup>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useNotificationStore } from '@/stores/notification'

const store = useNotificationStore()
const { notifications } = storeToRefs(store)
const { remove } = store

const getIcon = (type: string) => {
  switch (type) {
    case 'success': return 'icon-check-circle'
    case 'error': return 'icon-x-circle'
    case 'warning': return 'icon-alert-triangle'
    case 'info': return 'icon-info'
    default: return 'icon-info'
  }
}
</script>

<style scoped lang="scss">
.notifications-container {
  position: fixed;
  top: 1rem;
  right: 1rem;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  max-width: 400px;
  pointer-events: none;
}

.notification {
  padding: 1rem;
  border-radius: 8px;
  background: var(--bg-primary);
  box-shadow: var(--shadow-lg);
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  pointer-events: auto;

  &.success {
    border-left: 4px solid var(--success);
    .icon { color: var(--success); }
  }

  &.error {
    border-left: 4px solid var(--error);
    .icon { color: var(--error); }
  }

  &.warning {
    border-left: 4px solid var(--warning);
    .icon { color: var(--warning); }
  }

  &.info {
    border-left: 4px solid var(--info);
    .icon { color: var(--info); }
  }
}

.notification-content {
  flex: 1;
  display: flex;
  align-items: center;
  gap: 0.75rem;

  .icon {
    flex-shrink: 0;
    width: 20px;
    height: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  p {
    margin: 0;
    color: var(--text-primary);
    font-size: 0.875rem;
    line-height: 1.5;
  }
}

.close-btn {
  flex-shrink: 0;
  background: none;
  border: none;
  padding: 0.25rem;
  cursor: pointer;
  color: var(--text-tertiary);
  opacity: 0.7;
  transition: opacity 0.2s ease;

  &:hover {
    opacity: 1;
  }

  svg {
    fill: currentColor;
  }
}

.notification-enter-active,
.notification-leave-active {
  transition: all 0.3s ease;
}

.notification-enter-from,
.notification-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style> 