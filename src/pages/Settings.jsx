import { useState } from 'react'
import { ShieldAlert, Trash2, Save } from 'lucide-react'
import Card from '../components/ui/Card'
import Button from '../components/ui/Button'
import Badge from '../components/ui/Badge'
import Input from '../components/ui/Input'
import Modal from '../components/ui/Modal'
import { DisclaimerModal } from '../components/layout/Disclaimer'
import { displayWeight, parseWeight, lbsToKg } from '../utils/calculations'
import clsx from 'clsx'

export default function Settings({ profile, settings, onSaveSettings, onSaveProfile, onReset, addToast }) {
  const [showDisclaimer, setShowDisclaimer] = useState(false)
  const [showResetConfirm, setShowResetConfirm] = useState(false)
  const [unit, setUnit] = useState(settings?.unit || 'kg')
  const [goalWeight, setGoalWeight] = useState(
    profile?.goalWeightKg ? displayWeight(profile.goalWeightKg, settings?.unit || 'kg').toString() : ''
  )
  const [name, setName] = useState(profile?.name || '')
  const [errors, setErrors] = useState({})

  const [apiKey, setApiKey] = useState(() => localStorage.getItem('steady_api_key') || '')
  const [savedKey, setSavedKey] = useState(() => Boolean(localStorage.getItem('steady_api_key')))

  const handleSaveApiKey = () => {
    const trimmed = apiKey.trim()
    if (trimmed) {
      localStorage.setItem('steady_api_key', trimmed)
      setSavedKey(true)
    }
  }

  const handleRemoveApiKey = () => {
    localStorage.removeItem('steady_api_key')
    setApiKey('')
    setSavedKey(false)
  }

  const handleSave = () => {
    const e = {}
    if (!name.trim()) e.name = 'Name is required'
    const gw = parseWeight(goalWeight, unit)
    if (!gw || gw < 30 || gw > 300) e.goalWeight = 'Please enter a valid weight'
    setErrors(e)
    if (Object.keys(e).length > 0) return

    onSaveSettings({ ...settings, unit })
    onSaveProfile({
      ...profile,
      name: name.trim(),
      goalWeightKg: gw,
      preferredUnit: unit,
    })
    addToast('Settings saved', 'success')
  }

  return (
    <div className="space-y-5 animate-fade-in">
      <h1 className="page-title">Settings</h1>

      {/* Profile */}
      <Card>
        <h2 className="section-title mb-4">Profile</h2>
        <div className="space-y-4">
          <Input
            label="Display name"
            id="settings-name"
            value={name}
            onChange={e => { setName(e.target.value); setErrors(p => ({ ...p, name: '' })) }}
            error={errors.name}
            required
          />

          <div>
            <p className="label">Weight unit</p>
            <div className="flex gap-2">
              {['kg', 'lbs'].map(u => (
                <button
                  key={u}
                  onClick={() => setUnit(u)}
                  aria-pressed={unit === u}
                  className={clsx(
                    'flex-1 py-2.5 rounded-xl text-sm font-medium border transition-all',
                    unit === u
                      ? 'bg-teal-50 border-teal-400 text-teal-700'
                      : 'border-warm-200 text-warm-600 hover:border-warm-300'
                  )}
                >
                  {u}
                </button>
              ))}
            </div>
          </div>

          <Input
            label={`Maintenance goal weight (${unit})`}
            id="settings-goal"
            type="number"
            step="0.1"
            value={goalWeight}
            onChange={e => { setGoalWeight(e.target.value); setErrors(p => ({ ...p, goalWeight: '' })) }}
            error={errors.goalWeight}
            placeholder={unit === 'kg' ? 'e.g. 78' : 'e.g. 172'}
          />
        </div>

        <Button onClick={handleSave} className="mt-5 w-full">
          <Save size={16} /> Save changes
        </Button>
      </Card>

      {/* Profile info (read-only) */}
      <Card>
        <h2 className="section-title mb-3">Profile information</h2>
        <div className="space-y-2 text-sm text-warm-700">
          {[
            { label: 'Age', value: profile?.age ? `${profile.age} years` : '—' },
            { label: 'Height', value: profile?.heightCm ? `${profile.heightCm} cm` : '—' },
            { label: 'Activity level', value: profile?.activityLevel || '—' },
            { label: 'GLP-1 medication', value: profile?.medication || '—' },
            { label: 'Maintenance since', value: profile?.maintenanceStart || '—' },
            { label: 'Dietary preferences', value: profile?.dietaryPrefs?.join(', ') || 'None specified' },
          ].map(r => (
            <div key={r.label} className="flex justify-between py-1.5 border-b border-warm-50 last:border-0">
              <span className="text-warm-500">{r.label}</span>
              <span className="font-medium text-right max-w-[60%]">{r.value}</span>
            </div>
          ))}
        </div>
        <p className="text-xs text-warm-400 mt-3">To update profile details, complete re-onboarding via Reset below.</p>
      </Card>

      {/* Sage API Key */}
      <Card>
        <div className="flex items-center justify-between mb-3">
          <h2 className="section-title">Sage AI — API Key (optional)</h2>
          {savedKey
            ? <Badge variant="sage">🟢 Key saved</Badge>
            : <Badge variant="warm">⚪ Offline mode</Badge>
          }
        </div>
        <p className="text-sm text-warm-600 mb-4">
          Enter your Anthropic API key to enable live AI responses from Sage. Without a key, Sage responds using curated offline guidance. Your key is stored only in this browser.
        </p>
        <div className="space-y-3">
          <div>
            <label htmlFor="api-key-input" className="label">Anthropic API key</label>
            <input
              id="api-key-input"
              type="password"
              value={apiKey}
              onChange={e => setApiKey(e.target.value)}
              placeholder="sk-ant-api03-..."
              className="input-field w-full"
            />
          </div>
          <div className="flex gap-2">
            <Button onClick={handleSaveApiKey} className="flex-1">
              <Save size={15} /> Save key
            </Button>
            {savedKey && (
              <Button variant="danger" onClick={handleRemoveApiKey}>
                <Trash2 size={15} /> Remove key
              </Button>
            )}
          </div>
          <p className="text-xs text-warm-400">
            Get a key at{' '}
            <a
              href="https://console.anthropic.com"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-teal-600 transition-colors"
            >
              console.anthropic.com
            </a>
          </p>
        </div>
      </Card>

      {/* Data & Privacy */}
      <Card>
        <h2 className="section-title mb-3">Data & privacy</h2>
        <div className="space-y-3 text-sm text-warm-700">
          <p>All your personal data is stored exclusively in your browser's localStorage. Nothing is transmitted to any external server except anonymized chat messages sent to the Anthropic API to power Sage.</p>
          <p className="text-xs text-warm-500 bg-warm-50 p-3 rounded-lg leading-relaxed">
            Chat messages sent to Sage do not include your name, weight, or other personally identifiable information — only the conversation text itself.
          </p>
        </div>
      </Card>

      {/* Disclaimer */}
      <Card>
        <h2 className="section-title mb-3">Medical disclaimer</h2>
        <p className="text-sm text-warm-600 mb-3">Steady is a wellness coaching tool. It does not provide medical advice, diagnosis, or treatment.</p>
        <Button variant="secondary" onClick={() => setShowDisclaimer(true)}>
          <ShieldAlert size={15} /> Read full disclaimer
        </Button>
      </Card>

      {/* Reset */}
      <Card>
        <h2 className="section-title mb-2 text-red-600">Reset application</h2>
        <p className="text-sm text-warm-600 mb-4">This will permanently delete all your data including weight entries, meal logs, habit history, and profile. This cannot be undone.</p>
        <Button variant="danger" onClick={() => setShowResetConfirm(true)}>
          <Trash2 size={15} /> Reset all data
        </Button>
      </Card>

      {/* Version */}
      <p className="text-xs text-warm-300 text-center pb-2">Steady v0.1.0 · Built with React + Tailwind + Anthropic</p>

      <DisclaimerModal isOpen={showDisclaimer} onClose={() => setShowDisclaimer(false)} />

      <Modal isOpen={showResetConfirm} onClose={() => setShowResetConfirm(false)} title="Reset all data?">
        <div className="space-y-4">
          <p className="text-sm text-warm-700">This will permanently delete:</p>
          <ul className="text-sm text-warm-600 space-y-1 list-disc list-inside ml-2">
            <li>All weight log entries</li>
            <li>All meal and nutrition logs</li>
            <li>All habit history and streaks</li>
            <li>All chat history with Sage</li>
            <li>Your profile and settings</li>
          </ul>
          <p className="text-sm font-medium text-red-600">This cannot be undone.</p>
          <div className="flex gap-3 pt-2">
            <Button variant="secondary" onClick={() => setShowResetConfirm(false)} className="flex-1">
              Cancel
            </Button>
            <Button
              variant="danger"
              onClick={() => { onReset(); setShowResetConfirm(false) }}
              className="flex-1"
            >
              <Trash2 size={15} /> Yes, reset everything
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}
