import TweetItem from '@/components/tweet/tweetItem'
import { Toaster } from '@/components/ui/toaster'
import { toast } from '@/hooks/use-toast'
import { Tweet } from '@/interfaces/interfaces'
import { apiInstance } from '@/lib/utils'
import { useAuthStore } from '@/stores/useAuth'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { useEffect } from 'react'

const Feed = () => {
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
      return res.data.data
    } catch (error) {
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
      {data?.map((tweet) => {
        return (
          <TweetItem
            key={tweet.id}
            id={tweet.id}
            userFullName="full name"
            username="kevin"
            content={tweet.content}
            date={tweet.createdAt}
            replyCount={0}
            retweetCount={0}
            likeCount={0}
          />
        )
      })}
    </div>
  )
}

export default Feed
