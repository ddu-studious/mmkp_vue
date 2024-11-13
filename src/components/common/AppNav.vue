<template>
  <nav class="app-nav">
    <div class="nav-container">
      <router-link to="/" class="nav-logo">
        技术博客
      </router-link>

      <div class="nav-links">
        <router-link 
          v-for="item in navItems" 
          :key="item.path"
          :to="item.path"
          class="nav-link"
        >
          <Icon :icon="item.icon" />
          {{ item.text }}
        </router-link>
      </div>

      <div class="nav-actions">
        <AppSearch />
        <ThemeToggle />
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import ThemeToggle from './ThemeToggle.vue'
import AppSearch from './AppSearch.vue'

const navItems = [
  { text: '首页', path: '/', icon: 'ri:home-line' },
  { text: '技术文章', path: '/articles', icon: 'ri:article-line' },
  { text: '专题分类', path: '/categories', icon: 'ri:folder-line' },
  { text: '标签云', path: '/tags', icon: 'ri:price-tag-3-line' },
  { text: '关于我', path: '/about', icon: 'ri:user-line' }
]
</script>

<style scoped lang="scss">
.app-nav {
  position: sticky;
  top: 0;
  z-index: 100;
  background: var(--bg-primary);
  border-bottom: 1px solid var(--border-color);
  backdrop-filter: blur(8px);
}

.nav-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2rem;
}

.nav-logo {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--text-primary);
  text-decoration: none;
  letter-spacing: 0.5px;
  
  &:hover {
    color: var(--primary-color);
  }
}

.nav-links {
  display: flex;
  gap: 1.5rem;
  align-items: center;
}

.nav-link {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--text-secondary);
  text-decoration: none;
  font-size: 0.9375rem;
  padding: 0.5rem 0.75rem;
  border-radius: 6px;
  transition: all 0.3s ease;

  .icon {
    width: 1.25em;
    height: 1.25em;
  }

  &:hover {
    color: var(--primary-color);
    background: var(--bg-secondary);
  }

  &.router-link-active {
    color: var(--primary-color);
    background: var(--primary-light);
    font-weight: 500;
  }
}

.nav-actions {
  display: flex;
  align-items: center;
  gap: 1rem;
}

@media (max-width: 768px) {
  .nav-container {
    padding: 1rem;
  }

  .nav-links {
    display: none;
  }
}
</style> 