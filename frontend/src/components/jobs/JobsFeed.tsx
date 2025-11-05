// src/components/JobsFeed/JobsFeed.tsx
import React from 'react'
import { JobCard } from './JobsCard'
import { useJobsFeed } from '@/hooks/useJobsFeed'
import { useInfiniteScroll } from '@/hooks/useInfiniteScroll'

export const JobsFeed: React.FC = () => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useJobsFeed()
  const loaderRef = useInfiniteScroll(() => {
    if (hasNextPage && !isFetchingNextPage) fetchNextPage()
  })

  const jobs = data?.pages.flat() ?? []

  return (
    <div className="flex flex-col gap-4">
      {jobs.map((job) => (
        <JobCard key={job.id} job={job} />
      ))}

      {hasNextPage && (
        <div ref={loaderRef} className="h-4 flex justify-center items-center">
          {isFetchingNextPage && (
            <span className="text-sm text-gray-500">Loading more...</span>
          )}
        </div>
      )}
    </div>
  )
}
