import Field from '../ui/field'
import { Button } from '../ui/button'

export default function PaymentSettings({ payment }: any) {
  return (
    <div className="bg-white rounded shadow p-6 space-y-4">
      <h3 className="font-semibold text-lg">Payment & Billing</h3>
      <Field label="Payout method">
        <div className="text-sm">{payment?.payoutMethod || 'Not set'}</div>
      </Field>
      <Button>Update payout method</Button>
    </div>
  )
}
