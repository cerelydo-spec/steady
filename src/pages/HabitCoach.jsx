import { useState } from 'react'
import { Plus, Trash2, Flame, CheckCircle, Circle, ChevronDown, ChevronUp } from 'lucide-react'
import Card from '../components/ui/Card'
import Button from '../components/ui/Button'
import Input from '../components/ui/Input'
import Badge from '../components/ui/Badge'
import Modal from '../components/ui/Modal'
import ProgressRing from '../components/ui/ProgressRing'
import HabitHeatmap from '../components/charts/HabitHeatmap'
import { format } from 'date-fns'
import clsx from 'clsx'

export default function HabitCoach({ habits, log, today, onToggle, onAdd, onRemove, getStreak, getTodayLog, getTodayCompletionCount }) {
  const [showAdd, setShowAdd] = useState(false)
  const [expandedHabit, setExpandedHabit] = useState(null)
  const [newHabit, setNewHabit] = useState({ label: '', icon: '✅' })
  const [errors, setErrors] = useState({})

  const todayLog = getTodayLog()
  const completedCount = getTodayCompletionCount()
  const completionPercent = habits.length > 0 ? Math.round((completedCount / habits.length) * 100) : 0

  const handleAddHabit = () => {
    if (!newHabit.label.trim()) {
      setErrors({ label: 'Please enter a habit name' })
      return
    }
    onAdd({ label: newHabit.label.trim(), icon: newHabit.icon || '✅', color: 'teal' })
    setNewHabit({ label: '', icon: '✅' })
    setShowAdd(false)
  }

  const NUDGES = {
    sleep: "Quality sleep directly impacts hunger hormones — a key factor in maintenance.",
    movement: "30 minutes of movement supports metabolic rate and mood. It doesn't have to be intense.",
    protein: "Protein at every meal helps replace the satiety GLP-1 once provided.",
    mindful: "Eating without screens slows your pace and sharpens hunger awareness.",
    hydration: "Staying hydrated reduces false hunger signals — a simple but powerful maintenance tool.",
    stress: "Chronic stress elevates cortisol, which can increase appetite and drive weight gain.",
  }

  return (
    <div className="space-y-5 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="page-title">Habit Coach</h1>
          <p className="text-sm text-warm-500 mt-0.5">
            {format(new Date(today + 'T12:00:00'), 'EEEE, d MMMM')}
          </p>
        </div>
        <Button variant="secondary" onClick={() => setShowAdd(true)}>
          <Plus size={16} /> Add habit
        </Button>
      </div>

      {/* Daily completion summary */}
      <Card className="flex items-center gap-5">
        <ProgressRing
          percent={completionPercent}
          size={88}
          strokeWidth={8}
          label={`${completionPercent}% of today's habits complete`}
        >
          <div className="text-center">
            <span className="text-lg font-bold text-warm-800">{completedCount}</span>
            <span className="block text-[9px] text-warm-400">/{habits.length}</span>
          </div>
        </ProgressRing>
        <div className="flex-1">
          <p className="font-semibold text-warm-900">
            {completedCount === 0 && "Ready to start your day?"}
            {completedCount > 0 && completedCount < habits.length && `${completedCount} habit${completedCount > 1 ? 's' : ''} down`}
            {completedCount === habits.length && "All habits complete! 🎉"}
          </p>
          <p className="text-sm text-warm-500 mt-0.5">
            {completedCount === habits.length
              ? "Outstanding consistency. Maintenance is built one day like this at a time."
              : `${habits.length - completedCount} habit${(habits.length - completedCount) > 1 ? 's' : ''} remaining today`
            }
          </p>
        </div>
      </Card>

      {/* Habit checklist */}
      <Card>
        <h2 className="section-title mb-4">Today's check-in</h2>
        <div className="space-y-2" role="list" aria-label="Daily habits">
          {habits.map(h => {
            const done = Boolean(todayLog[h.id])
            const streak = getStreak(h.id)
            const isExpanded = expandedHabit === h.id

            return (
              <div key={h.id} role="listitem">
                <button
                  onClick={() => onToggle(h.id)}
                  aria-label={`${h.label}: ${done ? 'mark incomplete' : 'mark complete'}`}
                  className={clsx(
                    'w-full flex items-center gap-3 p-3.5 rounded-xl border transition-all duration-200 text-left',
                    done
                      ? 'bg-teal-50 border-teal-200 hover:bg-teal-100'
                      : 'bg-white border-warm-200 hover:bg-warm-50 hover:border-warm-300'
                  )}
                >
                  {done
                    ? <CheckCircle size={22} className="text-teal-500 shrink-0" aria-hidden="true" />
                    : <Circle size={22} className="text-warm-300 shrink-0" aria-hidden="true" />
                  }
                  <span className="text-xl leading-none shrink-0" aria-hidden="true">{h.icon}</span>
                  <div className="flex-1 min-w-0">
                    <p className={clsx('text-sm font-medium', done ? 'text-teal-700 line-through' : 'text-warm-800')}>
                      {h.label}
                    </p>
                    {streak > 1 && (
                      <p className="text-xs text-amber-500 flex items-center gap-1 mt-0.5">
                        <Flame size={11} aria-hidden="true" /> {streak}-day streak
                      </p>
                    )}
                  </div>
                  <button
                    onClick={(e) => { e.stopPropagation(); setExpandedHabit(isExpanded ? null : h.id) }}
                    aria-label={`${isExpanded ? 'Hide' : 'Show'} details for ${h.label}`}
                    className="p-1 rounded hover:bg-warm-100 text-warm-400 shrink-0"
                  >
                    {isExpanded
                      ? <ChevronUp size={15} aria-hidden="true" />
                      : <ChevronDown size={15} aria-hidden="true" />
                    }
                  </button>
                </button>

                {/* Expanded: heatmap + nudge */}
                {isExpanded && (
                  <div className="mx-1 mb-2 p-4 bg-warm-50 rounded-b-xl border border-t-0 border-warm-100 space-y-3 animate-fade-in">
                    {NUDGES[h.id] && (
                      <p className="text-xs text-warm-600 leading-relaxed italic">
                        💡 {NUDGES[h.id]}
                      </p>
                    )}
                    <div>
                      <p className="text-xs font-medium text-warm-500 mb-2">Last 35 days</p>
                      <HabitHeatmap log={log} habitId={h.id} days={35} />
                    </div>
                    {!h.id.startsWith('default') && (
                      <button
                        onClick={() => onRemove(h.id)}
                        className="flex items-center gap-1 text-xs text-red-400 hover:text-red-500 transition-colors"
                        aria-label={`Remove habit: ${h.label}`}
                      >
                        <Trash2 size={12} /> Remove habit
                      </button>
                    )}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </Card>

      {/* Streaks overview */}
      <Card>
        <h2 className="section-title mb-3">Active streaks</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {habits.map(h => {
            const streak = getStreak(h.id)
            return (
              <div key={h.id} className="flex items-center gap-2.5 p-2.5 bg-warm-50 rounded-xl">
                <span className="text-lg leading-none" aria-hidden="true">{h.icon}</span>
                <div className="min-w-0">
                  <p className="text-xs text-warm-500 truncate">{h.label.split(' ').slice(0, 2).join(' ')}</p>
                  <p className={clsx('text-sm font-semibold flex items-center gap-1', streak > 0 ? 'text-amber-500' : 'text-warm-300')}>
                    {streak > 0 && <Flame size={12} aria-hidden="true" />}
                    {streak > 0 ? `${streak}d` : '—'}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </Card>

      {/* Add habit modal */}
      <Modal isOpen={showAdd} onClose={() => setShowAdd(false)} title="Add a custom habit">
        <div className="space-y-4">
          <Input
            label="Habit name"
            id="habit-label"
            value={newHabit.label}
            onChange={e => { setNewHabit(p => ({ ...p, label: e.target.value })); setErrors({}) }}
            error={errors.label}
            placeholder="e.g. 10 min morning walk"
            required
            autoFocus
          />
          <Input
            label="Emoji icon"
            id="habit-icon"
            value={newHabit.icon}
            onChange={e => setNewHabit(p => ({ ...p, icon: e.target.value }))}
            placeholder="e.g. 🏃"
            hint="Single emoji to represent this habit"
          />
          <div className="flex gap-3 pt-2">
            <Button variant="secondary" onClick={() => setShowAdd(false)} className="flex-1">Cancel</Button>
            <Button onClick={handleAddHabit} className="flex-1">Add habit</Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}
