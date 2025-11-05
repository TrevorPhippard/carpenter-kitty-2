import React from 'react'
import { Link } from '@tanstack/react-router'

// A reusable link component for TanStack Router
// - Accepts children (ReactNode)
// - Accepts `label` (string)
// - Accepts `to` (string) for routing
// - Adds simple hover styling
// Example:
// <NavItem to="/profile" label="Profile"><UserIcon /></NavItem>

type NavItemProps = {
  to: string
  label: string
  children?: React.ReactNode
  className?: string
}

export function NavItem({ to, label, children, className = '' }: NavItemProps) {
  return (
    <Link
      to={to}
      className={`flex items-center gap-2 text-primary hover:underline ${className}`}
    >
      {children}
      <span>{label}</span>
    </Link>
  )
}
