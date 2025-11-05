import { usePostComments } from './usePostComments'
import { usePostVisibility } from './usePostVisibility'
import type {
  Comment,
  Post,
  PostWithComments,
  PostWithUser,
} from '@/types/post'

type MixedPost = PostWithUser | PostWithComments | Post

export function usePostCard({
  post,
  currentUser,
  onCommentAdded,
}: {
  post: MixedPost
  onCommentAdded?: (c: Comment) => void
  currentUser?: {
    id: string
    fullName: string
    avatarUrl?: string
  }
}) {
  const { hasUser, hasComments, hasMedia } = usePostVisibility(post)

  const { addComment, isAdding } = usePostComments({
    postId: post.id,
    currentUser: currentUser!,
    onCommentAdded,
  })

  return {
    hasUser,
    hasComments,
    hasMedia,
    addComment,
    isAdding,
  }
}
