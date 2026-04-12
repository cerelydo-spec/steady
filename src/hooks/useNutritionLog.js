import { useState, useCallback } from 'react'
import { get, set, KEYS } from '../utils/storage'
import { getLocalDateString } from '../utils/dateUtils'

export function useNutritionLog() {
  const [meals, setMeals] = useState(() => get(KEYS.MEALS) || [])
  const [hydration, setHydration] = useState(() => get(KEYS.HYDRATION) || {})

  const today = getLocalDateString()

  const addMeal = useCallback((meal) => {
    const entry = {
      id: Date.now(),
      date: meal.date || today,
      name: meal.name,
      proteinG: +meal.proteinG || 0,
      carbsG: +meal.carbsG || 0,
      fatG: +meal.fatG || 0,
      notes: meal.notes || '',
    }
    setMeals(prev => {
      const next = [...prev, entry]
      set(KEYS.MEALS, next)
      return next
    })
  }, [today])

  const removeMeal = useCallback((id) => {
    setMeals(prev => {
      const next = prev.filter(m => m.id !== id)
      set(KEYS.MEALS, next)
      return next
    })
  }, [])

  const setDayHydration = useCallback((date, glasses) => {
    setHydration(prev => {
      const next = { ...prev, [date]: glasses }
      set(KEYS.HYDRATION, next)
      return next
    })
  }, [])

  const getMealsForDate = useCallback((date) => {
    return meals.filter(m => m.date === date)
  }, [meals])

  const getTodayTotals = useCallback(() => {
    const todayMeals = getMealsForDate(today)
    return todayMeals.reduce(
      (acc, m) => ({
        protein: acc.protein + m.proteinG,
        carbs: acc.carbs + m.carbsG,
        fat: acc.fat + m.fatG,
      }),
      { protein: 0, carbs: 0, fat: 0 }
    )
  }, [getMealsForDate, today])

  const todayHydration = hydration[today] || 0

  return {
    meals,
    hydration,
    todayHydration,
    addMeal,
    removeMeal,
    setDayHydration,
    getMealsForDate,
    getTodayTotals,
  }
}
