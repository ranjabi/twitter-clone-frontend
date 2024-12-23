import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { toast } from '@/hooks/use-toast'
import { apiInstance } from '@/lib/utils'
import { useAuthStore } from '@/stores/useAuth'
import axios from 'axios'
import { useRouter } from 'next/router'
import { ReactElement } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

interface FormInput {
  email: string
  password: string
}

const Login = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<FormInput>()
  const onSubmit: SubmitHandler<FormInput> = (data) => {
    login(data)
    console.log(data)
  }
  const setAuth = useAuthStore((state) => state.setAuth)
  // const token = useAuthStore((state) => state.token)
  // const user = useAuthStore((state) => state.user)
  const router = useRouter()

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
      router.push('/')
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

  // const getToken = useAuthStore((state) => state.getToken)
  // const getUser = useAuthStore((state) => state.getUser)

  // useEffect(() => {
  //   getToken()
  //   getUser()
  // }, [getToken, getUser])

  // useEffect(() => {

  // }, [])

  // useEffect(() => {
  //   if (user && token) {
  //     router.push('/')
  //   }
  // }, [router, user, token])

  return (
    <>
      {/* {((!user || !token )&& ( */}
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-y-4">
        <Input
          type="email"
          placeholder="Email"
          {...register('email', { required: 'Please enter email' })}
        />
        {errors.email && <p className="text-red-700">{errors.email.message}</p>}
        <Input
          placeholder="Password"
          {...register('password', { required: 'Please enter password' })}
        />
        {errors.password && (
          <p className="text-red-700">{errors.password.message}</p>
        )}
        <Button type="submit" size={'lg'}>
          Login
        </Button>
      </form>
      {/* ))} */}
    </>
  )
}

Login.getLayout = function getLayout(page: ReactElement) {
  return (
    <div className="max-w-screen-lg mx-auto">
      <div className="flex items-center h-screen">
        {/* left */}
        <div className="w-1/2">
          <p>left</p>
        </div>
        {/* right */}
        <div className="w-1/2">{page}</div>
      </div>
    </div>
  )
}

export default Login
