import TweetItem from '@/components/tweet/tweetItem'
import { Toaster } from '@/components/ui/toaster'
import { toast } from '@/hooks/use-toast'
import { Profile } from '@/interfaces/interfaces'
import { apiInstance } from '@/lib/utils'
import { useAuthStore } from '@/stores/useAuth'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

const ProfilePage = () => {
  const router = useRouter()
  const {username} = router.query

  const getToken = useAuthStore((state) => state.getToken)
  const getUser = useAuthStore((state) => state.getUser)
  const token = useAuthStore((state) => state.token)
  const user = useAuthStore((state) => state.user)

  const getProfile = async (): Promise<Profile | undefined> => {
    try {
      const res = await apiInstance({ token }).get(`/users/${username}`)
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
    queryKey: ['profile'],
    queryFn: getProfile,
    enabled: !!token && !!username,
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
      {data?.recentTweets.map((tweet) => {
        return (
          <TweetItem
            key={tweet.id}
            tweet={{
              id: tweet.id,
              userFullName: "full name",
              username: "kevin",
              content: tweet.content,
              date: tweet.createdAt,
              replyCount: 0,
              retweetCount: 0,
              likeCount: tweet.likeCount,
              isLiked: tweet.isLiked,
              userId: tweet.userId
            }}
            userId={user?.id}
          />
        )
      })}
    </div>
  )
}

export default ProfilePage