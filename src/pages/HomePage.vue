<template>
  <div class="home-page">
    <section class="hero-section">
      <Carousel 
        :slides="heroSlides"
        :autoplay="true"
        :interval="6000"
      />
    </section>

    <section class="featured-section">
      <FeaturedArticles />
    </section>

    <section class="categories">
      <h2>文章分类</h2>
      <div class="category-grid">
        <router-link 
          v-for="category in categories" 
          :key="category.id"
          :to="`/articles?category=${category.name}`"
          class="category-card"
        >
          <div class="category-icon">
            <Icon :icon="category.icon" />
          </div>
          <div class="category-content">
            <h3>{{ category.name }}</h3>
            <p>{{ category.description }}</p>
            <div class="category-stats">
              <span class="article-count">
                <Icon icon="ri:article-line" />
                {{ category.count }} 篇文章
              </span>
              <Icon 
                class="arrow-icon"
                icon="ri:arrow-right-up-line" 
              />
            </div>
          </div>
        </router-link>
      </div>
    </section>

    <section class="newsletter">
      <div class="newsletter-content">
        <h2>订阅更新</h2>
        <p>订阅技术文章，及时获取最新内容</p>
        <form @submit.prevent="handleSubscribe" class="subscribe-form">
          <input 
            type="email" 
            v-model="email" 
            placeholder="输入您的邮箱地址"
            required
          >
          <button type="submit" :disabled="loading">
            {{ loading ? '订阅中...' : '立即订阅' }}
          </button>
        </form>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Carousel from '@/components/common/Carousel.vue'
import FeaturedArticles from '@/components/common/FeaturedArticles.vue'

const heroSlides = ref([
  {
    image: 'https://picsum.photos/1920/800?random=1',
    title: '探索技术的奥秘',
    description: '分享编程知识，记录技术成长',
    link: '/articles'
  },
  {
    image: 'https://picsum.photos/1920/800?random=2',
    title: '现代化前端工程实践',
    description: '探索前沿技术，掌握开发利器',
    link: '/articles/frontend'
  },
  {
    image: 'https://picsum.photos/1920/800?random=3',
    title: 'TypeScript 高级指南',
    description: '深入理解 TypeScript，提升开发体验',
    link: '/articles/typescript'
  }
])

const categories = ref([
  {
    id: 1,
    name: '前端开发',
    description: '探索现代前端技术和最佳实践',
    icon: 'ri:code-box-line',
    count: 42
  },
  {
    id: 2,
    name: '后端开发',
    description: 'Node.js、Python 等后端技术分享',
    icon: 'ri:server-line',
    count: 28
  },
  {
    id: 3,
    name: '工程化',
    description: '前端工程化、自动化工具和最佳实践',
    icon: 'ri:tools-line',
    count: 35
  },
  {
    id: 4,
    name: '性能优化',
    description: '前端性能优化策略和实践技巧',
    icon: 'ri:speed-line',
    count: 23
  },
  {
    id: 5,
    name: '架构设计',
    description: '软件架构设计原则和最佳实践',
    icon: 'ri:layout-line',
    count: 19
  },
  {
    id: 6,
    name: '前端安全',
    description: 'Web 安全、防护策略和最佳实践',
    icon: 'ri:shield-keyhole-line',
    count: 15
  },
  {
    id: 7,
    name: '移动开发',
    description: '移动端开发技术和跨平台解决方案',
    icon: 'ri:smartphone-line',
    count: 26
  },
  {
    id: 8,
    name: '数据可视化',
    description: '数据可视化技术和图表库应用',
    icon: 'ri:bar-chart-box-line',
    count: 17
  },
  {
    id: 9,
    name: '人工智能',
    description: 'AI 在前端领域的应用实践',
    icon: 'ri:brain-line',
    count: 12
  }
])

const email = ref('')
const loading = ref(false)

const handleSubscribe = async () => {
  if (!email.value || loading.value) return
  
  loading.value = true
  
  try {
    await new Promise(resolve => setTimeout(resolve, 1000))
    alert('订阅成功！')
    email.value = ''
  } catch (error) {
    alert('订阅失败，请稍后重试')
  } finally {
    loading.value = false
  }
}
</script>

<style scoped lang="scss">
.home-page {
  min-height: 100vh;
}

.hero-section {
  width: 100%;
  height: 100vh;
  min-height: 600px;
  max-height: 800px;
  position: relative;
  z-index: 1;
  
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 100px;
    background: linear-gradient(
      to bottom,
      transparent,
      var(--bg-primary)
    );
    pointer-events: none;
    z-index: 2;
  }
}

.featured-section {
  position: relative;
  z-index: 2;
  margin-top: -50px;
  padding-top: 0;
}

