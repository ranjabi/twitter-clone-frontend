import { useAuthStore } from '@/stores/useAuth'
import { useEffect } from 'react'

export default function Home() {
  const getToken = useAuthStore((state) => state.getToken)
  // const clearToken = useAuthStore((state) => state.clearToken)
  const token = useAuthStore((state) => state.token)

  useEffect(() => {
    getToken()
  }, [getToken])

  return (
    <div>
      <p>hola!</p>
      <p>token {token || 'undefined'}</p>
      {/* <button onClick={clearToken}>clear</button> */}
    </div>
  )
}
