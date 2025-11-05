import type { FullProfile } from '../types/user'
import Avatar from '@/components/Avatar'
// import { Button } from '@/components//ui/button'

export function SuggestionsList({
  suggestions,
}: {
  suggestions: Array<FullProfile>
}) {
  return (
    <div className="bg-white rounded-lg shadow p-4 sticky top-20">
      <h3 className="text-sm font-semibold">People you may know</h3>
      <ul className="mt-3 space-y-3">
        {suggestions.map((user) => (
          <li
            key={user.fullName}
            className="flex items-center justify-between gap-3"
          >
            <div className="flex items-center gap-3">
              <Avatar user={user} alt={user.fullName} />
              <div>
                <div className="text-sm font-semibold">{user.fullName}</div>
                <div className="text-xs text-gray-500">{user.title}</div>
              </div>
            </div>
            <button className="text-sm bg-white border rounded px-2 py-1 cursor-pointer">
              Connect
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}
