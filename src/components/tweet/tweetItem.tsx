import { Heart, Trash2 } from 'lucide-react'
import {
  InfiniteData,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query'
import UserAvatar from '../user-avatar'
import Link from 'next/link'
import { Feed, Profile, Tweet } from '@/interfaces/interfaces'
import tweetService from '@/services/tweets'
import axios from 'axios'
import { toast } from '@/hooks/use-toast'

const TweetItem = (props: {
  queryKey: string[]
  tweet: Tweet
  userId: number | undefined
  page: number
}) => {
  const { queryKey, tweet, userId, page: pageIdx } = props

  const queryClient = useQueryClient()
  const heartFill = tweet.isLiked ? 'fill-rose-500' : 'fill-transparent'
  const heartStroke = tweet.isLiked ? 'stroke-rose-500' : 'stroke-white'
  const heartHoverStroke = 'hover:stroke-rose-500'

  const likeMutation = useMutation({
    mutationFn: (id: number) => tweetService.like(id),
    onSuccess: () => {
      queryClient.setQueryData(
        queryKey,
        (oldData: InfiniteData<Feed | Profile, unknown> | undefined) =>
          oldData
            ? {
                ...oldData,
                pages: oldData.pages.map((page, idx) =>
                  idx === pageIdx
                    ? {
                        ...page,
                        tweets: page.tweets.map((tweet) =>
                          tweet.id === props.tweet.id
                            ? {
                                ...tweet,
                                isLiked: true,
                                likeCount: tweet.likeCount + 1,
                              }
                            : tweet,
                        ),
                      }
                    : page,
                ),
              }
            : oldData,
      )
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        toast({
          variant: 'destructive',
          title: 'Something went wrong',
          description: error.response?.data.message,
        })
      }
    },
  })

  const unlikeMutation = useMutation({
    mutationFn: (id: number) => tweetService.unlike(id),
    onSuccess: () => {
      queryClient.setQueryData(
        queryKey,
        (oldData: InfiniteData<Feed | Profile, unknown> | undefined) =>
          oldData
            ? {
                ...oldData,
                pages: oldData.pages.map((page, idx) =>
                  idx === pageIdx
                    ? {
                        ...page,
                        tweets: page.tweets.map((tweet) =>
                          tweet.id === props.tweet.id
                            ? {
                                ...tweet,
                                isLiked: false,
                                likeCount: tweet.likeCount - 1,
                              }
                            : tweet,
                        ),
                      }
                    : page,
                ),
              }
            : oldData,
      )
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        toast({
          variant: 'destructive',
          title: 'Something went wrong',
          description: error.response?.data.message,
        })
      }
    },
  })

  const deleteMutation = useMutation({
    mutationFn: (id: number) => tweetService.deleteTweet(id),
    onSuccess: () => {
      queryClient.setQueryData(
        queryKey,
        (oldData: InfiniteData<Feed | Profile, unknown> | undefined) =>
          oldData
            ? {
                ...oldData,
                pages: oldData.pages.map((page, idx) =>
                  idx === pageIdx
                    ? {
                        ...page,
                        tweets: page.tweets.filter(
                          (tweet) => tweet.id !== props.tweet.id,
                        ),
                      }
                    : page,
                ),
              }
            : oldData,
      )
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        toast({
          variant: 'destructive',
          title: 'Something went wrong',
          description: error.response?.data.message,
        })
      }
    },
  })

  return (
    <div className="border flex px-4 py-2">
      <Link href={`/profile/${tweet.username}`}>
        <UserAvatar userId={tweet.userId} />
      </Link>
      <div className="flex flex-col ml-3 w-full">
        <div className="flex justify-between gap-x-2">
          <div className="flex w-full">
            <Link href={`/profile/${tweet.username}`}>
              <p className="hover:underline">{tweet.userFullName}</p>
            </Link>
            <Link href={`/profile/${tweet.username}`}>
              <p className="ml-2">@{tweet.username}</p>
            </Link>
            <p className="ml-1">·</p>
            <p className="ml-1">
              {new Date(tweet.date).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
              })}
            </p>
          </div>
          {tweet.userId === userId && (
            <Trash2
              size={18}
              className="stroke-muted hover:stroke-muted-foreground hover:cursor-pointer"
              onClick={() => deleteMutation.mutate(tweet.id)}
            />
          )}
        </div>
        <div className="flex flex-col mt-[2]">
          <p>{tweet.content}</p>
        </div>
        <div className="flex justify-end pr-32 mt-1">
          {/* <button className="flex items-center gap-x-1">
            <MessageCircle size={16} />
            <p>{tweet.replyCount}</p>
          </button>
          <button className="flex items-center gap-x-1">
            <Repeat2 size={16} />
            <p>{tweet.retweetCount}</p>
          </button> */}
          <button className="flex gap-x-1 items-center hover:text-rose-500 hover:cursor-pointer">
            <Heart
              className={`${heartFill} ${heartStroke} ${heartHoverStroke}`}
              size={16}
              onClick={() => {
                if (!tweet.isLiked) {
                  likeMutation.mutate(tweet.id)
                } else {
                  unlikeMutation.mutate(tweet.id)
                }
              }}
            />
            <p className={`${tweet.likeCount > 0 ? 'text-rose-500' : ''}`}>
              {tweet.likeCount}
            </p>
          </button>
        </div>
      </div>
    </div>
  )
}

export default TweetItem
