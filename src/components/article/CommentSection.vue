<template>
  <section class="comments-section">
    <h2>评论 ({{ comments.length }})</h2>
    
    <form @submit.prevent="handleSubmit" class="comment-form">
      <div class="form-group">
        <label for="author">昵称</label>
        <input 
          type="text" 
          id="author" 
          v-model="newComment.author" 
          required
        >
      </div>
      
      <div class="form-group">
        <label for="content">评论内容</label>
        <textarea 
          id="content" 
          v-model="newComment.content" 
          rows="4" 
          required
        ></textarea>
      </div>
      
      <button type="submit" :disabled="loading" class="btn btn-primary">
        {{ loading ? '提交中...' : '发表评论' }}
      </button>
    </form>

    <LoadingSpinner v-if="loading" :loading="loading" />
    <ErrorMessage v-if="error" :error="error" />

    <div class="comments-list">
      <article v-for="comment in comments" :key="comment.id" class="comment">
        <header class="comment-header">
          <h3>{{ comment.author }}</h3>
          <time>{{ formatDate(comment.date) }}</time>
        </header>
        <p class="comment-content">{{ comment.content }}</p>
      </article>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useCommentStore } from '@/stores/comment'
import { formatDate } from '@/utils/date'
import LoadingSpinner from '@/components/common/LoadingSpinner.vue'
import ErrorMessage from '@/components/common/ErrorMessage.vue'

const props = defineProps<{
  articleId: number
}>()

const commentStore = useCommentStore()
const { comments, loading, error } = storeToRefs(commentStore)

const newComment = ref({
  author: '',
  content: ''
})

const handleSubmit = async () => {
  await commentStore.addComment(props.articleId, newComment.value)
  if (!error.value) {
    newComment.value = { author: '', content: '' }
  }
}

onMounted(() => {
  commentStore.fetchComments(props.articleId)
})
</script>

<style scoped lang="scss">
.comments-section {
  margin-top: 3rem;
  padding-top: 2rem;
  border-top: 1px solid var(--border-color);

  h2 {
    font-size: 1.5rem;
    color: var(--text-primary);
    margin-bottom: 2rem;
    font-family: "楷体", "STKaiti", serif;
  }
}

.comment-form {
  margin: 2rem 0;
  padding: 1.5rem;
  background: var(--bg-secondary);
  border-radius: 8px;
  border: 1px solid var(--border-color);
}

.form-group {
  margin-bottom: 1.5rem;

  label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: 500;
    color: var(--text-primary);
  }

  input,
  textarea {
    width: 100%;
    padding: 0.75rem;
    border: 1px solid var(--border-color);
    border-radius: 4px;
    background: var(--bg-primary);
    color: var(--text-primary);
    transition: all 0.3s ease;

    &:focus {
      outline: none;
      border-color: var(--primary-color);
      box-shadow: 0 0 0 2px rgba(142, 53, 74, 0.1);
    }
  }
}

.comments-list {
  margin-top: 2rem;
}

.comment {
  padding: 1.5rem;
  border-bottom: 1px solid var(--border-color);
  transition: background-color 0.3s ease;

  &:hover {
    background: var(--bg-secondary);
  }

  &:last-child {
    border-bottom: none;
  }
}

.comment-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;

  h3 {
    font-size: 1.1rem;
    color: var(--text-primary);
    margin: 0;
  }

  time {
    color: var(--text-tertiary);
    font-size: 0.875rem;
  }
}

.comment-content {
  color: var(--text-secondary);
  line-height: 1.6;
  white-space: pre-wrap;
}
</style> 