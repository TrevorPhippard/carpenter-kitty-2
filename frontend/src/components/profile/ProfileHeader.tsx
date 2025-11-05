import { Avatar } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'

export default function ProfileHeader({ profile, isOwner = false }: any) {
  return (
    <div className="bg-white rounded-lg shadow p-6 flex gap-6 items-center">
      <div className="flex items-center gap-4">
        <Avatar src={profile.avatarUrl} alt={profile.fullName} />
        <div>
          <h2 className="text-2xl font-bold">{profile.fullName}</h2>
          <p className="text-sm text-gray-600">
            {profile.title} • {profile.location}
          </p>
          <div className="mt-2 flex gap-2 items-center">
            <div className="text-sm font-medium">
              ⭐ {profile.reputationScore ?? 0}
            </div>
            <div className="text-sm text-gray-500">
              •{' '}
              {profile.hourlyRate ? `$${profile.hourlyRate}/hr` : 'Rate hidden'}
            </div>
          </div>
        </div>
      </div>
      <div className="ml-auto flex gap-2">
        {isOwner ? <Button>Edit profile</Button> : <Button>Hire</Button>}
        <Button className="bg-gray-100 text-gray-900">Message</Button>
      </div>
    </div>
  )
}
