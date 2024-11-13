import { ref, onMounted, onUnmounted } from 'vue'

export const breakpoints = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536
} as const

type Breakpoint = keyof typeof breakpoints

export function useBreakpoints() {
  const windowWidth = ref(window.innerWidth)
  const currentBreakpoint = ref<Breakpoint | null>(null)

  const updateWidth = () => {
    windowWidth.value = window.innerWidth
    updateBreakpoint()
  }

  const updateBreakpoint = () => {
    const width = windowWidth.value
    if (width < breakpoints.sm) {
      currentBreakpoint.value = null
    } else if (width < breakpoints.md) {
      currentBreakpoint.value = 'sm'
    } else if (width < breakpoints.lg) {
      currentBreakpoint.value = 'md'
    } else if (width < breakpoints.xl) {
      currentBreakpoint.value = 'lg'
    } else if (width < breakpoints['2xl']) {
      currentBreakpoint.value = 'xl'
    } else {
      currentBreakpoint.value = '2xl'
    }
  }

  const isGreaterThan = (breakpoint: Breakpoint) => {
    return windowWidth.value >= breakpoints[breakpoint]
  }

  const isLessThan = (breakpoint: Breakpoint) => {
    return windowWidth.value < breakpoints[breakpoint]
  }

  const isBetween = (min: Breakpoint, max: Breakpoint) => {
    return windowWidth.value >= breakpoints[min] && windowWidth.value < breakpoints[max]
  }

  onMounted(() => {
    window.addEventListener('resize', updateWidth)
    updateBreakpoint()
  })

  onUnmounted(() => {
    window.removeEventListener('resize', updateWidth)
  })

  return {
    windowWidth,
    currentBreakpoint,
    isGreaterThan,
    isLessThan,
    isBetween
  }
} 