import { Link } from "react-router-dom"

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] px-4">
      <h1 className="text-6xl font-bold text-cyber-blue mb-4">404</h1>
      <h2 className="text-2xl font-semibold mb-6">Page Not Found</h2>
      <p className="text-muted-foreground text-center mb-8 max-w-md">
        Sorry, we couldn't find the page you're looking for. The page might have been moved, deleted, or never existed.
      </p>
      <div className="space-x-4">
        <Link
          to="/"
          className="inline-flex items-center justify-center px-6 py-2 text-sm font-medium text-white bg-cyber-blue hover:bg-blue-600 rounded-md transition-colors"
        >
          Go Home
        </Link>
        <Link
          to="/dashboard"
          className="inline-flex items-center justify-center px-6 py-2 text-sm font-medium text-cyber-blue bg-transparent border border-cyber-blue hover:bg-cyber-blue/10 rounded-md transition-colors"
        >
          Dashboard
        </Link>
      </div>
    </div>
  )
}

export default NotFound 