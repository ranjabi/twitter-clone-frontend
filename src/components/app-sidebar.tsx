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
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { useRouter } from 'next/router'

const AppSidebar = () => {
  const user = useAuthStore((state) => state.user)
  const clearAuth = useAuthStore((state) => state.clearAuth)
  const router = useRouter()

  const items = [
    {
      title: 'Home',
      url: '/',
      icon: House,
    },
    {
      title: 'Profile',
      url: `/${user?.username}`,
      icon: User,
    },
  ]

  return (
    <Sidebar collapsible="none" className="px-4 fixed">
      <SidebarContent className="min-h-screen">
        <p className="px-4 text-2xl mt-3 font-extrabold">
          <span className="text-sky-500">Twitter</span>Clone
        </p>
        <SidebarMenu className="mt-2 gap-y-3">
          {items.map((item) => (
            <SidebarMenuItem key={item.title} className="">
              <SidebarMenuButton asChild className="px-4 h-12">
                <a href={item.url} className="">
                  <item.icon />
                  <span className="text-2xl">{item.title}</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="absolute bottom-0 -left-1 w-full">
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton className="h-16">
                  <div className="flex w-full">
                    <Avatar>
                      <AvatarImage src="https://github.com/shadcn.png" />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
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
                      clearAuth()
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
