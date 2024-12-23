import { Heart, MessageCircle, Repeat2, Trash2 } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { Button } from '../ui/button'
import { UseMutationResult } from '@tanstack/react-query'

interface Tweet {
  id: number
  userFullName: string
  username: string
  content: string
  date: string
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
    <div className="border flex p-4">
      <Avatar>
        <AvatarImage src="/default-avatar.png" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <div className="flex flex-col ml-3 w-full">
        <div className="flex justify-between gap-x-2">
          <div className="flex w-full">
            <p>{tweet.userFullName}</p>
            <p>@{tweet.username}</p>
            <p>·</p>
            <p>{tweet.date}</p>
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
        <div className="flex flex-col mt-2">
          <p>{tweet.content}</p>
        </div>
        <div className="flex justify-between mr-32">
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
