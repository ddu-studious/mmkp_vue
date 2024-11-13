<template>
  <div class="image-upload" :class="{ 'is-dragging': isDragging }">
    <input
      ref="fileInput"
      type="file"
      accept="image/*"
      @change="handleFileChange"
      class="file-input"
      :multiple="multiple"
    >
    
    <div 
      class="upload-area"
      @dragenter.prevent="isDragging = true"
      @dragleave.prevent="isDragging = false"
      @dragover.prevent
      @drop.prevent="handleDrop"
      @click="triggerFileInput"
    >
      <div v-if="!preview && !loading" class="placeholder">
        <svg viewBox="0 0 24 24" class="upload-icon">
          <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
        </svg>
        <p>点击或拖拽图片上传</p>
        <p class="hint">支持 jpg、png、gif 格式，最大 5MB</p>
      </div>

      <img 
        v-if="preview" 
        :src="preview" 
        alt="预览图"
        class="preview-image"
      >

      <LoadingSpinner 
        v-if="loading"
        :loading="loading"
        message="上传中..."
      />
    </div>

    <div v-if="error" class="error-message">
      {{ error }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import LoadingSpinner from './LoadingSpinner.vue'

interface Props {
  multiple?: boolean
  maxSize?: number // 单位：MB
  accept?: string[]
}

const props = withDefaults(defineProps<Props>(), {
  multiple: false,
  maxSize: 5,
  accept: () => ['image/jpeg', 'image/png', 'image/gif']
})

const emit = defineEmits<{
  (e: 'upload-success', url: string): void
  (e: 'upload-error', error: string): void
}>()

const fileInput = ref<HTMLInputElement>()
const preview = ref<string>('')
const loading = ref(false)
const error = ref<string>('')
const isDragging = ref(false)

const validateFile = (file: File): boolean => {
  // 检查文件类型
  if (!props.accept.includes(file.type)) {
    error.value = '不支持的文件格式'
    return false
  }

  // 检查文件大小
  if (file.size > props.maxSize * 1024 * 1024) {
    error.value = `文件大小不能超过 ${props.maxSize}MB`
    return false
  }

  return true
}

const uploadFile = async (file: File) => {
  if (!validateFile(file)) return

  loading.value = true
  error.value = ''

  try {
    // 创建预览
    preview.value = URL.createObjectURL(file)

    // 模拟上传
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // 这里应该调用实际的上传 API
    const uploadedUrl = preview.value
    emit('upload-success', uploadedUrl)
  } catch (e) {
    const message = e instanceof Error ? e.message : '上传失败'
    error.value = message
    emit('upload-error', message)
  } finally {
    loading.value = false
  }
}

const handleFileChange = (event: Event) => {
  const input = event.target as HTMLInputElement
  if (!input.files?.length) return
  
  const file = input.files[0]
  uploadFile(file)
}

const handleDrop = (event: DragEvent) => {
  isDragging.value = false
  const file = event.dataTransfer?.files[0]
  if (file) {
    uploadFile(file)
  }
}

const triggerFileInput = () => {
  fileInput.value?.click()
}
</script>

<style scoped lang="scss">
.image-upload {
  width: 100%;
}

.file-input {
  display: none;
}

.upload-area {
  position: relative;
  width: 100%;
  min-height: 200px;
  border: 2px dashed var(--border-color);
  border-radius: 8px;
  background: var(--bg-secondary);
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    border-color: var(--primary-color);
    background: var(--bg-tertiary);
  }
}

.is-dragging .upload-area {
  border-color: var(--primary-color);
  background: var(--primary-light);
}

.placeholder {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  color: var(--text-secondary);

  .upload-icon {
    width: 48px;
    height: 48px;
    margin-bottom: 1rem;
    fill: currentColor;
  }

  .hint {
    margin-top: 0.5rem;
    font-size: 0.875rem;
    color: var(--text-tertiary);
  }
}

.preview-image {
  width: 100%;
  height: 100%;
  object-fit: contain;
  border-radius: 6px;
}

.error-message {
  margin-top: 0.5rem;
  color: var(--error);
  font-size: 0.875rem;
}
</style> 