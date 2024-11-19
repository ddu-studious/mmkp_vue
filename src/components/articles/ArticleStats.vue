<template>
  <div class="article-stats">
    <el-row :gutter="20">
      <el-col :span="6" v-for="stat in stats" :key="stat.label">
        <div class="stat-card">
          <el-icon :size="24" class="stat-icon">
            <component :is="stat.icon" />
          </el-icon>
          <div class="stat-content">
            <div class="stat-value">{{ stat.value }}</div>
            <div class="stat-label">{{ stat.label }}</div>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { Document, View, ChatLineRound, Collection } from '@element-plus/icons-vue'
import { useArticleStore } from '@/stores/article'

const articleStore = useArticleStore()

const stats = computed(() => [
  {
    label: '文章总数',
    value: articleStore.articles.length,
    icon: Document
  },
  {
    label: '总阅读量',
    value: formatNumber(articleStore.articles.reduce((sum, article) => sum + article.views, 0)),
    icon: View
  },
  {
    label: '总评论数',
    value: formatNumber(articleStore.articles.reduce((sum, article) => sum + article.comments, 0)),
    icon: ChatLineRound
  },
  {
    label: '分类数量',
    value: new Set(articleStore.articles.map(article => article.category)).size,
    icon: Collection
  }
])

const formatNumber = (num: number) => {
  return num >= 1000 ? (num / 1000).toFixed(1) + 'k' : num
}
</script>

<style scoped lang="scss">
.article-stats {
  margin-bottom: 3rem;
}

.stat-card {
  background: var(--el-bg-color);
  border-radius: 8px;
  padding: 1.5rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  box-shadow: 0 2px 12px 0 rgba(0,0,0,0.1);
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-4px);
  }
}

.stat-icon {
  color: var(--el-color-primary);
}

.stat-content {
  .stat-value {
    font-size: 1.5rem;
    font-weight: 600;
    color: var(--el-text-color-primary);
    line-height: 1.2;
  }

  .stat-label {
    font-size: 0.875rem;
    color: var(--el-text-color-secondary);
    margin-top: 0.25rem;
  }
}

@media (max-width: 768px) {
  .el-col {
    margin-bottom: 1rem;
  }
}
</style> 