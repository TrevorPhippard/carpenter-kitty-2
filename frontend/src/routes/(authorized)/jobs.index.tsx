import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import type { JobTab } from '@/components/jobs/JobsTabs'
import { JobsTabs } from '@/components/jobs/JobsTabs'
import { JobFilters } from '@/components/jobs/JobFilters'
import { JobsFeed } from '@/components/jobs/JobsFeed'

export const Route = createFileRoute('/(authorized)/jobs/')({
  component: RouteComponent,
})

function RouteComponent() {
  const [activeTab, setActiveTab] = useState<JobTab>('all')

  return (
    <div className="flex gap-6 p-6">
      {/* Left sidebar */}
      <JobFilters />

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        {/* Top tabs */}
        <JobsTabs activeTab={activeTab} onChange={setActiveTab} />

        {/* Jobs feed */}
        {activeTab === 'all' && <JobsFeed />}
        {activeTab === 'saved' && (
          <div className="text-gray-500 mt-6">You have no saved jobs yet.</div>
        )}
        {activeTab === 'applied' && (
          <div className="text-gray-500 mt-6">
            You have not applied to any jobs yet.
          </div>
        )}
      </div>
    </div>
  )
}
