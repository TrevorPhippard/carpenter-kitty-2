import React from 'react'

export default function Field({
  label,
  children,
}: {
  label: string
  children: React.ReactNode
}) {
  return (
    <div className="mb-4">
      <label className="block text-xs font-semibold text-gray-600 mb-1">
        {label}
      </label>
      <div>{children}</div>
    </div>
  )
}
