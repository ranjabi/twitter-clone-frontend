import axios from 'axios'
import { useState } from 'react'

const Register = () => {
  const [data, setData] = useState('')
  const getUser = async () => {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/health-check`,
      )
      setData(JSON.stringify(res.data))
      console.log(res)
    } catch (error) {
      console.log(error)
    }
  }

  getUser()

  return (
    <div className="container mx-auto px-4 max-w-screen-md">
      <p>register page</p>
      <p>{data || 'null'}</p>
    </div>
  )
}

export default Register
