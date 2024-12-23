import { ReactNode } from 'react'
import { SidebarProvider } from '@/components/ui/sidebar'
import AppSidebar from './app-sidebar'
// import { useRouter } from 'next/router'
import { useAuthStore } from '@/stores/useAuth'
import { Toaster } from './ui/toaster'

const Layout = ({ children }: { children: ReactNode }) => {
  const token = useAuthStore((state) => state.token)
  const user = useAuthStore((state) => state.user)
  // const router = useRouter()

  // const getToken = useAuthStore((state) => state.getToken)
  // const getUser = useAuthStore((state) => state.getUser)
  // const isFinished = useAuthStore((state) => state.isFinished)

  // useEffect(() => {
  //   if ((!getToken() && !getUser())) {
  //     router.push('/login')
  //   }
  // }, [getToken, getUser, router])

  console.log('user === undefined', user === undefined)
  console.log('token === undefined', token === undefined)

  // useEffect(() => {
  //   if ((user !== undefined || token !== undefined)) {
  //     router.push('/login')
  //   }
  // }, [router, user, token])

  return (
    <>
      {/* {((user && token) && ( */}
      <>
        <Toaster />
        <SidebarProvider>
          <AppSidebar />
          <div className="container mx-auto px-4 max-w-screen-md border-gray-700 border-x min-h-screen">
            <main>{children}</main>
          </div>
        </SidebarProvider>
      </>
      {/* ))} */}
    </>
  )
}

export default Layout
