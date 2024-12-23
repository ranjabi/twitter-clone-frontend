import { Heart, MessageCircle, Repeat2, Trash2 } from 'lucide-react'
import { Button } from '../ui/button'
import { UseMutationResult } from '@tanstack/react-query'
import UserAvatar from '../user-avatar'
import Link from 'next/link'

interface Tweet {
  id: number
  userFullName: string
  username: string
  content: string
  date: Date
  replyCount: number
  retweetCount: number
  likeCount: number
  isLiked: boolean
  userId: number
}

const TweetItem = (props: {
  tweet: Tweet
  userId: number | undefined
  deleteTweetMutation?: UseMutationResult<void, Error, number, unknown>
}) => {
  const { tweet, userId, deleteTweetMutation } = props
  return (
    <div className="border flex px-4 py-2">
      <Link href={`/${tweet.username}`}>
        <UserAvatar userId={tweet.userId} />
      </Link>
      <div className="flex flex-col ml-3 w-full">
        <div className="flex justify-between gap-x-2">
          <div className="flex w-full">
            <Link href={`/${tweet.username}`}>
              <p className="hover:underline">{tweet.userFullName}</p>
            </Link>
            <Link href={`/${tweet.username}`}>
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
            // <Button variant="ghost" size="lg" className='hover:bg-transparent stroke-white hover:fill-rose-500 hover:stroke-rose-500'>
            <Trash2
              size={20}
              className="stroke-muted hover:stroke-muted-foreground hover:cursor-pointer"
              onClick={() => deleteTweetMutation?.mutate(tweet.id)}
            />
            // </Button>
          )}
        </div>
        <div className="flex flex-col mt-[2]">
          <p>{tweet.content}</p>
        </div>
        <div className="flex justify-between mr-32 mt-1">
          <div className="flex items-center">
            <Button
              variant="ghost"
              size="icon"
              className="hover:bg-transparent"
            >
              <MessageCircle />
            </Button>
            <p className="-ml-1">{tweet.replyCount}</p>
          </div>
          <div className="flex items-center">
            <Button
              variant="ghost"
              size="icon"
              className="hover:bg-transparent"
            >
              <Repeat2 />
            </Button>
            <p className="-ml-1">{tweet.retweetCount}</p>
          </div>
          <div className="flex items-center self-end">
            <Button
              variant="ghost"
              size="icon"
              className="hover:bg-transparent stroke-white hover:fill-rose-500 hover:stroke-rose-500"
            >
              <Heart
                fill={tweet.isLiked ? '#f43f5e' : undefined}
                stroke={tweet.isLiked ? '#f43f5e' : undefined}
              />
            </Button>
            <p className={`-ml-1 ${tweet.isLiked ? 'text-rose-500' : ''}`}>
              {tweet.likeCount}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TweetItem
