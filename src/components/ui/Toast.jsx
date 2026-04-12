import { CheckCircle, AlertCircle, Info, X } from 'lucide-react'
import clsx from 'clsx'

const ICONS = {
  success: <CheckCircle size={16} className="text-teal-500 shrink-0" />,
  error: <AlertCircle size={16} className="text-red-500 shrink-0" />,
  info: <Info size={16} className="text-blue-500 shrink-0" />,
}

function Toast({ id, message, type = 'success', onRemove }) {
  return (
    <div
      role="status"
      aria-live="polite"
      className={clsx(
        'flex items-center gap-3 px-4 py-3 rounded-xl shadow-lg border bg-white text-sm text-warm-800',
        'animate-slide-up',
        type === 'error' ? 'border-red-100' : 'border-warm-100'
      )}
    >
      {ICONS[type]}
      <span className="flex-1">{message}</span>
      <button
        onClick={() => onRemove(id)}
        aria-label="Dismiss notification"
        className="p-0.5 rounded hover:bg-warm-100 text-warm-400 transition-colors"
      >
        <X size={14} />
      </button>
    </div>
  )
}

export default function ToastContainer({ toasts, onRemove }) {
  if (!toasts.length) return null
  return (
    <div
      className="fixed bottom-24 right-4 z-50 flex flex-col gap-2 w-80 sm:bottom-6"
      aria-label="Notifications"
    >
      {toasts.map(t => (
        <Toast key={t.id} {...t} onRemove={onRemove} />
      ))}
    </div>
  )
}
