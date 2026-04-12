const PREFIX = 'steady_'

export const KEYS = {
  PROFILE: 'profile',
  WEIGHTS: 'weights',
  MEALS: 'meals',
  HYDRATION: 'hydration',
  HABITS: 'habits',
  HABIT_LOG: 'habit_log',
  CHAT_HISTORY: 'chat_history',
  SETTINGS: 'settings',
}

export function get(key) {
  try {
    const raw = localStorage.getItem(PREFIX + key)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

export function set(key, value) {
  try {
    localStorage.setItem(PREFIX + key, JSON.stringify(value))
    return true
  } catch {
    return false
  }
}

export function remove(key) {
  try {
    localStorage.removeItem(PREFIX + key)
    return true
  } catch {
    return false
  }
}

export function clearAll() {
  try {
    Object.values(KEYS).forEach(k => localStorage.removeItem(PREFIX + k))
    return true
  } catch {
    return false
  }
}
