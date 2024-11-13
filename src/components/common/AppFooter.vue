<template>
  <footer class="app-footer">
    <div class="footer-content">
      <div class="footer-section about">
        <h3>关于我们</h3>
        <p>分享技术，记录成长</p>
      </div>

      <div class="footer-section quick-links">
        <h3>快速链接</h3>
        <nav>
          <router-link to="/articles">最新文章</router-link>
          <router-link to="/categories">专题分类</router-link>
          <router-link to="/tags">标签云</router-link>
          <router-link to="/about">关于我</router-link>
        </nav>
      </div>

      <div class="footer-section contact">
        <h3>联系我们</h3>
        <div class="contact-info">
          <a href="mailto:contact@techblog.com">
            <Icon icon="ri:mail-line" />
            contact@techblog.com
          </a>
          <span>
            <Icon icon="ri:map-pin-line" />
            中国·北京
          </span>
        </div>
      </div>
    </div>

    <div class="footer-bottom">
      <div class="copyright">
        © {{ currentYear }} 技术博客. 保留所有权利
      </div>
      <div class="links">
        <a href="/privacy">隐私政策</a>
        <a href="/terms">使用条款</a>
        <a href="/sitemap">网站地图</a>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const currentYear = computed(() => new Date().getFullYear())
</script>

<style scoped lang="scss">
.app-footer {
  background: var(--bg-secondary);
  padding: 4rem 0 0;
  margin-top: 4rem;
  border-top: 1px solid var(--border-color);
}

.footer-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 3rem;
}

.footer-section {
  h3 {
    font-size: 1.25rem;
    color: var(--text-primary);
    margin-bottom: 1.5rem;
  }

  p {
    color: var(--text-secondary);
    line-height: 1.6;
  }

  nav {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;

    a {
      color: var(--text-secondary);
      text-decoration: none;
      transition: color 0.3s ease;

      &:hover {
        color: var(--primary-color);
      }
    }
  }
}

.contact-info {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;

  a, span {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    color: var(--text-secondary);
    text-decoration: none;

    .icon {
      width: 1.25em;
      height: 1.25em;
    }
  }

  a:hover {
    color: var(--primary-color);
  }
}

.footer-bottom {
  margin-top: 4rem;
  padding: 1.5rem 2rem;
  border-top: 1px solid var(--border-color);
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: var(--text-tertiary);
  font-size: 0.875rem;

  .links {
    display: flex;
    gap: 1.5rem;

    a {
      color: var(--text-tertiary);
      text-decoration: none;

      &:hover {
        color: var(--primary-color);
      }
    }
  }
}

@media (max-width: 768px) {
  .app-footer {
    padding: 3rem 0 0;
    margin-top: 3rem;
  }

  .footer-content {
    padding: 0 1.5rem;
    gap: 2rem;
  }

  .footer-bottom {
    margin-top: 3rem;
    padding: 1.5rem;
    flex-direction: column;
    gap: 1rem;
    text-align: center;

    .links {
      justify-content: center;
    }
  }
}
</style> 