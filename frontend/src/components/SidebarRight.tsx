import { SuggestionsList } from './SuggestionsList'
import { TrendingList } from './TrendingList'
import type { User } from '../types/user'

export function SidebarRight({ suggestions }: { suggestions: Array<User> }) {
  return (
    <div className="mt-0 hidden lg:block sticky top-20 ">
      <SuggestionsList suggestions={suggestions} />
      <div className="mt-4">
        <TrendingList />
      </div>
    </div>
  )
}
