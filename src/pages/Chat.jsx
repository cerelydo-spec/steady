import { useState, useRef, useEffect } from 'react'
import { Send, Leaf, RefreshCw } from 'lucide-react'
import Card from '../components/ui/Card'
import Badge from '../components/ui/Badge'
import { sendChatMessage, hasApiKey } from '../utils/anthropic'
import { get, set, KEYS } from '../utils/storage'
import clsx from 'clsx'

const MAX_HISTORY = 50

const SUGGESTED_PROMPTS = [
  "My appetite has increased since stopping my medication. What can I do?",
  "How do I know if I'm in a true weight plateau or just normal fluctuation?",
  "I'm struggling with portion sizes without the medication suppressing my appetite. Help.",
  "What are the best protein sources for someone in the maintenance phase?",
  "I've regained some weight. How do I get back on track without being harsh on myself?",
  "How does sleep affect weight maintenance?",
]

function ChatBubble({ message }) {
  const isUser = message.role === 'user'
  return (
    <div
      className={clsx('flex gap-3 animate-slide-up', isUser ? 'flex-row-reverse' : 'flex-row')}
      aria-label={isUser ? 'Your message' : "Sage's response"}
    >
      {!isUser && (
        <div className="w-8 h-8 bg-teal-100 rounded-xl flex items-center justify-center shrink-0 mt-1" aria-hidden="true">
          <Leaf size={14} className="text-teal-600" />
        </div>
      )}
      <div
        className={clsx(
          'max-w-[80%] px-4 py-3 rounded-2xl text-sm leading-relaxed',
          isUser
            ? 'bg-teal-500 text-white rounded-tr-sm'
            : 'bg-white border border-warm-100 text-warm-800 rounded-tl-sm shadow-sm'
        )}
      >
        {message.content.split('\n').map((line, i) => (
          <p key={i} className={i > 0 ? 'mt-2' : ''}>{line}</p>
        ))}
      </div>
    </div>
  )
}

