import { Toaster } from '@/components/ui/toaster'
import { useToast } from '@/hooks/use-toast'
import { apiInstance } from '@/lib/utils'
import axios from 'axios'
import { useForm } from 'react-hook-form'

interface FormInput {
  username: string
  email: string
  password: string
}

const Register = () => {
  const { toast } = useToast()
  const { register, handleSubmit } = useForm<FormInput>()
  const onSubmit = (data: FormInput) => {
    getUser(data)
    console.log(data)
  }

  const getUser = async (reqBody: FormInput) => {
    try {
      const res = await apiInstance.post('/register', reqBody)
      toast({
        description: res.data.message,
      })
      console.log(res)
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast({
          variant: 'destructive',
          title: 'Something went wrong',
          description: error.response?.data.message,
        })
      }
      console.log(error)
    }
  }

  return (
    <div className="container mx-auto px-4 max-w-screen-md">
      <p>register page</p>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-y-4">
        <input {...register('username')} />
        <input {...register('password')} />
        <input {...register('email')} />
        <input type="submit" />
      </form>
      <Toaster />
    </div>
  )
}

export default Register
