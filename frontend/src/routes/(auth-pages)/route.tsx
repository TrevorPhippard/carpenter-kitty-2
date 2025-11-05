import { Outlet, createFileRoute } from '@tanstack/react-router'
import { Header } from '@/components/Header'
import { useCurrentUser } from '@/hooks/useCurrentUser'
import { Logo } from '@/components/ui/logo'

export const Route = createFileRoute('/(auth-pages)')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center px-4 flex-col  gap-6">
      <div>
        <a href="#" className="flex flex-col items-center mb-8">
          <Logo />
        </a>
        <Outlet />
      </div>
    </div>
  )
}
