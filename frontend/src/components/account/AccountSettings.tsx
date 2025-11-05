import Field from '../ui/field'
import { Button } from '../ui/button'

export default function AccountSettings({ user }: any) {
  return (
    <div className="bg-white rounded shadow p-6 space-y-4">
      <h3 className="font-semibold text-lg">Account</h3>
      <Field label="Email">
        <div className="text-sm">{user?.email}</div>
      </Field>
      <Field label="Username">
        <div className="text-sm">{user?.username}</div>
      </Field>
      <div className="flex gap-2">
        <Button>Change password</Button>
        <Button className="bg-red-600">Delete account</Button>
      </div>
    </div>
  )
}
