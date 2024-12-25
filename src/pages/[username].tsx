import ProfileHeader from '@/components/profileHeader'
import TweetItem from '@/components/tweet/tweetItem'
import { toast } from '@/hooks/use-toast'
import { Profile } from '@/interfaces/interfaces'
import { apiInstance } from '@/lib/utils'
import { useAuthStore } from '@/stores/useAuth'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import { useRouter } from 'next/router'

const ProfilePage = () => {
  const router = useRouter()
  const { username } = router.query
  const user = useAuthStore((state) => state.user)
  const queryClient = useQueryClient()

  const getProfile = async (): Promise<Profile | undefined> => {
    try {
      const res = await apiInstance.get(`/users/${username}`)
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

  const { isPending, isError, data } = useQuery({
    queryKey: ['profile', username],
    queryFn: getProfile,
    enabled: !!username,
  })

  if (isPending) {
    return <span>Loading...</span>
  }

  if (isError) {
    return <span>Fail to get feed</span>
  }

  return (
    <div>
      {data && (
        <ProfileHeader
          id={data.id}
          fullName={data.username}
          username={data.username}
          followerCount={data.followerCount}
          followingCount={data.followingCount}
          isFollowed={data.isFollowed}
          queryClient={queryClient}
        />
      )}
      {data?.recentTweets.map((tweet) => {
        return (
          <TweetItem
            queryKey={['profile', tweet.username]}
            key={tweet.id}
            tweet={{
              id: tweet.id,
              userFullName: tweet.username,
              username: tweet.username,
              content: tweet.content,
              date: tweet.createdAt,
              replyCount: 0,
              retweetCount: 0,
              likeCount: tweet.likeCount,
              isLiked: tweet.isLiked,
              userId: tweet.userId,
              createdAt: tweet.createdAt,
              modifiedAt: tweet.modifiedAt,
            }}
            userId={user?.id}
          />
        )
      })}
    </div>
  )
}

export default ProfilePage
