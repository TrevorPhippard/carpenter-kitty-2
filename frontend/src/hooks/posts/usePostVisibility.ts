import type { Post, PostWithComments, PostWithUser } from '@/types/post'

type MixedPost = PostWithUser | PostWithComments | Post

export function usePostVisibility(post: MixedPost) {
  const hasUser = 'user' in post && Boolean((post as any).user)
  const hasComments =
    'comments' in post && Array.isArray((post as any).comments)
  const hasMedia =
    Array.isArray((post as any).media) && (post as any).media.length > 0

  return { hasUser, hasComments, hasMedia }
}
