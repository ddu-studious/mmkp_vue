<template>
  <div class="portfolio">
    <header class="page-header">
      <h1>作品集</h1>
      <p class="subtitle">我的项目和开源贡献</p>
    </header>

    <div class="filter-bar">
      <div class="categories">
        <button 
          v-for="category in categories" 
          :key="category"
          :class="{ active: selectedCategory === category }"
          @click="selectedCategory = category"
          class="category-btn"
        >
          {{ category }}
        </button>
      </div>
    </div>

    <div class="projects-grid">
      <article 
        v-for="project in filteredProjects" 
        :key="project.id" 
        class="project-card"
      >
        <div class="project-image">
          <img :src="project.image" :alt="project.title">
        </div>
        <div class="project-content">
          <h2>{{ project.title }}</h2>
          <p class="description">{{ project.description }}</p>
          <div class="tech-stack">
            <span 
              v-for="tech in project.technologies" 
              :key="tech" 
              class="tech-tag"
            >
              {{ tech }}
            </span>
          </div>
          <div class="project-links">
            <a 
              v-if="project.demoUrl" 
              :href="project.demoUrl" 
              target="_blank" 
              rel="noopener"
              class="btn btn-primary"
            >
              在线演示
            </a>
            <a 
              v-if="project.sourceUrl" 
              :href="project.sourceUrl" 
              target="_blank" 
              rel="noopener"
              class="btn btn-outline"
            >
              源代码
            </a>
          </div>
        </div>
      </article>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useImage } from '@/composables/useImage'

interface Project {
  id: number
  title: string
  description: string
  image: string
  category: string
  technologies: string[]
  demoUrl?: string
  sourceUrl?: string
}

const categories = ['全部', '前端', '后端', '全栈', '工具']
const selectedCategory = ref('全部')

const { getRandomImage } = useImage()

const projects = ref<Project[]>([
  {
    id: 1,
    title: '技术博客',
    description: '基于 Vue3 + TypeScript 开发的个人技术博客',
    image: getRandomImage({ width: 800, height: 600 }),
    category: '前端',
    technologies: ['Vue3', 'TypeScript', 'Vite', 'Pinia'],
    demoUrl: 'https://blog.example.com',
    sourceUrl: 'https://github.com/example/blog'
  },
  // 添加更多项目...
])

const filteredProjects = computed(() => {
  if (selectedCategory.value === '全部') {
    return projects.value
  }
  return projects.value.filter(project => project.category === selectedCategory.value)
})
</script>

<style scoped lang="scss">
.portfolio {
  padding: 2rem 1rem;
  max-width: 1200px;
  margin: 0 auto;
}

.page-header {
  text-align: center;
  margin-bottom: 3rem;

  h1 {
    font-size: 2.5rem;
    color: var(--text-primary);
    margin-bottom: 1rem;
    font-family: "楷体", "STKaiti", serif;
  }

  .subtitle {
    color: var(--text-secondary);
    font-size: 1.2rem;
  }
}

.filter-bar {
  margin-bottom: 2rem;
}

.categories {
  display: flex;
  justify-content: center;
  gap: 1rem;
  flex-wrap: wrap;
}

.category-btn {
  padding: 0.5rem 1.5rem;
  border: none;
  border-radius: 9999px;
  background: var(--bg-secondary);
  color: var(--text-secondary);
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: var(--bg-tertiary);
  }

  &.active {
    background: var(--primary-color);
    color: white;
  }
}

.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

.project-card {
  background: var(--bg-primary);
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid var(--border-color);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: var(--shadow-lg);
  }
}

.project-image {
  aspect-ratio: 16/9;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;

    &:hover {
      transform: scale(1.05);
    }
  }
}

.project-content {
  padding: 1.5rem;

  h2 {
    font-size: 1.25rem;
    color: var(--text-primary);
    margin-bottom: 0.75rem;
  }

  .description {
    color: var(--text-secondary);
    margin-bottom: 1rem;
    line-height: 1.6;
  }
}

.tech-stack {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
}

.tech-tag {
  padding: 0.25rem 0.75rem;
  background: var(--bg-secondary);
  border-radius: 9999px;
  font-size: 0.875rem;
  color: var(--text-secondary);
}

.project-links {
  display: flex;
  gap: 1rem;

  .btn {
    flex: 1;
  }
}

@media (max-width: 768px) {
  .projects-grid {
    grid-template-columns: 1fr;
  }
}
</style> 