import { useState } from 'react'
import { Plus, Trash2, Droplets } from 'lucide-react'
import Card from '../components/ui/Card'
import Button from '../components/ui/Button'
import Input from '../components/ui/Input'
import Modal from '../components/ui/Modal'
import MacroChart from '../components/charts/MacroChart'
import { macroCalories } from '../utils/calculations'
import { getDailyTip } from '../utils/glp1Tips'
import { format } from 'date-fns'
import { getLocalDateString } from '../utils/dateUtils'
import clsx from 'clsx'

const HYDRATION_GOAL = 8 // glasses

export default function NutritionLog({ meals, todayHydration, onAddMeal, onRemoveMeal, onSetHydration, getMealsForDate }) {
  const [showAdd, setShowAdd] = useState(false)
  const [viewDate, setViewDate] = useState(getLocalDateString())
  const [form, setForm] = useState({ name: '', proteinG: '', carbsG: '', fatG: '', notes: '' })
  const [errors, setErrors] = useState({})
  const tip = getDailyTip()

  const setField = (f, v) => {
    setForm(p => ({ ...p, [f]: v }))
    setErrors(p => ({ ...p, [f]: '' }))
  }

  const validate = () => {
    const e = {}
    if (!form.name.trim()) e.name = 'Please enter a meal name'
    const p = parseFloat(form.proteinG)
    const c = parseFloat(form.carbsG)
    const f = parseFloat(form.fatG)
    if (isNaN(p) || p < 0) e.proteinG = 'Enter grams (0+)'
    if (isNaN(c) || c < 0) e.carbsG = 'Enter grams (0+)'
    if (isNaN(f) || f < 0) e.fatG = 'Enter grams (0+)'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleAdd = () => {
    if (!validate()) return
    onAddMeal({
      name: form.name.trim(),
      proteinG: parseFloat(form.proteinG) || 0,
      carbsG: parseFloat(form.carbsG) || 0,
      fatG: parseFloat(form.fatG) || 0,
      notes: form.notes,
      date: viewDate,
    })
    setForm({ name: '', proteinG: '', carbsG: '', fatG: '', notes: '' })
    setShowAdd(false)
  }

  const viewMeals = getMealsForDate(viewDate)
  const totals = viewMeals.reduce(
    (a, m) => ({ protein: a.protein + m.proteinG, carbs: a.carbs + m.carbsG, fat: a.fat + m.fatG }),
    { protein: 0, carbs: 0, fat: 0 }
  )
  const totalKcal = macroCalories(totals.protein, totals.carbs, totals.fat)

  return (
    <div className="space-y-5 animate-fade-in">
      <div className="flex items-center justify-between">
        <h1 className="page-title">Nutrition Log</h1>
        <Button onClick={() => setShowAdd(true)}>
          <Plus size={16} /> Log meal
        </Button>
      </div>

      {/* Date selector */}
      <div className="flex items-center gap-3">
        <label htmlFor="view-date" className="text-sm font-medium text-warm-700 whitespace-nowrap">Viewing:</label>
        <input
          id="view-date"
          type="date"
          value={viewDate}
          max={getLocalDateString()}
          onChange={e => setViewDate(e.target.value)}
          className="input-field max-w-[160px]"
        />
        <Button variant="ghost" size="sm" onClick={() => setViewDate(getLocalDateString())}>
          Today
        </Button>
      </div>

      {/* Macro summary */}
      <Card>
        <div className="flex items-center justify-between mb-4">
          <h2 className="section-title">Today's macros</h2>
          {totalKcal > 0 && (
            <span className="text-sm font-semibold text-warm-700">{totalKcal} kcal total</span>
          )}
        </div>
        <MacroChart proteinG={totals.protein} carbsG={totals.carbs} fatG={totals.fat} />
      </Card>

      {/* Hydration tracker */}
      <Card>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Droplets size={18} className="text-blue-400" aria-hidden="true" />
            <h2 className="section-title">Hydration</h2>
          </div>
          <span className="text-sm text-warm-500">{todayHydration}/{HYDRATION_GOAL} glasses</span>
        </div>
        <div
          className="flex gap-2 flex-wrap"
          role="group"
          aria-label="Hydration tracker — tap each glass to toggle"
        >
          {Array.from({ length: HYDRATION_GOAL }, (_, i) => (
            <button
              key={i}
              onClick={() => onSetHydration(viewDate, i < todayHydration ? i : i + 1)}
              aria-label={`Glass ${i + 1}: ${i < todayHydration ? 'consumed' : 'not consumed'}`}
              aria-pressed={i < todayHydration}
              className={clsx(
                'w-10 h-10 rounded-xl flex items-center justify-center text-lg transition-all duration-200',
                i < todayHydration
                  ? 'bg-blue-100 text-blue-500 scale-110'
                  : 'bg-warm-100 text-warm-300 hover:bg-blue-50'
              )}
            >
              💧
            </button>
          ))}
        </div>
        <div className="mt-3 h-2 bg-warm-100 rounded-full overflow-hidden" role="progressbar" aria-valuenow={todayHydration} aria-valuemin={0} aria-valuemax={HYDRATION_GOAL} aria-label={`${todayHydration} of ${HYDRATION_GOAL} glasses consumed`}>
          <div
            className="h-full bg-blue-300 rounded-full transition-all duration-500"
            style={{ width: `${(todayHydration / HYDRATION_GOAL) * 100}%` }}
          />
        </div>
      </Card>

      {/* Meal list */}
      <Card>
        <h2 className="section-title mb-4">
          Meals — {format(new Date(viewDate + 'T12:00:00'), 'EEE d MMM')}
        </h2>
        {viewMeals.length === 0 ? (
          <p className="text-sm text-warm-500 text-center py-6">
            No meals logged for this day yet.
          </p>
        ) : (
          <div className="space-y-3">
            {viewMeals.map(m => (
              <div key={m.id} className="flex items-start justify-between p-3 bg-warm-50 rounded-xl">
                <div className="min-w-0">
                  <p className="font-medium text-warm-800 text-sm">{m.name}</p>
                  <div className="flex gap-3 mt-1 text-xs text-warm-500 flex-wrap">
                    <span className="text-teal-600 font-medium">{m.proteinG}g protein</span>
                    <span className="text-amber-600 font-medium">{m.carbsG}g carbs</span>
                    <span className="text-purple-600 font-medium">{m.fatG}g fat</span>
                    <span className="text-warm-400">{macroCalories(m.proteinG, m.carbsG, m.fatG)} kcal</span>
                  </div>
                  {m.notes && <p className="text-xs text-warm-400 mt-1 italic">{m.notes}</p>}
                </div>
                <button
                  onClick={() => onRemoveMeal(m.id)}
                  aria-label={`Remove meal: ${m.name}`}
                  className="p-1.5 text-warm-300 hover:text-red-400 hover:bg-red-50 rounded-lg transition-colors shrink-0 ml-2"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            ))}
          </div>
        )}
      </Card>

      {/* GLP-1 tip */}
      <Card className="bg-sage-50 border-sage-100">
        <p className="text-xs font-medium text-sage-600 mb-1">Post-GLP-1 nutrition · {tip.category}</p>
        <p className="text-sm text-warm-700 leading-relaxed">{tip.tip}</p>
      </Card>

      {/* Protein priority reminder */}
      <Card>
        <h2 className="text-sm font-semibold text-warm-700 mb-3">Post-GLP-1 nutrition principles</h2>
        <div className="space-y-2">
          {[
            { icon: '🥚', text: 'Prioritise protein at every meal — aim for 25–30g per sitting' },
            { icon: '🐢', text: 'Eat slowly — your appetite cues may be less pronounced now' },
            { icon: '🥦', text: 'Fill half your plate with vegetables before adding other foods' },
            { icon: '💧', text: 'Hydrate well — aim for 8 glasses daily' },
          ].map(tip => (
            <div key={tip.icon} className="flex items-start gap-2.5 text-sm text-warm-700">
              <span className="text-base leading-snug shrink-0" aria-hidden="true">{tip.icon}</span>
              {tip.text}
            </div>
          ))}
        </div>
      </Card>

      {/* Add meal modal */}
      <Modal isOpen={showAdd} onClose={() => setShowAdd(false)} title="Log a meal">
        <div className="space-y-4">
          <Input
            label="Meal name"
            id="meal-name"
            value={form.name}
            onChange={e => setField('name', e.target.value)}
            error={errors.name}
            placeholder="e.g. Grilled salmon with vegetables"
            required
            autoFocus
          />
          <div className="grid grid-cols-3 gap-3">
            <Input
              label="Protein (g)"
              id="meal-protein"
              type="number" min="0" step="0.5"
              value={form.proteinG}
              onChange={e => setField('proteinG', e.target.value)}
              error={errors.proteinG}
              placeholder="e.g. 35"
            />
            <Input
              label="Carbs (g)"
              id="meal-carbs"
              type="number" min="0" step="0.5"
              value={form.carbsG}
              onChange={e => setField('carbsG', e.target.value)}
              error={errors.carbsG}
              placeholder="e.g. 40"
            />
            <Input
              label="Fat (g)"
              id="meal-fat"
              type="number" min="0" step="0.5"
              value={form.fatG}
              onChange={e => setField('fatG', e.target.value)}
              error={errors.fatG}
              placeholder="e.g. 12"
            />
          </div>
          <Input
            label="Notes (optional)"
            id="meal-notes"
            value={form.notes}
            onChange={e => setField('notes', e.target.value)}
            placeholder="e.g. Lunch, ate slowly, felt satisfied"
          />
          {(form.proteinG || form.carbsG || form.fatG) && (
            <p className="text-xs text-warm-500 bg-warm-50 p-2.5 rounded-lg">
              Estimated: <strong className="text-warm-700">{macroCalories(parseFloat(form.proteinG) || 0, parseFloat(form.carbsG) || 0, parseFloat(form.fatG) || 0)} kcal</strong>
            </p>
          )}
          <div className="flex gap-3 pt-2">
            <Button variant="secondary" onClick={() => setShowAdd(false)} className="flex-1">Cancel</Button>
            <Button onClick={handleAdd} className="flex-1">Save meal</Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}
