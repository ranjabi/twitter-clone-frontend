import { QueryClient } from '@tanstack/react-query'

export interface User {
  id: number
  username: string
  email: string
}

export interface Tweet {
  id: number
  userFullName: string
  userProfileImage: string
  username: string
  content: string
  date: Date
  likeCount: number
  replyCount: number
  retweetCount: number
  isLiked: boolean
  userId: number
  createdAt: Date
  modifiedAt: Date
}

export interface Feed {
  tweets: Tweet[]
  nextPageId: number | null
}

export interface Profile {
  id: number
  username: string
  followerCount: number
  followingCount: number
  tweetsLength: number
  tweets: Tweet[]
  isFollowed: boolean
  nextPageId: number | null
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

export interface TweetCreateInput {
  content: string
}
