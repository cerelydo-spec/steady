import { TrendingDown, TrendingUp, Minus, ArrowRight } from 'lucide-react'
import { getLocalDateString } from '../utils/dateUtils'
import Card from '../components/ui/Card'
import Badge from '../components/ui/Badge'
import Button from '../components/ui/Button'
import ProgressRing from '../components/ui/ProgressRing'
import WeightChart from '../components/charts/WeightChart'
import { getDailyQuote } from '../utils/quotes'
import { getDailyTip } from '../utils/glp1Tips'
import { displayWeight, calcProgressPercent, calcWeeklyTrend, detectPlateau } from '../utils/calculations'

export default function Dashboard({ profile, settings, weightEntries, habits, habitLog, onNavigate, getTodayLog, getStreak, getTodayCompletionCount }) {
  const quote = getDailyQuote()
  const tip = getDailyTip()
  const unit = settings?.unit || 'kg'

  const today = getLocalDateString()
  const latestWeight = weightEntries.length > 0 ? weightEntries[weightEntries.length - 1].valueKg : null
  const todayLog = getTodayLog()
  const completedCount = getTodayCompletionCount()
  const completionPercent = habits.length > 0 ? Math.round((completedCount / habits.length) * 100) : 0

  const progressPercent = (profile?.startWeightKg && profile?.goalWeightKg && latestWeight)
    ? calcProgressPercent(latestWeight, profile.startWeightKg, profile.goalWeightKg)
    : null

  const weeklyTrend = calcWeeklyTrend(weightEntries)
  const plateau = detectPlateau(weightEntries)

  const TrendIcon = weeklyTrend === null
    ? Minus
    : weeklyTrend < -0.1 ? TrendingDown
    : weeklyTrend > 0.1 ? TrendingUp
    : Minus

  const trendColor = weeklyTrend === null ? 'text-warm-400'
    : weeklyTrend < -0.1 ? 'text-teal-500'
    : weeklyTrend > 0.1 ? 'text-amber-500'
    : 'text-warm-400'

  const greeting = () => {
    const h = new Date().getHours()
    if (h < 12) return 'Good morning'
    if (h < 17) return 'Good afternoon'
    return 'Good evening'
  }

  return (
    <div className="space-y-5 animate-fade-in">
      {/* Header */}
      <div>
        <h1 className="page-title">
          {greeting()}, {profile?.name?.split(' ')[0] || 'there'}
        </h1>
        <p className="text-warm-500 text-sm mt-1">
          {new Date().toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long' })}
        </p>
      </div>

      {/* Stat row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <StatCard
          label="Current weight"
          value={latestWeight ? `${displayWeight(latestWeight, unit)} ${unit}` : '—'}
          sub={latestWeight && profile?.goalWeightKg ? `Goal: ${displayWeight(profile.goalWeightKg, unit)} ${unit}` : 'Log your weight'}
          onClick={() => onNavigate('weight')}
        />
        <StatCard
          label="Weekly trend"
          value={weeklyTrend !== null ? `${weeklyTrend > 0 ? '+' : ''}${displayWeight(Math.abs(weeklyTrend), unit)} ${unit}` : '—'}
          sub={weeklyTrend !== null ? (weeklyTrend < 0 ? 'Trending down' : weeklyTrend > 0 ? 'Trending up' : 'Stable') : 'Need more data'}
          valueClass={trendColor}
          icon={<TrendIcon size={16} aria-hidden="true" />}
        />
        <StatCard
          label="Habits today"
          value={`${completedCount}/${habits.length}`}
          sub={`${completionPercent}% complete`}
          onClick={() => onNavigate('habits')}
        />
        {progressPercent !== null && (
          <StatCard
            label="Overall progress"
            value={`${progressPercent}%`}
            sub="Toward maintenance goal"
          />
        )}
      </div>

      {/* Plateau alert */}
      {plateau && (
        <div className="bg-amber-50 border border-amber-100 rounded-2xl p-4 flex items-start gap-3 text-sm">
          <span className="text-amber-500 text-lg leading-none" aria-hidden="true">⚡</span>
          <div>
            <p className="font-medium text-amber-800">Maintenance plateau detected</p>
            <p className="text-amber-700 mt-0.5">Your weight has been stable for two weeks — this is normal in maintenance. Sage can help you understand what's happening.</p>
            <Button variant="ghost" size="sm" onClick={() => onNavigate('chat')} className="mt-2 text-amber-700 hover:bg-amber-100">
              Chat with Sage <ArrowRight size={13} />
            </Button>
          </div>
        </div>
      )}

      {/* Daily quote */}
      <Card className="bg-gradient-to-br from-teal-50 to-sage-50 border-teal-100">
        <p className="text-sm font-medium text-teal-600 mb-2">Daily reflection</p>
        <blockquote className="text-warm-800 font-medium leading-relaxed">
          "{quote.text}"
        </blockquote>
        <p className="text-xs text-warm-400 mt-2">— {quote.author}</p>
      </Card>

      {/* Habit rings */}
      <Card>
        <div className="flex items-center justify-between mb-4">
          <h2 className="section-title">Today's habits</h2>
          <Button variant="ghost" size="sm" onClick={() => onNavigate('habits')}>
            View all <ArrowRight size={13} />
          </Button>
        </div>
        <div className="flex flex-wrap gap-x-4 gap-y-3 justify-around">
          {habits.slice(0, 6).map(h => (
            <div key={h.id} className="flex flex-col items-center gap-1.5 w-[60px]">
              <ProgressRing
                percent={todayLog[h.id] ? 100 : 0}
                size={60}
                strokeWidth={5}
                label={`${h.label}: ${todayLog[h.id] ? 'completed' : 'not done'}`}
              >
                <span className="text-xl leading-none" aria-hidden="true">{h.icon}</span>
              </ProgressRing>
              <span className="text-[10px] text-warm-500 text-center w-full leading-tight truncate" title={h.label}>
                {h.label.split('(')[0].trim().split(' ').slice(0, 2).join(' ')}
              </span>
            </div>
          ))}
        </div>
        {completedCount > 0 && (
          <div className="mt-4 pt-3 border-t border-warm-100 flex items-center justify-between">
            <span className="text-sm text-warm-600">
              {completedCount === habits.length
                ? '🎉 All habits complete today!'
                : `${completedCount} of ${habits.length} done`}
            </span>
            <ProgressRing
              percent={completionPercent}
              size={40}
              strokeWidth={4}
              label={`${completionPercent}% of today's habits complete`}
            >
              <span className="text-[10px] font-medium text-warm-700">{completionPercent}%</span>
            </ProgressRing>
          </div>
        )}
      </Card>

      {/* Weight chart */}
      <Card>
        <div className="flex items-center justify-between mb-4">
          <h2 className="section-title">Weight trend</h2>
          <Button variant="ghost" size="sm" onClick={() => onNavigate('weight')}>
            Log entry <ArrowRight size={13} />
          </Button>
        </div>
        <WeightChart
          entries={weightEntries}
          goalKg={profile?.goalWeightKg}
          unit={unit}
          height={180}
        />
      </Card>

      {/* Daily tip */}
      <Card>
        <div className="flex items-start gap-3">
          <div className="w-9 h-9 bg-sage-100 rounded-xl flex items-center justify-center shrink-0">
            <span className="text-base" aria-hidden="true">🌿</span>
          </div>
          <div>
            <p className="text-xs font-medium text-sage-600 mb-0.5">
              Maintenance tip · {tip.category}
            </p>
            <p className="text-sm text-warm-700 leading-relaxed">{tip.tip}</p>
          </div>
        </div>
      </Card>
    </div>
  )
}

function StatCard({ label, value, sub, onClick, valueClass = 'text-warm-900', icon }) {
  const Tag = onClick ? 'button' : 'div'
  return (
    <Tag
      onClick={onClick}
      className={`card flex flex-col gap-0.5 ${onClick ? 'hover:shadow-md transition-shadow cursor-pointer text-left' : ''}`}
    >
      <span className="text-xs text-warm-500">{label}</span>
      <span className={`text-lg font-semibold flex items-center gap-1 ${valueClass}`}>
        {icon}{value}
      </span>
      <span className="text-xs text-warm-400">{sub}</span>
    </Tag>
  )
}
