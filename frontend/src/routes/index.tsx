import { createFileRoute, redirect } from '@tanstack/react-router'
import { Header } from '@/components/Header'
import { getCurrentUser } from '@/lib/api'

export const Route = createFileRoute('/')({
  beforeLoad: async () => {
    // const user = await getCurrentUser()

    // if (!user) {
    throw redirect({ to: '/login' }) // change this to your actual login route
    // }

    // return { user }
  },
  component: App,
})

function App() {
  // You can also grab the `user` from the loader using `useRouteContext()`
  return (
    <div className="min-h-screen">
      <section className="py-16 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Render your content here */}
        </div>
      </section>
    </div>
  )
}
