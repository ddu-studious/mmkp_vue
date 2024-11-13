<template>
  <div class="contact-page">
    <section class="contact-info">
      <h1>联系我</h1>
      <p class="description">
        如果您有任何问题或建议，欢迎通过以下方式与我联系
      </p>
      
      <div class="info-grid">
        <div class="info-item">
          <i class="icon-email"></i>
          <h3>邮箱</h3>
          <p>example@example.com</p>
        </div>
        <div class="info-item">
          <i class="icon-wechat"></i>
          <h3>微信</h3>
          <p>扫描二维码添加</p>
        </div>
        <div class="info-item">
          <i class="icon-github"></i>
          <h3>GitHub</h3>
          <p>@username</p>
        </div>
      </div>
    </section>

    <section class="contact-form">
      <h2>发送消息</h2>
      <form @submit.prevent="handleSubmit">
        <div class="form-group">
          <label for="name">姓名</label>
          <input 
            type="text" 
            id="name" 
            v-model="form.name"
            required
          >
        </div>

        <div class="form-group">
          <label for="email">邮箱</label>
          <input 
            type="email" 
            id="email" 
            v-model="form.email"
            required
          >
        </div>

        <div class="form-group">
          <label for="subject">主题</label>
          <input 
            type="text" 
            id="subject" 
            v-model="form.subject"
            required
          >
        </div>

        <div class="form-group">
          <label for="message">消息内容</label>
          <textarea 
            id="message" 
            v-model="form.message"
            rows="6"
            required
          ></textarea>
        </div>

        <button type="submit" class="btn btn-primary" :disabled="loading">
          {{ loading ? '发送中...' : '发送消息' }}
        </button>
      </form>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const loading = ref(false)
const form = ref({
  name: '',
  email: '',
  subject: '',
  message: ''
})

const handleSubmit = async () => {
  loading.value = true
  try {
    // 发送消息的逻辑
    await new Promise(resolve => setTimeout(resolve, 1000))
    alert('消息已发送')
    form.value = {
      name: '',
      email: '',
      subject: '',
      message: ''
    }
  } catch (error) {
    alert('发送失败，请稍后重试')
  } finally {
    loading.value = false
  }
}
</script>

<style scoped lang="scss">
.contact-page {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
}

.contact-info {
  h1 {
    font-size: 2rem;
    color: var(--text-primary);
    margin-bottom: 1rem;
    font-family: "楷体", "STKaiti", serif;
  }

  .description {
    color: var(--text-secondary);
    margin-bottom: 3rem;
  }
}

.info-grid {
  display: grid;
  gap: 2rem;
}

.info-item {
  padding: 2rem;
  background: var(--bg-primary);
  border: 1px solid var(--border-color);
  border-radius: 8px;
  text-align: center;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: var(--shadow-lg);
  }

  i {
    font-size: 2rem;
    color: var(--primary-color);
    margin-bottom: 1rem;
  }

  h3 {
    color: var(--text-primary);
    margin-bottom: 0.5rem;
  }

  p {
    color: var(--text-secondary);
  }
}

.contact-form {
  background: var(--bg-primary);
  padding: 2rem;
  border-radius: 8px;
  border: 1px solid var(--border-color);

  h2 {
    font-size: 1.5rem;
    color: var(--text-primary);
    margin-bottom: 2rem;
    font-family: "楷体", "STKaiti", serif;
  }
}

@media (max-width: 768px) {
  .contact-page {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
}
</style> 