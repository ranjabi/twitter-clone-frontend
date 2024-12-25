import { useAuthStore } from '@/stores/useAuth'
import TweetItem from '@/components/tweet/tweetItem'
import { toast } from '@/hooks/use-toast'
import { Tweet } from '@/interfaces/interfaces'
import { apiInstance } from '@/lib/utils'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import { useForm, SubmitHandler } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import UserAvatar from '@/components/user-avatar'

interface FormInput {
  content: string
}

const Home = () => {
  const user = useAuthStore((state) => state.user)
  const { register, handleSubmit } = useForm<FormInput>()
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

  const getFeed = async (): Promise<Tweet[] | undefined> => {
    try {
      const res = await apiInstance.get(`/users/${user?.id}/feed`, {
        params: {
          page: 1,
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
    }
  }

  const {
    isPending: isPendingFeed,
    isError: isErrorFeed,
    data: dataFeed,
  } = useQuery({
    queryKey: ['feed'],
    queryFn: getFeed,
  })

  const addTweetMutation = useMutation({
    mutationFn: (data: FormInput) => createTweet(data),
    onSettled: async () => {
      return await queryClient.invalidateQueries({ queryKey: ['feed'] })
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
      {dataFeed?.map((tweet) => {
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
          />
        )
      })}
    </>
  )
}

export default Home
