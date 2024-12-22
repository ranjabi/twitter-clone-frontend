import { ReactNode } from 'react'

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="container mx-auto px-4 max-w-screen-md border-gray-600 border-x-2 min-h-screen">
      {children}
    </div>
  )
}

export default Layout
