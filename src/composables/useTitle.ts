import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'

export function useTitle(prefix = '') {
  const route = useRoute()
  const title = ref(document.title)

  const updateTitle = (newTitle: string) => {
    title.value = newTitle
    document.title = prefix ? `${newTitle} - ${prefix}` : newTitle
  }

  watch(
    () => route.meta.title,
    (newTitle) => {
      if (newTitle) {
        updateTitle(newTitle as string)
      }
    },
    { immediate: true }
  )

  return {
    title,
    updateTitle
  }
} 