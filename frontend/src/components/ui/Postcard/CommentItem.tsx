import type { Comment } from '@/types/post'
import Avatar from '@/components/Avatar'

export function CommentItem({ comment }: { comment: Comment }) {
  return (
    <div className="flex gap-3 mb-3 last:mb-0">
      {comment.user && (
        <Avatar user={comment.user} alt={comment.user.fullName} />
      )}
      <div className="bg-white p-2 rounded-lg shadow-sm flex-1">
        <div className="text-sm font-semibold">
          {comment.user?.fullName || 'Anonymous'}
        </div>
        <div className="text-sm text-gray-700">{comment.content}</div>
        <div className="text-xs text-gray-400 mt-1">
          {new Date(comment.createdAt).toLocaleString()}
        </div>
      </div>
    </div>
  )
}
