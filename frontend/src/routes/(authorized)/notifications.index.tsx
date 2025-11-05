import { createFileRoute } from '@tanstack/react-router'
import { NotificationsFeed } from '@/components/notification/Feed'

export const Route = createFileRoute('/(authorized)/notifications/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <main className="flex-1 p-6 max-w-4xl mx-auto flex flex-col gap-6">
        <h1 className="text-2xl font-semibold">Notifications</h1>
        <NotificationsFeed />
      </main>
    </div>
  )
}
