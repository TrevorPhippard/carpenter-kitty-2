import { useState } from 'react'
import { PostHeader } from './PostHeader'
import { PostContent } from './PostContent'
import { PostMedia } from './PostMedia'
import { PostActions } from './PostActions'
import { CommentList } from './CommentList'
import { CommentInput } from './CommentInput'
import type {
  Comment,
  Post,
  PostWithComments,
  PostWithUser,
} from '@/types/post'
import { usePostCard } from '@/hooks/posts/usePostCard'

type MixedPost = PostWithUser | PostWithComments | Post

export function PostCard({
  post,
  onCommentAdded,
  currentUser,
}: {
  post: MixedPost
  onCommentAdded?: (c: Comment) => void
  currentUser?: {
    id: string
    fullName: string
    avatarUrl?: string
  }
}) {
  const {
    hasUser,
    hasComments,
    hasMedia,

    addComment,
    isAdding,
  } = usePostCard({ post, onCommentAdded, currentUser })

  const [toggleCommentPost, setToggleCommentPost] = useState(false)

  return (
    <article className="bg-white rounded-lg shadow mb-6 overflow-hidden">
      <div className="p-4">
        {hasUser && (
          <PostHeader
            user={(post as any).user}
            createdAt={(post as any).createdAt}
          />
        )}
        <PostContent
          text={(post as any).text}
          content={(post as any).content}
        />
      </div>

      {hasMedia && <PostMedia media={(post as any).media || []} />}

      <PostActions
        onCommentClick={() => setToggleCommentPost(!toggleCommentPost)}
      />
      {toggleCommentPost && currentUser && (
        <CommentInput
          currentUser={currentUser}
          disabled={isAdding}
          onSubmit={(text) => addComment(text)}
        />
      )}

      {hasComments && <CommentList comments={(post as any).comments || []} />}
    </article>
  )
}
