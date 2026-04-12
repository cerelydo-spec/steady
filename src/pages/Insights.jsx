import { useMemo } from 'react'
import { subDays, startOfWeek, format, isWithinInterval } from 'date-fns'
import Card from '../components/ui/Card'
import Badge from '../components/ui/Badge'
import WeightChart from '../components/charts/WeightChart'
import MacroChart from '../components/charts/MacroChart'
import ProgressRing from '../components/ui/ProgressRing'
import { displayWeight, calcWeeklyTrend } from '../utils/calculations'

function SectionHeader({ children }) {
  return <h2 className="section-title mb-3">{children}</h2>
}

export default function Insights({ profile, settings, weightEntries, meals, habits, habitLog }) {
  const unit = settings?.unit || 'kg'
  const today = new Date()

  // Last 7 days window
  const weekStart = subDays(today, 6)
  const weekEntries = weightEntries.filter(e => new Date(e.date + 'T12:00:00') >= weekStart)
  const weekMeals = meals.filter(m => new Date(m.date + 'T12:00:00') >= weekStart)

  const weekTrend = calcWeeklyTrend(weightEntries)

  // Habit completion this week
  const weekHabitStats = useMemo(() => {
    const days = Array.from({ length: 7 }, (_, i) => format(subDays(today, i), 'yyyy-MM-dd'))
    const stats = habits.map(h => {
      const completed = days.filter(d => habitLog[d]?.[h.id]).length
      return { ...h, completed, total: 7, pct: Math.round((completed / 7) * 100) }
    })
    const totalPossible = habits.length * 7
    const totalDone = stats.reduce((a, s) => a + s.completed, 0)
    return { stats, overallPct: totalPossible > 0 ? Math.round((totalDone / totalPossible) * 100) : 0, totalDone, totalPossible }
  }, [habits, habitLog])

  // Week macro totals
  const weekMacros = weekMeals.reduce(
    (a, m) => ({ protein: a.protein + m.proteinG, carbs: a.carbs + m.carbsG, fat: a.fat + m.fatG }),
    { protein: 0, carbs: 0, fat: 0 }
  )

  // Top performing habit
  const topHabit = weekHabitStats.stats.length > 0
    ? weekHabitStats.stats.reduce((a, b) => a.pct >= b.pct ? a : b)
    : null

  // Wins
  const wins = []
  if (weekTrend !== null && weekTrend < -0.3) wins.push({ icon: '📉', text: `Weight trending down — ${Math.abs(displayWeight(weekTrend, unit))} ${unit} this week` })
  if (weekTrend !== null && Math.abs(weekTrend) < 0.3) wins.push({ icon: '⚖️', text: 'Weight stable this week — a success in maintenance' })
  if (weekHabitStats.overallPct >= 80) wins.push({ icon: '🔥', text: `${weekHabitStats.overallPct}% habit completion — outstanding consistency` })
  if (topHabit && topHabit.pct === 100) wins.push({ icon: '⭐', text: `${topHabit.icon} ${topHabit.label} — perfect week!` })
  if (weekMeals.length >= 10) wins.push({ icon: '🥗', text: `${weekMeals.length} meals logged — great nutrition awareness` })

  // Recommendations
  const recommendations = []
  if (weekTrend !== null && weekTrend > 0.5) recommendations.push({ icon: '🌿', text: 'Weight trending upward. Consider reviewing portion sizes and increasing protein at meals.' })
  if (weekHabitStats.overallPct < 50) recommendations.push({ icon: '🎯', text: 'Habit completion is below 50%. Try focusing on just 2–3 core habits this week to rebuild momentum.' })
  const sleepStat = weekHabitStats.stats.find(s => s.id === 'sleep')
  if (sleepStat && sleepStat.pct < 50) recommendations.push({ icon: '🌙', text: 'Sleep habit needs attention. Poor sleep increases hunger hormones — this may be affecting your appetite.' })
  if (weekMeals.length < 3) recommendations.push({ icon: '📝', text: 'Logging more meals helps identify patterns. Even a brief log builds awareness of your nutrition rhythm.' })

  return (
    <div className="space-y-5 animate-fade-in">
      <div>
        <h1 className="page-title">Weekly Insights</h1>
        <p className="text-sm text-warm-500 mt-1">
          {format(weekStart, 'd MMM')} – {format(today, 'd MMM yyyy')}
        </p>
      </div>

      {/* Wins */}
      {wins.length > 0 && (
        <Card className="bg-gradient-to-br from-teal-50 to-sage-50 border-teal-100">
          <SectionHeader>This week's wins</SectionHeader>
          <div className="space-y-2">
            {wins.map((w, i) => (
              <div key={i} className="flex items-center gap-2.5 text-sm text-warm-700">
                <span className="text-base shrink-0" aria-hidden="true">{w.icon}</span>
                {w.text}
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Weight summary */}
      <Card>
        <SectionHeader>Weight this week</SectionHeader>
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="bg-warm-50 rounded-xl p-3">
            <p className="text-xs text-warm-500">Latest</p>
            <p className="text-xl font-semibold text-warm-900">
              {weightEntries.length > 0
                ? `${displayWeight(weightEntries[weightEntries.length - 1].valueKg, unit)} ${unit}`
                : '—'}
            </p>
          </div>
          <div className="bg-warm-50 rounded-xl p-3">
            <p className="text-xs text-warm-500">Weekly change</p>
            <p className={`text-xl font-semibold ${weekTrend === null ? 'text-warm-400' : weekTrend < 0 ? 'text-teal-500' : weekTrend > 0 ? 'text-amber-500' : 'text-warm-400'}`}>
              {weekTrend === null ? '—' : `${weekTrend > 0 ? '+' : ''}${displayWeight(weekTrend, unit)} ${unit}`}
            </p>
          </div>
        </div>
        <WeightChart entries={weightEntries} goalKg={profile?.goalWeightKg} unit={unit} height={180} />
      </Card>

      {/* Habit summary */}
      <Card>
        <div className="flex items-center justify-between mb-4">
          <SectionHeader>Habit consistency</SectionHeader>
          <Badge variant={weekHabitStats.overallPct >= 70 ? 'sage' : weekHabitStats.overallPct >= 40 ? 'amber' : 'warm'}>
            {weekHabitStats.overallPct}% overall
          </Badge>
        </div>
        <div className="space-y-2.5">
          {weekHabitStats.stats.map(s => (
            <div key={s.id} className="flex items-center gap-3">
              <span className="text-base w-6 shrink-0 text-center" aria-hidden="true">{s.icon}</span>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-center mb-1">
                  <p className="text-xs text-warm-700 truncate">{s.label}</p>
                  <p className="text-xs font-medium text-warm-600 shrink-0 ml-2">{s.completed}/7</p>
                </div>
                <div className="h-1.5 bg-warm-100 rounded-full overflow-hidden" role="progressbar" aria-valuenow={s.pct} aria-valuemin={0} aria-valuemax={100} aria-label={`${s.label}: ${s.pct}% this week`}>
                  <div
                    className="h-full bg-teal-400 rounded-full transition-all duration-700"
                    style={{ width: `${s.pct}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Nutrition summary */}
      <Card>
        <SectionHeader>Nutrition summary</SectionHeader>
        <p className="text-xs text-warm-500 mb-4">{weekMeals.length} meals logged this week</p>
        {weekMeals.length > 0 ? (
          <MacroChart
            proteinG={Math.round(weekMacros.protein / 7)}
            carbsG={Math.round(weekMacros.carbs / 7)}
            fatG={Math.round(weekMacros.fat / 7)}
          />
        ) : (
          <p className="text-sm text-warm-500 text-center py-4">No meals logged this week.</p>
        )}
        {weekMeals.length > 0 && (
          <p className="text-xs text-warm-400 mt-3 text-center">Daily averages based on logged meals</p>
        )}
      </Card>

      {/* Recommendations */}
      {recommendations.length > 0 && (
        <Card>
          <SectionHeader>Personalised recommendations</SectionHeader>
          <div className="space-y-3">
            {recommendations.map((r, i) => (
              <div key={i} className="flex items-start gap-3 p-3 bg-warm-50 rounded-xl text-sm">
                <span className="text-base shrink-0" aria-hidden="true">{r.icon}</span>
                <p className="text-warm-700 leading-relaxed">{r.text}</p>
              </div>
            ))}
          </div>
        </Card>
      )}

      {wins.length === 0 && recommendations.length === 0 && (
        <Card className="text-center py-8">
          <p className="text-warm-400 text-sm">Log some data this week to unlock personalised insights.</p>
        </Card>
      )}
    </div>
  )
}
