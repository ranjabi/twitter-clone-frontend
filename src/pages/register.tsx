import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Toaster } from '@/components/ui/toaster'
import { useToast } from '@/hooks/use-toast'
import { apiInstance } from '@/lib/utils'
import { useAuthStore } from '@/stores/useAuth'
import axios from 'axios'
import { useRouter } from 'next/router'
import { ReactElement, useEffect } from 'react'
import { useForm } from 'react-hook-form'

interface FormInput {
  fullName: string
  username: string
  email: string
  password: string
}

const Register = () => {
  const { toast } = useToast()
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<FormInput>()
  const onSubmit = (data: FormInput) => {
    getUser(data)
    console.log(data)
  }
  const router = useRouter()
  const isReady = useAuthStore((state) => state.isReady)
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn)
  const setToken = useAuthStore((state) => state.setToken)
  const setUser = useAuthStore((state) => state.setUser)
  const setIsReady = useAuthStore((state) => state.setIsReady)

  const getUser = async (reqBody: FormInput) => {
    try {
      const res = await apiInstance.post('/register', reqBody)
      router.push('/login')
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

  useEffect(() => {
    const userLocalStorage = localStorage.getItem('user')
    const tokenLocalStorage = localStorage.getItem('token')
    if (userLocalStorage && tokenLocalStorage) {
      setToken(tokenLocalStorage)
      setUser(JSON.parse(userLocalStorage))
    }
    setIsReady(true)
  }, [setIsReady, setUser, setToken])

  useEffect(() => {
    if (isReady) {
      if (isLoggedIn()) {
        apiInstance.defaults.headers.common['Authorization'] =
          'Bearer ' + localStorage.getItem('token')
        router.replace('/')
      }
    }
  }, [isReady, isLoggedIn, router])

  return (
    <>
      <Toaster />
      <div className="w-1/2 mx-auto">
        <p className="text-3xl font-semibold">Register</p>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-y-5 mt-6"
        >
          <div>
            <label htmlFor="fullName">Full Name</label>
            <Input
              {...register('fullName', { required: 'Please enter full name' })}
            />
            {errors.fullName && (
              <p className="text-red-700">{errors.fullName.message}</p>
            )}
          </div>
          <div>
            <label htmlFor="username">Username</label>
            <Input
              {...register('username', { required: 'Please enter username' })}
            />
            {errors.username && (
              <p className="text-red-700">{errors.username.message}</p>
            )}
          </div>
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
            Register
          </Button>
          <Button
            onClick={() => {
              router.push('/login')
            }}
            size={'lg'}
            variant={'outline'}
          >
            Login
          </Button>
        </form>
      </div>
    </>
  )
}

Register.getLayout = function getLayout(page: ReactElement) {
  return (
    <div className="max-w-screen-lg h-screen mx-auto flex flex-col justify-center -mt-20">
      {page}
    </div>
  )
}

export default Register
