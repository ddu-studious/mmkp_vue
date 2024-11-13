<template>
  <div class="search-wrapper">
    <button 
      class="search-trigger"
      @click="openSearch"
      title="搜索"
    >
      <Icon icon="ri:search-line" />
    </button>

    <Teleport to="body">
      <div 
        v-if="isSearchOpen"
        class="search-modal"
        @click="closeSearch"
      >
        <div 
          class="search-container"
          @click.stop
        >
          <div class="search-header">
            <div class="search-input-wrapper">
              <Icon icon="ri:search-line" class="search-icon" />
              <input
                ref="searchInput"
                v-model="searchQuery"
                type="text"
                placeholder="搜索文章..."
                @keyup.enter="handleSearch"
                @keyup.esc="closeSearch"
              >
            </div>
            <button 
              class="close-button"
              @click="closeSearch"
              title="关闭"
            >
              <Icon icon="ri:close-line" />
            </button>
          </div>

          <div v-if="searchQuery" class="search-results">
            <div v-if="isSearching" class="searching">
              <Icon icon="ri:loader-4-line" class="spinning" />
              搜索中...
            </div>
            <div v-else-if="results.length === 0" class="no-results">
              未找到相关结果
            </div>
            <div v-else class="results-list">
              <router-link
                v-for="result in results"
                :key="result.id"
                :to="`/article/${result.id}`"
                class="result-item"
                @click="closeSearch"
              >
                <h3>{{ result.title }}</h3>
                <p>{{ result.summary }}</p>
                <div class="result-meta">
                  <span class="date">{{ formatDate(result.date) }}</span>
                  <span class="tags">
                    <span v-for="tag in result.tags" :key="tag" class="tag">
                      {{ tag }}
                    </span>
                  </span>
                </div>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const isSearchOpen = ref(false)
const searchQuery = ref('')
const searchInput = ref<HTMLInputElement | null>(null)
const isSearching = ref(false)
const results = ref<any[]>([])

const openSearch = () => {
  isSearchOpen.value = true
  document.body.style.overflow = 'hidden'
  // 等待 DOM 更新后聚焦
  setTimeout(() => {
    searchInput.value?.focus()
  }, 100)
}

const closeSearch = () => {
  isSearchOpen.value = false
  searchQuery.value = ''
  document.body.style.overflow = ''
}

const handleSearch = async () => {
  if (!searchQuery.value.trim()) return

  isSearching.value = true
  
  try {
    // 模拟搜索延迟
    await new Promise(resolve => setTimeout(resolve, 500))
    
    // 模拟搜索结果
    results.value = [
      {
        id: 1,
        title: "Vue3 组合式 API 实战指南",
        summary: "深入了解 Vue3 组合式 API 的使用方法和最佳实践",
        date: "2024-03-20",
        tags: ["Vue.js", "组合式 API"]
      },
      {
        id: 2,
        title: "TypeScript 高级类型编程",
        summary: "探索 TypeScript 类型系统的高级特性和应用",
        date: "2024-03-19",
        tags: ["TypeScript", "前端开发"]
      }
    ]
  } finally {
    isSearching.value = false
  }
}

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

// 键盘快捷键
const handleKeydown = (e: KeyboardEvent) => {
  // Ctrl/Cmd + K 打开搜索
  if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
    e.preventDefault()
    openSearch()
  }
  // ESC 关闭搜索
  if (e.key === 'Escape' && isSearchOpen.value) {
    closeSearch()
  }
}

onMounted(() => {
  window.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeydown)
})
</script>

<style scoped lang="scss">
.search-wrapper {
  position: relative;
}

.search-trigger {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  padding: 0.25rem;
  border: none;
  border-radius: 0.375rem;
  background: transparent;
  color: var(--text-secondary);
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    color: var(--primary-color);
    background: var(--bg-secondary);
  }

  .icon {
    width: 1.25rem;
    height: 1.25rem;
  }
}

.search-modal {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding-top: 10vh;
  z-index: 1000;
  animation: fadeIn 0.2s ease;
  backdrop-filter: blur(4px);
}

.search-container {
  width: 90%;
  max-width: 600px;
  background: var(--bg-primary);
  border-radius: 12px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  animation: slideDown 0.3s ease;
}

.search-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  border-bottom: 1px solid var(--border-color);
}

.search-input-wrapper {
  flex: 1;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.5rem 0.75rem;
  background: var(--bg-secondary);
  border-radius: 8px;

  .search-icon {
    width: 1.25rem;
    height: 1.25rem;
    color: var(--text-tertiary);
  }

  input {
    flex: 1;
    border: none;
    background: none;
    font-size: 1rem;
    color: var(--text-primary);
    outline: none;

    &::placeholder {
      color: var(--text-tertiary);
    }
  }
}

.close-button {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  padding: 0.25rem;
  border: none;
  border-radius: 6px;
  background: var(--bg-secondary);
  color: var(--text-tertiary);
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: var(--bg-tertiary);
    color: var(--text-primary);
  }

  .icon {
    width: 1.25rem;
    height: 1.25rem;
  }
}

.search-results {
  max-height: 60vh;
  overflow-y: auto;
  padding: 1rem;
}

.searching {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  padding: 2rem;
  color: var(--text-tertiary);

  .spinning {
    animation: spin 1s linear infinite;
  }
}

.no-results {
  text-align: center;
  padding: 2rem;
  color: var(--text-tertiary);
}

.results-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.result-item {
  display: block;
  padding: 1rem;
  border-radius: 8px;
  background: var(--bg-secondary);
  text-decoration: none;
  transition: all 0.2s ease;

  &:hover {
    background: var(--bg-tertiary);
    transform: translateY(-2px);
  }

  h3 {
    color: var(--text-primary);
    margin: 0 0 0.5rem;
    font-size: 1.125rem;
  }

  p {
    color: var(--text-secondary);
    font-size: 0.875rem;
    margin: 0 0 0.75rem;
    line-height: 1.5;
  }
}

.result-meta {
  display: flex;
  align-items: center;
  gap: 1rem;
  font-size: 0.75rem;
  color: var(--text-tertiary);

  .date {
    color: var(--text-tertiary);
  }

  .tags {
    display: flex;
    gap: 0.5rem;

    .tag {
      padding: 0.25rem 0.5rem;
      background: var(--primary-light);
      color: var(--primary-color);
      border-radius: 4px;
    }
  }
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

// 响应式优化
@media (max-width: 768px) {
  .search-modal {
    padding-top: 5vh;
  }

  .search-container {
    width: 95%;
  }

  .search-results {
    max-height: 70vh;
  }
}
</style>