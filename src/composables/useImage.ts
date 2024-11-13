interface ImageConfig {
  width?: number
  height?: number
  random?: boolean
  grayscale?: boolean
  blur?: number
}

export function useImage() {
  const getRandomImage = (config: ImageConfig = {}) => {
    const {
      width = 800,
      height = 600,
      random = true,
      grayscale = false,
      blur = 0
    } = config

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

  const getArticleImage = () => getRandomImage({ width: 1200, height: 600 })
  const getAvatarImage = () => getRandomImage({ width: 200, height: 200 })
  const getThumbnailImage = () => getRandomImage({ width: 400, height: 300 })
  const getHeroImage = () => getRandomImage({ width: 1920, height: 1080 })
  const getProfileImage = () => getRandomImage({ width: 300, height: 300 })

  return {
    getRandomImage,
    getArticleImage,
    getAvatarImage,
    getThumbnailImage,
    getHeroImage,
    getProfileImage
  }
} 