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
}
