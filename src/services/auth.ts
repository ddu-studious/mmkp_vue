import type { User, UserLoginForm, UserRegisterForm } from '@/types/user'
import type { ApiResponse } from '@/types/api'
import { apiService } from './api'

export interface AuthResponse extends ApiResponse<{
  user: User
  token: string
  refreshToken: string
}> {}

export class AuthService {
  async login(data: UserLoginForm) {
    return apiService.instance.post<AuthResponse>('/auth/login', data)
  }

  async register(data: UserRegisterForm) {
    return apiService.instance.post<AuthResponse>('/auth/register', data)
  }

  async logout() {
    return apiService.instance.post<ApiResponse<void>>('/auth/logout')
  }

  async refreshToken(refreshToken: string) {
    return apiService.instance.post<AuthResponse>('/auth/refresh', { refreshToken })
  }

  async getCurrentUser() {
    return apiService.instance.get<ApiResponse<User>>('/auth/me')
  }
}

export const authService = new AuthService() 