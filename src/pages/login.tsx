import { Toaster } from '@/components/ui/toaster'
import { toast } from '@/hooks/use-toast'
import { apiInstance } from '@/lib/utils'
import { useAuthStore } from '@/stores/useAuth'
import axios from 'axios'
import { SubmitHandler, useForm } from 'react-hook-form'

interface FormInput {
  email: string
  password: string
}

const Login = () => {
  const { register, handleSubmit } = useForm<FormInput>()
  const onSubmit: SubmitHandler<FormInput> = (data) => {
    login(data)
    console.log(data)
  }
  const setAuth = useAuthStore((state) => state.setAuth)
  const user = useAuthStore((state) => state.user)

  const login = async (data: FormInput) => {
    try {
      const res = await apiInstance({}).post('/login', data)
      toast({
        description: res.data.message,
      })
      console.log(res)
      const user = {
        id: res.data.data.id,
        username: res.data.data.username,
        email: res.data.data.email,
      }
      setAuth(res.data.data.token, user)
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
    <div>
      <p>login</p>
      <p>user: {JSON.stringify(user) || undefined}</p>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-y-4">
        <input {...register('email')} />
        <input {...register('password')} />
        <input type="submit" />
      </form>
      <Toaster />
    </div>
  )
}

export default Login
