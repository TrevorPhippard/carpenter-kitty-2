import { createFileRoute } from '@tanstack/react-router'
import { SidebarLeft } from '@/components/SidebarLeft'
import { Feed } from '@/components/feed/Feed'
import { SidebarRight } from '@/components/SidebarRight'
import { useCurrentUser } from '@/hooks/useCurrentUser'
import { suggestions } from '@/data/mockData'

export const Route = createFileRoute('/(authorized)/feed/')({
  component: RouteComponent,
})

function RouteComponent() {
  const { user, loading } = useCurrentUser()
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      <main className="max-w-7xl mx-auto py-10 px-4 grid grid-cols-12 gap-6">
        <aside className="md:col-span-3 hidden md:block">
          {user && <SidebarLeft currentUser={user} />}
        </aside>
        <section className="md:col-span-6">
          <Feed currentUser={user} />
        </section>
        <aside className="md:col-span-3">
          <SidebarRight currentUser={user} />
        </aside>
      </main>
    </div>
  )
}
