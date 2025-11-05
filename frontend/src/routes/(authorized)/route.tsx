import { Outlet, createFileRoute } from '@tanstack/react-router'
import { Header } from '@/components/Header'
import { useCurrentUser } from '@/hooks/useCurrentUser'

export const Route = createFileRoute('/(authorized)')({
  component: RouteComponent,
})

function RouteComponent() {
  const { user, loading } = useCurrentUser()

  return (
    <div>
      <Header
        user={user ?? { id: '', fullName: 'Loading...', avatarUrl: '' }}
      />
      <Outlet />
    </div>
  )
}
