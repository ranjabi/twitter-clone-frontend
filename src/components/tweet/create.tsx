import { toast } from '@/hooks/use-toast'
import { apiInstance } from '@/lib/utils'
import { useAuthStore } from '@/stores/useAuth'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import router from 'next/router'
import { Toaster } from '../ui/toaster'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Textarea } from '../ui/textarea'

interface FormInput {
  content: string
}

export const CreateTweet = () => {
  const token = useAuthStore((state) => state.token)
  const { register, handleSubmit } = useForm<FormInput>()

  const createTweet = async () => {
    try {
      const res = await apiInstance({ token }).post(`/tweets`, {
        content: 'content',
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

  const onSubmit: SubmitHandler<FormInput> = (data) => {
    // login(data)
    console.log(data)
  }

  const { isPending, isError, data } = useQuery({
    queryKey: ['tweets-create'],
    queryFn: createTweet,
    enabled: !!token,
  })

  if (isPending) {
    return <span>Loading...</span>
  }

  if (isError) {
    return <span>Fail to get feed</span>
  }

  return (
    <div className='border p-4'>
      <Toaster />
      <div className='flex'>
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col ml-3 w-full'>
          <Textarea
            maxLength={280}
            className='text-2xl border-none focus-visible:ring-0 resize-none h-28'
            placeholder='What is happening?!'
            {...register('content', { required: 'Please enter tweet' })}
          />
          <Button type='submit' size={'lg'} className='self-end rounded-3xl font-extrabold px-5 mt-4'>Post</Button>
        </form>
      </div>
    </div>
  )
}

export default CreateTweet
