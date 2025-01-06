import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar'
import { ChevronUp, House, User } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu'
import { useAuthStore } from '@/stores/useAuth'
import { useRouter } from 'next/router'
import UserAvatar from './user-avatar'

const AppSidebar = () => {
  const user = useAuthStore((state) => state.user)
  const router = useRouter()
  const logout = useAuthStore((state) => state.logout)

  const items = [
    {
      title: 'Home',
      url: '/',
      icon: House,
      isSlug: false,
    },
    {
      title: 'Profile',
      url: `/profile/${user?.username}`,
      icon: User,
      isSlug: true,
    },
  ]

  return (
    <Sidebar collapsible="none" className="fixed">
      <SidebarContent className="px-4 min-h-screen">
        <p className="px-4 text-2xl mt-6 mb-2 font-extrabold">
          <span className="text-sky-500">Twitter</span>Clone
        </p>
        <SidebarMenu className="mt-2">
          {items.map((item) => (
            <SidebarMenuItem key={item.title} className="">
              <SidebarMenuButton
                asChild
                className="px-4 h-12"
                isActive={
                  item.isSlug
                    ? user?.username === router.query.username
                    : router.pathname === item.url
                }
              >
                <a href={item.url}>
                  <item.icon style={{ width: 24, height: 24 }} />
                  <span className="text-2xl ml-2">{item.title}</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="absolute bottom-0 w-full">
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton className="h-16">
                  <div className="flex w-full">
                    <UserAvatar userId={user?.id} classname="w-10 h-10 -mt-1" />
                    <div className="ml-3">
                      <p>@{user?.username}</p>
                    </div>
                  </div>
                  <ChevronUp className="mr-2" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                side="top"
                className="w-[--radix-popper-anchor-width]"
              >
                <DropdownMenuItem>
                  <button
                    className="w-full text-left pl-2 cursor-pointer h-6"
                    onClick={() => {
                      logout()
                      router.push('/login')
                    }}
                  >
                    Sign out
                  </button>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}

export default AppSidebar
