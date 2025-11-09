'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { 
  SparklesIcon, 
  ChartBarIcon, 
  WrenchScrewdriverIcon, 
  ChatBubbleLeftRightIcon,
  ArrowRightIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline'

export default function Home() {
  const [hoveredFeature, setHoveredFeature] = useState<number | null>(null)

  const features = [
    {
      icon: ChatBubbleLeftRightIcon,
      title: 'AI Chat Assistant',
      description: 'Get instant answers about your vehicle with our intelligent AI assistant',
      link: '/chat'
    },
    {
      icon: WrenchScrewdriverIcon,
      title: 'Vehicle Diagnostics',
      description: 'Comprehensive diagnostic tools to understand your vehicle\'s health',
      link: '/diagnostics'
    },
    {
      icon: ChartBarIcon,
      title: 'Analytics Dashboard',
      description: 'Track maintenance history, fuel economy, and performance metrics',
      link: '/dashboard'
    },
    {
      icon: SparklesIcon,
      title: 'Smart Maintenance',
      description: 'AI-powered maintenance scheduling and reminders',
      link: '/maintenance'
    }
  ]

  const benefits = [
    'Real-time vehicle diagnostics',
    '24/7 AI-powered support',
    'Predictive maintenance alerts',
    'Comprehensive analytics',
    'Multi-vehicle management',
    'Expert recommendations'
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 dark:from-slate-900 dark:via-blue-900 dark:to-slate-900">
      {/* Navigation */}
      <nav className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-700 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <SparklesIcon className="h-8 w-8 text-primary-600" />
              <span className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent">
                ProtoyotaAI
              </span>
            </div>
            <div className="hidden md:flex space-x-8">
              <Link href="/chat" className="text-slate-700 dark:text-slate-300 hover:text-primary-600 transition">
                Chat
              </Link>
              <Link href="/diagnostics" className="text-slate-700 dark:text-slate-300 hover:text-primary-600 transition">
                Diagnostics
              </Link>
              <Link href="/dashboard" className="text-slate-700 dark:text-slate-300 hover:text-primary-600 transition">
                Dashboard
              </Link>
              <Link href="/maintenance" className="text-slate-700 dark:text-slate-300 hover:text-primary-600 transition">
                Maintenance
              </Link>
            </div>
            <Link 
              href="/chat"
              className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-2 rounded-lg font-medium transition transform hover:scale-105"
            >
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 dark:text-white mb-6">
            Your Intelligent
            <span className="bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent">
              {' '}Automotive Companion
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-300 mb-10 max-w-3xl mx-auto">
            Harness the power of AI to diagnose, maintain, and optimize your vehicle with unprecedented precision and ease.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/chat"
              className="bg-primary-600 hover:bg-primary-700 text-white px-8 py-4 rounded-xl font-semibold text-lg transition transform hover:scale-105 flex items-center justify-center space-x-2 shadow-lg"
            >
              <span>Start Chatting</span>
              <ArrowRightIcon className="h-5 w-5" />
            </Link>
            <Link
              href="/diagnostics"
              className="bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-900 dark:text-white px-8 py-4 rounded-xl font-semibold text-lg transition transform hover:scale-105 border-2 border-slate-200 dark:border-slate-700"
            >
              Run Diagnostics
            </Link>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8"
        >
          {[
            { label: 'Active Users', value: '10K+' },
            { label: 'Vehicles Monitored', value: '25K+' },
            { label: 'Diagnostics Run', value: '100K+' },
            { label: 'AI Interactions', value: '500K+' }
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary-600 mb-2">{stat.value}</div>
              <div className="text-slate-600 dark:text-slate-400">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
            Powerful Features
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-300">
            Everything you need to keep your vehicle in perfect condition
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              onMouseEnter={() => setHoveredFeature(index)}
              onMouseLeave={() => setHoveredFeature(null)}
            >
              <Link href={feature.link}>
                <div className={`
                  bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-lg border-2 transition-all duration-300 h-full cursor-pointer
                  ${hoveredFeature === index 
                    ? 'border-primary-500 shadow-2xl transform scale-105' 
                    : 'border-slate-200 dark:border-slate-700'
                  }
                `}>
                  <feature.icon className={`h-12 w-12 mb-4 transition-colors duration-300 ${
                    hoveredFeature === index ? 'text-primary-600' : 'text-slate-400'
                  }`} />
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-300">
                    {feature.description}
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Benefits Section */}
      <section className="bg-gradient-to-r from-primary-600 to-accent-600 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Why Choose ProtoyotaAI?
            </h2>
            <p className="text-xl text-white/90">
              Built with cutting-edge technology for modern vehicle owners
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white/10 backdrop-blur-md p-6 rounded-xl flex items-center space-x-4"
              >
                <CheckCircleIcon className="h-8 w-8 text-white flex-shrink-0" />
                <span className="text-lg text-white font-medium">{benefit}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="bg-gradient-to-r from-slate-800 to-slate-900 dark:from-slate-700 dark:to-slate-800 rounded-3xl p-12 text-center shadow-2xl"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Transform Your Vehicle Experience?
          </h2>
          <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied users who trust ProtoyotaAI for their automotive needs.
          </p>
          <Link
            href="/chat"
            className="inline-flex items-center bg-white hover:bg-slate-100 text-slate-900 px-10 py-5 rounded-xl font-bold text-lg transition transform hover:scale-105 shadow-lg space-x-2"
          >
            <span>Get Started Free</span>
            <ArrowRightIcon className="h-6 w-6" />
          </Link>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 dark:bg-black text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <SparklesIcon className="h-6 w-6 text-primary-500" />
                <span className="text-xl font-bold">ProtoyotaAI</span>
              </div>
              <p className="text-slate-400">
                Your intelligent automotive companion powered by AI.
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Features</h4>
              <ul className="space-y-2 text-slate-400">
                <li><Link href="/chat" className="hover:text-white transition">AI Chat</Link></li>
                <li><Link href="/diagnostics" className="hover:text-white transition">Diagnostics</Link></li>
                <li><Link href="/dashboard" className="hover:text-white transition">Dashboard</Link></li>
                <li><Link href="/maintenance" className="hover:text-white transition">Maintenance</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Company</h4>
              <ul className="space-y-2 text-slate-400">
                <li><a href="#" className="hover:text-white transition">About</a></li>
                <li><a href="#" className="hover:text-white transition">Careers</a></li>
                <li><a href="#" className="hover:text-white transition">Blog</a></li>
                <li><a href="#" className="hover:text-white transition">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Legal</h4>
              <ul className="space-y-2 text-slate-400">
                <li><a href="#" className="hover:text-white transition">Privacy</a></li>
                <li><a href="#" className="hover:text-white transition">Terms</a></li>
                <li><a href="#" className="hover:text-white transition">Security</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-800 pt-8 text-center text-slate-400">
            <p>&copy; 2024 ProtoyotaAI. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
