import React from 'react'

export type Job = {
  id: string
  title: string
  company: string
  location: string
  timePosted: string
  easyApply?: boolean
  description: string
}

type Props = {
  job: Job
}

export const JobCard: React.FC<Props> = ({ job }) => {
  return (
    <div className="border rounded-lg p-4 hover:shadow-lg transition cursor-pointer flex flex-col gap-2 bg-white">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-semibold text-lg">{job.title}</h3>
          <p className="text-gray-600 text-sm">{job.company}</p>
          <p className="text-gray-500 text-sm">{job.location}</p>
        </div>
        {job.easyApply && (
          <span className="px-2 py-1 text-xs bg-pink-100 text-primary rounded-full font-medium">
            Urgent
          </span>
        )}
      </div>
      <p className="text-gray-400 text-xs">{job.timePosted}</p>
      <p className="text-gray-700 text-sm line-clamp-3">{job.description}</p>
    </div>
  )
}
