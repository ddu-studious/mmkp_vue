import { IMAGE_CONFIG } from '@/config/images'

export function getPlaceholderImage(
  width: number = 800,
  height: number = 600,
  options: {
    random?: boolean
    grayscale?: boolean
    blur?: number
  } = {}
): string {
  const { random = true, grayscale = false, blur = 0 } = options
  
  let url = `https://picsum.photos/${width}/${height}`
  
  if (random) {
    url += `?random=${Math.random()}`
  }
  
  if (grayscale) {
    url += random ? '&' : '?'
    url += 'grayscale'
  }
  
  if (blur > 0) {
    url += random || grayscale ? '&' : '?'
    url += `blur=${blur}`
  }
  
  return url
}

export const getArticleImage = () => 
  getPlaceholderImage(IMAGE_CONFIG.article.detail.width, IMAGE_CONFIG.article.detail.height)

export const getArticleThumbnail = () => 
  getPlaceholderImage(IMAGE_CONFIG.article.thumbnail.width, IMAGE_CONFIG.article.thumbnail.height)

export const getAvatarImage = (size: keyof typeof IMAGE_CONFIG.avatar = 'medium') => 
  getPlaceholderImage(IMAGE_CONFIG.avatar[size].width, IMAGE_CONFIG.avatar[size].height)

export const getHeroImage = () => 
  getPlaceholderImage(IMAGE_CONFIG.hero.width, IMAGE_CONFIG.hero.height)

export const getPortfolioImage = () => 
  getPlaceholderImage(IMAGE_CONFIG.portfolio.width, IMAGE_CONFIG.portfolio.height) 