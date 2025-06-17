import { useState, useEffect } from 'react'
import { BookOpen, Video, FileText, Download, Search, Filter, Plus, Clock, User, Star, Eye, Shield, AlertTriangle, Lock, Wifi, Mail, Globe } from 'lucide-react'

export default function Resources({ user }) {
  const [resources, setResources] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterCategory, setFilterCategory] = useState('all')
  const [showAddForm, setShowAddForm] = useState(false)
  const [resourceForm, setResourceForm] = useState({
    title: '',
    description: '',
    category: 'general',
    type: 'article',
    url: '',
    difficulty: 'beginner'
  })

  const categories = [
    { id: 'all', name: 'All Categories', icon: BookOpen },
    { id: 'phishing', name: 'Phishing Protection', icon: Mail },
    { id: 'malware', name: 'Malware Prevention', icon: Shield },
    { id: 'passwords', name: 'Password Security', icon: Lock },
    { id: 'network', name: 'Network Security', icon: Wifi },
    { id: 'web', name: 'Web Safety', icon: Globe },
    { id: 'incident', name: 'Incident Response', icon: AlertTriangle },
    { id: 'general', name: 'General Security', icon: BookOpen }
  ]

  useEffect(() => {
    // Simulate API call to fetch educational resources
    const fetchResources = async () => {
      setIsLoading(true)
      
      setTimeout(() => {
        setResources([
          {
            id: 1,
            title: 'Complete Guide to Phishing Protection for Small Businesses',
            description: 'Learn how to identify, prevent, and respond to phishing attacks targeting your business.',
            category: 'phishing',
            type: 'article',
            difficulty: 'beginner',
            duration: '15 min read',
            author: 'CyberGuard Team',
            publishedAt: '2024-01-15T10:30:00Z',
            rating: 4.8,
            views: 1250,
            isPremium: false,
            url: '#',
            tags: ['phishing', 'email-security', 'training']
          },
          {
            id: 2,
            title: 'Password Security Best Practices Video Series',
            description: 'Comprehensive video training on creating, managing, and securing passwords for your team.',
            category: 'passwords',
            type: 'video',
            difficulty: 'beginner',
            duration: '45 min',
            author: 'Security Expert',
            publishedAt: '2024-01-14T15:45:00Z',
            rating: 4.9,
            views: 890,
            isPremium: true,
            url: '#',
            tags: ['passwords', 'authentication', 'training']
          },
          {
            id: 3,
            title: 'Network Security Checklist for SMBs',
            description: 'Downloadable checklist to secure your business network infrastructure.',
            category: 'network',
            type: 'checklist',
            difficulty: 'intermediate',
            duration: '30 min',
            author: 'Network Admin Pro',
            publishedAt: '2024-01-13T09:15:00Z',
            rating: 4.7,
            views: 567,
            isPremium: false,
            url: '#',
            tags: ['network', 'infrastructure', 'checklist']
          },
          {
            id: 4,
            title: 'Incident Response Plan Template',
            description: 'Ready-to-use incident response plan template customized for small businesses.',
            category: 'incident',
            type: 'template',
            difficulty: 'advanced',
            duration: '2 hours',
            author: 'Incident Response Team',
            publishedAt: '2024-01-12T14:20:00Z',
            rating: 4.6,
            views: 423,
            isPremium: true,
            url: '#',
            tags: ['incident-response', 'planning', 'template']
          },
          {
            id: 5,
            title: 'Web Browser Security Configuration Guide',
            description: 'Step-by-step guide to configure popular web browsers for maximum security.',
            category: 'web',
            type: 'guide',
            difficulty: 'beginner',
            duration: '20 min',
            author: 'Web Security Specialist',
            publishedAt: '2024-01-11T11:30:00Z',
            rating: 4.5,
            views: 789,
            isPremium: false,
            url: '#',
            tags: ['web-security', 'browsers', 'configuration']
          },
          {
            id: 6,
            title: 'Malware Detection and Removal Workshop',
            description: 'Interactive workshop on identifying and removing malware from business systems.',
            category: 'malware',
            type: 'workshop',
            difficulty: 'intermediate',
            duration: '90 min',
            author: 'Malware Expert',
            publishedAt: '2024-01-10T16:00:00Z',
            rating: 4.8,
            views: 345,
            isPremium: true,
            url: '#',
            tags: ['malware', 'detection', 'workshop']
          }
        ])
        setIsLoading(false)
      }, 1000)
    }

    fetchResources()
  }, [])

  const handleAddResource = async (e) => {
    e.preventDefault()
    
    // Simulate API call to add new resource
    const newResource = {
      id: resources.length + 1,
      ...resourceForm,
      author: user?.user?.name || 'Anonymous',
      publishedAt: new Date().toISOString(),
      rating: 0,
      views: 0,
      isPremium: false,
      tags: []
    }
    
    setResources([newResource, ...resources])
    setShowAddForm(false)
    setResourceForm({
      title: '',
      description: '',
      category: 'general',
      type: 'article',
      url: '',
      difficulty: 'beginner'
    })
  }

  const getTypeIcon = (type) => {
    switch (type) {
      case 'video':
        return <Video className="h-5 w-5" />
      case 'article':
        return <FileText className="h-5 w-5" />
      case 'checklist':
        return <FileText className="h-5 w-5" />
      case 'template':
        return <Download className="h-5 w-5" />
      case 'guide':
        return <BookOpen className="h-5 w-5" />
      case 'workshop':
        return <Video className="h-5 w-5" />
      default:
        return <BookOpen className="h-5 w-5" />
    }
  }

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'beginner':
        return 'text-green-400 bg-green-900/20'
      case 'intermediate':
        return 'text-yellow-400 bg-yellow-900/20'
      case 'advanced':
        return 'text-red-400 bg-red-900/20'
      default:
        return 'text-slate-400 bg-slate-800'
    }
  }

  const filteredResources = resources.filter(resource => {
    const matchesSearch = resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resource.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = filterCategory === 'all' || resource.category === filterCategory
    return matchesSearch && matchesCategory
  })

  const stats = {
    totalResources: resources.length,
    freeResources: resources.filter(r => !r.isPremium).length,
    premiumResources: resources.filter(r => r.isPremium).length,
    avgRating: resources.reduce((acc, r) => acc + r.rating, 0) / resources.length || 0
  }

  return (
    <div className="min-h-screen bg-slate-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div className="mb-6 lg:mb-0">
              <h1 className="text-3xl font-bold text-white mb-2">Educational Resources</h1>
              <p className="text-slate-400">
                Learn cybersecurity best practices designed specifically for small businesses
              </p>
            </div>
            
            {user && (
              <button
                onClick={() => setShowAddForm(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md font-medium flex items-center space-x-2"
              >
                <Plus className="h-5 w-5" />
                <span>Add Resource</span>
              </button>
            )}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">Total Resources</p>
                <p className="text-2xl font-bold text-white">{stats.totalResources}</p>
              </div>
              <BookOpen className="h-8 w-8 text-blue-500" />
            </div>
          </div>

          <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">Free Resources</p>
                <p className="text-2xl font-bold text-green-400">{stats.freeResources}</p>
              </div>
              <Shield className="h-8 w-8 text-green-500" />
            </div>
          </div>

          <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">Premium Content</p>
                <p className="text-2xl font-bold text-yellow-400">{stats.premiumResources}</p>
              </div>
              <Star className="h-8 w-8 text-yellow-500" />
            </div>
          </div>

          <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">Avg Rating</p>
                <p className="text-2xl font-bold text-blue-400">{stats.avgRating.toFixed(1)}</p>
              </div>
              <Star className="h-8 w-8 text-blue-500" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar - Categories */}
          <div className="lg:col-span-1">
            <div className="bg-slate-800 rounded-lg border border-slate-700 p-6 mb-6">
              <h3 className="text-lg font-semibold text-white mb-4">Categories</h3>
              <div className="space-y-2">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setFilterCategory(category.id)}
                    className={`w-full text-left px-3 py-2 rounded-md flex items-center space-x-2 transition-colors ${
                      filterCategory === category.id
                        ? 'bg-blue-600 text-white'
                        : 'text-slate-300 hover:bg-slate-700'
                    }`}
                  >
                    <category.icon className="h-4 w-4" />
                    <span className="text-sm">{category.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Search */}
            <div className="bg-slate-800 rounded-lg border border-slate-700 p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Search</h3>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search resources..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-slate-700 border border-slate-600 rounded-md text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {isLoading ? (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
                <p className="text-slate-400 mt-4">Loading resources...</p>
              </div>
            ) : filteredResources.length === 0 ? (
              <div className="text-center py-12">
                <BookOpen className="h-12 w-12 text-slate-500 mx-auto mb-4" />
                <p className="text-slate-400">No resources found matching your criteria.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredResources.map((resource) => (
                  <div key={resource.id} className="bg-slate-800 rounded-lg border border-slate-700 p-6 hover:border-slate-600 transition-colors">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-2">
                        {getTypeIcon(resource.type)}
                        <span className="text-slate-400 text-sm capitalize">{resource.type}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        {resource.isPremium && (
                          <span className="bg-yellow-600 text-white text-xs px-2 py-1 rounded-full">
                            Premium
                          </span>
                        )}
                        <span className={`px-2 py-1 rounded-full text-xs ${getDifficultyColor(resource.difficulty)}`}>
                          {resource.difficulty}
                        </span>
                      </div>
                    </div>

                    <h3 className="text-lg font-semibold text-white mb-2 line-clamp-2">
                      {resource.title}
                    </h3>
                    
                    <p className="text-slate-400 text-sm mb-4 line-clamp-3">
                      {resource.description}
                    </p>

                    <div className="flex items-center justify-between text-sm text-slate-400 mb-4">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-1">
                          <Clock className="h-3 w-3" />
                          <span>{resource.duration}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <User className="h-3 w-3" />
                          <span>{resource.author}</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Star className="h-3 w-3 text-yellow-500" />
                        <span>{resource.rating}</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-1 mb-4">
                      {resource.tags.map((tag, index) => (
                        <span key={index} className="bg-slate-700 text-slate-300 text-xs px-2 py-1 rounded">
                          #{tag}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-slate-700">
                      <div className="flex items-center space-x-4 text-sm text-slate-400">
                        <div className="flex items-center space-x-1">
                          <Eye className="h-3 w-3" />
                          <span>{resource.views}</span>
                        </div>
                        <span>{new Date(resource.publishedAt).toLocaleDateString()}</span>
                      </div>
                      
                      <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium">
                        {resource.type === 'template' || resource.type === 'checklist' ? 'Download' : 'View'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Add Resource Modal */}
        {showAddForm && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-slate-800 rounded-lg border border-slate-700 p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto">
              <h2 className="text-xl font-semibold text-white mb-4">Add New Resource</h2>
              
              <form onSubmit={handleAddResource} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Title
                  </label>
                  <input
                    type="text"
                    value={resourceForm.title}
                    onChange={(e) => setResourceForm({...resourceForm, title: e.target.value})}
                    className="w-full bg-slate-700 border border-slate-600 rounded-md px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Description
                  </label>
                  <textarea
                    value={resourceForm.description}
                    onChange={(e) => setResourceForm({...resourceForm, description: e.target.value})}
                    rows={3}
                    className="w-full bg-slate-700 border border-slate-600 rounded-md px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Category
                    </label>
                    <select
                      value={resourceForm.category}
                      onChange={(e) => setResourceForm({...resourceForm, category: e.target.value})}
                      className="w-full bg-slate-700 border border-slate-600 rounded-md px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      {categories.filter(c => c.id !== 'all').map(category => (
                        <option key={category.id} value={category.id}>{category.name}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Type
                    </label>
                    <select
                      value={resourceForm.type}
                      onChange={(e) => setResourceForm({...resourceForm, type: e.target.value})}
                      className="w-full bg-slate-700 border border-slate-600 rounded-md px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="article">Article</option>
                      <option value="video">Video</option>
                      <option value="guide">Guide</option>
                      <option value="checklist">Checklist</option>
                      <option value="template">Template</option>
                      <option value="workshop">Workshop</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    URL
                  </label>
                  <input
                    type="url"
                    value={resourceForm.url}
                    onChange={(e) => setResourceForm({...resourceForm, url: e.target.value})}
                    className="w-full bg-slate-700 border border-slate-600 rounded-md px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Difficulty Level
                  </label>
                  <select
                    value={resourceForm.difficulty}
                    onChange={(e) => setResourceForm({...resourceForm, difficulty: e.target.value})}
                    className="w-full bg-slate-700 border border-slate-600 rounded-md px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="beginner">Beginner</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="advanced">Advanced</option>
                  </select>
                </div>

                <div className="flex space-x-3 pt-4">
                  <button
                    type="submit"
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md font-medium"
                  >
                    Add Resource
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowAddForm(false)}
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