function TypingIndicator() {
  return (
    <div className="flex gap-3" aria-label="Sage is typing">
      <div className="w-8 h-8 bg-teal-100 rounded-xl flex items-center justify-center shrink-0" aria-hidden="true">
        <Leaf size={14} className="text-teal-600" />
      </div>
      <div className="bg-white border border-warm-100 px-4 py-3 rounded-2xl rounded-tl-sm shadow-sm">
        <div className="flex gap-1.5 items-center h-4" aria-hidden="true">
          {[0, 1, 2].map(i => (
            <div
              key={i}
              className="w-1.5 h-1.5 bg-warm-300 rounded-full animate-pulse-soft"
              style={{ animationDelay: `${i * 0.2}s` }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default function Chat({ profile }) {
  const [history, setHistory] = useState(() => {
    const saved = get(KEYS.CHAT_HISTORY) || []
    // Strip messages that were saved during the broken API-error state.
    // Those bubbles have no place in the history now that we have a proper
    // offline fallback — they would appear as normal messages on reload.
    const clean = saved.filter(m => m.role === 'user' || (m.content && m.content.length > 80))
    return clean.slice(-MAX_HISTORY)
  })
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  // isOffline starts from whether a user key is configured, then updates
  // reactively after each response to reflect what actually happened.
  // This means a failing key flips the badge to [Offline] after the first send.
  const [isOffline, setIsOffline] = useState(!hasApiKey())
  const messagesEndRef = useRef(null)
  const inputRef = useRef(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [history, loading])

  const saveHistory = (newHistory) => {
    const trimmed = newHistory.slice(-MAX_HISTORY)
    set(KEYS.CHAT_HISTORY, trimmed)
    return trimmed
  }

  const sendMessage = async (text) => {
    const msg = text.trim()
    if (!msg || loading) return

    const userMessage = { role: 'user', content: msg, id: Date.now() }
    const newHistory = [...history, userMessage]
    const saved = saveHistory(newHistory)
    setHistory(saved)
    setInput('')
    setLoading(true)

    try {
      const contextMessages = history.map(m => ({ role: m.role, content: m.content }))
      const result = await sendChatMessage(contextMessages, msg, history.length)

      console.log('[Chat] result received — isOffline:', result.isOffline, '| content length:', result.content?.length ?? 'undefined')

      // Update badge to reflect what actually happened — a failed API key
      // causes isOffline to flip to true here, even if it started as false.
      setIsOffline(result.isOffline === true)

      const assistantMessage = {
        role: 'assistant',
        content: result.content ?? 'No response — please try again.',
        id: Date.now() + 1,
      }
      const finalHistory = saveHistory([...saved, assistantMessage])
      setHistory(finalHistory)
    } catch (err) {
      console.error('[Chat] sendMessage threw unexpectedly:', err)
      const errMessage = {
        role: 'assistant',
        content: 'Something went wrong loading a response. Please try again.',
        id: Date.now() + 1,
      }
      saveHistory([...saved, errMessage])
      setHistory(prev => [...prev, errMessage])
    } finally {
      setLoading(false)
      inputRef.current?.focus()
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    sendMessage(input)
  }

  const clearHistory = () => {
    set(KEYS.CHAT_HISTORY, [])
    setHistory([])
  }

  return (
    <div className="flex flex-col flex-1 min-h-0 animate-fade-in">
      {/* Header */}
      <div className="flex items-center gap-3 mb-4 shrink-0">
        <div className="w-10 h-10 bg-teal-100 rounded-xl flex items-center justify-center">
          <Leaf size={18} className="text-teal-600" aria-hidden="true" />
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h1 className="page-title text-xl">Sage</h1>
            {isOffline
              ? <Badge variant="warm">Offline</Badge>
              : <Badge variant="teal">AI</Badge>
            }
          </div>
          <p className="text-xs text-warm-500">Evidence-based wellness coach · Post-GLP-1 specialist</p>
        </div>
        {history.length > 0 && (
          <button
            onClick={clearHistory}
            aria-label="Clear chat history"
            className="p-2 text-warm-400 hover:text-warm-600 hover:bg-warm-100 rounded-xl transition-colors"
          >
            <RefreshCw size={15} />
          </button>
        )}
      </div>

      {/* Messages */}
      <div
        className="flex-1 overflow-y-auto space-y-4 pr-1 min-h-0"
        role="log"
        aria-label="Conversation with Sage"
        aria-live="polite"
      >
        {history.length === 0 && (
          <div className="space-y-4">
            <Card className="bg-gradient-to-br from-teal-50 to-warm-50 border-teal-100">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-teal-100 rounded-xl flex items-center justify-center shrink-0" aria-hidden="true">
                  <Leaf size={14} className="text-teal-600" />
                </div>
                <div className="text-sm text-warm-700 leading-relaxed">
                  <p className="font-medium text-warm-900 mb-1">Hello{profile?.name ? `, ${profile.name.split(' ')[0]}` : ''}. I'm Sage.</p>
                  <p>I'm here to support you through the maintenance phase — whether you have questions about nutrition, appetite changes, building habits, or navigating the psychological side of this journey.</p>
                  <p className="mt-2 text-warm-500 text-xs">I'm a wellness coaching assistant, not a medical professional. For clinical decisions, please consult your healthcare provider.</p>
                  {isOffline && (
                    <p className="mt-2 text-xs text-warm-400">Running in offline mode — responses are curated evidence-based guidance. Add an API key in Settings for live AI responses.</p>
                  )}
                </div>
              </div>
            </Card>

            <div>
              <p className="text-xs font-medium text-warm-400 mb-2 px-1">Suggested questions</p>
              <div className="space-y-1.5">
                {SUGGESTED_PROMPTS.map((p, i) => (
                  <button
                    key={i}
                    onClick={() => sendMessage(p)}
                    className="w-full text-left text-sm text-warm-700 bg-white border border-warm-100 hover:border-teal-200 hover:bg-teal-50 px-4 py-2.5 rounded-xl transition-all"
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {history.map(m => <ChatBubble key={m.id} message={m} />)}
        {loading && <TypingIndicator />}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <form
        onSubmit={handleSubmit}
        className="flex gap-2 mt-4 shrink-0"
        aria-label="Message Sage"
      >
        <label htmlFor="chat-input" className="sr-only">Message Sage</label>
        <input
          id="chat-input"
          ref={inputRef}
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Ask Sage anything about your maintenance journey..."
          disabled={loading}
          className="input-field flex-1 disabled:opacity-50"
          aria-label="Type your message to Sage"
        />
        <button
          type="submit"
          disabled={!input.trim() || loading}
          aria-label="Send message"
          className="p-2.5 bg-teal-500 hover:bg-teal-600 text-white rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed shrink-0"
        >
          <Send size={18} aria-hidden="true" />
        </button>
      </form>

      <p className="text-[10px] text-warm-400 text-center mt-2 shrink-0">
        Sage provides wellness guidance, not medical advice. Always consult your healthcare provider for clinical decisions.
      </p>
    </div>
  )
}
