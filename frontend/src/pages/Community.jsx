"use client"

import { useState, useEffect } from "react"
import {
  AlertTriangle,
  Shield,
  Users,
  Clock,
  MapPin,
  Flag,
  Search,
  Filter,
  Plus,
  Eye,
  ThumbsUp,
  MessageCircle,
} from "lucide-react"

export default function Community({ user }) {
  const [threats, setThreats] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [showReportForm, setShowReportForm] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState("all")
  const [reportForm, setReportForm] = useState({
    type: "url",
    target: "",
    description: "",
    severity: "medium",
  })

  useEffect(() => {
    // Simulate API call to fetch community threats
    const fetchThreats = async () => {
      setIsLoading(true)

      setTimeout(() => {
        setThreats([
          {
            id: 1,
            type: "url",
            target: "https://malicious-site.com",
            description: "Phishing site impersonating major bank login page",
            severity: "high",
            reportedBy: "SecurityPro123",
            reportedAt: "2024-01-15T10:30:00Z",
            location: "United States",
            votes: 15,
            comments: 3,
            verified: true,
            tags: ["phishing", "banking", "credential-theft"],
          },
          {
            id: 2,
            type: "email",
            target: "noreply@fake-paypal.com",
            description: "Fake PayPal notification emails with malicious links",
            severity: "high",
            reportedBy: "CyberWatch",
            reportedAt: "2024-01-14T15:45:00Z",
            location: "Russia",
            votes: 23,
            comments: 7,
            verified: true,
            tags: ["phishing", "paypal", "email-spoofing"],
          },
          {
            id: 3,
            type: "ip",
            target: "192.168.100.50",
            description: "Suspicious scanning activity targeting port 22",
            severity: "medium",
            reportedBy: "NetworkAdmin",
            reportedAt: "2024-01-13T09:15:00Z",
            location: "China",
            votes: 8,
            comments: 2,
            verified: false,
            tags: ["scanning", "ssh", "brute-force"],
          },
          {
            id: 4,
            type: "url",
            target: "https://fake-microsoft-update.com",
            description: "Fake Microsoft update site distributing malware",
            severity: "high",
            reportedBy: "ITManager2024",
            reportedAt: "2024-01-12T14:20:00Z",
            location: "Unknown",
            votes: 31,
            comments: 12,
            verified: true,
            tags: ["malware", "microsoft", "fake-update"],
          },
          {
            id: 5,
            type: "email",
            target: "support@amazon-security.net",
            description: "Amazon account suspension phishing emails",
            severity: "medium",
            reportedBy: "ShopOwner",
            reportedAt: "2024-01-11T11:30:00Z",
            location: "Brazil",
            votes: 12,
            comments: 5,
            verified: false,
            tags: ["phishing", "amazon", "account-suspension"],
          },
        ])
        setIsLoading(false)
      }, 1000)
    }

    fetchThreats()
  }, [])

  const handleReportSubmit = async (e) => {
    e.preventDefault()

    // Simulate API call to submit threat report
    const newThreat = {
      id: threats.length + 1,
      ...reportForm,
      reportedBy: user?.user?.name || "Anonymous",
      reportedAt: new Date().toISOString(),
      location: "Unknown",
      votes: 0,
      comments: 0,
      verified: false,
      tags: [],
    }

    setThreats([newThreat, ...threats])
    setShowReportForm(false)
    setReportForm({
      type: "url",
      target: "",
      description: "",
      severity: "medium",
    })
  }

  const getSeverityColor = (severity) => {
    switch (severity) {
      case "high":
        return "text-red-400 bg-red-900/20 border-red-700"
      case "medium":
        return "text-yellow-400 bg-yellow-900/20 border-yellow-700"
      case "low":
        return "text-green-400 bg-green-900/20 border-green-700"
      default:
        return "text-slate-400 bg-slate-800 border-slate-700"
    }
  }

  const getTypeIcon = (type) => {
    switch (type) {
      case "email":
        return "📧"
      case "url":
        return "🌐"
      case "ip":
        return "🖥️"
      default:
        return "⚠️"
    }
  }

  const filteredThreats = threats.filter((threat) => {
    const matchesSearch =
      threat.target.toLowerCase().includes(searchTerm.toLowerCase()) ||
      threat.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterType === "all" || threat.type === filterType
    return matchesSearch && matchesFilter
  })

  const stats = {
    totalReports: threats.length,
    verifiedThreats: threats.filter((t) => t.verified).length,
    activeReporters: new Set(threats.map((t) => t.reportedBy)).size,
    avgResponseTime: "2.3 hours",
  }

  return (
    <div className="min-h-screen bg-slate-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div className="mb-6 lg:mb-0">
              <h1 className="text-3xl font-bold text-white mb-2">Community Threat Intelligence</h1>
              <p className="text-slate-400">Crowdsourced cybersecurity intelligence from businesses like yours</p>
            </div>

            {user && (
              <button
                onClick={() => setShowReportForm(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md font-medium flex items-center space-x-2"
              >
                <Plus className="h-5 w-5" />
                <span>Report Threat</span>
              </button>
            )}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">Total Reports</p>
                <p className="text-2xl font-bold text-white">{stats.totalReports}</p>
              </div>
              <Flag className="h-8 w-8 text-blue-500" />
            </div>
          </div>

          <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">Verified Threats</p>
                <p className="text-2xl font-bold text-red-400">{stats.verifiedThreats}</p>
              </div>
              <Shield className="h-8 w-8 text-red-500" />
            </div>
          </div>

          <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">Active Reporters</p>
                <p className="text-2xl font-bold text-green-400">{stats.activeReporters}</p>
              </div>
              <Users className="h-8 w-8 text-green-500" />
            </div>
          </div>

          <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">Avg Response</p>
                <p className="text-2xl font-bold text-yellow-400">{stats.avgResponseTime}</p>
              </div>
              <Clock className="h-8 w-8 text-yellow-500" />
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-slate-800 rounded-lg p-6 border border-slate-700 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
              <input
                type="text"
                placeholder="Search threats by target or description..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-slate-700 border border-slate-600 rounded-md text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex items-center space-x-2">
              <Filter className="h-5 w-5 text-slate-400" />
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="bg-slate-700 border border-slate-600 rounded-md px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Types</option>
                <option value="email">Email</option>
                <option value="url">URL</option>
                <option value="ip">IP Address</option>
              </select>
            </div>
          </div>
        </div>

        {/* Threat Reports */}
        <div className="space-y-6">
          {isLoading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
              <p className="text-slate-400 mt-4">Loading community reports...</p>
            </div>
          ) : filteredThreats.length === 0 ? (
            <div className="text-center py-12">
              <AlertTriangle className="h-12 w-12 text-slate-500 mx-auto mb-4" />
              <p className="text-slate-400">No threats found matching your criteria.</p>
            </div>
          ) : (
            filteredThreats.map((threat) => (
              <div key={threat.id} className="bg-slate-800 rounded-lg border border-slate-700 p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start space-x-4">
                    <div className="text-2xl">{getTypeIcon(threat.type)}</div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-lg font-semibold text-white">{threat.target}</h3>
                        {threat.verified && (
                          <span className="bg-green-600 text-white text-xs px-2 py-1 rounded-full flex items-center space-x-1">
                            <Shield className="h-3 w-3" />
                            <span>Verified</span>
                          </span>
                        )}
                        <span className={`px-2 py-1 rounded-full text-xs border ${getSeverityColor(threat.severity)}`}>
                          {threat.severity.toUpperCase()}
                        </span>
                      </div>
                      <p className="text-slate-300 mb-3">{threat.description}</p>

                      <div className="flex flex-wrap gap-2 mb-3">
                        {threat.tags.map((tag, index) => (
                          <span key={index} className="bg-slate-700 text-slate-300 text-xs px-2 py-1 rounded">
                            #{tag}
                          </span>
                        ))}
                      </div>

                      <div className="flex items-center space-x-4 text-sm text-slate-400">
                        <span>Reported by {threat.reportedBy}</span>
                        <span>•</span>
                        <span>{new Date(threat.reportedAt).toLocaleDateString()}</span>
                        <span>•</span>
                        <div className="flex items-center space-x-1">
                          <MapPin className="h-3 w-3" />
                          <span>{threat.location}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-slate-700">
                  <div className="flex items-center space-x-6">
                    <button className="flex items-center space-x-2 text-slate-400 hover:text-white">
                      <ThumbsUp className="h-4 w-4" />
                      <span>{threat.votes}</span>
                    </button>
                    <button className="flex items-center space-x-2 text-slate-400 hover:text-white">
                      <MessageCircle className="h-4 w-4" />
                      <span>{threat.comments}</span>
                    </button>
                    <button className="flex items-center space-x-2 text-slate-400 hover:text-white">
                      <Eye className="h-4 w-4" />
                      <span>View Details</span>
                    </button>
                  </div>

                  <button className="text-blue-400 hover:text-blue-300 text-sm font-medium">Add to Watchlist</button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Report Threat Modal */}
        {showReportForm && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-slate-800 rounded-lg border border-slate-700 p-6 w-full max-w-md">
              <h2 className="text-xl font-semibold text-white mb-4">Report New Threat</h2>

              <form onSubmit={handleReportSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Threat Type</label>
                  <select
                    value={reportForm.type}
                    onChange={(e) => setReportForm({ ...reportForm, type: e.target.value })}
                    className="w-full bg-slate-700 border border-slate-600 rounded-md px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="url">Website URL</option>
                    <option value="email">Email Address</option>
                    <option value="ip">IP Address</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Target</label>
                  <input
                    type="text"
                    value={reportForm.target}
                    onChange={(e) => setReportForm({ ...reportForm, target: e.target.value })}
                    placeholder={`Enter ${reportForm.type}...`}
                    className="w-full bg-slate-700 border border-slate-600 rounded-md px-3 py-2 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Description</label>
                  <textarea
                    value={reportForm.description}
                    onChange={(e) => setReportForm({ ...reportForm, description: e.target.value })}
                    placeholder="Describe the threat and how you encountered it..."
                    rows={3}
                    className="w-full bg-slate-700 border border-slate-600 rounded-md px-3 py-2 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Severity</label>
                  <select
                    value={reportForm.severity}
                    onChange={(e) => setReportForm({ ...reportForm, severity: e.target.value })}
                    className="w-full bg-slate-700 border border-slate-600 rounded-md px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>

                <div className="flex space-x-3 pt-4">
                  <button
                    type="submit"
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md font-medium"
                  >
                    Submit Report
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowReportForm(false)}
                    className="flex-1 bg-slate-700 hover:bg-slate-600 text-white py-2 px-4 rounded-md font-medium"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
