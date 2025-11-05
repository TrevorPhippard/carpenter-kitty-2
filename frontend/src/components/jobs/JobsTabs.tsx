import React from 'react'

export type JobTab = 'all' | 'saved' | 'applied'

type Props = {
  activeTab: JobTab
  onChange: (tab: JobTab) => void
}

export const JobsTabs: React.FC<Props> = ({ activeTab, onChange }) => {
  const tabs: Array<{ label: string; value: JobTab }> = [
    { label: 'All Jobs', value: 'all' },
    { label: 'Saved Jobs', value: 'saved' },
    { label: 'Applied Jobs', value: 'applied' },
  ]

  return (
    <div className="flex gap-4 border-b border-gray-200 mb-4">
      {tabs.map((tab) => (
        <button
          key={tab.value}
          onClick={() => onChange(tab.value)}
          className={`px-3 py-2 -mb-px font-medium border-b-2 ${
            activeTab === tab.value
              ? 'border-primary text-primary'
              : 'border-transparent text-gray-500 hover:text-gray-700 cursor-pointer'
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  )
}
