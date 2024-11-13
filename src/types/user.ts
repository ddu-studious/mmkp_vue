export interface User {
  id: number
  name: string
  email: string
  avatar?: string
  bio?: string
  role: 'admin' | 'user'
  status: 'active' | 'inactive'
  createdAt: string
  updatedAt: string
  preferences: {
    theme: 'light' | 'dark'
    fontSize: 'small' | 'medium' | 'large'
    language: 'zh' | 'en'
    emailNotifications: boolean
  }
  social?: {
    github?: string
    twitter?: string
    linkedin?: string
    website?: string
  }
  stats?: {
    articles: number
    comments: number
    likes: number
    followers: number
    following: number
  }
}

export interface UserLoginForm {
  email: string
  password: string
  remember?: boolean
}

export interface UserRegisterForm {
  name: string
  email: string
  password: string
  confirmPassword: string
  terms: boolean
}

export interface UserUpdateForm {
  name?: string
  email?: string
  bio?: string
  avatar?: File
  social?: User['social']
  preferences?: Partial<User['preferences']>
} 