import { Link } from '@tanstack/react-router'
import { Button } from '@/components//ui/button'

export function NotFound({ children }: { children?: any }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200">
      <div className="text-center space-y-4 max-w-md">
        <h1 className="text-5xl font-extrabold text-red-500">404</h1>
        <h2 className="text-2xl font-semibold">Oops! Page not found.</h2>
        <p className="text-gray-600 dark:text-gray-400">
          {children || 'The page you are looking for does not exist.'}
        </p>
        <div className="flex flex-wrap justify-center gap-4 mt-4">
          <Button
            onClick={() => window.history.back()}
            className="px-4 py-2 bg-emerald-500 text-white rounded-lg font-semibold uppercase text-sm hover:bg-emerald-600 transition"
          >
            Go Back
          </Button>
          <Link
            to="/"
            className="px-4 py-2 bg-cyan-600 text-white rounded-lg font-semibold uppercase text-sm hover:bg-cyan-700 transition"
          >
            Start Over
          </Link>
        </div>
      </div>
      <div className="mt-10">
        {/* Optional illustration */}
        <img
          src="https://images.unsplash.com/photo-1506765515384-028b60a970df?w=600&q=80"
          alt="Not Found Illustration"
          className="w-80 mx-auto rounded shadow-lg"
        />
      </div>
    </div>
  )
}
