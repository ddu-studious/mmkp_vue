<template>
  <nav class="toc" aria-label="文章目录">
    <h2>目录</h2>
    <ul v-if="headings.length">
      <li 
        v-for="heading in headings" 
        :key="heading.id"
        :class="{ 
          active: activeId === heading.id,
          [`level-${heading.level}`]: true 
        }"
      >
        <a 
          :href="`#${heading.id}`"
          @click.prevent="scrollToHeading(heading.id)"
        >
          {{ heading.text }}
        </a>
      </li>
    </ul>
    <p v-else class="empty">暂无目录</p>
  </nav>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

interface Heading {
  id: string
  text: string
  level: number
}

const headings = ref<Heading[]>([])
const activeId = ref<string>('')

const getHeadings = () => {
  const article = document.querySelector('.article-content')
  if (!article) return

  const elements = article.querySelectorAll('h2, h3, h4')
  headings.value = Array.from(elements).map(el => ({
    id: el.id || `heading-${Math.random().toString(36).substr(2, 9)}`,
    text: el.textContent || '',
    level: Number(el.tagName.charAt(1))
  }))

  // 为没有 id 的标题添加 id
  elements.forEach((el, index) => {
    if (!el.id) {
      el.id = headings.value[index].id
    }
  })
}

const scrollToHeading = (id: string) => {
  const element = document.getElementById(id)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' })
  }
}

const updateActiveHeading = () => {
  const headingElements = headings.value.map(h => document.getElementById(h.id))
  const scrollPosition = window.scrollY + 100

  for (let i = headingElements.length - 1; i >= 0; i--) {
    const element = headingElements[i]
    if (element && element.offsetTop <= scrollPosition) {
      activeId.value = element.id
      break
    }
  }
}

onMounted(() => {
  getHeadings()
  window.addEventListener('scroll', updateActiveHeading)
})

onUnmounted(() => {
  window.removeEventListener('scroll', updateActiveHeading)
})
</script>

<style scoped lang="scss">
.toc {
  position: sticky;
  top: 2rem;
  max-height: calc(100vh - 4rem);
  overflow-y: auto;
  padding: 1rem;
  background: var(--bg-primary);
  border: 1px solid var(--border-color);
  border-radius: 8px;

  h2 {
    font-size: 1.2rem;
    margin-bottom: 1rem;
    color: var(--text-primary);
    font-family: "楷体", "STKaiti", serif;
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  li {
    margin: 0.5rem 0;
    line-height: 1.4;

    &.level-2 { margin-left: 0; }
    &.level-3 { margin-left: 1rem; }
    &.level-4 { margin-left: 2rem; }

    &.active > a {
      color: var(--primary-color);
      font-weight: 500;
    }
  }

  a {
    color: var(--text-secondary);
    text-decoration: none;
    font-size: 0.9rem;
    transition: color 0.2s ease;

    &:hover {
      color: var(--primary-color);
    }
  }

  .empty {
    color: var(--text-tertiary);
    text-align: center;
    font-size: 0.9rem;
    margin: 1rem 0;
  }
}

// 滚动条样式
.toc {
  scrollbar-width: thin;
  scrollbar-color: var(--border-color) transparent;

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background-color: var(--border-color);
    border-radius: 3px;
  }
}
</style> 