import Avatar from '@/components/Avatar'

export default function AvatarLockUp({ user }: any) {
  return (
    <div className="flex items-center gap-3">
      <Avatar user={user} alt={user.fullName} />
      <div>
        <div className="text-sm font-semibold">{user.fullName}</div>
        <div className="text-xs text-gray-500">{user.title}</div>
      </div>
    </div>
  )
}
