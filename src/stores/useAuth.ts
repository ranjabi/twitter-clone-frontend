import { User } from '@/interfaces/interfaces'
import { create } from 'zustand'

interface AuthState {
  token: string | undefined
  getToken: () => string | undefined
  getTokenFromLocalStorage: () => void
  setTokenToLocalStorage: (token: string) => void
  user: User | undefined
  getUser: () => User | undefined
  // auth = token and user
  setAuth: (token: string, user: User) => void
  clearAuth: () => void
  getUserFromLocalStorage: () => void
  setUserToLocalStorage: (user: User) => void
}

export const useAuthStore = create<AuthState>((set, get) => ({
  token: '',
  user: undefined,
  getTokenFromLocalStorage: () => {
    const localStorageToken = localStorage.getItem('token')
    if (localStorageToken != null) {
      set({ token: localStorageToken })
    }
  },
  setTokenToLocalStorage: (token) => {
    localStorage.setItem('token', token)
  },
  getUserFromLocalStorage: () => {
    const localStorageUser = localStorage.getItem('user')
    if (localStorageUser != null) {
      set({ user: JSON.parse(localStorageUser) })
    }
  },
  setUserToLocalStorage: (user) => {
    localStorage.setItem('user', JSON.stringify(user))
  },
  setAuth: (token, user) => {
    get().setTokenToLocalStorage(token)
    get().setUserToLocalStorage(user)
    set({ user: user })
  },
  getToken: () => {
    get().getTokenFromLocalStorage()
    return get().token
  },
  getUser: () => {
    get().getUserFromLocalStorage()
    return get().user
  },
  clearAuth: () => {
    console.log('token clear')
    localStorage.removeItem('token')
    set({ token: undefined })
  },
}))
