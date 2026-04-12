// All weights stored internally as kg; convert at display layer
import { localDateString } from './dateUtils'

export function kgToLbs(kg) {
  return +(kg * 2.20462).toFixed(1)
}

export function lbsToKg(lbs) {
  return +(lbs / 2.20462).toFixed(2)
}

export function displayWeight(kg, unit) {
  if (!kg && kg !== 0) return '—'
  return unit === 'lbs' ? kgToLbs(kg) : +kg.toFixed(1)
}

export function parseWeight(value, unit) {
  const n = parseFloat(value)
  if (isNaN(n) || n <= 0) return null
  return unit === 'lbs' ? lbsToKg(n) : n
}

export function calcBMI(weightKg, heightCm) {
  if (!weightKg || !heightCm || heightCm <= 0) return null
  const heightM = heightCm / 100
  return +(weightKg / (heightM * heightM)).toFixed(1)
}

export function calcProgressPercent(currentKg, startKg, goalKg) {
  if (startKg === goalKg) return 100
  const total = Math.abs(startKg - goalKg)
  const done = Math.abs(startKg - currentKg)
  return Math.min(100, Math.max(0, Math.round((done / total) * 100)))
}

export function calcWeeklyTrend(weights) {
  // Compare most recent entry against the closest entry ~7 days before it.
  // Using a date-range window avoids the "last 7 entries" bug where monthly
  // weigh-ins would span the entire history and report a month's change as
  // a "weekly" trend.
  if (!weights || weights.length < 2) return null
  const sorted = [...weights].sort((a, b) => new Date(a.date) - new Date(b.date))
  const latest = sorted[sorted.length - 1]
  // Find the most recent entry that is at least 5 days older than the latest
  const cutoff = new Date(latest.date)
  cutoff.setDate(cutoff.getDate() - 5)
  const baseline = [...sorted]
    .reverse()
    .find(w => new Date(w.date) <= cutoff)
  if (!baseline) return null
  // Normalise the diff to a per-7-day rate so the label stays meaningful
  const daysDiff = Math.max(1,
    (new Date(latest.date) - new Date(baseline.date)) / 86400000
  )
  const rawDiff = latest.valueKg - baseline.valueKg
  const weeklyRate = (rawDiff / daysDiff) * 7
  return +weeklyRate.toFixed(2)
}

export function detectPlateau(weights, windowDays = 14, thresholdKg = 0.5) {
  if (!weights || weights.length < 3) return false
  const sorted = [...weights].sort((a, b) => new Date(a.date) - new Date(b.date))
  const cutoff = new Date()
  cutoff.setDate(cutoff.getDate() - windowDays)
  const recent = sorted.filter(w => new Date(w.date) >= cutoff)
  if (recent.length < 3) return false
  const min = Math.min(...recent.map(w => w.valueKg))
  const max = Math.max(...recent.map(w => w.valueKg))
  return (max - min) < thresholdKg
}

export function macroCalories(proteinG, carbsG, fatG) {
  return Math.round(proteinG * 4 + carbsG * 4 + fatG * 9)
}

export function calcMacroPercents(proteinG, carbsG, fatG) {
  const total = macroCalories(proteinG, carbsG, fatG)
  if (total === 0) return { protein: 0, carbs: 0, fat: 0 }
  return {
    protein: Math.round((proteinG * 4 / total) * 100),
    carbs: Math.round((carbsG * 4 / total) * 100),
    fat: Math.round((fatG * 9 / total) * 100),
  }
}

export function calcHabitStreak(log, habitId) {
  // log: { [dateISO]: { [habitId]: boolean } }
  if (!log) return 0
  const today = new Date()
  let streak = 0
  for (let i = 0; i < 365; i++) {
    const d = new Date(today)
    d.setDate(d.getDate() - i)
    const key = localDateString(d)
    if (log[key]?.[habitId]) {
      streak++
    } else {
      break
    }
  }
  return streak
}
