import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, Download, Share2, AlertTriangle, CheckCircle, Info, Shield, Globe, Server, Mail, Clock, MapPin, Eye, Lock } from 'lucide-react'

export default function ReportDetail() {
  const { reportId } = useParams()
  const [report, setReport] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isDownloading, setIsDownloading] = useState(false)

  useEffect(() => {
    // Simulate API call to fetch report details
    const fetchReport = async () => {
      setIsLoading(true)
      
      setTimeout(() => {
        // Mock detailed report data
        setReport({
          id: reportId,
          type: 'url',
          target: 'https://suspicious-site.com',
          result: 'threat',
          score: 85,
          date: '2024-01-15T10:30:00Z',
          summary: 'High-risk website detected with multiple security threats including malware distribution and phishing attempts.',
          details: {
            threatTypes: ['Malware', 'Phishing', 'Suspicious Redirects'],
            riskLevel: 'High',
            confidence: 95,
            lastSeen: '2024-01-15T08:15:00Z',
            ipAddress: '192.168.1.100',
            location: 'Unknown',
            registrar: 'Suspicious Registrar Inc.',
            sslStatus: 'Invalid Certificate',
            reputation: 'Poor'
          },
          technicalData: {
            openPorts: [80, 443, 8080],
            services: ['HTTP', 'HTTPS', 'Proxy'],
            vulnerabilities: [
              'CVE-2023-1234: SQL Injection vulnerability',
              'CVE-2023-5678: Cross-site scripting (XSS)',
              'Outdated SSL certificate'
            ],
            headers: {
              'Server': 'nginx/1.18.0',
              'X-Powered-By': 'PHP/7.4.3',
              'Content-Security-Policy': 'None'
            }
          },
          recommendations: [
            'Block access to this website immediately',
            'Scan all systems that may have accessed this site',
            'Update security policies to prevent similar threats',
            'Consider implementing web filtering solutions'
          ]
        })
        setIsLoading(false)
      }, 1000)
    }

    fetchReport()
  }, [reportId])

  const handleDownload = async () => {
    setIsDownloading(true)
    // Simulate PDF download
    setTimeout(() => {
      setIsDownloading(false)
      // In real app, trigger actual download
      alert('Report downloaded successfully!')
    }, 2000)
  }

  const getResultColor = (result) => {
    switch (result) {
      case 'threat':
        return 'text-red-400 bg-red-900/20 border-red-700'
      case 'warning':
        return 'text-yellow-400 bg-yellow-900/20 border-yellow-700'
      case 'safe':
        return 'text-green-400 bg-green-900/20 border-green-700'
      default:
        return 'text-slate-400 bg-slate-800 border-slate-700'
    }
  }

  const getTypeIcon = (type) => {
    switch (type) {
      case 'email':
        return <Mail className="h-6 w-6" />
      case 'url':
        return <Globe className="h-6 w-6" />
      case 'ip':
        return <Server className="h-6 w-6" />
      default:
        return <Shield className="h-6 w-6" />
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  if (!report) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-center">
          <AlertTriangle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-2">Report Not Found</h2>
          <p className="text-slate-400 mb-6">The requested security report could not be found.</p>
          <Link
            to="/dashboard"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md font-medium"
          >
            Back to Dashboard
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-900 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-4 mb-4">
            <Link
              to="/dashboard"
              className="text-slate-400 hover:text-white flex items-center space-x-2"
            >
              <ArrowLeft className="h-5 w-5" />
              <span>Back to Dashboard</span>
            </Link>
          </div>
          
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-center space-x-4 mb-4 lg:mb-0">
              <div className="flex items-center space-x-3">
                {getTypeIcon(report.type)}
                <div>
                  <h1 className="text-2xl font-bold text-white">Security Report</h1>
                  <p className="text-slate-400">{report.target}</p>
                </div>
              </div>
            </div>
            
            <div className="flex space-x-3">
              <button
                onClick={handleDownload}
                disabled={isDownloading}
                className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 text-white px-4 py-2 rounded-md font-medium flex items-center space-x-2"
              >
                {isDownloading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    <span>Downloading...</span>
                  </>
                ) : (
                  <>
                    <Download className="h-4 w-4" />
                    <span>Download PDF</span>
                  </>
                )}
              </button>
              <button className="border border-slate-600 hover:border-slate-500 text-white px-4 py-2 rounded-md font-medium flex items-center space-x-2">
                <Share2 className="h-4 w-4" />
                <span>Share</span>
              </button>
            </div>
          </div>
        </div>

        {/* Report Summary */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          <div className="lg:col-span-2">
            <div className="bg-slate-800 rounded-lg p-6 border border-slate-700 mb-6">
              <h2 className="text-xl font-semibold text-white mb-4">Assessment Summary</h2>
              
              <div className={`rounded-lg p-4 border mb-4 ${getResultColor(report.result)}`}>
                <div className="flex items-center space-x-3">
                  {report.result === 'threat' && <AlertTriangle className="h-6 w-6" />}
                  {report.result === 'warning' && <AlertTriangle className="h-6 w-6" />}
                  {report.result === 'safe' && <CheckCircle className="h-6 w-6" />}
                  <div>
                    <h3 className="font-semibold capitalize">{report.result} Detected</h3>
                    <p className="text-sm opacity-90">Risk Score: {report.score}/100</p>
                  </div>
                </div>
              </div>

              <p className="text-slate-300 mb-6">{report.summary}</p>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium text-white mb-2">Threat Types</h4>
                  <ul className="space-y-1">
                    {report.details.threatTypes.map((threat, index) => (
                      <li key={index} className="text-slate-400 text-sm flex items-center space-x-2">
                        <AlertTriangle className="h-3 w-3 text-red-500" />
                        <span>{threat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium text-white mb-2">Assessment Details</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Risk Level:</span>
                      <span className="text-red-400 font-medium">{report.details.riskLevel}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Confidence:</span>
                      <span className="text-white">{report.details.confidence}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Last Seen:</span>
                      <span className="text-white">
                        {new Date(report.details.lastSeen).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Technical Details */}
            <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
              <h2 className="text-xl font-semibold text-white mb-4">Technical Analysis</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-medium text-white mb-3">Network Information</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center space-x-2">
                      <Server className="h-4 w-4 text-slate-400" />
                      <span className="text-slate-400">IP Address:</span>
                      <span className="text-white">{report.details.ipAddress}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <MapPin className="h-4 w-4 text-slate-400" />
                      <span className="text-slate-400">Location:</span>
                      <span className="text-white">{report.details.location}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Lock className="h-4 w-4 text-slate-400" />
                      <span className="text-slate-400">SSL Status:</span>
                      <span className="text-red-400">{report.details.sslStatus}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-medium text-white mb-3">Open Ports & Services</h3>
                  <div className="space-y-2">
                    {report.technicalData.openPorts.map((port, index) => (
                      <div key={index} className="flex items-center justify-between text-sm">
                        <span className="text-slate-400">Port {port}:</span>
                        <span className="text-white">{report.technicalData.services[index]}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <h3 className="font-medium text-white mb-3">Vulnerabilities Found</h3>
                <div className="space-y-2">
                  {report.technicalData.vulnerabilities.map((vuln, index) => (
                    <div key={index} className="bg-red-900/20 border border-red-700 rounded p-3">
                      <div className="flex items-start space-x-2">
                        <AlertTriangle className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" />
                        <span className="text-red-300 text-sm">{vuln}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Stats */}
            <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
              <h3 className="font-semibold text-white mb-4">Report Details</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-400">Report ID:</span>
                  <span className="text-white font-mono">{report.id}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Generated:</span>
                  <span className="text-white">
                    {new Date(report.date).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Type:</span>
                  <span className="text-white capitalize">{report.type}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Status:</span>
                  <span className={`capitalize ${
                    report.result === 'threat' ? 'text-red-400' :
                    report.result === 'warning' ? 'text-yellow-400' :
                    'text-green-400'
                  }`}>
                    {report.result}
                  </span>
                </div>
              </div>
            </div>

            {/* Recommendations */}
            <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
              <h3 className="font-semibold text-white mb-4">Recommendations</h3>
              <div className="space-y-3">
                {report.recommendations.map((rec, index) => (
                  <div key={index} className="flex items-start space-x-2">
                    <Info className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
                    <span className="text-slate-300 text-sm">{rec}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
              <h3 className="font-semibold text-white mb-4">Actions</h3>
              <div className="space-y-3">
                <button className="w-full bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-md text-sm font-medium">
                  Block This Threat
                </button>
                <button className="w-full bg-slate-700 hover:bg-slate-600 text-white py-2 px-4 rounded-md text-sm font-medium">
                  Add to Watchlist
                </button>
                <Link
                  to="/community"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md text-sm font-medium text-center block"
                >
                  Report to Community
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
