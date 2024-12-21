import { create } from 'zustand'

interface AuthState {
  token: string | undefined // todo: tarok di instance exios
  loadTokenFromLocalStorage: () => void
  getToken: () => string | undefined
  clearToken: () => void
}

export const useAuthStore = create<AuthState>((set, get) => ({
  token: '',
  loadTokenFromLocalStorage: () => {
    const localStorageToken = localStorage.getItem('token')
    if (localStorageToken != null) {
      set({ token: localStorageToken })
    }
  },
  getToken: () => {
    get().loadTokenFromLocalStorage()
    return get().token
  },
  clearToken: () => {
    console.log('token clear')
    localStorage.removeItem('token')
    set({ token: undefined })
  },
}))
