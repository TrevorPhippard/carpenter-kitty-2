import { useNavigate } from '@tanstack/react-router'
import { useCallback } from 'react'

interface AvatarProps {
  user: {
    id?: string
    avatarUrl?: string
    fullName?: string
  }
  alt: string
  size?: number
}

export default function Avatar({ user, alt, size = 40 }: AvatarProps) {
  const navigate = useNavigate()

  const handleClick = useCallback(() => {
    if (user?.id) {
      navigate({ to: '/profile/$userId', params: { userId: user.id } })
    } else {
      console.error('No user ID provided for avatar navigation.')
    }
  }, [user?.id, navigate])

  return (
    <div
      className="cursor-pointer rounded-full overflow-hidden"
      style={{ width: size, height: size }}
      onClick={handleClick}
      title={user.fullName || alt}
    >
      {/* Standard <img> works perfectly fine in TanStack */}
      <img
        src={user.avatarUrl}
        alt={alt}
        width={size}
        height={size}
        className="object-cover w-full h-full"
        loading="lazy"
      />
      <p>{user.avatarUrl}</p>
    </div>
  )
}
