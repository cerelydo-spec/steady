import { format, subDays, startOfDay } from 'date-fns'
import clsx from 'clsx'

// Shows last 5 weeks of habit completion as a simple grid
export default function HabitHeatmap({ log, habitId, days = 35 }) {
  const today = startOfDay(new Date())

  const cells = Array.from({ length: days }, (_, i) => {
    const date = subDays(today, days - 1 - i)
    const key = format(date, 'yyyy-MM-dd')
    const done = log?.[key]?.[habitId] || false
    return { key, date, done }
  })

  // Group into weeks (rows of 7)
  const weeks = []
  for (let i = 0; i < cells.length; i += 7) {
    weeks.push(cells.slice(i, i + 7))
  }

  return (
    <div className="flex flex-col gap-1" role="img" aria-label={`${habitId} completion heatmap, last ${days} days`}>
      {weeks.map((week, wi) => (
        <div key={wi} className="flex gap-1">
          {week.map(cell => (
            <div
              key={cell.key}
              title={`${format(cell.date, 'MMM d')}: ${cell.done ? 'completed' : 'not logged'}`}
              className={clsx(
                'w-5 h-5 rounded-sm transition-colors',
                cell.done ? 'bg-teal-400' : 'bg-warm-100'
              )}
              aria-label={`${format(cell.date, 'MMM d')}: ${cell.done ? 'completed' : 'not logged'}`}
            />
          ))}
        </div>
      ))}
      <div className="flex items-center gap-2 mt-1 text-xs text-warm-400">
        <span className="w-3 h-3 rounded-sm bg-warm-100 inline-block" aria-hidden="true" /> Not logged
        <span className="w-3 h-3 rounded-sm bg-teal-400 inline-block ml-2" aria-hidden="true" /> Completed
      </div>
    </div>
  )
}
