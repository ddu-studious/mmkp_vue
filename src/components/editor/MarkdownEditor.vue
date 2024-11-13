<template>
  <div class="markdown-editor">
    <div class="toolbar">
      <button 
        v-for="(tool, index) in toolbar" 
        :key="index"
        @click="tool.action"
        :title="tool.title"
        class="tool-btn"
      >
        <i :class="tool.icon"></i>
      </button>
      <div class="divider"></div>
      <ImageUpload @upload-success="insertImage" />
    </div>

    <div class="editor-container">
      <div class="editor-wrapper">
        <textarea
          ref="textarea"
          v-model="content"
          @input="handleInput"
          @scroll="syncScroll"
          class="editor"
          :placeholder="placeholder"
        ></textarea>
      </div>
      <div 
        ref="preview"
        class="preview markdown-body"
        v-html="renderedContent"
        @scroll="syncScroll"
      ></div>
    </div>

    <div class="status-bar">
      <div class="word-count">
        {{ wordCount }} 字 | {{ lineCount }} 行
      </div>
      <div class="mode-switch">
        <button 
          v-for="mode in modes" 
          :key="mode.value"
          @click="currentMode = mode.value"
          :class="{ active: currentMode === mode.value }"
          class="mode-btn"
        >
          {{ mode.label }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { renderMarkdown } from '@/plugins/markdown'
import ImageUpload from '@/components/common/ImageUpload.vue'
import { debounce } from '@/utils'

interface Props {
  modelValue: string
  placeholder?: string
  autosave?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  placeholder: '开始编写...',
  autosave: true
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
  (e: 'save', value: string): void
}>()

const content = ref(props.modelValue)
const textarea = ref<HTMLTextAreaElement>()
const preview = ref<HTMLDivElement>()
const currentMode = ref<'edit' | 'split' | 'preview'>('split')

const modes = [
  { label: '编辑', value: 'edit' },
  { label: '分屏', value: 'split' },
  { label: '预览', value: 'preview' }
]

const toolbar = [
  {
    icon: 'icon-bold',
    title: '加粗 (Ctrl+B)',
    action: () => insertText('**', '**', '加粗文本')
  },
  {
    icon: 'icon-italic',
    title: '斜体 (Ctrl+I)',
    action: () => insertText('*', '*', '斜体文本')
  },
  {
    icon: 'icon-link',
    title: '链接 (Ctrl+K)',
    action: () => insertText('[', '](url)', '链接文本')
  },
  {
    icon: 'icon-code',
    title: '代码块',
    action: () => insertText('\n```\n', '\n```\n', '代码')
  },
  {
    icon: 'icon-list',
    title: '无序列表',
    action: () => insertText('- ', '', '列表项')
  }
]

const renderedContent = computed(() => {
  return renderMarkdown(content.value)
})

const wordCount = computed(() => {
  return content.value.length
})

const lineCount = computed(() => {
  return content.value.split('\n').length
})

const handleInput = debounce(() => {
  emit('update:modelValue', content.value)
  if (props.autosave) {
    emit('save', content.value)
  }
}, 300)

const insertText = (before: string, after: string, defaultText: string) => {
  const textArea = textarea.value
  if (!textArea) return

  const start = textArea.selectionStart
  const end = textArea.selectionEnd
  const selectedText = content.value.substring(start, end)
  const replacement = selectedText || defaultText
  
  content.value = 
    content.value.substring(0, start) +
    before + replacement + after +
    content.value.substring(end)

  // 恢复光标位置
  nextTick(() => {
    textArea.focus()
    const newCursorPos = start + before.length + replacement.length
    textArea.setSelectionRange(newCursorPos, newCursorPos)
  })
}

const insertImage = (url: string) => {
  insertText('![图片](', ')', url)
}

const syncScroll = (e: Event) => {
  const target = e.target as HTMLElement
  const isEditor = target === textarea.value
  const source = isEditor ? textarea.value : preview.value
  const dest = isEditor ? preview.value : textarea.value
  
  if (!source || !dest) return
  
  const percentage = source.scrollTop / (source.scrollHeight - source.clientHeight)
  dest.scrollTop = percentage * (dest.scrollHeight - dest.clientHeight)
}

watch(() => props.modelValue, (newValue) => {
  if (newValue !== content.value) {
    content.value = newValue
  }
})

onMounted(() => {
  if (textarea.value) {
    textarea.value.focus()
  }
})
</script>

<style scoped lang="scss">
.markdown-editor {
  border: 1px solid var(--border-color);
  border-radius: 8px;
  background: var(--bg-primary);
  overflow: hidden;
}

.toolbar {
  display: flex;
  align-items: center;
  padding: 0.5rem;
  border-bottom: 1px solid var(--border-color);
  background: var(--bg-secondary);
}

.tool-btn {
  padding: 0.5rem;
  background: none;
  border: none;
  color: var(--text-secondary);
  cursor: pointer;
  border-radius: 4px;
  transition: all 0.2s ease;

  &:hover {
    color: var(--primary-color);
    background: var(--bg-tertiary);
  }
}

.divider {
  width: 1px;
  height: 24px;
  background: var(--border-color);
  margin: 0 0.5rem;
}

.editor-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  height: 500px;
}

.editor-wrapper,
.preview {
  overflow-y: auto;
  padding: 1rem;
}

.editor {
  width: 100%;
  height: 100%;
  border: none;
  resize: none;
  background: none;
  color: var(--text-primary);
  font-family: var(--font-mono);
  line-height: 1.6;
  
  &:focus {
    outline: none;
  }
}

.preview {
  border-left: 1px solid var(--border-color);
  background: var(--bg-secondary);
}

.status-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 1rem;
  border-top: 1px solid var(--border-color);
  background: var(--bg-secondary);
  font-size: 0.875rem;
  color: var(--text-tertiary);
}

.mode-switch {
  display: flex;
  gap: 0.5rem;
}

.mode-btn {
  padding: 0.25rem 0.75rem;
  border: 1px solid var(--border-color);
  border-radius: 4px;
  background: var(--bg-primary);
  color: var(--text-secondary);
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    border-color: var(--primary-color);
    color: var(--primary-color);
  }

  &.active {
    background: var(--primary-color);
    border-color: var(--primary-color);
    color: white;
  }
}

// 响应式布局
@media (max-width: 768px) {
  .editor-container {
    grid-template-columns: 1fr;
  }

  .preview {
    display: none;
  }

  &[data-mode="preview"] {
    .editor-wrapper {
      display: none;
    }
    .preview {
      display: block;
    }
  }
}
</style> 