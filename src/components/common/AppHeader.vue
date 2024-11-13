<template>
  <header class="app-header" :class="{ 'header-scrolled': isScrolled }">
    <div class="header-container">
      <router-link to="/" class="logo">
        <span class="logo-text">技术博客</span>
      </router-link>

      <nav class="main-nav">
        <router-link 
          v-for="item in navItems" 
          :key="item.path"
          :to="item.path"
          class="nav-item"
          :class="{ active: currentRoute === item.path }"
        >
          <Icon :icon="item.icon" />
          {{ item.label }}
        </router-link>
      </nav>

      <div class="header-actions">
        <button 
          class="search-btn" 
          @click="handleSearchClick"
          aria-label="搜索"
        >
          <Icon icon="ri:search-line" />
        </button>

        <button 
          class="theme-btn" 
          @click="toggleTheme" 
          :title="isDark ? '切换到亮色模式' : '切换到暗色模式'"
        >
          <div class="theme-icon-container">
            <Icon 
              :icon="isDark ? 'ri:sun-line' : 'ri:moon-line'" 
              class="theme-icon"
            />
            <div class="theme-switch-circle"></div>
          </div>
        </button>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const currentRoute = computed(() => route.path)
const isScrolled = ref(false)
const isDark = ref(false)

const navItems = [
  { label: '首页', path: '/', icon: 'ri:home-5-line' },
  { label: '技术文章', path: '/articles', icon: 'ri:article-line' },
  { label: '专题分类', path: '/categories', icon: 'ri:folder-3-line' },
  { label: '标签云', path: '/tags', icon: 'ri:price-tag-3-line' },
  { label: '关于我', path: '/about', icon: 'ri:user-3-line' }
]

const handleScroll = () => {
  isScrolled.value = window.scrollY > 50
}

const toggleTheme = () => {
  isDark.value = !isDark.value
  document.documentElement.setAttribute('data-theme', isDark.value ? 'dark' : 'light')
}

const handleSearchClick = () => {
  emit('openSearch')
}

const emit = defineEmits(['openSearch'])

// 添加搜索按钮动画控制
const shouldPulse = ref(false)

// 定期触发搜索按钮动画
onMounted(() => {
  window.addEventListener('scroll', handleScroll)
  // 初始化主题
  isDark.value = document.documentElement.getAttribute('data-theme') === 'dark'

  // 每隔30秒触发一次动画
  setInterval(() => {
    shouldPulse.value = true
    setTimeout(() => {
      shouldPulse.value = false
    }, 1000)
  }, 30000)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped lang="scss">
.app-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 70px;
  background: transparent;
  transition: all 0.3s ease;
  z-index: 100;
  
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: rgba(255, 255, 255, 0.85);
    backdrop-filter: blur(20px) saturate(180%);
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  &.header-scrolled {
    &::before {
      opacity: 1;
    }

    .header-container {
      border-bottom-color: rgba(0, 0, 0, 0.1);
    }
  }
}

.header-container {
  max-width: 1400px;
  margin: 0 auto;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 2rem;
  position: relative;
  border-bottom: 1px solid transparent;
  transition: border-color 0.3s ease;
}

.logo {
  display: flex;
  align-items: center;
  text-decoration: none;
  
  .logo-text {
    font-size: 1.5rem;
    font-weight: 700;
    color: var(--text-primary);
    font-family: var(--font-heading);
    background: linear-gradient(45deg, var(--primary-color), var(--primary-hover));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    transition: all 0.3s ease;
    letter-spacing: 1px;
  }

  &:hover .logo-text {
    transform: translateY(-1px);
    text-shadow: 0 2px 10px rgba(var(--primary-rgb), 0.2);
  }
}

.main-nav {
  display: flex;
  gap: 1.5rem;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);

  .nav-item {
    display: flex;
    align-items: center;
    gap: 0.6rem;
    padding: 0.6rem 1.2rem;
    color: var(--text-secondary);
    text-decoration: none;
    font-weight: 500;
    border-radius: 12px;
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    font-size: 1rem;
    letter-spacing: 0.3px;
    position: relative;
    overflow: hidden;
    
    &::before {
      content: '';
      position: absolute;
      inset: 0;
      background: linear-gradient(
        120deg,
        transparent,
        rgba(var(--primary-rgb), 0.1),
        transparent
      );
      opacity: 0;
      transition: opacity 0.4s ease;
    }

    &:hover {
      color: var(--primary-color);
      transform: translateY(-2px);
      
      &::before {
        opacity: 1;
      }

      .icon {
        transform: scale(1.2) rotate(10deg);
        color: var(--primary-color);
      }
    }

    &.active {
      color: var(--primary-color);
      background: var(--primary-light);
      font-weight: 600;
      
      &::after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 50%;
        width: 4px;
        height: 4px;
        background: var(--primary-color);
        border-radius: 50%;
        transform: translateX(-50%);
      }

      .icon {
        color: var(--primary-color);
      }
    }

    .icon {
      width: 1.4em;
      height: 1.4em;
      transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
      color: var(--text-tertiary);
    }
  }
}

