import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Shield, Search, Clock, AlertTriangle, CheckCircle, TrendingUp, Mail, Globe, Server, Download, Eye, Calendar, BarChart3 } from 'lucide-react'

export default function Dashboard({ user }) {
  const [assessmentHistory, setAssessmentHistory] = useState([])
  const [subscriptionStatus, setSubscriptionStatus] = useState(null)
  const [usageStats, setUsageStats] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    if (!user) {
      navigate('/login')
      return
    }

    // Simulate API calls
    const fetchDashboardData = async () => {
      setIsLoading(true)
      
      // Mock data
      setTimeout(() => {
        setAssessmentHistory([
          {
            id: 1,
            type: 'email',
            target: 'suspicious@example.com',
            result: 'threat',
            score: 85,
            date: '2024-01-15T10:30:00Z',
            reportId: 'rpt_001'
          },
          {
            id: 2,
            type: 'url',
            target: 'https://safe-site.com',
            result: 'safe',
            score: 15,
            date: '2024-01-14T15:45:00Z',
            reportId: 'rpt_002'
          },
          {
            id: 3,
            type: 'ip',
            target: '192.168.1.100',
            result: 'warning',
            score: 45,
            date: '2024-01-13T09:15:00Z',
            reportId: 'rpt_003'
          }
        ])

        setSubscriptionStatus({
          plan: 'free',
          assessmentsUsed: 15,
          assessmentsLimit: 50,
          expiresAt: null
        })

        setUsageStats({
          totalAssessments: 47,
          threatsDetected: 12,
          safeResults: 35,
          avgThreatScore: 32
        })

        setIsLoading(false)
      }, 1000)
    }

    fetchDashboardData()
  }, [user, navigate])

  const getResultIcon = (result) => {
    switch (result) {
      case 'threat':
        return <AlertTriangle className="h-5 w-5 text-red-500" />
      case 'warning':
        return <AlertTriangle className="h-5 w-5 text-yellow-500" />
      case 'safe':
        return <CheckCircle className="h-5 w-5 text-green-500" />
      default:
        return <Clock className="h-5 w-5 text-slate-400" />
    }
  }

  const getTypeIcon = (type) => {
    switch (type) {
      case 'email':
        return <Mail className="h-4 w-4" />
      case 'url':
        return <Globe className="h-4 w-4" />
      case 'ip':
        return <Server className="h-4 w-4" />
      default:
        return <Search className="h-4 w-4" />
    }
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white">Dashboard</h1>
          <p className="text-slate-400 mt-2">
            Welcome back, {user?.user?.name || 'User'}. Here's your security overview.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">Total Assessments</p>
                <p className="text-2xl font-bold text-white">{usageStats?.totalAssessments}</p>
              </div>
              <BarChart3 className="h-8 w-8 text-blue-500" />
            </div>
          </div>

          <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">Threats Detected</p>
                <p className="text-2xl font-bold text-red-400">{usageStats?.threatsDetected}</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-red-500" />
            </div>
          </div>

          <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">Safe Results</p>
                <p className="text-2xl font-bold text-green-400">{usageStats?.safeResults}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-500" />
            </div>
          </div>

          <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">Avg Threat Score</p>
                <p className="text-2xl font-bold text-yellow-400">{usageStats?.avgThreatScore}</p>
              </div>
              <TrendingUp className="h-8 w-8 text-yellow-500" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Assessment History */}
          <div className="lg:col-span-2">
            <div className="bg-slate-800 rounded-lg border border-slate-700">
              <div className="p-6 border-b border-slate-700">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-white">Recent Assessments</h2>
                  <Link
                    to="/"
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium flex items-center space-x-2"
                  >
                    <Search className="h-4 w-4" />
                    <span>New Assessment</span>
                  </Link>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-slate-700">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">
                        Target
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">
                        Type
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">
                        Result
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">
                        Score
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">
                        Date
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-700">
                    {assessmentHistory.map((assessment) => (
                      <tr key={assessment.id} className="hover:bg-slate-700/50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center space-x-2">
                            {getTypeIcon(assessment.type)}
                            <span className="text-white text-sm font-medium">
                              {assessment.target}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-700 text-slate-300 capitalize">
                            {assessment.type}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center space-x-2">
                            {getResultIcon(assessment.result)}
                            <span className="text-slate-300 capitalize">{assessment.result}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`font-medium ${
                            assessment.score >= 70 ? 'text-red-400' :
                            assessment.score >= 40 ? 'text-yellow-400' :
                            'text-green-400'
                          }`}>
                            {assessment.score}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-slate-400 text-sm">
                          {formatDate(assessment.date)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex space-x-2">
                            <Link
                              to={`/reports/${assessment.reportId}`}
                              className="text-blue-400 hover:text-blue-300"
                            >
                              <Eye className="h-4 w-4" />
                            </Link>
                            <button className="text-slate-400 hover:text-slate-300">
                              <Download className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Subscription Status */}
            <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
              <h3 className="text-lg font-semibold text-white mb-4">Subscription Status</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Current Plan</span>
                  <span className="text-white font-medium capitalize">
                    {subscriptionStatus?.plan}
                  </span>
                </div>
                
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-slate-400">Assessments Used</span>
                    <span className="text-white">
                      {subscriptionStatus?.assessmentsUsed} / {subscriptionStatus?.assessmentsLimit}
                    </span>
                  </div>
                  <div className="w-full bg-slate-700 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full" 
                      style={{ 
                        width: `${(subscriptionStatus?.assessmentsUsed / subscriptionStatus?.assessmentsLimit) * 100}%` 
                      }}
                    ></div>
                  </div>
                </div>

                {subscriptionStatus?.plan === 'free' && (
                  <Link
                    to="/pricing"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md text-sm font-medium text-center block"
                  >
                    Upgrade to Premium
                  </Link>
                )}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
              <h3 className="text-lg font-semibold text-white mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <Link
                  to="/"
                  className="w-full bg-slate-700 hover:bg-slate-600 text-white py-2 px-4 rounded-md text-sm font-medium text-center block flex items-center justify-center space-x-2"
                >
                  <Search className="h-4 w-4" />
                  <span>New Assessment</span>
                </Link>
                <Link
                  to="/community"
                  className="w-full bg-slate-700 hover:bg-slate-600 text-white py-2 px-4 rounded-md text-sm font-medium text-center block flex items-center justify-center space-x-2"
                >
                  <Shield className="h-4 w-4" />
                  <span>Community Threats</span>
                </Link>
                <Link
                  to="/resources"
                  className="w-full bg-slate-700 hover:bg-slate-600 text-white py-2 px-4 rounded-md text-sm font-medium text-center block flex items-center justify-center space-x-2"
                >
                  <Calendar className="h-4 w-4" />
                  <span>Resources</span>
                </Link>
              </div>
            </div>

            {/* Recent Threats Alert */}
            <div className="bg-red-900/20 border border-red-700 rounded-lg p-6">
              <div className="flex items-center space-x-2 mb-3">
                <AlertTriangle className="h-5 w-5 text-red-400" />
                <h3 className="text-lg font-semibold text-red-400">Security Alert</h3>
              </div>
              <p className="text-red-300 text-sm mb-4">
                3 new threats detected in your recent assessments. Review your reports for details.
              </p>
              <Link
                to="/reports"
                className="text-red-400 hover:text-red-300 text-sm font-medium"
              >
                View All Reports →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
