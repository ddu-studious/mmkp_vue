<template>
  <div class="carousel" @mouseenter="pause" @mouseleave="resume">
    <div class="carousel-inner">
      <div 
        v-for="(slide, index) in slides" 
        :key="index"
        class="carousel-slide"
        :class="{ active: currentIndex === index }"
      >
        <div class="slide-content">
          <img 
            :src="slide.image" 
            :alt="slide.title"
            loading="lazy"
          >
          <div class="slide-info">
            <h3>{{ slide.title }}</h3>
            <p>{{ slide.description }}</p>
            <div class="slide-buttons">
              <router-link 
                :to="slide.link"
                class="slide-btn btn-primary"
              >
                浏览文章
                <Icon icon="ri:arrow-right-line" />
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>

    <button 
      class="carousel-arrow prev" 
      @click="prev"
    >
      <Icon icon="ri:arrow-left-s-line" />
    </button>
    <button 
      class="carousel-arrow next" 
      @click="next"
    >
      <Icon icon="ri:arrow-right-s-line" />
    </button>

    <div class="carousel-indicators">
      <button 
        v-for="(_, index) in slides" 
        :key="index"
        class="indicator"
        :class="{ active: currentIndex === index }"
        @click="goToSlide(index)"
      >
        <div 
          v-if="currentIndex === index" 
          class="indicator-progress"
          :style="{
            animationDuration: `${interval}ms`,
            animationPlayState: isPaused ? 'paused' : 'running'
          }"
        ></div>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

interface Slide {
  image: string
  title: string
  description: string
  link: string
}

const props = defineProps<{
  slides: Slide[]
  autoplay?: boolean
  interval?: number
}>()

const currentIndex = ref(0)
const isPaused = ref(false)
const timer = ref<number | null>(null)

const next = () => {
  currentIndex.value = (currentIndex.value + 1) % props.slides.length
}

const prev = () => {
  currentIndex.value = currentIndex.value === 0 
    ? props.slides.length - 1 
    : currentIndex.value - 1
}

const goToSlide = (index: number) => {
  currentIndex.value = index
}

const startAutoplay = () => {
  if (props.autoplay && !timer.value) {
    timer.value = window.setInterval(() => {
      if (!isPaused.value) {
        next()
      }
    }, props.interval || 5000)
  }
}

const stopAutoplay = () => {
  if (timer.value) {
    clearInterval(timer.value)
    timer.value = null
  }
}

const pause = () => {
  isPaused.value = true
}

const resume = () => {
  isPaused.value = false
}

onMounted(() => {
  startAutoplay()
})

onUnmounted(() => {
  stopAutoplay()
})
</script>

<style scoped lang="scss">
.carousel {
  position: relative;
  width: 100%;
  height: 100vh;
  min-height: 600px;
  max-height: 800px;
  overflow: hidden;
}

.carousel-inner {
  position: relative;
  width: 100%;
  height: 100%;
}

.carousel-slide {
  position: absolute;
  inset: 0;
  opacity: 0;
  transition: opacity 0.6s ease;

  &.active {
    opacity: 1;
    z-index: 1;
  }

  .slide-content {
    position: relative;
    width: 100%;
    height: 100%;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    &::after {
      content: '';
      position: absolute;
      inset: 0;
      background: linear-gradient(
        to bottom,
        transparent 30%,
        rgba(0, 0, 0, 0.4) 70%,
        rgba(0, 0, 0, 0.7) 100%
      );
    }
  }

  .slide-info {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 4rem;
    color: white;
    z-index: 2;

    h3 {
      font-size: 3.5rem;
      font-weight: 800;
      line-height: 1.2;
      margin-bottom: 1.5rem;
      text-shadow: 0 2px 20px rgba(0, 0, 0, 0.3);
    }

    p {
      font-size: 1.25rem;
      max-width: 600px;
      margin-bottom: 2rem;
      text-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
    }
  }

  .slide-buttons {
    display: flex;
    gap: 1.25rem;
  }

  .slide-btn {
    display: inline-flex;
    align-items: center;
    gap: 0.75rem;
    padding: 1rem 2rem;
    border-radius: 12px;
    font-size: 1.1rem;
    font-weight: 600;
    text-decoration: none;
    transition: all 0.3s ease;

    &.btn-primary {
      background: var(--primary-color);
      color: white;
      
      &:hover {
        transform: translateY(-2px);
        box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
      }
    }
  }
}

.carousel-arrow {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 2;
  width: 48px;
  height: 48px;
  border: none;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.3);
  color: white;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background: var(--primary-color);
  }

  .icon {
    width: 32px;
    height: 32px;
  }

  &.prev {
    left: 20px;
  }

  &.next {
    right: 20px;
  }
}

.carousel-indicators {
  position: absolute;
  bottom: 30px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 12px;
  z-index: 2;

  .indicator {
    width: 40px;
    height: 4px;
    border: none;
    background: rgba(255, 255, 255, 0.3);
    cursor: pointer;
    position: relative;
    overflow: hidden;

    &.active {
      background: var(--primary-color);
    }

    .indicator-progress {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(255, 255, 255, 0.3);
      transform-origin: left;
      animation: progress linear;
    }
  }
}

@keyframes progress {
  from { transform: scaleX(0); }
  to { transform: scaleX(1); }
}

@media (max-width: 768px) {
  .carousel {
    height: 70vh;
    min-height: 500px;
  }

  .carousel-slide {
    .slide-info {
      padding: 2rem;

      h3 {
        font-size: 2rem;
      }

      p {
        font-size: 1rem;
      }
    }
  }

  .carousel-arrow {
    width: 40px;
    height: 40px;

    .icon {
      width: 24px;
      height: 24px;
    }

    &.prev { left: 10px; }
    &.next { right: 10px; }
  }
}
</style> 