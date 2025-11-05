import {
  useAcceptInvite,
  useDeclineInvite,
  useInvitations,
} from '@/hooks/network/useConnections'
import { Button } from '@/components//ui/button'

export function Invitations() {
  const { data, isLoading } = useInvitations()
  const accept = useAcceptInvite()
  const decline = useDeclineInvite()

  if (isLoading) return <p>Loading invitations...</p>

  return (
    <section className="p-4 bg-white rounded-2xl shadow">
      <h2 className="text-lg font-semibold mb-3">Invitations</h2>
      <ul className="space-y-3">
        {data?.map((invite: any) => (
          <li key={invite.id} className="flex justify-between items-center">
            <span>{invite.sender.fullName}</span>
            <div className="space-x-2">
              <Button onClick={() => accept.mutate(invite.id)}>Accept</Button>
              <Button onClick={() => decline.mutate(invite.id)}>Decline</Button>
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}
