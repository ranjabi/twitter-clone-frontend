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
        apiInstance.defaults.headers.common['Authorization'] =
          'Bearer ' + localStorage.getItem('token')
        router.push('/')
      }
    }
  }, [isReady, isLoggedIn, router])

  return (
    <>
      {isReady && !isLoggedIn() && (
        <div className="flex flex-col md:flex-row px-4 lg:px-8 justify-center gap-y-8 md:gap-x-10 items-center h-screen border">
          {/* left */}
          <div className="w-full md:w-1/2 bg-gray-900 px-3 py-2 rounded-lg">
            <p>
              For demo purposes, use:
              <br />
              Email:{' '}
              <span className="text-muted-foreground">johndoe@example.com</span>
              <br />
              Password: <span className="text-muted-foreground">password</span>
            </p>
          </div>
          {/* right */}
          <div className="w-full md:w-1/2">
            <p className="text-3xl font-semibold">Login</p>
            <p className="text-muted-foreground mt-2">
              Enter your email below to login to your account
            </p>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-y-5 mt-6"
            >
              <div>
                <label htmlFor="email">Email</label>
                <Input
                  type="email"
                  placeholder="email@example.com"
                  className="mt-2"
                  {...register('email', { required: 'Please enter email' })}
                />
                {errors.email && (
                  <p className="text-red-700">{errors.email.message}</p>
                )}
              </div>
              <div>
                <label htmlFor="password">Password</label>
                <Input
                  type="password"
                  className="mt-2"
                  {...register('password', {
                    required: 'Please enter password',
                  })}
                />
                {errors.password && (
                  <p className="text-red-700">{errors.password.message}</p>
                )}
              </div>
              <Button type="submit" size={'lg'} className="mt-4">
                Login
              </Button>
              <Button
                onClick={() => router.push('/register')}
                size={'lg'}
                className=""
                variant={'outline'}
              >
                Register
              </Button>
            </form>
          </div>
        </div>
      )}
    </>
  )
}

Login.getLayout = function getLayout(page: ReactElement) {
  return (
    <div className="container max-w-screen-lg mx-auto h-screen">{page}</div>
  )
}

export default Login
