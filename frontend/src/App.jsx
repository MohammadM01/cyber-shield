"use client"

import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { useState, useEffect } from "react"
import Header from "./components/Header"
import Footer from "./components/Footer"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Dashboard from "./pages/Dashboard"
import ReportDetails from "./pages/ReportDetails"
import Pricing from "./pages/Pricing"
import Community from "./pages/Community"
import Resources from "./pages/Resources"
import NotFound from "./pages/NotFound"

function App() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check for existing auth token
    const token = localStorage.getItem("authToken")
    if (token) {
      // In a real app, validate token with API
      setUser({ token })
    }
    setLoading(false)
  }, [])

  const login = (userData) => {
    setUser(userData)
    localStorage.setItem("authToken", userData.token)
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("authToken")
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  return (
    <Router>
      <div className="min-h-screen bg-slate-900 text-white flex flex-col">
        <Header user={user} onLogout={logout} />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login onLogin={login} />} />
            <Route path="/register" element={<Register onLogin={login} />} />
            <Route path="/dashboard" element={<Dashboard user={user} />} />
            <Route path="/reports/:reportId" element={<ReportDetails />} />
            <Route path="/pricing" element={<Pricing user={user} />} />
            <Route path="/community" element={<Community user={user} />} />
            <Route path="/resources" element={<Resources user={user} />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App
