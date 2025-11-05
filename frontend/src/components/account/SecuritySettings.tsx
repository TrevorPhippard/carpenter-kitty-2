import Field from '../ui/field'
import { Button } from '../ui/button'

export default function SecuritySettings({ setting }: any) {
  return (
    <div className="bg-white rounded shadow p-6 space-y-4">
      <h3 className="font-semibold text-lg">Security</h3>
      <Field label="Two-factor authentication">
        <div className="text-sm">
          {setting?.twoFactorEnabled ? 'Enabled' : 'Disabled'}
        </div>
      </Field>
      <Button>Manage active sessions</Button>
    </div>
  )
}
