import axios from 'axios'

const Register = () => {
  const getUser = async () => {
    try {
      const res = await axios.get('api/health-check')
      console.log(res)
    } catch (error) {
      console.log(error)
    }
  }

  getUser()

  return (
    <div className="container mx-auto px-4 max-w-screen-md">register page</div>
  )
}

export default Register
