import { useState, useCallback } from 'react'
import { get, set, KEYS } from '../utils/storage'
import { getLocalDateString } from '../utils/dateUtils'

// Remove onboarding-artifact entries that are more than 50 lbs (22.68 kg)
// above the median of all entries. Runs once on initialisation and persists
// the cleaned array so the phantom point never reappears.
function purgeOutlierEntries(entries) {
  if (entries.length < 2) return entries
  const sorted = [...entries].sort((a, b) => a.valueKg - b.valueKg)
  const mid = Math.floor(sorted.length / 2)
  const median = sorted.length % 2 === 0
    ? (sorted[mid - 1].valueKg + sorted[mid].valueKg) / 2
    : sorted[mid].valueKg
  const threshold = median + 22.68 // 50 lbs in kg
  return entries.filter(e => e.valueKg <= threshold)
}

export function useWeightLog() {
  const [entries, setEntries] = useState(() => {
    const stored = get(KEYS.WEIGHTS) || []
    const cleaned = purgeOutlierEntries(stored)
    if (cleaned.length !== stored.length) set(KEYS.WEIGHTS, cleaned)
    return cleaned
  })

  const addEntry = useCallback((valueKg, date = getLocalDateString(), note = '') => {
    setEntries(prev => {
      // Replace existing entry for the same date
      const filtered = prev.filter(e => e.date !== date)
      const next = [
        ...filtered,
        { id: Date.now(), date, valueKg: +valueKg, note },
      ].sort((a, b) => a.date.localeCompare(b.date))
      set(KEYS.WEIGHTS, next)
      return next
    })
  }, [])

  const removeEntry = useCallback((id) => {
    setEntries(prev => {
      const next = prev.filter(e => e.id !== id)
      set(KEYS.WEIGHTS, next)
      return next
    })
  }, [])

  const latestWeight = entries.length > 0
    ? entries[entries.length - 1].valueKg
    : null

  return { entries, addEntry, removeEntry, latestWeight }
}
