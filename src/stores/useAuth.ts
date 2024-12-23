import { User } from '@/interfaces/interfaces'
import { create } from 'zustand'

interface AuthState {
  token: string | undefined
  setToken: (token: string) => void
  user: User | undefined
  setUser: (user: User) => void
  isReady: boolean
  setIsReady: (isReady: boolean) => void
  isLoggedIn: () => boolean
  logout: () => void
}

export const useAuthStore = create<AuthState>((set, get) => ({
  token: undefined,
  setToken: (token) => {
    localStorage.setItem('token', token)
    set({ token })
  },
  user: undefined,
  setUser: (user) => {
    localStorage.setItem('user', JSON.stringify(user))
    set({ user })
  },
  isReady: false,
  setIsReady: (isReady) => {
    set({ isReady })
  },
  isLoggedIn: () => {
    console.log('isLoggedIn:', !!get().user && !!get().token)
    return !!get().user && !!get().token
  },
  logout: () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    set({ user: undefined })
    set({ token: undefined })
  },
}))
