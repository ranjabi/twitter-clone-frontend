import { useAuthStore } from '@/stores/useAuth'
import { useEffect } from 'react'
import Feed from '@/components/feed'
import CreateTweet from '@/components/tweet/create'

const Home = () => {
  // const getToken = useAuthStore((state) => state.getToken)
  // const clearToken = useAuthStore((state) => state.clearToken)
  // const token = useAuthStore((state) => state.token)

  // useEffect(() => {
  //   getToken()
  // }, [getToken])

  return (
    <div>
      <CreateTweet/>
      <Feed/>
      <p>hola!</p>
      {/* <p>token {token || 'undefined'}</p> */}
      {/* <button onClick={clearToken}>clear</button> */}
    </div>
  )
}

export default Home