import Avatar from '@/components/Avatar'

interface PostHeaderProps {
  user: {
    fullName: string
    avatarUrl?: string
    title?: string
  }
  createdAt: Date
}

export function PostHeader({ user, createdAt }: PostHeaderProps) {
  return (
    <div className="flex items-start gap-3">
      <Avatar user={user} alt={user.fullName} />
      <div className="flex-1">
        <div className="flex items-center justify-between">
          <div>
            <div className="font-semibold text-sm">{user.fullName}</div>
            <div className="text-xs text-gray-500">
              {user.title || ''} • {new Date(createdAt).toLocaleDateString()}
            </div>
          </div>
          <div className="text-gray-400">•••</div>
        </div>
      </div>
    </div>
  )
}
