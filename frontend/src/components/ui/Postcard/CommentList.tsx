// frontend/src/components/ui/Postcard/CommentList.tsx
import { CommentItem } from './CommentItem'
import type { Comment } from '@/types/post'

export function CommentList({ comments }: { comments: Array<Comment> }) {
  if (!comments.length) return null
  return (
    <div className="p-4 border-t bg-gray-50">
      {comments.map((c) => (
        <CommentItem key={c.id} comment={c} />
      ))}
    </div>
  )
}
