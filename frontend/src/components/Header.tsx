import { Home, MessagesSquare, Network, SquareFunction } from 'lucide-react'
// import Avatar from '../components/Avatar'
import { SearchBar } from './SearchBar'
import { Logo } from './ui/logo'
import type { User } from '../types/user'
import { NavItem } from '@/components/ui/navitem'

export function Header({ user }: { user: User }) {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-4">
            <Logo />
            <div className="hidden sm:block">
              <SearchBar />
            </div>
          </div>

          <nav className="flex items-center gap-4 text-sm">
            <NavItem to="/feed" label="Home">
              <Home size={20} />
            </NavItem>
            <NavItem to="/network" label="My Network">
              <Network size={20} />
            </NavItem>
            <NavItem to="/jobs" label="Jobs">
              <SquareFunction size={20} />
            </NavItem>
            {/* <NavItem to="/messaging" label="Messaging">
              <MessagesSquare size={20} />
            </NavItem>
            <NavItem to="/notifications" label="Notifications">
              <SquareFunction size={20} />
            </NavItem> */}
            <NavItem to="/profile" label="profile">
              <SquareFunction size={20} />
            </NavItem>
            <NavItem to="/account" label="account">
              <SquareFunction size={20} />
            </NavItem>
            <div className="flex items-center gap-2">
              {/* <Avatar user={user} alt="me" size={20} /> */}
              <span className="hidden sm:inline-block text-xs">Me</span>
            </div>
          </nav>
        </div>
      </div>
    </header>
  )
}
