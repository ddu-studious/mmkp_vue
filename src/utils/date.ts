import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import 'dayjs/locale/zh-cn'

dayjs.extend(relativeTime)
dayjs.locale('zh-cn')

export function formatDate(dateString: string): string {
  const date = new Date(dateString)
  const now = new Date()
  const diff = now.getTime() - date.getTime()
  
  // 一天的毫秒数
  const day = 24 * 60 * 60 * 1000
  
  if (diff < day) {
    return '今天'
  } else if (diff < 2 * day) {
    return '昨天'
  } else if (diff < 7 * day) {
    return `${Math.floor(diff / day)}天前`
  } else {
    return date.toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }
}

export const formatDateTime = (date: string | Date): string => {
  return dayjs(date).format('YYYY年MM月DD日 HH:mm:ss')
}

export const formatRelativeTime = (date: string | Date): string => {
  return dayjs(date).fromNow()
}

export const formatDuration = (seconds: number): string => {
  const hours = Math.floor(seconds / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)
  const remainingSeconds = seconds % 60

  if (hours > 0) {
    return `${hours}小时${minutes}分钟`
  }
  if (minutes > 0) {
    return `${minutes}分钟${remainingSeconds}秒`
  }
  return `${remainingSeconds}秒`
}

export const isToday = (date: string | Date): boolean => {
  return dayjs(date).isSame(dayjs(), 'day')
}

export const isYesterday = (date: string | Date): boolean => {
  return dayjs(date).isSame(dayjs().subtract(1, 'day'), 'day')
}

export const isSameDay = (date1: string | Date, date2: string | Date): boolean => {
  return dayjs(date1).isSame(dayjs(date2), 'day')
}

export const getDaysDifference = (date1: string | Date, date2: string | Date): number => {
  return dayjs(date1).diff(dayjs(date2), 'day')
}

export const addDays = (date: string | Date, days: number): Date => {
  return dayjs(date).add(days, 'day').toDate()
}

export const subtractDays = (date: string | Date, days: number): Date => {
  return dayjs(date).subtract(days, 'day').toDate()
}

export const startOfDay = (date: string | Date): Date => {
  return dayjs(date).startOf('day').toDate()
}

export const endOfDay = (date: string | Date): Date => {
  return dayjs(date).endOf('day').toDate()
}

export const parseDate = (dateString: string, format = 'YYYY-MM-DD'): Date | null => {
  const parsed = dayjs(dateString, format)
  return parsed.isValid() ? parsed.toDate() : null
}