'use client'

import { useState, useRef, useEffect } from 'react'
import ChatMessage from './components/ChatMessage'
import LoadingDots from './components/LoadingDots'
import { REGIONS, DEFAULT_REGION } from '@/lib/region'

const SUGGESTED_QUESTIONS = [
  'How to treat a burn?',
  'Someone is choking',
  'How to stop bleeding?',
  'Signs of a heart attack',
  'How to do CPR?',
  'Someone fainted',
]

export default function Home() {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: 'Hello! I\'m your First Aid Assistant. I can help you with first aid guidance based on verified sources from the Red Cross, Mayo Clinic, NHS, and CDC.\n\nHow can I help you today?',
      sources: [],
      isEmergency: false
    }
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const bottomRef = useRef(null)

  const [regionCode, setRegionCode] = useState(DEFAULT_REGION)
  const region = REGIONS[regionCode] ?? REGIONS[DEFAULT_REGION]

  // Remember the choice between visits
  useEffect(() => {
    try {
      const saved = localStorage.getItem('firstaid-region')
      if (saved && REGIONS[saved]) setRegionCode(saved)
    } catch {}
  }, [])

  function changeRegion(code) {
    setRegionCode(code)
    try { localStorage.setItem('firstaid-region', code) } catch {}
  }

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, loading])

  async function sendMessage(text) {
    const userMessage = text || input.trim()
    if (!userMessage || loading) return

    setInput('')
    setMessages(prev => [...prev, { role: 'user', content: userMessage }])
    setLoading(true)

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMessage, region: regionCode })
      })

      const data = await response.json()

      if (data.error) {
        setMessages(prev => [...prev, {
          role: 'assistant',
          content: 'Sorry, something went wrong. Please try again.',
          sources: [],
          isEmergency: false
        }])
      } else {
        setMessages(prev => [...prev, {
          role: 'assistant',
          content: data.answer,
          sources: data.sources,
          isEmergency: data.isEmergency,
          emergencyNumber: data.emergencyNumber,
          isCrisisResponse: data.isCrisisResponse || false,
          lowConfidence: data.lowConfidence || false
        }])
      }
    } catch (error) {
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: 'Network error. Please check your connection and try again.',
        sources: [],
        isEmergency: false
      }])
    } finally {
      setLoading(false)
    }
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  return (
    <div className="flex flex-col h-screen max-w-2xl mx-auto">

      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-3 flex items-center gap-3 shadow-sm">
        <div className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center">
          <span className="text-white text-lg">+</span>
        </div>
        <div>
          <h1 className="font-bold text-gray-900 text-sm">FirstAid RAG Assistant</h1>
          <p className="text-xs text-green-500 font-medium">● Powered by Red Cross · Mayo Clinic · NHS · CDC</p>
        </div>

        <div className="ml-auto flex items-center gap-2">
          <label htmlFor="region" className="sr-only">Country for emergency numbers</label>

          <div className="relative">
            <select
              id="region"
              value={regionCode}
              onChange={e => changeRegion(e.target.value)}
              className="appearance-none text-xs border border-gray-300 rounded-full pl-3 pr-8 py-1.5 bg-white text-gray-700 cursor-pointer focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400"
            >
              {Object.values(REGIONS).map(r => (
                <option key={r.code} value={r.code}>{r.label}</option>
              ))}
            </select>

            {/* our own arrow, sitting inside the box */}
            <svg
              className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
              width="10" height="10" viewBox="0 0 10 10"
              fill="none" stroke="currentColor" strokeWidth="1.5"
              strokeLinecap="round" strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M2 3.5L5 6.5L8 3.5" />
            </svg>
          </div>

          <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full font-medium">RAG</span>
        </div>
      </div>

      {/* Messages area */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-1">
        {messages.map((message, i) => (
          <ChatMessage key={i} message={message} />
        ))}
        {loading && (
          <div className="flex justify-start mb-4">
            <div className="bg-white border border-gray-200 rounded-2xl rounded-tl-sm shadow-sm">
              <LoadingDots />
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Suggested questions */}
      {messages.length === 1 && (
        <div className="px-4 pb-3">
          <p className="text-xs text-gray-400 mb-2 font-medium">SUGGESTED QUESTIONS</p>
          <div className="flex flex-wrap gap-2">
            {SUGGESTED_QUESTIONS.map((q, i) => (
              <button
                key={i}
                onClick={() => sendMessage(q)}
                className="text-xs bg-white border border-gray-200 text-gray-600 px-3 py-1.5 rounded-full hover:bg-blue-50 hover:border-blue-300 hover:text-blue-600 transition-colors"
              >
                {q}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input area */}
      <div className="bg-white border-t border-gray-200 px-4 py-3">
        <div className="flex items-end gap-2">
          <textarea
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask a first aid question..."
            rows={1}
            className="flex-1 resize-none border border-gray-300 rounded-2xl px-4 py-2.5 text-sm focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400 max-h-32"
          />
          <button
            onClick={() => sendMessage()}
            disabled={!input.trim() || loading}
            className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors flex-shrink-0"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M22 2L11 13M22 2L15 22L11 13L2 9L22 2Z" />
            </svg>
          </button>
        </div>
        <p className="text-xs text-gray-400 mt-2 text-center">
          For medical emergencies, always call {region.emergency} · This is first aid guidance only
        </p>
      </div>

    </div>
  )
}