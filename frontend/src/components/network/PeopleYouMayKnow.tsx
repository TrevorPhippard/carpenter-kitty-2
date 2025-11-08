import Avatar from '@/components/Avatar'
import { useSendInvite, useSuggestions } from '@/hooks/network/useConnections'
import { Button } from '@/components//ui/button'

export function PeopleYouMayKnow() {
  const { data, isLoading } = useSuggestions()
  const send = useSendInvite()

  if (isLoading) return <p>Loading suggestions...</p>

  return (
    <section className="p-4 bg-white rounded-2xl shadow">
      <h2 className="text-lg font-semibold mb-3">
        People You May Know: {data.length}
      </h2>
      <ul className="space-y-3">
        {data?.map((user: any) => (
          <li key={user.id} className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <Avatar user={user} alt="avatar" />
              <div>
                <div className="font-semibold">{user.fullName}</div>
                <div className="text-xs text-gray-500">{user.title}</div>
              </div>
            </div>
            <Button onClick={() => send.mutate(user.id)}>Connect</Button>
          </li>
        ))}
      </ul>
    </section>
  )
}
