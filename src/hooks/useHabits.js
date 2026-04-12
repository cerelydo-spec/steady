import { useState, useCallback } from 'react'
import { get, set, KEYS } from '../utils/storage'
import { calcHabitStreak } from '../utils/calculations'
import { getLocalDateString } from '../utils/dateUtils'

export const DEFAULT_HABITS = [
  { id: 'sleep', label: 'Quality sleep (7–9 hrs)', icon: '🌙', color: 'indigo' },
  { id: 'movement', label: '30 min movement', icon: '🚶', color: 'teal' },
  { id: 'protein', label: 'Protein with every meal', icon: '🥚', color: 'sage' },
  { id: 'mindful', label: 'Mindful eating (no screens)', icon: '🍽️', color: 'amber' },
  { id: 'hydration', label: '8 glasses of water', icon: '💧', color: 'blue' },
  { id: 'stress', label: 'Stress management check-in', icon: '🧘', color: 'purple' },
]

export function useHabits() {
  const [habits, setHabits] = useState(
    () => get(KEYS.HABITS) || DEFAULT_HABITS
  )
  const [log, setLog] = useState(() => get(KEYS.HABIT_LOG) || {})

  const today = getLocalDateString()

  const toggleHabit = useCallback((habitId, date = today) => {
    setLog(prev => {
      const dayLog = prev[date] || {}
      const next = {
        ...prev,
        [date]: { ...dayLog, [habitId]: !dayLog[habitId] },
      }
      set(KEYS.HABIT_LOG, next)
      return next
    })
  }, [today])

  const getTodayLog = useCallback(() => log[today] || {}, [log, today])

  const getStreak = useCallback((habitId) => calcHabitStreak(log, habitId), [log])

  const getTodayCompletionCount = useCallback(() => {
    const dayLog = log[today] || {}
    return habits.filter(h => dayLog[h.id]).length
  }, [log, today, habits])

  const addCustomHabit = useCallback((habit) => {
    setHabits(prev => {
      const next = [...prev, { ...habit, id: `custom_${Date.now()}` }]
      set(KEYS.HABITS, next)
      return next
    })
  }, [])

  const removeHabit = useCallback((id) => {
    setHabits(prev => {
      const next = prev.filter(h => h.id !== id)
      set(KEYS.HABITS, next)
      return next
    })
  }, [])

  return {
    habits,
    log,
    today,
    toggleHabit,
    getTodayLog,
    getStreak,
    getTodayCompletionCount,
    addCustomHabit,
    removeHabit,
  }
}
