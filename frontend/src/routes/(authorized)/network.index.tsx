import { createFileRoute } from '@tanstack/react-router'
import { Connections } from '@/components/network/Connections'
import { PeopleYouMayKnow } from '@/components/network/PeopleYouMayKnow'
import { Invitations } from '@/components/network/Invitations'

export const Route = createFileRoute('/(authorized)/network/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="flex justify-center p-6 gap-6 bg-gray-50 min-h-screen">
      <div className="flex flex-col w-full max-w-5xl gap-6">
        <h1 className="text-2xl font-semibold">My Network</h1>
        <Invitations />
        <PeopleYouMayKnow />
        <Connections />
      </div>
    </div>
  )
}
