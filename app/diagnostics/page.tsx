'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { 
  ArrowLeftIcon,
  SparklesIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  XCircleIcon,
  PlayIcon,
  ArrowPathIcon
} from '@heroicons/react/24/outline'
import toast from 'react-hot-toast'

interface DiagnosticResult {
  category: string
  status: 'good' | 'warning' | 'critical'
  message: string
  details?: string
}

export default function DiagnosticsPage() {
  const [isScanning, setIsScanning] = useState(false)
  const [progress, setProgress] = useState(0)
  const [results, setResults] = useState<DiagnosticResult[]>([])
  const [scanComplete, setScanComplete] = useState(false)

  const runDiagnostics = () => {
    setIsScanning(true)
    setProgress(0)
    setScanComplete(false)
    setResults([])

    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval)
          setIsScanning(false)
          setScanComplete(true)
          generateResults()
          toast.success('Diagnostic scan complete!')
          return 100
        }
        return prev + 10
      })
    }, 300)
  }

  const generateResults = () => {
    const diagnosticData: DiagnosticResult[] = [
      {
        category: 'Engine',
        status: 'good',
        message: 'Engine running optimally',
        details: 'All cylinders firing correctly. No misfires detected.'
      },
      {
        category: 'Battery',
        status: 'warning',
        message: 'Battery health at 68%',
        details: 'Consider replacing battery within 6 months. Current voltage: 12.4V'
      },
      {
        category: 'Transmission',
        status: 'good',
        message: 'Transmission fluid levels normal',
        details: 'Smooth gear transitions. No slipping detected.'
      },
      {
        category: 'Brakes',
        status: 'warning',
        message: 'Front brake pads at 35%',
        details: 'Recommend replacement within 5,000 miles'
      },
      {
        category: 'Tires',
        status: 'critical',
        message: 'Tire pressure low',
        details: 'Front left: 28 PSI (recommended: 35 PSI). Check for leaks.'
      },
      {
        category: 'Cooling System',
        status: 'good',
        message: 'Operating temperature normal',
        details: 'Coolant level sufficient. No leaks detected.'
      },
      {
        category: 'Exhaust System',
        status: 'good',
        message: 'Emissions within normal range',
        details: 'Catalytic converter functioning properly'
      },
      {
        category: 'Electrical System',
        status: 'good',
        message: 'All systems operational',
        details: 'No error codes detected. Alternator charging correctly.'
      }
    ]
    setResults(diagnosticData)
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'good':
        return <CheckCircleIcon className="h-6 w-6 text-green-500" />
      case 'warning':
        return <ExclamationTriangleIcon className="h-6 w-6 text-yellow-500" />
      case 'critical':
        return <XCircleIcon className="h-6 w-6 text-red-500" />
      default:
        return null
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'good':
        return 'border-green-200 dark:border-green-900 bg-green-50 dark:bg-green-950'
      case 'warning':
        return 'border-yellow-200 dark:border-yellow-900 bg-yellow-50 dark:bg-yellow-950'
      case 'critical':
        return 'border-red-200 dark:border-red-900 bg-red-50 dark:bg-red-950'
      default:
        return ''
    }
  }

  const statusCounts = results.reduce((acc, result) => {
    acc[result.status] = (acc[result.status] || 0) + 1
    return acc
  }, {} as Record<string, number>)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 dark:from-slate-900 dark:via-blue-900 dark:to-slate-900">
      {/* Header */}
      <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-700 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Link href="/" className="text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white">
                <ArrowLeftIcon className="h-6 w-6" />
              </Link>
              <div className="flex items-center space-x-2">
                <SparklesIcon className="h-8 w-8 text-primary-600" />
                <span className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent">
                  Vehicle Diagnostics
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Control Panel */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-8 mb-8"
        >
          <div className="text-center">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
              Comprehensive Vehicle Scan
            </h2>
            <p className="text-slate-600 dark:text-slate-400 mb-8">
              Run a complete diagnostic check on your vehicle's systems
            </p>

            {!isScanning && !scanComplete && (
              <button
                onClick={runDiagnostics}
                className="bg-gradient-to-r from-primary-600 to-accent-600 hover:from-primary-700 hover:to-accent-700 text-white px-10 py-4 rounded-xl font-semibold text-lg transition transform hover:scale-105 inline-flex items-center space-x-3 shadow-lg"
              >
                <PlayIcon className="h-6 w-6" />
                <span>Start Diagnostics</span>
              </button>
            )}

            {isScanning && (
              <div className="space-y-4">
                <div className="flex items-center justify-center space-x-3">
                  <ArrowPathIcon className="h-6 w-6 text-primary-600 animate-spin" />
                  <span className="text-lg font-medium text-slate-700 dark:text-slate-300">
                    Scanning... {progress}%
                  </span>
                </div>
                <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-3 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    className="h-full bg-gradient-to-r from-primary-600 to-accent-600"
                    transition={{ duration: 0.3 }}
                  />
                </div>
              </div>
            )}

            {scanComplete && (
              <button
                onClick={runDiagnostics}
                className="bg-slate-600 hover:bg-slate-700 text-white px-8 py-3 rounded-xl font-semibold transition inline-flex items-center space-x-2"
              >
                <ArrowPathIcon className="h-5 w-5" />
                <span>Run Again</span>
              </button>
            )}
          </div>
        </motion.div>

        {/* Results Summary */}
        {scanComplete && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="grid md:grid-cols-3 gap-6 mb-8"
          >
            <div className="bg-green-50 dark:bg-green-950 border-2 border-green-200 dark:border-green-900 rounded-xl p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-600 dark:text-green-400 font-semibold mb-1">Good</p>
                  <p className="text-3xl font-bold text-green-700 dark:text-green-300">
                    {statusCounts.good || 0}
                  </p>
                </div>
                <CheckCircleIcon className="h-12 w-12 text-green-500" />
              </div>
            </div>
            <div className="bg-yellow-50 dark:bg-yellow-950 border-2 border-yellow-200 dark:border-yellow-900 rounded-xl p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-yellow-600 dark:text-yellow-400 font-semibold mb-1">Warning</p>
                  <p className="text-3xl font-bold text-yellow-700 dark:text-yellow-300">
                    {statusCounts.warning || 0}
                  </p>
                </div>
                <ExclamationTriangleIcon className="h-12 w-12 text-yellow-500" />
              </div>
            </div>
            <div className="bg-red-50 dark:bg-red-950 border-2 border-red-200 dark:border-red-900 rounded-xl p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-red-600 dark:text-red-400 font-semibold mb-1">Critical</p>
                  <p className="text-3xl font-bold text-red-700 dark:text-red-300">
                    {statusCounts.critical || 0}
                  </p>
                </div>
                <XCircleIcon className="h-12 w-12 text-red-500" />
              </div>
            </div>
          </motion.div>
        )}

        {/* Detailed Results */}
        {scanComplete && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="space-y-4"
          >
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
              Detailed Results
            </h3>
            {results.map((result, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * index }}
                className={`border-2 rounded-xl p-6 ${getStatusColor(result.status)}`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4 flex-1">
                    <div className="mt-1">
                      {getStatusIcon(result.status)}
                    </div>
                    <div className="flex-1">
                      <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                        {result.category}
                      </h4>
                      <p className="text-slate-700 dark:text-slate-300 font-medium mb-2">
                        {result.message}
                      </p>
                      {result.details && (
                        <p className="text-sm text-slate-600 dark:text-slate-400">
                          {result.details}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  )
}
