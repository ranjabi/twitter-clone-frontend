import { QueryClient } from '@tanstack/react-query'

export interface User {
  id: number
  username: string
  email: string
}

export interface Tweet {
  id: number
  content: string
  createdAt: Date
  modifiedAt: Date
  userId: number
  likeCount: number
  isLiked: boolean
  username: string
}

export interface Profile {
  id: number
  username: string
  followerCount: number
  followingCount: number
  recentTweetsLength: number
  recentTweets: Tweet[]
  isFollowed: boolean
}

export interface ProfileHeader {
  id: number
  fullName: string
  username: string
  followerCount: number
  followingCount: number
  isFollowed: boolean
  queryClient: QueryClient
}
