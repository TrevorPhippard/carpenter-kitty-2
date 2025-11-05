interface PostActionsProps {
  onCommentClick?: () => void
}

export function PostActions({ onCommentClick }: PostActionsProps) {
  return (
    <div className="p-3 border-t text-sm text-gray-600 flex justify-between">
      <div className="flex items-center gap-4">
        <button className="hover:text-primary transition cursor-pointer">
          Like
        </button>
        <button
          className="hover:text-primary transition cursor-pointer"
          onClick={onCommentClick}
        >
          Comment
        </button>
        <button className="hover:text-primary transition cursor-pointer">
          Share
        </button>
      </div>
      <button className="hover:text-primary transition cursor-pointer">
        Repost
      </button>
    </div>
  )
}
