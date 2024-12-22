export interface User {
  id: number
  username: string
  email: string
}

export interface Tweet {
  id: number
  content: string
  createdAt: string
  modifiedAt: string
  userId: number
  likeCount: number
  isLiked: boolean
}

// export interface Profile {
//   id: number
//   username: string
//   followerCount: number
//   followingCount: number
//   recentTweetsLength: number
//   recentTweets: Tweet[]
// }
