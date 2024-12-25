import { apiInstance } from '@/lib/utils'

const like = async (id: number) => {
  const res = await apiInstance.post(`/tweets/${id}/like`)
  return res.data
}

const unlike = async (id: number) => {
  const res = await apiInstance.post(`/tweets/${id}/unlike`)
  return res.data
}

const deleteTweet = async (id: number) => {
  const res = await apiInstance.delete(`/tweets/${id}`)
  return res.data
}

const tweetService = {
  like: like,
  unlike: unlike,
  deleteTweet: deleteTweet,
}

export default tweetService
