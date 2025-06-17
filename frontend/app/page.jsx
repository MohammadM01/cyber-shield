import SearchBar from "@/components/SearchBar"
import ScoreCard from "@/components/ScoreCard"
import PricingCard from "@/components/PricingCard"
import { Shield, Lock, Eye, Zap } from "lucide-react"

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      {/* Header */}
      <header className="border-b border-slate-700/50 bg-slate-900/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-blue-600 p-2 rounded-lg">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">CyberShield Lite</h1>
                <p className="text-sm text-slate-400">Advanced Security Assessment</p>
              </div>
            </div>
            <nav className="hidden md:flex space-x-6">
              <a href="#features" className="text-slate-300 hover:text-white transition-colors">
                Features
              </a>
              <a href="#pricing" className="text-slate-300 hover:text-white transition-colors">
                Pricing
              </a>
              <a href="#contact" className="text-slate-300 hover:text-white transition-colors">
                Contact
              </a>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Protect Your Digital
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
                {" "}
                Identity
              </span>
            </h2>
            <p className="text-xl text-slate-300 mb-12 leading-relaxed">
              Advanced email and URL security assessment powered by AI. Get instant security scores and comprehensive
              threat analysis to protect yourself from cyber attacks.
            </p>

            {/* Search Section */}
            <div className="mb-16">
              <SearchBar />
            </div>

            {/* Features Grid */}
            <div className="grid md:grid-cols-3 gap-8 mb-16">
              <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
                <div className="bg-blue-600/20 w-12 h-12 rounded-lg flex items-center justify-center mb-4 mx-auto">
                  <Eye className="h-6 w-6 text-blue-400" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">Real-time Analysis</h3>
                <p className="text-slate-400">Instant security assessment with advanced threat detection algorithms</p>
              </div>
              <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
                <div className="bg-green-600/20 w-12 h-12 rounded-lg flex items-center justify-center mb-4 mx-auto">
                  <Lock className="h-6 w-6 text-green-400" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">Secure Processing</h3>
                <p className="text-slate-400">Your data is processed securely with enterprise-grade encryption</p>
              </div>
              <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
                <div className="bg-purple-600/20 w-12 h-12 rounded-lg flex items-center justify-center mb-4 mx-auto">
                  <Zap className="h-6 w-6 text-purple-400" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">Lightning Fast</h3>
                <p className="text-slate-400">Get comprehensive security reports in seconds, not minutes</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Demo Score Cards */}
      <section className="py-16 px-4 bg-slate-800/30">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-white mb-4">Security Assessment Preview</h3>
            <p className="text-slate-400">See how our security scoring works</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            <ScoreCard
              type="email"
              target="example@suspicious-domain.com"
              score={25}
              status="High Risk"
              threats={["Phishing attempt detected", "Suspicious domain", "No SPF record"]}
            />
            <ScoreCard
              type="url"
              target="https://secure-banking.com"
              score={95}
              status="Secure"
              threats={["Valid SSL certificate", "Clean reputation", "No malware detected"]}
            />
            <ScoreCard
              type="email"
              target="newsletter@company.com"
              score={78}
              status="Moderate"
              threats={["Valid domain", "Some tracking detected", "DMARC configured"]}
            />
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-bold text-white mb-4">Choose Your Protection Level</h3>
            <p className="text-xl text-slate-400">Start free, upgrade when you need more comprehensive protection</p>
          </div>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <PricingCard
              tier="Free"
              price="$0"
              period="/month"
              features={[
                "Basic email security check",
                "URL safety verification",
                "Simple threat detection",
                "10 scans per day",
                "Basic security score",
              ]}
              buttonText="Get Started Free"
              popular={false}
            />
            <PricingCard
              tier="Premium"
              price="$9.99"
              period="/month"
              features={[
                "Advanced threat analysis",
                "Detailed security reports",
                "Real-time monitoring",
                "Unlimited scans",
                "Priority support",
                "API access",
                "Custom alerts",
              ]}
              buttonText="Upgrade to Premium"
              popular={true}
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-700/50 bg-slate-900/50 backdrop-blur-sm py-12 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="bg-blue-600 p-2 rounded-lg">
                  <Shield className="h-6 w-6 text-white" />
                </div>
                <span className="text-xl font-bold text-white">CyberShield Lite</span>
              </div>
              <p className="text-slate-400">
                Protecting your digital identity with advanced security assessment tools.
              </p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-slate-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Pricing
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    API
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-slate-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Documentation
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-slate-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Security
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-700 mt-8 pt-8 text-center text-slate-400">
            <p>&copy; 2024 CyberShield Lite. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
