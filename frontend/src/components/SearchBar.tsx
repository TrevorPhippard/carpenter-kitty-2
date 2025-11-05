export function SearchBar() {
  return (
    <div className="relative">
      <input
        aria-label="Search"
        className="w-72 rounded-full border border-gray-200 py-2 pl-10 pr-4 text-sm bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-300"
        placeholder="Search"
      />
      <svg
        className="w-4 h-4 absolute left-3 top-2.5 text-gray-400"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 103.5 10.5a7.5 7.5 0 0013.15 6.15z"
        />
      </svg>
    </div>
  )
}
