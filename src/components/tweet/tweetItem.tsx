import { Heart, MessageCircle, Repeat2 } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { Button } from '../ui/button'

interface Tweet {
  id: number
  userFullName: string
  username: string
  content: string
  date: string
  replyCount: number
  retweetCount: number
  likeCount: number
}

const TweetItem = (tweet: Tweet) => {
  return (
    // <div id={tweet.id.toString()}>
    <div className="border flex p-4">
      <div>
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </div>
      <div className="flex flex-col ml-3">
        <div className="flex gap-x-2">
          <p>{tweet.userFullName}</p>
          <p>@{tweet.username}</p>
          <p>·</p>
          <p>{tweet.date}</p>
        </div>
        <div className="flex flex-col">
          <p>{tweet.content}</p>
        </div>
        <div className="flex justify-between mr-32">
          <p className="flex items-center">
            <Button variant="ghost" size="icon">
              <MessageCircle />
            </Button>
            <p className="-ml-1">{tweet.replyCount}</p>
          </p>
          <p className="flex items-center">
            <Button variant="ghost" size="icon">
              <Repeat2 />
            </Button>
            <p className="-ml-1">{tweet.retweetCount}</p>
          </p>
          <p className="flex items-center">
            <Button variant="ghost" size="icon">
              <Heart />
            </Button>
            <p className="-ml-1">{tweet.likeCount}</p>
          </p>
        </div>
      </div>
    </div>
  )
}

export default TweetItem
