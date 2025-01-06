import { Button } from '../ui/button'
import { Textarea } from '../ui/textarea'
import UserAvatar from '../user-avatar'
import {
  SubmitHandler,
  UseFormHandleSubmit,
  UseFormRegister,
} from 'react-hook-form'
import { TweetCreateInput } from '@/interfaces/interfaces'

interface TweetCreateProps {
  register: UseFormRegister<TweetCreateInput>
  handleSubmit: UseFormHandleSubmit<TweetCreateInput, undefined>
  createTweet: SubmitHandler<TweetCreateInput>
  userId: number | undefined
}

export default function TweetCreate(props: TweetCreateProps) {
  const { register, handleSubmit, createTweet, userId } = props

  return (
    <div className="flex border p-4">
      <UserAvatar userId={userId} />
      <form
        onSubmit={handleSubmit(createTweet)}
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
  )
}
