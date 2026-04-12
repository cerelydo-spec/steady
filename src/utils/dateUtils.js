/**
 * Returns a YYYY-MM-DD string in the user's LOCAL timezone.
 * Never use new Date().toISOString().slice(0,10) for "today" —
 * toISOString() is UTC and will be one day behind for UTC- timezones
 * in the evening, and one day ahead for UTC+ timezones near midnight.
 */
export function localDateString(date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`
}

export function getLocalDateString() {
  return localDateString(new Date())
}
