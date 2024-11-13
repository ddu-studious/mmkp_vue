<template>
  <transition
    :name="name"
    :mode="mode"
    :appear="appear"
    @before-enter="beforeEnter"
    @enter="enter"
    @after-enter="afterEnter"
    @before-leave="beforeLeave"
    @leave="leave"
    @after-leave="afterLeave"
  >
    <slot></slot>
  </transition>
</template>

<script setup lang="ts">
interface Props {
  name?: string
  mode?: 'in-out' | 'out-in'
  appear?: boolean
}

defineProps<Props>()

const emit = defineEmits<{
  (e: 'before-enter', el: Element): void
  (e: 'enter', el: Element): void
  (e: 'after-enter', el: Element): void
  (e: 'before-leave', el: Element): void
  (e: 'leave', el: Element): void
  (e: 'after-leave', el: Element): void
}>()

const beforeEnter = (el: Element) => emit('before-enter', el)
const enter = (el: Element) => emit('enter', el)
const afterEnter = (el: Element) => emit('after-enter', el)
const beforeLeave = (el: Element) => emit('before-leave', el)
const leave = (el: Element) => emit('leave', el)
const afterLeave = (el: Element) => emit('after-leave', el)
</script>

<style scoped lang="scss">
// 淡入淡出
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

// 滑动
.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s ease;
}

.slide-enter-from {
  opacity: 0;
  transform: translateX(30px);
}

.slide-leave-to {
  opacity: 0;
  transform: translateX(-30px);
}

// 缩放
.scale-enter-active,
.scale-leave-active {
  transition: all 0.3s ease;
}

.scale-enter-from,
.scale-leave-to {
  opacity: 0;
  transform: scale(0.9);
}
</style> 