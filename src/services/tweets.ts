import { apiInstance } from '@/lib/utils'

const like = async (id: number) => {
  const res = await apiInstance.post(`/tweets/${id}/like`)
  return res.data
}

const unlike = async (id: number) => {
  const res = await apiInstance.post(`/tweets/${id}/unlike`)
  return res.data
}

const createTweet = async (content: string) => {
  const res = await apiInstance.post(`/tweets`, {
    content,
  })
  return res.data
}

const deleteTweet = async (id: number) => {
  const res = await apiInstance.delete(`/tweets/${id}`)
  return res.data
}

const tweetService = {
  like,
  unlike,
  deleteTweet,
  createTweet,
}

export default tweetService
