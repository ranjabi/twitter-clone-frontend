import { useAuthStore } from '@/stores/useAuth'
import TweetItem from '@/components/tweet/tweetItem'
import { toast } from '@/hooks/use-toast'
import { Feed } from '@/interfaces/interfaces'
import { apiInstance } from '@/lib/utils'
import {
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query'
import axios from 'axios'
import { useForm, SubmitHandler } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import UserAvatar from '@/components/user-avatar'
import Head from 'next/head'
import React from 'react'

interface FormInput {
  content: string
}

const Home = () => {
  const user = useAuthStore((state) => state.user)
  const { register, handleSubmit, reset } = useForm<FormInput>()
  const queryClient = useQueryClient()

  const createTweet = async (data: FormInput) => {
    try {
      const res = await apiInstance.post(`/tweets`, {
        content: data.content,
      })
      toast({
        description: res.data.message,
      })
      return res.data.data
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast({
          variant: 'destructive',
          title: 'Something went wrong',
          description: error.response?.data.message,
        })
        // throw new Error(error.response?.data.message)
      }
    }
  }

  const onSubmit: SubmitHandler<FormInput> = (data) => {
    console.log(data)
    addTweetMutation.mutate(data)
  }

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

  const addTweetMutation = useMutation({
    mutationFn: (data: FormInput) => createTweet(data),
    onSuccess: async () => {
      reset()
      queryClient.invalidateQueries({ queryKey: ['feed'] })
    },
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
      <div className="flex border p-4">
        <UserAvatar userId={user?.id} />
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col ml-3 w-full"
        >
          <Textarea
            maxLength={280}
            className="md:text-2xl border-none focus-visible:ring-0 resize-none h-28"
            placeholder="What is happening?!"
            {...register('content', { required: 'Please enter tweet' })}
          />
          <Button
            type="submit"
            size={'lg'}
            className="self-end rounded-3xl font-extrabold px-5 mt-4"
          >
            Post
          </Button>
        </form>
      </div>
      {feed.pages.map((page, idx) => (
        <React.Fragment key={page.nextPageId}>
          {page.tweets.map((tweet) => {
            return (
              <TweetItem
                queryKey={['feed']}
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
        {hasNextPage ? 'Load more tweets' : 'You reached the end of the feed'}
      </button>
    </>
  )
}

export default Home
