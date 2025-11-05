export interface Post {
  id: string
  userId: string
  text: string
  content: string
  media?: Array<string>
  likes: number
  commentsCount: number
  createdAt: Date
  updatedAt?: Date
}

export interface PostWithUser extends Post {
  user: {
    id: string
    fullName: string
    avatarUrl?: string
    title?: string
  }
  comments?: Array<Comment>
}

export interface Comment {
  id: string
  postId: string
  userId: string
  content: string
  createdAt: Date
  user?: {
    id: string
    fullName: string
    avatarUrl?: string
  }
}

export interface PostWithComments extends Post {
  comments: Array<Comment>
}
