import { useState } from 'react'
import { Plus, Trash2, Award, TrendingDown, TrendingUp, Minus } from 'lucide-react'
import Card from '../components/ui/Card'
import Button from '../components/ui/Button'
import Input from '../components/ui/Input'
import Badge from '../components/ui/Badge'
import Modal from '../components/ui/Modal'
import WeightChart from '../components/charts/WeightChart'
import { displayWeight, parseWeight, calcProgressPercent, calcWeeklyTrend, detectPlateau } from '../utils/calculations'
import { getLocalDateString } from '../utils/dateUtils'
import { format } from 'date-fns'

const MILESTONES = [
  { kg: 2, label: '2kg lost', icon: '🌱' },
  { kg: 5, label: '5kg lost', icon: '⭐' },
  { kg: 10, label: '10kg lost', icon: '🏅' },
  { kg: 15, label: '15kg lost', icon: '🥈' },
  { kg: 20, label: '20kg lost', icon: '🥇' },
  { kg: 25, label: '25kg lost', icon: '🏆' },
]

export default function WeightTracker({ profile, settings, entries, onAdd, onRemove }) {
  const unit = settings?.unit || 'kg'
  const [showAdd, setShowAdd] = useState(false)
  const [date, setDate] = useState(getLocalDateString())
  const [weight, setWeight] = useState('')
  const [note, setNote] = useState('')
  const [errors, setErrors] = useState({})

  const validate = () => {
    const e = {}
    if (!weight) e.weight = 'Please enter a weight'
    const kg = parseWeight(weight, unit)
    if (!kg) e.weight = 'Please enter a valid weight'
    else if (kg < 30 || kg > 300) e.weight = 'Weight seems out of range — please double check'
    if (!date) e.date = 'Please select a date'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleAdd = () => {
    if (!validate()) return
    const kg = parseWeight(weight, unit)
    onAdd(kg, date, note)
    setWeight('')
    setNote('')
    setDate(getLocalDateString())
    setShowAdd(false)
  }

  const weeklyTrend = calcWeeklyTrend(entries)
  const plateau = detectPlateau(entries)
  const latestKg = entries.length > 0 ? entries[entries.length - 1].valueKg : null
  const firstEntryKg = entries.length > 0 ? entries[0].valueKg : null
  const progressPercent = (firstEntryKg && profile?.goalWeightKg && latestKg)
    ? calcProgressPercent(latestKg, firstEntryKg, profile.goalWeightKg)
    : null

  // Check milestones unlocked
  const totalLost = firstEntryKg && latestKg ? firstEntryKg - latestKg : 0
  const unlockedMilestones = MILESTONES.filter(m => totalLost >= m.kg)

  return (
    <div className="space-y-5 animate-fade-in">
      <div className="flex items-center justify-between">
        <h1 className="page-title">Weight Tracker</h1>
        <Button onClick={() => setShowAdd(true)}>
          <Plus size={16} /> Log weight
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        <Card className="col-span-1">
          <p className="text-xs text-warm-500 mb-1">Current weight</p>
          <p className="text-2xl font-semibold text-warm-900">
            {latestKg ? `${displayWeight(latestKg, unit)}` : '—'}
          </p>
          <p className="text-xs text-warm-400 mt-0.5">{unit}</p>
        </Card>
        <Card>
          <p className="text-xs text-warm-500 mb-1">Goal weight</p>
          <p className="text-2xl font-semibold text-teal-600">
            {profile?.goalWeightKg ? displayWeight(profile.goalWeightKg, unit) : '—'}
          </p>
          <p className="text-xs text-warm-400 mt-0.5">{unit}</p>
        </Card>
        <Card className="col-span-2 sm:col-span-1">
          <p className="text-xs text-warm-500 mb-1">Weekly trend</p>
          <p className={`text-2xl font-semibold flex items-center gap-1 ${weeklyTrend === null ? 'text-warm-400' : weeklyTrend < 0 ? 'text-teal-500' : weeklyTrend > 0 ? 'text-amber-500' : 'text-warm-400'}`}>
            {weeklyTrend === null ? '—' : (
              <>
                {weeklyTrend > 0 ? <TrendingUp size={20} aria-hidden="true" /> : weeklyTrend < 0 ? <TrendingDown size={20} aria-hidden="true" /> : <Minus size={20} aria-hidden="true" />}
                {weeklyTrend > 0 ? '+' : ''}{displayWeight(weeklyTrend, unit)}
              </>
            )}
          </p>
          <p className="text-xs text-warm-400 mt-0.5">{unit} / week</p>
        </Card>
      </div>

      {/* Progress toward goal */}
      {progressPercent !== null && (
        <Card>
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm font-medium text-warm-700">Progress toward maintenance goal</p>
            <Badge variant={progressPercent >= 100 ? 'sage' : 'teal'}>{progressPercent}%</Badge>
          </div>
          <div className="h-3 bg-warm-100 rounded-full overflow-hidden" role="progressbar" aria-valuenow={progressPercent} aria-valuemin={0} aria-valuemax={100} aria-label={`${progressPercent}% of goal achieved`}>
            <div
              className="h-full bg-gradient-to-r from-teal-400 to-teal-500 rounded-full transition-all duration-700"
              style={{ width: `${Math.min(100, progressPercent)}%`, minWidth: progressPercent > 0 ? '8px' : '0' }}
            />
          </div>
          <p className="text-xs text-warm-400 mt-2">
            {totalLost > 0
              ? `${displayWeight(totalLost, unit)} ${unit} lost from starting weight of ${displayWeight(firstEntryKg, unit)} ${unit}`
              : `Goal: ${displayWeight(profile.goalWeightKg, unit)} ${unit}`
            }
          </p>
        </Card>
      )}

      {/* Plateau alert */}
      {plateau && (
        <div className="bg-amber-50 border border-amber-100 rounded-2xl p-4 text-sm text-amber-800">
          <p className="font-medium mb-1">⚡ Weight has been stable for 2+ weeks</p>
          <p>A maintenance plateau is normal and expected. Your body is settling. This is a success signal, not a problem — unless you haven't yet reached your goal weight.</p>
        </div>
      )}

      {/* Chart */}
      <Card>
        <h2 className="section-title mb-4">Weight trend (last 30 days)</h2>
        <WeightChart entries={entries} goalKg={profile?.goalWeightKg} unit={unit} height={220} />
      </Card>

      {/* Milestones */}
      {unlockedMilestones.length > 0 && (
        <Card>
          <div className="flex items-center gap-2 mb-3">
            <Award size={18} className="text-yellow-500" aria-hidden="true" />
            <h2 className="section-title">Milestones unlocked</h2>
          </div>
          <div className="flex flex-wrap gap-2">
            {unlockedMilestones.map(m => (
              <Badge key={m.kg} variant="gold">
                {m.icon} {m.label}
              </Badge>
            ))}
          </div>
        </Card>
      )}

      {/* Log entries */}
      <Card>
        <h2 className="section-title mb-4">All entries</h2>
        {entries.length === 0 ? (
          <p className="text-sm text-warm-500 text-center py-6">No entries yet. Log your first weight entry to get started.</p>
        ) : (
          <div className="space-y-2">
            {[...entries].reverse().map(e => (
              <div key={e.id} className="flex items-center justify-between py-2 border-b border-warm-50 last:border-0">
                <div>
                  <p className="text-sm font-medium text-warm-800">
                    {displayWeight(e.valueKg, unit)} {unit}
                  </p>
                  <p className="text-xs text-warm-400">
                    {format(new Date(e.date + 'T12:00:00'), 'EEE, d MMM yyyy')}
                    {e.note && ` · ${e.note}`}
                  </p>
                </div>
                <button
                  onClick={() => onRemove(e.id)}
                  aria-label={`Remove entry: ${displayWeight(e.valueKg, unit)} ${unit} on ${e.date}`}
                  className="p-1.5 text-warm-300 hover:text-red-400 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            ))}
          </div>
        )}
      </Card>

      {/* Add modal */}
      <Modal isOpen={showAdd} onClose={() => setShowAdd(false)} title="Log weight entry">
        <div className="space-y-4">
          <Input
            label={`Weight (${unit})`}
            id="log-weight"
            type="number"
            step="0.1"
            value={weight}
            onChange={e => { setWeight(e.target.value); setErrors({}) }}
            error={errors.weight}
            placeholder={unit === 'kg' ? 'e.g. 82.3' : 'e.g. 181.5'}
            required
            autoFocus
          />
          <Input
            label="Date"
            id="log-date"
            type="date"
            value={date}
            onChange={e => setDate(e.target.value)}
            error={errors.date}
            max={getLocalDateString()}
            required
          />
          <Input
            label="Note (optional)"
            id="log-note"
            value={note}
            onChange={e => setNote(e.target.value)}
            placeholder="e.g. Morning, after workout..."
          />
          <div className="flex gap-3 pt-2">
            <Button variant="secondary" onClick={() => setShowAdd(false)} className="flex-1">Cancel</Button>
            <Button onClick={handleAdd} className="flex-1">Save entry</Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}
