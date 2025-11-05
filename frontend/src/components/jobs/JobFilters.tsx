import React from 'react'

export const JobFilters: React.FC = () => {
  return (
    <div className="w-64 p-4 bg-white border rounded-lg flex flex-col gap-4">
      <h3 className="font-semibold text-lg">Filters</h3>

      {/* Job Type */}
      <div>
        <p className="text-gray-600 font-medium mb-1">Job Type</p>
        <select className="w-full border rounded p-2 text-sm">
          <option value="">All</option>
          <option value="full-time">Full-time</option>
          <option value="part-time">Part-time</option>
          <option value="contract">Contract</option>
          <option value="internship">Internship</option>
        </select>
      </div>

      {/* Location */}
      <div>
        <p className="text-gray-600 font-medium mb-1">Location</p>
        <input
          type="text"
          placeholder="e.g., New York, Remote"
          className="w-full border rounded p-2 text-sm"
        />
      </div>

      {/* Experience Level */}
      <div>
        <p className="text-gray-600 font-medium mb-1">Experience Level</p>
        <select className="w-full border rounded p-2 text-sm">
          <option value="">All</option>
          <option value="entry">Entry level</option>
          <option value="mid">Mid level</option>
          <option value="senior">Senior level</option>
          <option value="director">Director</option>
        </select>
      </div>

      {/* Date Posted */}
      <div>
        <p className="text-gray-600 font-medium mb-1">Date Posted</p>
        <select className="w-full border rounded p-2 text-sm">
          <option value="">Anytime</option>
          <option value="last-24h">Last 24 hours</option>
          <option value="last-7d">Last 7 days</option>
          <option value="last-30d">Last 30 days</option>
        </select>
      </div>
    </div>
  )
}
