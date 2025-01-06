import { useAuthStore } from '@/stores/useAuth'
import TweetItem from '@/components/tweet/tweetItem'
import { toast } from '@/hooks/use-toast'
import { Feed, TweetCreateInput } from '@/interfaces/interfaces'
import { apiInstance } from '@/lib/utils'
import {
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query'
import axios from 'axios'
import { useForm } from 'react-hook-form'
import Head from 'next/head'
import React from 'react'
import tweetService from '@/services/tweets'
import TweetCreate from '@/components/tweet/tweet-create'

const Home = () => {
  const user = useAuthStore((state) => state.user)
  const { register, handleSubmit, reset } = useForm<TweetCreateInput>()
  const queryClient = useQueryClient()

  const createTweet = async (data: TweetCreateInput) => {
    try {
      const createdTweet = await tweetService.createTweet(data.content)
      toast({
        description: createdTweet.message,
      })
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

  const createTweetMutation = useMutation({
    mutationFn: (data: TweetCreateInput) => createTweet(data),
    onSuccess: async () => {
      reset()
      queryClient.invalidateQueries({ queryKey: ['feed'] })
    },
  })

  const getFeed = async ({
    pageParam,
  }: {
    pageParam: number
  }): Promise<Feed> => {
    try {
      const res = await apiInstance.get(`/users/${user?.id}/feed`, {
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

  const {
    isPending: isPendingFeed,
    isError: isErrorFeed,
    data: feed,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: ['feed'],
    queryFn: getFeed,
    initialPageParam: 1,
    getNextPageParam: (lastPage: Feed) => lastPage.nextPageId,
  })

  if (isPendingFeed) {
    return <span>Loading...</span>
  }

  if (isErrorFeed) {
    return <span>Fail to get feed</span>
  }

  return (
    <>
      <Head>
        <title>Home</title>
      </Head>
      <TweetCreate
        register={register}
        handleSubmit={handleSubmit}
        createTweet={(data) => createTweetMutation.mutate(data)}
        userId={user?.id}
      />
      {feed.pages.map((page, idx) => (
        <React.Fragment key={page.nextPageId}>
          {page.tweets.map((tweet) => {
            return (
              <TweetItem
                queryKey={['feed']}
                key={tweet.id}
                tweet={{
                  id: tweet.id,
                  userFullName: tweet.userFullName,
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
        {hasNextPage ? 'Load more tweets' : 'You reached the end of the feed'}
      </button>
    </>
  )
}

export default Home