.header-actions {
  display: flex;
  gap: 1rem;
  align-items: center;

  button {
    border: none;
    background: none;
    cursor: pointer;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    
    &:focus {
      outline: none;
    }
  }
}

.search-btn {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.6rem 1.2rem;
  background: var(--bg-secondary);
  border-radius: 14px;
  color: var(--text-secondary);
  border: 1px solid var(--border-color);
  min-width: 200px;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(var(--primary-rgb), 0.1),
      transparent
    );
    transform: translateX(-100%);
    transition: transform 0.6s ease;
  }

  .search-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 28px;
    height: 28px;
    border-radius: 8px;
    background: var(--bg-tertiary);
    transition: all 0.3s ease;

    .icon {
      width: 18px;
      height: 18px;
      color: var(--text-secondary);
      transition: all 0.3s ease;
    }
  }

  .search-text {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 0.875rem;

    .search-shortcut {
      padding: 0.2rem 0.4rem;
      background: var(--bg-tertiary);
      border-radius: 4px;
      font-size: 0.75rem;
      color: var(--text-tertiary);
      font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
    }
  }

  &:hover {
    border-color: var(--primary-color);
    color: var(--primary-color);
    transform: translateY(-1px);

    &::before {
      transform: translateX(100%);
    }

    .search-icon {
      background: var(--primary-light);
      
      .icon {
        color: var(--primary-color);
        transform: rotate(-10deg);
      }
    }

    .search-shortcut {
      background: var(--primary-light);
      color: var(--primary-color);
    }
  }

  &.pulse {
    animation: searchPulse 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite;
  }
}

.theme-btn {
  position: relative;
  width: 42px;
  height: 42px;
  border-radius: 12px;
  background: var(--bg-secondary);
  border: 1px solid var(--border-color);
  overflow: hidden;

  .theme-icon-container {
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);

    .theme-icon {
      width: 20px;
      height: 20px;
      color: var(--text-secondary);
      transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
      z-index: 1;
    }

    .theme-switch-circle {
      position: absolute;
      width: 28px;
      height: 28px;
      border-radius: 50%;
      background: var(--primary-light);
      transform: scale(0);
      transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
    }
  }

  &:hover {
    border-color: var(--primary-color);
    transform: translateY(-1px);

    .theme-icon {
      color: var(--primary-color);
    }

    .theme-switch-circle {
      transform: scale(1);
    }

    .theme-icon-container {
      transform: rotate(180deg);
    }

    &::before {
      opacity: 1;
    }
  }

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: radial-gradient(
      circle at center,
      rgba(var(--primary-rgb), 0.1),
      transparent 70%
    );
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  .theme-icon {
    transition: transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
  }
}

// 添加动画关键帧
@keyframes searchPulse {
  0% {
    transform: scale(1);
    box-shadow: 0 0 0 0 rgba(var(--primary-rgb), 0.4);
  }
  70% {
    transform: scale(1.02);
    box-shadow: 0 0 0 10px rgba(var(--primary-rgb), 0);
  }
  100% {
    transform: scale(1);
    box-shadow: 0 0 0 0 rgba(var(--primary-rgb), 0);
  }
}

// 暗色主题适配
:root[data-theme='dark'] {
  .search-btn,
  .theme-btn {
    background: rgba(255, 255, 255, 0.05);
    border-color: rgba(255, 255, 255, 0.1);

    &:hover {
      background: rgba(255, 255, 255, 0.08);
      border-color: var(--primary-color);
    }

    .search-icon,
    .search-shortcut {
      background: rgba(255, 255, 255, 0.1);
    }
  }

  .app-header::before {
    background: rgba(0, 0, 0, 0.8);
  }

  .nav-item {
    &:hover {
      background: rgba(255, 255, 255, 0.05);
    }

    &.active {
      background: rgba(var(--primary-rgb), 0.15);
    }
  }
}

// 响应式优化
@media (max-width: 768px) {
  .header-container {
    padding: 0 1rem;
  }

  .logo-text {
    display: none;
  }

  .main-nav {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    transform: none;
    background: var(--bg-primary);
    padding: 0.75rem;
    border-top: 1px solid var(--border-color);
    justify-content: space-around;
    
    .nav-item {
      flex-direction: column;
      padding: 0.5rem;
      font-size: 0.75rem;
      gap: 0.25rem;
      
      .icon {
        width: 1.5em;
        height: 1.5em;
      }
    }
  }

  .header-actions {
    .search-shortcut {
      display: none;
    }
  }

  .search-btn {
    min-width: auto;
    padding: 0.5rem;

    .search-text {
      display: none;
    }

    .search-icon {
      margin: 0;
    }
  }
}
</style> 