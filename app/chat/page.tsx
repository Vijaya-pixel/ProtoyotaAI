'use client'

import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  PaperAirplaneIcon, 
  SparklesIcon,
  UserCircleIcon,
  ArrowLeftIcon
} from '@heroicons/react/24/outline'
import Link from 'next/link'
import toast from 'react-hot-toast'

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: 'Hello! I\'m your ProtoyotaAI assistant. I can help you with vehicle diagnostics, maintenance schedules, troubleshooting, and general automotive questions. How can I assist you today?',
      timestamp: new Date()
    }
  ])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSend = async () => {
    if (!input.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsLoading(true)

    // Simulate AI response
    setTimeout(() => {
      const responses = [
        "Based on your vehicle's symptoms, I recommend checking the battery connections and alternator. These are common causes of starting issues.",
        "I've analyzed your maintenance schedule. Your next oil change is due in approximately 500 miles. Would you like me to schedule a reminder?",
        "The diagnostic codes you mentioned typically indicate an oxygen sensor issue. This is usually a straightforward fix, but I recommend having it checked soon to prevent further damage.",
        "Your fuel efficiency has been excellent! Your current average of 32 MPG is above the EPA estimate for your vehicle model.",
        "I can help you with that. For routine maintenance, I recommend following the manufacturer's guidelines. Let me pull up the specific recommendations for your vehicle.",
        "That's a great question! Let me provide you with detailed information about that component and how it affects your vehicle's performance."
      ]

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: responses[Math.floor(Math.random() * responses.length)],
        timestamp: new Date()
      }

      setMessages(prev => [...prev, assistantMessage])
      setIsLoading(false)
    }, 1000 + Math.random() * 1000)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const suggestedQuestions = [
    "What's causing my check engine light?",
    "When should I change my oil?",
    "How to improve fuel economy?",
    "Tire pressure recommendations"
  ]

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
                  AI Assistant
                </span>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <div className="h-3 w-3 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm text-slate-600 dark:text-slate-400">Online</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 h-[calc(100vh-64px)] flex flex-col">
        {/* Messages Container */}
        <div className="flex-1 overflow-y-auto mb-4 space-y-4">
          {messages.map((message, index) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`flex items-start space-x-3 max-w-[80%] ${
                message.role === 'user' ? 'flex-row-reverse space-x-reverse' : ''
              }`}>
                <div className={`flex-shrink-0 ${
                  message.role === 'user' 
                    ? 'bg-primary-600' 
                    : 'bg-gradient-to-br from-accent-500 to-accent-600'
                } rounded-full p-2`}>
                  {message.role === 'user' ? (
                    <UserCircleIcon className="h-6 w-6 text-white" />
                  ) : (
                    <SparklesIcon className="h-6 w-6 text-white" />
                  )}
                </div>
                <div className={`rounded-2xl px-4 py-3 ${
                  message.role === 'user'
                    ? 'bg-primary-600 text-white'
                    : 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-md'
                }`}>
                  <p className="text-sm md:text-base whitespace-pre-wrap">{message.content}</p>
                  <p className={`text-xs mt-2 ${
                    message.role === 'user' ? 'text-primary-100' : 'text-slate-400'
                  }`}>
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
          
          {isLoading && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex justify-start"
            >
              <div className="flex items-start space-x-3">
                <div className="bg-gradient-to-br from-accent-500 to-accent-600 rounded-full p-2">
                  <SparklesIcon className="h-6 w-6 text-white" />
                </div>
                <div className="bg-white dark:bg-slate-800 rounded-2xl px-4 py-3 shadow-md">
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Suggested Questions */}
        {messages.length === 1 && (
          <div className="mb-4">
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">Suggested questions:</p>
            <div className="flex flex-wrap gap-2">
              {suggestedQuestions.map((question, index) => (
                <button
                  key={index}
                  onClick={() => setInput(question)}
                  className="px-4 py-2 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-lg text-sm hover:bg-slate-50 dark:hover:bg-slate-700 transition border border-slate-200 dark:border-slate-700"
                >
                  {question}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Input Area */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 p-4">
          <div className="flex items-end space-x-4">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask me anything about your vehicle..."
              className="flex-1 bg-transparent border-none outline-none resize-none text-slate-900 dark:text-white placeholder-slate-400 text-sm md:text-base"
              rows={1}
              style={{ minHeight: '24px', maxHeight: '120px' }}
            />
            <button
              onClick={handleSend}
              disabled={!input.trim() || isLoading}
              className="bg-primary-600 hover:bg-primary-700 disabled:bg-slate-300 disabled:cursor-not-allowed text-white p-3 rounded-xl transition transform hover:scale-105 disabled:transform-none"
            >
              <PaperAirplaneIcon className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
