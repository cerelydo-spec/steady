import { useState } from 'react'
import { Leaf, ChevronRight, ChevronLeft, ShieldAlert } from 'lucide-react'
import Button from '../components/ui/Button'
import Input from '../components/ui/Input'
import { parseWeight } from '../utils/calculations'
import clsx from 'clsx'

const STEPS = [
  { id: 'welcome', title: 'Welcome to Steady' },
  { id: 'disclaimer', title: 'Important Notice' },
  { id: 'profile', title: 'About You' },
  { id: 'weight', title: 'Your Weight Goals' },
  { id: 'lifestyle', title: 'Your Lifestyle' },
  { id: 'glp1', title: 'Your GLP-1 Journey' },
]

const ACTIVITY_LEVELS = [
  { id: 'sedentary', label: 'Mostly sedentary', desc: 'Desk work, minimal daily movement' },
  { id: 'light', label: 'Lightly active', desc: '1–2 movement sessions per week' },
  { id: 'moderate', label: 'Moderately active', desc: '3–4 sessions per week' },
  { id: 'active', label: 'Very active', desc: '5+ sessions per week or physical job' },
]

const DIETARY_PREFS = [
  'No restrictions', 'Vegetarian', 'Vegan', 'Gluten-free',
  'Dairy-free', 'Low-carb', 'Mediterranean', 'Halal', 'Kosher',
]

const GLP1_MEDS = ['Ozempic (semaglutide)', 'Wegovy (semaglutide)', 'Mounjaro (tirzepatide)', 'Zepbound (tirzepatide)', 'Victoza (liraglutide)', 'Saxenda (liraglutide)', 'Other', 'Prefer not to say']

