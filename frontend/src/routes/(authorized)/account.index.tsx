import { createFileRoute } from '@tanstack/react-router'

import { useCurrentUser } from '@/hooks/useCurrentUser'
import AccountSettings from '@/components/account/AccountSettings'
import PaymentSettings from '@/components/account/PaymentSettings'
import SecuritySettings from '@/components/account/SecuritySettings'

export const Route = createFileRoute('/(authorized)/account/')({
  component: RouteComponent,
})

function RouteComponent() {
  const { user, loading } = useCurrentUser()

  if (loading) return <div className="p-6">Loading...</div>

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Account</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <AccountSettings user={user} />
          <PaymentSettings payment={user?.paymentAccount} />
        </div>
        <div>
          <SecuritySettings setting={user?.setting} />
        </div>
      </div>
    </div>
  )
}
