import { Link } from "react-router-dom"
import { Shield } from "lucide-react"
import PropTypes from "prop-types"

export default function Header({ user, onLogout }) {
  return (
    <header className="border-b border-slate-700/50 bg-slate-900/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-3">
            <div className="bg-blue-600 p-2 rounded-lg">
              <Shield className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">CyberShield Lite</h1>
              <p className="text-xs text-slate-400">Advanced Security Assessment</p>
            </div>
          </Link>

          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-slate-300 hover:text-white transition-colors">
              Home
            </Link>
            <Link to="/pricing" className="text-slate-300 hover:text-white transition-colors">
              Pricing
            </Link>
            <Link to="/community" className="text-slate-300 hover:text-white transition-colors">
              Community
            </Link>
            <Link to="/resources" className="text-slate-300 hover:text-white transition-colors">
              Resources
            </Link>
          </nav>

          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <Link
                  to="/dashboard"
                  className="text-sm bg-blue-600/20 text-blue-400 px-4 py-2 rounded-md hover:bg-blue-600/30 transition-colors"
                >
                  Dashboard
                </Link>
                <button
                  onClick={onLogout}
                  className="text-sm bg-slate-800 text-slate-300 px-4 py-2 rounded-md hover:bg-slate-700 transition-colors"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-sm text-slate-300 hover:text-white transition-colors"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="text-sm bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}

Header.propTypes = {
  user: PropTypes.object,
  onLogout: PropTypes.func.isRequired,
}
