import ProfileHeader from '@/components/profileHeader'
import TweetItem from '@/components/tweet/tweetItem'
import { toast } from '@/hooks/use-toast'
import { Profile } from '@/interfaces/interfaces'
import { apiInstance } from '@/lib/utils'
import { useAuthStore } from '@/stores/useAuth'
import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import { useRouter } from 'next/router'
import React from 'react'

const ProfilePage = () => {
  const router = useRouter()
  const { username } = router.query
  const user = useAuthStore((state) => state.user)
  const queryClient = useQueryClient()

  const getProfile = async ({
    pageParam,
  }: {
    pageParam: number
  }): Promise<Profile> => {
    try {
      const res = await apiInstance.get(`/users/${username}`, {
        params: {
          page: pageParam,
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
      throw error
    }
  }

  const { isPending, isError, data, fetchNextPage, hasNextPage } =
    useInfiniteQuery({
      queryKey: ['profile', username],
      queryFn: getProfile,
      enabled: !!username,
      initialPageParam: 1,
      getNextPageParam: (lastPage: Profile) => lastPage.nextPageId,
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
          id={data.pages[0].id}
          fullName={data.pages[0].username}
          username={data.pages[0].username}
          followerCount={data.pages[0].followerCount}
          followingCount={data.pages[0].followingCount}
          isFollowed={data.pages[0].isFollowed}
          queryClient={queryClient}
        />
      )}
      {data.pages.map((page, idx) => (
        <React.Fragment key={page.nextPageId}>
          {page.recentTweets.map((tweet) => {
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
                page={idx}
              />
            )
          })}
        </React.Fragment>
      ))}
      <button
        onClick={() => fetchNextPage()}
        disabled={!hasNextPage}
        className="w-full h-16 border-muted border-[1px]"
      >
        {hasNextPage ? 'Load more tweets' : 'You reached the end of the tweets'}
      </button>
    </div>
  )
}

export default ProfilePage
