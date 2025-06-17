import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Check, X, Shield, Zap, Crown, Users } from 'lucide-react'

export default function Pricing({ user }) {
  const [billingCycle, setBillingCycle] = useState('monthly')
  const [isSubscribing, setIsSubscribing] = useState(false)

  const plans = [
    {
      name: 'Free',
      icon: Shield,
      price: { monthly: 0, yearly: 0 },
      description: 'Perfect for small businesses getting started with cybersecurity',
      features: [
        '50 assessments per month',
        'Basic threat detection',
        'Email & URL scanning',
        'Community threat reports',
        'Basic educational resources',
        'Email support'
      ],
      limitations: [
        'No IP address scanning',
        'No detailed technical reports',
        'No priority support',
        'No custom integrations'
      ],
      popular: false,
      cta: 'Get Started Free'
    },
    {
      name: 'Professional',
      icon: Zap,
      price: { monthly: 29, yearly: 290 },
      description: 'Advanced protection for growing businesses',
      features: [
        '500 assessments per month',
        'Advanced threat detection',
        'All scan types (Email, URL, IP)',
        'Detailed technical reports',
        'PDF report downloads',
        'Priority email support',
        'Custom threat alerts',
        'API access (basic)',
        'Advanced educational content'
      ],
      limitations: [
        'No phone support',
        'Limited API calls',
        'No custom integrations'
      ],
      popular: true,
      cta: 'Start Free Trial'
    },
    {
      name: 'Enterprise',
      icon: Crown,
      price: { monthly: 99, yearly: 990 },
      description: 'Complete cybersecurity solution for larger organizations',
      features: [
        'Unlimited assessments',
        'Enterprise-grade threat detection',
        'All scan types + custom rules',
        'Comprehensive technical reports',
        'White-label reports',
        '24/7 phone & email support',
        'Real-time threat alerts',
        'Full API access',
        'Custom integrations',
        'Dedicated account manager',
        'Advanced analytics dashboard',
        'Team collaboration tools',
        'Custom training programs'
      ],
      limitations: [],
      popular: false,
      cta: 'Contact Sales'
    }
  ]

  const handleSubscribe = async (planName) => {
    setIsSubscribing(true)
    
    // Simulate subscription process
    setTimeout(() => {
      setIsSubscribing(false)
      alert(`Subscription to ${planName} plan initiated!`)
    }, 2000)
  }

  const getSavings = (plan) => {
    if (billingCycle === 'yearly') {
      const monthlyCost = plan.price.monthly * 12
      const yearlyCost = plan.price.yearly
      const savings = monthlyCost - yearlyCost
      return savings > 0 ? Math.round((savings / monthlyCost) * 100) : 0
    }
    return 0
  }

  return (
    <div className="min-h-screen bg-slate-900 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">
            Choose Your Protection Level
          </h1>
          <p className="text-xl text-slate-400 max-w-3xl mx-auto mb-8">
            Affordable cybersecurity solutions designed specifically for small and medium businesses. 
            No hidden fees, no complex contracts.
          </p>

          {/* Billing Toggle */}
          <div className="flex items-center justify-center space-x-4 mb-8">
            <span className={`text-sm ${billingCycle === 'monthly' ? 'text-white' : 'text-slate-400'}`}>
              Monthly
            </span>
            <button
              onClick={() => setBillingCycle(billingCycle === 'monthly' ? 'yearly' : 'monthly')}
              className="relative inline-flex h-6 w-11 items-center rounded-full bg-slate-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  billingCycle === 'yearly' ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
            <span className={`text-sm ${billingCycle === 'yearly' ? 'text-white' : 'text-slate-400'}`}>
              Yearly
            </span>
            <span className="bg-green-600 text-white text-xs px-2 py-1 rounded-full">
              Save up to 17%
            </span>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative bg-slate-800 rounded-lg border-2 p-8 ${
                plan.popular 
                  ? 'border-blue-500 ring-2 ring-blue-500/20' 
                  : 'border-slate-700'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-medium">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="text-center mb-6">
                <plan.icon className="h-12 w-12 text-blue-500 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                <p className="text-slate-400 text-sm mb-4">{plan.description}</p>
                
                <div className="mb-4">
                  <span className="text-4xl font-bold text-white">
                    ${billingCycle === 'monthly' ? plan.price.monthly : plan.price.yearly}
                  </span>
                  <span className="text-slate-400 ml-2">
                    /{billingCycle === 'monthly' ? 'month' : 'year'}
                  </span>
                  {billingCycle === 'yearly' && getSavings(plan) > 0 && (
                    <div className="text-green-400 text-sm mt-1">
                      Save {getSavings(plan)}%
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-4 mb-8">
                <div>
                  <h4 className="text-white font-medium mb-3">What's included:</h4>
                  <ul className="space-y-2">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start space-x-2">
                        <Check className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-slate-300 text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {plan.limitations.length > 0 && (
                  <div>
                    <h4 className="text-slate-400 font-medium mb-3">Not included:</h4>
                    <ul className="space-y-2">
                      {plan.limitations.map((limitation, limitIndex) => (
                        <li key={limitIndex} className="flex items-start space-x-2">
                          <X className="h-4 w-4 text-slate-500 mt-0.5 flex-shrink-0" />
                          <span className="text-slate-500 text-sm">{limitation}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              <div className="text-center">
                {plan.name === 'Free' ? (
                  <Link
                    to="/register"
                    className={`w-full py-3 px-6 rounded-md font-medium text-center block ${
                      plan.popular
                        ? 'bg-blue-600 hover:bg-blue-700 text-white'
                        : 'bg-slate-700 hover:bg-slate-600 text-white'
                    }`}
                  >
                    {plan.cta}
                  </Link>
                ) : plan.name === 'Enterprise' ? (
                  <button
                    className="w-full bg-slate-700 hover:bg-slate-600 text-white py-3 px-6 rounded-md font-medium"
                  >
                    {plan.cta}
                  </button>
                ) : (
                  <button
                    onClick={() => handleSubscribe(plan.name)}
                    disabled={isSubscribing}
                    className={`w-full py-3 px-6 rounded-md font-medium disabled:opacity-50 ${
                      plan.popular
                        ? 'bg-blue-600 hover:bg-blue-700 text-white'
                        : 'bg-slate-700 hover:bg-slate-600 text-white'
                    }`}
                  >
                    {isSubscribing ? 'Processing...' : plan.cta}
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* FAQ Section */}
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-8">
            Frequently Asked Questions
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  What makes CyberGuard SMB different?
                </h3>
                <p className="text-slate-400">
                  We're built specifically for SMBs who need enterprise-level security without 
                  the complexity or cost. Our platform is designed to be used by business owners, 
                  not security experts.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  Can I change plans anytime?
                </h3>
                <p className="text-slate-400">
                  Yes! You can upgrade or downgrade your plan at any time. Changes take effect 
                  immediately, and we'll prorate any billing adjustments.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  Is there a free trial?
                </h3>
                <p className="text-slate-400">
                  Our Free plan gives you access to core features with no time limit. 
                  Professional and Enterprise plans include a 14-day free trial.
                </p>
              </div>
            </div>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  What kind of support do you provide?
                </h3>
                <p className="text-slate-400">
                  All plans include email support. Professional plans get priority support, 
                  and Enterprise customers get 24/7 phone support plus a dedicated account manager.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  How accurate is your threat detection?
                </h3>
                <p className="text-slate-400">
                  Our threat detection combines multiple data sources and AI algorithms to achieve 
                  95%+ accuracy. We continuously update our threat intelligence database.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  Do you offer custom integrations?
                </h3>
                <p className="text-slate-400">
                  Enterprise customers can access our full API and request custom integrations. 
                  We also offer webhook support for real-time threat notifications.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16 bg-gradient-to-r from-blue-600 to-blue-800 rounded-lg p-8">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Protect Your Business?
          </h2>
          <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
            Join thousands of SMBs who trust CyberGuard SMB to keep their digital assets secure. 
            Start with our free plan and upgrade as you grow.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/register"
              className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3 rounded-md font-medium"
            >
              Start Free Today
            </Link>
            <button className="border border-blue-300 text-white hover:bg-blue-700 px-8 py-3 rounded-md font-medium">
              Schedule Demo
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
