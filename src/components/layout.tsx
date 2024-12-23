import { ReactNode, useEffect } from 'react'
import { SidebarProvider } from '@/components/ui/sidebar'
import AppSidebar from './app-sidebar'
import { useAuthStore } from '@/stores/useAuth'
import { Toaster } from './ui/toaster'
import { useRouter } from 'next/router'

const Layout = ({ children }: { children: ReactNode }) => {
  const router = useRouter()

  const setToken = useAuthStore((state) => state.setToken)
  const setUser = useAuthStore((state) => state.setUser)
  const isReady = useAuthStore((state) => state.isReady)
  const setIsReady = useAuthStore((state) => state.setIsReady)
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn)

  useEffect(() => {
    const userLocalStorage = localStorage.getItem('user')
    const tokenLocalStorage = localStorage.getItem('token')
    if (userLocalStorage && tokenLocalStorage) {
      setUser(JSON.parse(userLocalStorage))
      setToken(tokenLocalStorage)
    }
    setIsReady(true)
  }, [setIsReady, setUser, setToken])

  useEffect(() => {
    if (isReady) {
      if (!isLoggedIn()) {
        router.push('/login')
      }
    }
  }, [isReady, isLoggedIn, router])

  return (
    <>
      {isReady && isLoggedIn() && (
        <>
          <Toaster />
          <SidebarProvider>
            <AppSidebar />
            <div className="container mx-auto px-4 max-w-screen-md border-gray-700 border-x min-h-screen">
              <main>{children}</main>
            </div>
          </SidebarProvider>
        </>
      )}
    </>
  )
}

export default Layout
