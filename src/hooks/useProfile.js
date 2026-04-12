import { useState, useCallback } from 'react'
import { get, set, KEYS } from '../utils/storage'

export const DEFAULT_SETTINGS = {
  unit: 'kg',
  notifications: false,
}

export function useProfile() {
  const [profile, setProfileState] = useState(() => get(KEYS.PROFILE))
  const [settings, setSettingsState] = useState(
    () => get(KEYS.SETTINGS) || DEFAULT_SETTINGS
  )

  const saveProfile = useCallback((data) => {
    set(KEYS.PROFILE, data)
    setProfileState(data)
  }, [])

  const saveSettings = useCallback((data) => {
    set(KEYS.SETTINGS, data)
    setSettingsState(data)
  }, [])

  const isOnboarded = Boolean(profile?.name && profile?.currentWeightKg && profile?.goalWeightKg)

  return { profile, settings, saveProfile, saveSettings, isOnboarded }
}
