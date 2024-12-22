import { Toaster } from '@/components/ui/toaster'
import { toast } from '@/hooks/use-toast'
import { Tweet } from '@/interfaces/interfaces'
import { apiInstance } from '@/lib/utils'
import { useAuthStore } from '@/stores/useAuth'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

const Profile = () => {
  const router = useRouter()

  const getToken = useAuthStore((state) => state.getToken)
  const getUser = useAuthStore((state) => state.getUser)
  const token = useAuthStore((state) => state.token)
  const user = useAuthStore((state) => state.user)

  const getFeed = async (
    token: string | undefined,
  ): Promise<Tweet[] | undefined> => {
    try {
      const res = await apiInstance({ token }).get(`/users/${user?.id}/feed`, {
        params: {
          page: 1,
        },
      })
      console.log('query run')
      return res.data.data
    } catch (error) {
      console.log('err:', error)
      if (axios.isAxiosError(error)) {
        toast({
          variant: 'destructive',
          title: 'Something went wrong',
          description: error.response?.data.message,
        })
      }
    }
  }

  useEffect(() => {
    getToken()
    getUser()
  }, [getToken, getUser])

  const { isPending, isError, data } = useQuery({
    queryKey: ['feed', token],
    // queryFn: ({ queryKey }) => {
    //   const [, token] = queryKey as [string, string];
    //   return getFeed(token);
    // },
    queryFn: () => getFeed(token),
    enabled: !!token,
  })

  if (isPending) {
    return <span>Loading...</span>
  }

  if (isError) {
    return <span>Fail to get feed</span>
  }

  return (
    <div>
      <Toaster />
      <h1>user profile id: {router.query.username}</h1>
      <p>token: {JSON.stringify(token) || 'undefined'}</p>
      <p>user: {JSON.stringify(user) || 'undefined'}</p>
      <p>feed: {JSON.stringify(data)}</p>
    </div>
  )
}

export default Profile
