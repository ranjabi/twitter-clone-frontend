import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { toast } from '@/hooks/use-toast'
import { apiInstance } from '@/lib/utils'
import { useAuthStore } from '@/stores/useAuth'
import axios from 'axios'
import { useRouter } from 'next/router'
import { ReactElement, useEffect } from 'react'
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
  const setToken = useAuthStore((state) => state.setToken)
  const setUser = useAuthStore((state) => state.setUser)
  const isReady = useAuthStore((state) => state.isReady)
  const setIsReady = useAuthStore((state) => state.setIsReady)
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn)
  const router = useRouter()

  const login = async (data: FormInput) => {
    try {
      const res = await apiInstance.post('/login', data)
      toast({
        description: res.data.message,
      })
      console.log(res)
      const user = {
        id: res.data.data.id,
        username: res.data.data.username,
        email: res.data.data.email,
      }
      setToken(res.data.data.token)
      setUser(user)
      apiInstance.defaults.headers.common['Authorization'] =
        'Bearer ' + res.data.data.token
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

  useEffect(() => {
    const userLocalStorage = localStorage.getItem('user')
    const tokenLocalStorage = localStorage.getItem('token')
    if (userLocalStorage && tokenLocalStorage) {
      setUser(JSON.parse(userLocalStorage))
      setToken(tokenLocalStorage)
    }
    setIsReady(true)
  }, [setIsReady, setUser, setToken])

  useEffect(() => {
    if (isReady) {
      if (isLoggedIn()) {
        router.replace('/')
      }
    }
  }, [isReady, isLoggedIn, router])

  return (
    <>
      {isReady && !isLoggedIn() && (
        <div className="flex items-center h-screen">
          {/* left */}
          <div className="w-1/2"></div>
          {/* right */}
          <div className="w-1/2">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-y-4"
            >
              <Input
                type="email"
                placeholder="Email"
                {...register('email', { required: 'Please enter email' })}
              />
              {errors.email && (
                <p className="text-red-700">{errors.email.message}</p>
              )}
              <Input
                type="password"
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
          </div>
        </div>
      )}
    </>
  )
}

Login.getLayout = function getLayout(page: ReactElement) {
  return <div className="max-w-screen-lg mx-auto h-screen">{page}</div>
}

export default Login
