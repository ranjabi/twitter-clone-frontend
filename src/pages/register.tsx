import { apiInstance } from '@/lib/utils'
import axios from 'axios'
import { useForm } from 'react-hook-form'

const Register = () => {
  // const [data, setData] = useState('')
  const { register, handleSubmit } = useForm()
  const onSubmit = (data) => {
    getUser(data)
    console.log(data)
  }

  const getUser = async (reqBody) => {
    // const reqBody = {
    //   username: '',
    //   email: '',
    //   password: '',
    // }
    try {
      const res = await apiInstance.post('/register', reqBody)
      // setData(JSON.stringify(res.data))
      console.log(res)
    } catch (error) {
      if (axios.isAxiosError(error)) {
        // do something
        // or just re-throw the error
        console.log('msg:', error.message)
        console.log('code:', error.code)
        console.log('res:', error.response?.data.message)
      }
      console.log(error)
    }
  }

  return (
    <div className="container mx-auto px-4 max-w-screen-md">
      <p>register page</p>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-y-4">
        <input {...register('username')} />
        <input {...register('email')} />
        <input {...register('password')} />
        <input type="submit" />
      </form>
    </div>
  )
}

export default Register