.categories {
  padding: 6rem 0;
  background: linear-gradient(
    to bottom,
    var(--bg-primary) 0%,
    var(--bg-secondary) 100%
  );

  h2 {
    text-align: center;
    margin-bottom: 4rem;
    font-size: 2.5rem;
    color: var(--text-primary);
    font-family: var(--font-heading);
    position: relative;
    
    &::after {
      content: '';
      position: absolute;
      bottom: -1rem;
      left: 50%;
      transform: translateX(-50%);
      width: 60px;
      height: 3px;
      background: linear-gradient(to right, var(--primary-color), transparent);
      border-radius: 3px;
    }
  }
}

.category-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

.category-card {
  position: relative;
  display: flex;
  align-items: flex-start;
  padding: 2rem;
  background: var(--bg-primary);
  border-radius: 20px;
  text-decoration: none;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  border: 1px solid var(--border-color);
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(
      135deg,
      transparent 0%,
      rgba(var(--primary-rgb), 0.05) 100%
    );
    opacity: 0;
    transition: opacity 0.4s ease;
  }

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: linear-gradient(to right, var(--primary-color), transparent);
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 0.4s ease;
  }

  &:hover {
    transform: translateY(-6px);
    border-color: var(--primary-color);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);

    &::before {
      opacity: 1;
    }

    &::after {
      transform: scaleX(1);
    }

    .category-icon {
      transform: scale(1.1) rotate(10deg);
      background: var(--primary-color);
      color: white;
    }

    .arrow-icon {
      transform: translate(6px, -6px);
      opacity: 1;
    }

    h3 {
      color: var(--primary-color);
    }
  }
}

.category-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 56px;
  height: 56px;
  background: var(--primary-light);
  border-radius: 16px;
  margin-right: 1.5rem;
  color: var(--primary-color);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  flex-shrink: 0;

  .icon {
    width: 28px;
    height: 28px;
    transition: transform 0.4s ease;
  }
}

.category-content {
  flex: 1;
  min-width: 0;

  h3 {
    font-size: 1.35rem;
    font-weight: 600;
    color: var(--text-primary);
    margin-bottom: 0.75rem;
    transition: color 0.3s ease;
  }

  p {
    font-size: 0.9375rem;
    color: var(--text-secondary);
    margin-bottom: 1.25rem;
    line-height: 1.6;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
}

.category-stats {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 0.875rem;
  color: var(--text-tertiary);

  .article-count {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.4rem 1rem;
    background: var(--bg-secondary);
    border-radius: 20px;
    transition: all 0.3s ease;

    .icon {
      width: 1.1em;
      height: 1.1em;
      opacity: 0.8;
      transition: all 0.3s ease;
    }

    &:hover {
      background: var(--primary-light);
      color: var(--primary-color);
      transform: translateY(-2px);

      .icon {
        opacity: 1;
        transform: scale(1.1);
      }
    }
  }

  .arrow-icon {
    width: 1.4em;
    height: 1.4em;
    opacity: 0;
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    color: var(--primary-color);
  }
}

.newsletter {
  padding: 4rem 2rem;
  background: linear-gradient(135deg, var(--primary-light) 0%, var(--bg-primary) 100%);
  text-align: center;

  .newsletter-content {
    max-width: 600px;
    margin: 0 auto;
  }

  h2 {
    font-size: 2rem;
    color: var(--text-primary);
    margin-bottom: 1rem;
    font-family: var(--font-heading);
  }

  p {
    color: var(--text-secondary);
    margin-bottom: 2rem;
  }
}

.subscribe-form {
  display: flex;
  gap: 1rem;
  max-width: 500px;
  margin: 0 auto;

  input {
    flex: 1;
    padding: 0.75rem 1rem;
    border: 1px solid var(--border-color);
    border-radius: 4px;
    background: var(--bg-primary);
    color: var(--text-primary);

    &:focus {
      outline: none;
      border-color: var(--primary-color);
    }
  }

  button {
    padding: 0.75rem 2rem;
    background: var(--primary-color);
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background 0.2s ease;

    &:hover:not(:disabled) {
      background: var(--primary-hover);
    }

    &:disabled {
      opacity: 0.7;
      cursor: not-allowed;
    }
  }
}

@media (max-width: 768px) {
  .categories {
    padding: 4rem 0;

    h2 {
      font-size: 2rem;
      margin-bottom: 3rem;
    }
  }

  .category-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
    padding: 0 1.5rem;
  }

  .category-card {
    padding: 1.5rem;
  }

  .category-icon {
    width: 48px;
    height: 48px;
    margin-right: 1rem;

    .icon {
      width: 24px;
      height: 24px;
    }
  }

  .category-content {
    h3 {
      font-size: 1.25rem;
    }

    p {
      font-size: 0.875rem;
      margin-bottom: 1rem;
    }
  }

  .subscribe-form {
    flex-direction: column;
  }
}
</style> 