export default function Onboarding({ onComplete }) {
  const [step, setStep] = useState(0)
  const [unit, setUnit] = useState('kg')
  const [errors, setErrors] = useState({})
  const [form, setForm] = useState({
    name: '',
    age: '',
    heightCm: '',
    currentWeight: '',
    goalWeight: '',
    startWeight: '',
    activityLevel: '',
    dietaryPrefs: [],
    medication: '',
    maintenanceStart: '',
    primaryGoal: '',
  })

  const set = (field, value) => {
    setForm(p => ({ ...p, [field]: value }))
    setErrors(p => ({ ...p, [field]: '' }))
  }

  const toggleDiet = (pref) => {
    setForm(p => ({
      ...p,
      dietaryPrefs: p.dietaryPrefs.includes(pref)
        ? p.dietaryPrefs.filter(d => d !== pref)
        : [...p.dietaryPrefs, pref],
    }))
  }

  const validate = () => {
    const e = {}
    if (step === 2) {
      if (!form.name.trim()) e.name = 'Please enter your name'
      if (!form.age || +form.age < 18 || +form.age > 120) e.age = 'Please enter a valid age (18–120)'
      if (!form.heightCm || +form.heightCm < 100 || +form.heightCm > 250) e.heightCm = 'Please enter a valid height (100–250 cm)'
    }
    if (step === 3) {
      const cw = parseWeight(form.currentWeight, unit)
      const gw = parseWeight(form.goalWeight, unit)
      if (!cw) e.currentWeight = 'Please enter a valid current weight'
      if (!gw) e.goalWeight = 'Please enter a valid goal weight'
      if (cw && gw && Math.abs(cw - gw) > 100) e.goalWeight = 'Goal weight seems far from current weight — double check'
    }
    if (step === 4) {
      if (!form.activityLevel) e.activityLevel = 'Please select your activity level'
    }
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const next = () => {
    if (!validate()) return
    if (step < STEPS.length - 1) setStep(s => s + 1)
  }

  const back = () => setStep(s => Math.max(0, s - 1))

  const finish = () => {
    if (!validate()) return
    const currentKg = parseWeight(form.currentWeight, unit)
    const goalKg = parseWeight(form.goalWeight, unit)
    const startKg = form.startWeight ? parseWeight(form.startWeight, unit) : currentKg

    onComplete({
      name: form.name.trim(),
      age: +form.age,
      heightCm: +form.heightCm,
      currentWeightKg: currentKg,
      goalWeightKg: goalKg,
      startWeightKg: startKg,
      activityLevel: form.activityLevel,
      dietaryPrefs: form.dietaryPrefs,
      medication: form.medication,
      maintenanceStart: form.maintenanceStart,
      primaryGoal: form.primaryGoal,
      preferredUnit: unit,
      onboardedAt: new Date().toISOString(),
    })
  }

  const progress = ((step) / (STEPS.length - 1)) * 100

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-warm-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="flex items-center justify-center gap-2.5 mb-8">
          <div className="w-10 h-10 bg-teal-500 rounded-2xl flex items-center justify-center shadow-lg">
            <Leaf size={20} className="text-white" aria-hidden="true" />
          </div>
          <span className="text-2xl font-semibold text-warm-900">Steady</span>
        </div>

        {/* Progress bar */}
        {step > 0 && (
          <div className="mb-6" role="progressbar" aria-valuenow={step} aria-valuemin={0} aria-valuemax={STEPS.length - 1} aria-label="Onboarding progress">
            <div className="flex justify-between text-xs text-warm-400 mb-2">
              <span>Step {step} of {STEPS.length - 1}</span>
              <span>{STEPS[step].title}</span>
            </div>
            <div className="h-1.5 bg-warm-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-teal-400 rounded-full transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-warm-100 p-7 animate-fade-in">
          {/* Step 0: Welcome */}
          {step === 0 && (
            <div className="text-center space-y-5">
              <div className="w-16 h-16 bg-teal-50 rounded-2xl flex items-center justify-center mx-auto">
                <Leaf size={32} className="text-teal-500" aria-hidden="true" />
              </div>
              <div>
                <h1 className="text-2xl font-semibold text-warm-900 mb-2">Welcome to Steady</h1>
                <p className="text-warm-600 leading-relaxed">
                  Your coaching companion for the maintenance phase. We'll help you build lasting habits, track your progress, and navigate life after GLP-1 medication — with clarity and without judgment.
                </p>
              </div>
              <div className="space-y-2.5 text-left">
                {['Personalised weight trend tracking', 'Daily habit coaching & streaks', 'Evidence-based nutrition guidance', 'AI coaching with Sage, your wellness companion'].map(f => (
                  <div key={f} className="flex items-center gap-2.5 text-sm text-warm-700">
                    <span className="w-1.5 h-1.5 rounded-full bg-teal-400 shrink-0" aria-hidden="true" />
                    {f}
                  </div>
                ))}
              </div>
              <Button onClick={() => setStep(1)} className="w-full mt-2">
                Get started <ChevronRight size={16} />
              </Button>
            </div>
          )}

          {/* Step 1: Disclaimer */}
          {step === 1 && (
            <div className="space-y-5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-amber-50 rounded-xl flex items-center justify-center shrink-0">
                  <ShieldAlert size={20} className="text-amber-500" aria-hidden="true" />
                </div>
                <h2 className="text-xl font-semibold text-warm-900">Important Notice</h2>
              </div>
              <div className="bg-amber-50 border border-amber-100 rounded-xl p-4 text-sm text-amber-900 space-y-3 leading-relaxed">
                <p><strong>Steady is a wellness coaching tool — not a medical device.</strong></p>
                <p>This app does not provide medical advice, diagnosis, or treatment. All guidance is educational and intended to support healthy habit formation during the post-GLP-1 maintenance phase.</p>
                <p>Always consult your healthcare provider before changing your nutrition plan, exercise regimen, or any medication — including GLP-1 medications.</p>
                <p>The AI coaching assistant (Sage) uses a large language model and may occasionally provide inaccurate information. Treat Sage's responses as general wellness guidance, not clinical recommendations.</p>
              </div>
              <p className="text-xs text-warm-500">By continuing, you acknowledge that Steady is a wellness tool and agree to consult your healthcare provider for medical decisions.</p>
            </div>
          )}

          {/* Step 2: Profile */}
          {step === 2 && (
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-warm-900">Tell us about yourself</h2>
              <Input
                label="First name"
                id="name"
                value={form.name}
                onChange={e => set('name', e.target.value)}
                error={errors.name}
                placeholder="Your first name"
                required
                autoFocus
              />
              <div className="grid grid-cols-2 gap-3">
                <Input
                  label="Age"
                  id="age"
                  type="number"
                  value={form.age}
                  onChange={e => set('age', e.target.value)}
                  error={errors.age}
                  placeholder="e.g. 42"
                  min="18" max="120"
                  required
                />
                <Input
                  label="Height (cm)"
                  id="heightCm"
                  type="number"
                  value={form.heightCm}
                  onChange={e => set('heightCm', e.target.value)}
                  error={errors.heightCm}
                  placeholder="e.g. 168"
                  min="100" max="250"
                  required
                />
              </div>
            </div>
          )}

          {/* Step 3: Weight */}
          {step === 3 && (
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-warm-900">Your weight goals</h2>
              {/* Unit toggle */}
              <div className="flex items-center gap-1 bg-warm-100 p-1 rounded-xl w-fit">
                {['kg', 'lbs'].map(u => (
                  <button
                    key={u}
                    onClick={() => setUnit(u)}
                    aria-pressed={unit === u}
                    className={clsx(
                      'px-4 py-1.5 rounded-lg text-sm font-medium transition-all',
                      unit === u ? 'bg-white text-teal-700 shadow-sm' : 'text-warm-500'
                    )}
                  >
                    {u}
                  </button>
                ))}
              </div>
              <Input
                label={`Current weight (${unit})`}
                id="currentWeight"
                type="number"
                value={form.currentWeight}
                onChange={e => set('currentWeight', e.target.value)}
                error={errors.currentWeight}
                placeholder={unit === 'kg' ? 'e.g. 82.5' : 'e.g. 182'}
                required
                step="0.1"
              />
              <Input
                label={`Maintenance goal weight (${unit})`}
                id="goalWeight"
                type="number"
                value={form.goalWeight}
                onChange={e => set('goalWeight', e.target.value)}
                error={errors.goalWeight}
                placeholder={unit === 'kg' ? 'e.g. 78' : 'e.g. 172'}
                required
                step="0.1"
              />
              <Input
                label={`Starting weight when you began your GLP-1 program (${unit})`}
                id="startWeight"
                type="number"
                value={form.startWeight}
                onChange={e => set('startWeight', e.target.value)}
                placeholder="Optional — helps calculate total progress"
                step="0.1"
              />
            </div>
          )}

          {/* Step 4: Lifestyle */}
          {step === 4 && (
            <div className="space-y-5">
              <h2 className="text-xl font-semibold text-warm-900">Your current lifestyle</h2>
              <div>
                <p className="text-sm font-medium text-warm-700 mb-3">
                  Activity level <span className="text-amber-500" aria-hidden="true">*</span>
                </p>
                {errors.activityLevel && (
                  <p className="text-xs text-red-600 mb-2" role="alert">{errors.activityLevel}</p>
                )}
                <div className="space-y-2" role="radiogroup" aria-label="Activity level">
                  {ACTIVITY_LEVELS.map(a => (
                    <button
                      key={a.id}
                      role="radio"
                      aria-checked={form.activityLevel === a.id}
                      onClick={() => set('activityLevel', a.id)}
                      className={clsx(
                        'w-full text-left px-4 py-3 rounded-xl border transition-all text-sm',
                        form.activityLevel === a.id
                          ? 'border-teal-400 bg-teal-50 text-teal-700'
                          : 'border-warm-200 hover:border-warm-300 text-warm-700'
                      )}
                    >
                      <span className="font-medium">{a.label}</span>
                      <span className="block text-xs mt-0.5 opacity-70">{a.desc}</span>
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-sm font-medium text-warm-700 mb-2">Dietary preferences (select all that apply)</p>
                <div className="flex flex-wrap gap-2">
                  {DIETARY_PREFS.map(p => (
                    <button
                      key={p}
                      aria-pressed={form.dietaryPrefs.includes(p)}
                      onClick={() => toggleDiet(p)}
                      className={clsx(
                        'px-3 py-1.5 rounded-full text-xs font-medium border transition-all',
                        form.dietaryPrefs.includes(p)
                          ? 'bg-teal-50 border-teal-400 text-teal-700'
                          : 'border-warm-200 text-warm-600 hover:border-warm-300'
                      )}
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 5: GLP-1 history */}
          {step === 5 && (
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-warm-900">Your GLP-1 journey</h2>
              <p className="text-sm text-warm-600">This helps Sage personalise coaching to your post-medication phase.</p>
              <div>
                <p className="text-sm font-medium text-warm-700 mb-2">Which medication did you use?</p>
                <div className="space-y-1.5">
                  {GLP1_MEDS.map(m => (
                    <button
                      key={m}
                      role="radio"
                      aria-checked={form.medication === m}
                      onClick={() => set('medication', m)}
                      className={clsx(
                        'w-full text-left px-4 py-2.5 rounded-xl border transition-all text-sm',
                        form.medication === m
                          ? 'border-teal-400 bg-teal-50 text-teal-700'
                          : 'border-warm-200 hover:border-warm-300 text-warm-700'
                      )}
                    >
                      {m}
                    </button>
                  ))}
                </div>
              </div>
              <Input
                label="When did you transition to maintenance? (approximate)"
                id="maintenanceStart"
                type="month"
                value={form.maintenanceStart}
                onChange={e => set('maintenanceStart', e.target.value)}
                hint="Helps track how long you've been in the maintenance phase"
              />
              <Input
                label="What's your primary goal in maintenance?"
                id="primaryGoal"
                value={form.primaryGoal}
                onChange={e => set('primaryGoal', e.target.value)}
                placeholder="e.g. Stay at goal weight, build strength, reduce medication..."
              />
            </div>
          )}

          {/* Navigation */}
          {step > 0 && (
            <div className="flex items-center gap-3 mt-6 pt-5 border-t border-warm-100">
              <Button variant="secondary" onClick={back}>
                <ChevronLeft size={16} /> Back
              </Button>
              {step < STEPS.length - 1 ? (
                <Button onClick={next} className="flex-1">
                  Continue <ChevronRight size={16} />
                </Button>
              ) : (
                <Button onClick={finish} className="flex-1" variant="sage">
                  Start my journey <ChevronRight size={16} />
                </Button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
