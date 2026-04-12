import { useState } from 'react'
import { ShieldAlert, X } from 'lucide-react'
import Modal from '../ui/Modal'

export function DisclaimerBanner() {
  const [show, setShow] = useState(true)
  if (!show) return null

  return (
    <div
      role="complementary"
      aria-label="Medical disclaimer"
      className="bg-amber-50 border-b border-amber-100 px-4 py-2 flex items-start gap-2 text-xs text-amber-800"
    >
      <ShieldAlert size={14} className="shrink-0 mt-0.5" aria-hidden="true" />
      <span>
        <strong>Wellness tool only.</strong> Steady does not provide medical advice. Always consult your healthcare provider before changing your nutrition, exercise, or medication regimen.
      </span>
      <button
        onClick={() => setShow(false)}
        aria-label="Dismiss disclaimer banner"
        className="ml-auto shrink-0 p-0.5 hover:bg-amber-100 rounded transition-colors"
      >
        <X size={12} />
      </button>
    </div>
  )
}

export function DisclaimerModal({ isOpen, onClose }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Medical Disclaimer" size="md">
      <div className="space-y-4 text-sm text-warm-700 leading-relaxed">
        <p>
          <strong className="text-warm-900">Steady is a wellness coaching tool.</strong> It is not a medical device, and it does not provide medical advice, diagnosis, or treatment.
        </p>
        <p>
          The information, guidance, and AI coaching provided by this application are intended solely for general wellness education and habit support during the post-GLP-1 maintenance phase.
        </p>
        <p>
          <strong className="text-warm-900">Always consult your healthcare provider</strong> before making changes to your:
        </p>
        <ul className="list-disc list-inside space-y-1 ml-2">
          <li>Nutrition plan or caloric intake</li>
          <li>Exercise or physical activity level</li>
          <li>GLP-1 or any other medication regimen</li>
          <li>Supplement use</li>
        </ul>
        <p>
          GLP-1 medication decisions — including starting, stopping, adjusting doses, or restarting — must be made exclusively with your prescribing physician.
        </p>
        <p className="text-xs text-warm-500 bg-warm-50 p-3 rounded-lg">
          The AI coaching assistant (Sage) is powered by a large language model and may occasionally produce inaccurate or incomplete information. Sage's responses should be treated as general wellness guidance, not clinical recommendations.
        </p>
      </div>
    </Modal>
  )
}
