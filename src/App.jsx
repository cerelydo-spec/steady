import { useState } from 'react'
import AppShell from './components/layout/AppShell'
import ToastContainer from './components/ui/Toast'
import Onboarding from './pages/Onboarding'
import Dashboard from './pages/Dashboard'
import WeightTracker from './pages/WeightTracker'
import NutritionLog from './pages/NutritionLog'
import HabitCoach from './pages/HabitCoach'
import Chat from './pages/Chat'
import Insights from './pages/Insights'
import Resources from './pages/Resources'
import Settings from './pages/Settings'
import { useProfile } from './hooks/useProfile'
import { useWeightLog } from './hooks/useWeightLog'
import { useNutritionLog } from './hooks/useNutritionLog'
import { useHabits } from './hooks/useHabits'
import { useToast } from './hooks/useToast'
import { clearAll } from './utils/storage'

export default function App() {
  const [page, setPage] = useState('dashboard')
  const { profile, settings, saveProfile, saveSettings, isOnboarded } = useProfile()
  const { entries: weightEntries, addEntry: addWeight, removeEntry: removeWeight } = useWeightLog()
  const { meals, hydration, todayHydration, addMeal, removeMeal, setDayHydration, getMealsForDate, getTodayTotals } = useNutritionLog()
  const { habits, log: habitLog, today, toggleHabit, getTodayLog, getStreak, getTodayCompletionCount, addCustomHabit, removeHabit } = useHabits()
  const { toasts, addToast, removeToast } = useToast()

  const handleOnboardingComplete = (profileData) => {
    saveProfile(profileData)
    saveSettings({ unit: profileData.preferredUnit, notifications: false })
    setPage('dashboard')
  }

  const handleReset = () => {
    clearAll()
    window.location.reload()
  }

  if (!isOnboarded) {
    return <Onboarding onComplete={handleOnboardingComplete} />
  }

  const renderPage = () => {
    switch (page) {
      case 'dashboard':
        return (
          <Dashboard
            profile={profile}
            settings={settings}
            weightEntries={weightEntries}
            habits={habits}
            habitLog={habitLog}
            onNavigate={setPage}
            getTodayLog={getTodayLog}
            getStreak={getStreak}
            getTodayCompletionCount={getTodayCompletionCount}
          />
        )
      case 'weight':
        return (
          <WeightTracker
            profile={profile}
            settings={settings}
            entries={weightEntries}
            onAdd={addWeight}
            onRemove={removeWeight}
          />
        )
      case 'nutrition':
        return (
          <NutritionLog
            meals={meals}
            todayHydration={todayHydration}
            onAddMeal={addMeal}
            onRemoveMeal={removeMeal}
            onSetHydration={setDayHydration}
            getMealsForDate={getMealsForDate}
            getTodayTotals={getTodayTotals}
          />
        )
      case 'habits':
        return (
          <HabitCoach
            habits={habits}
            log={habitLog}
            today={today}
            onToggle={toggleHabit}
            onAdd={addCustomHabit}
            onRemove={removeHabit}
            getStreak={getStreak}
            getTodayLog={getTodayLog}
            getTodayCompletionCount={getTodayCompletionCount}
          />
        )
      case 'chat':
        return <Chat profile={profile} />
      case 'insights':
        return (
          <Insights
            profile={profile}
            settings={settings}
            weightEntries={weightEntries}
            meals={meals}
            habits={habits}
            habitLog={habitLog}
          />
        )
      case 'resources':
        return <Resources />
      case 'settings':
        return (
          <Settings
            profile={profile}
            settings={settings}
            onSaveSettings={saveSettings}
            onSaveProfile={saveProfile}
            onReset={handleReset}
            addToast={addToast}
          />
        )
      default:
        return null
    }
  }

  return (
    <>
      <AppShell currentPage={page} onNavigate={setPage}>
        {renderPage()}
      </AppShell>
      <ToastContainer toasts={toasts} onRemove={removeToast} />
    </>
  )
}
