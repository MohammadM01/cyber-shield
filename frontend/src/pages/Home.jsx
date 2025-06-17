import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Shield, Search, Users, BookOpen, CheckCircle, AlertTriangle, Globe, Mail } from 'lucide-react'

export default function Home() {
  const [assessmentType, setAssessmentType] = useState('email')
  const [assessmentValue, setAssessmentValue] = useState('')
  const [isAssessing, setIsAssessing] = useState(false)

  const handleQuickAssessment = async (e) => {
    e.preventDefault()
    setIsAssessing(true)
    
    // Simulate API call
    setTimeout(() => {
      setIsAssessing(false)
      // In real app, navigate to results or show modal
      alert(`Assessment completed for ${assessmentType}: ${assessmentValue}`)
    }, 2000)
  }

  const features = [
    {
      icon: Shield,
      title: 'Comprehensive Security Assessment',
      description: 'Analyze emails, URLs, and IP addresses for potential threats using advanced detection algorithms.'
    },
    {
      icon: Users,
      title: 'Community Threat Intelligence',
      description: 'Leverage crowd-sourced threat data from our community of security-conscious businesses.'
    },
    {
      icon: BookOpen,
      title: 'Educational Resources',
      description: 'Access cybersecurity training materials designed specifically for small business owners.'
    },
    {
      icon: CheckCircle,
      title: 'Easy Implementation',
      description: 'No technical expertise required. Get started in minutes with our intuitive interface.'
    }
  ]

  const stats = [
    { label: 'Threats Detected', value: '2.5M+' },
    { label: 'Businesses Protected', value: '15K+' },
    { label: 'Community Reports', value: '500K+' },
    { label: 'Uptime', value: '99.9%' }
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 py-20">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Cybersecurity Made
              <span className="text-blue-400"> Simple</span>
            </h1>
            <p className="text-xl text-slate-300 mb-8 max-w-3xl mx-auto">
              Protect your small business from cyber threats without the complexity or cost. 
              Get instant security assessments and community-driven threat intelligence.
            </p>
            
            {/* Quick Assessment Form */}
            <div className="max-w-2xl mx-auto bg-slate-800/50 backdrop-blur-sm rounded-lg p-6 border border-slate-700">
              <h3 className="text-lg font-semibold text-white mb-4">Quick Security Assessment</h3>
              <form onSubmit={handleQuickAssessment} className="space-y-4">
                <div className="flex flex-col sm:flex-row gap-4">
                  <select
                    value={assessmentType}
                    onChange={(e) => setAssessmentType(e.target.value)}
                    className="bg-slate-700 text-white rounded-md px-4 py-2 border border-slate-600 focus:border-blue-500 focus:outline-none"
                  >
                    <option value="email">Email Address</option>
                    <option value="url">Website URL</option>
                    <option value="ip">IP Address</option>
                  </select>
                  <input
                    type="text"
                    value={assessmentValue}
                    onChange={(e) => setAssessmentValue(e.target.value)}
                    placeholder={`Enter ${assessmentType} to assess...`}
                    className="flex-1 bg-slate-700 text-white rounded-md px-4 py-2 border border-slate-600 focus:border-blue-500 focus:outline-none"
                    required
                  />
                  <button
                    type="submit"
                    disabled={isAssessing}
                    className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 text-white px-6 py-2 rounded-md font-medium flex items-center space-x-2"
                  >
                    {isAssessing ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                        <span>Assessing...</span>
                      </>
                    ) : (
                      <>
                        <Search className="h-4 w-4" />
                        <span>Assess</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>

            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/register"
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-md font-medium text-lg"
              >
                Get Started Free
              </Link>
              <Link
                to="/pricing"
                className="border border-slate-600 hover:border-slate-500 text-white px-8 py-3 rounded-md font-medium text-lg"
              >
                View Pricing
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-slate-800 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl font-bold text-blue-400 mb-2">{stat.value}</div>
                <div className="text-slate-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Why Choose CyberGuard SMB?
            </h2>
            <p className="text-xl text-slate-400 max-w-3xl mx-auto">
              Built specifically for small and medium businesses who need enterprise-level 
              security without the enterprise complexity or cost.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-slate-800 rounded-lg p-6 border border-slate-700">
                <feature.icon className="h-12 w-12 text-blue-500 mb-4" />
                <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
                <p className="text-slate-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Problem/Solution Section */}
      <section className="py-20 bg-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-white mb-6">
                The SMB Cybersecurity Challenge
              </h2>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <AlertTriangle className="h-6 w-6 text-red-500 mt-1 flex-shrink-0" />
                  <p className="text-slate-300">
                    <strong>Increasing Attacks:</strong> SMBs face 43% of all cyberattacks, 
                    including ransomware, phishing, and data breaches.
                  </p>
                </div>
                <div className="flex items-start space-x-3">
                  <AlertTriangle className="h-6 w-6 text-red-500 mt-1 flex-shrink-0" />
                  <p className="text-slate-300">
                    <strong>Budget Constraints:</strong> Traditional cybersecurity solutions 
                    are too expensive for most small businesses.
                  </p>
                </div>
                <div className="flex items-start space-x-3">
                  <AlertTriangle className="h-6 w-6 text-red-500 mt-1 flex-shrink-0" />
                  <p className="text-slate-300">
                    <strong>Complexity Barrier:</strong> Existing solutions require dedicated 
                    security professionals that SMBs can't afford.
                  </p>
                </div>
              </div>
            </div>
            <div>
              <h2 className="text-3xl font-bold text-white mb-6">
                Our Solution
              </h2>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-6 w-6 text-green-500 mt-1 flex-shrink-0" />
                  <p className="text-slate-300">
                    <strong>Affordable Protection:</strong> Enterprise-level security at 
                    SMB-friendly prices, starting free.
                  </p>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-6 w-6 text-green-500 mt-1 flex-shrink-0" />
                  <p className="text-slate-300">
                    <strong>No Expertise Required:</strong> Intuitive interface designed 
                    for business owners, not security experts.
                  </p>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-6 w-6 text-green-500 mt-1 flex-shrink-0" />
                  <p className="text-slate-300">
                    <strong>Complete Coverage:</strong> Both monitoring and protection 
                    in one simplified platform.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-800">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Secure Your Business?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of SMBs who trust CyberGuard SMB to protect their digital assets.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/register"
              className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3 rounded-md font-medium text-lg"
            >
              Start Free Trial
            </Link>
            <Link
              to="/community"
              className="border border-blue-300 text-white hover:bg-blue-700 px-8 py-3 rounded-md font-medium text-lg"
            >
              Join Community
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
