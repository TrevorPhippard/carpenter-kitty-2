import { UserCard } from './UserCard'
import type { User } from '../types/user'

export function SidebarLeft({ currentUser }: { currentUser: User }) {
  return (
    <>
      <UserCard user={currentUser} />
      <div className="mt-4 hidden md:block sticky top-82">
        <div className="bg-white rounded-lg shadow p-4 ">
          <h3 className="text-sm font-semibold mb-3">Groups</h3>
          <ul className="text-sm text-gray-600 space-y-2">
            <li>Canadian Artists & Designers Group</li>
            <li>York Alumni</li>
            <li>Art Enthusiasts Association</li>
          </ul>
        </div>
      </div>
    </>
  )
}
