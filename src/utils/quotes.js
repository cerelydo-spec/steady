// Maintenance-phase aware motivational quotes — clinical, empowering, non-toxic
const QUOTES = [
  {
    text: "Maintenance isn't the end of the journey — it's the journey itself.",
    author: 'POUDA PDG8 Wellness',
  },
  {
    text: "Small, consistent actions compound into lasting change. You're building infrastructure, not chasing milestones.",
    author: 'POUDA PDG8 Wellness',
  },
  {
    text: "Your appetite may have changed. Your relationship with food is still yours to shape.",
    author: 'POUDA PDG8 Wellness',
  },
  {
    text: "Progress isn't always visible on the scale. Sleep, energy, and ease of movement count too.",
    author: 'POUDA PDG8 Wellness',
  },
  {
    text: "Maintenance is a skill, not a willpower test. Skills are practiced, not performed perfectly.",
    author: 'POUDA PDG8 Wellness',
  },
  {
    text: "A harder week doesn't undo months of intentional choices.",
    author: 'POUDA PDG8 Wellness',
  },
  {
    text: "You didn't come this far to treat yourself as a problem to be solved.",
    author: 'POUDA PDG8 Wellness',
  },
  {
    text: "Hunger signals are information, not commands. You get to respond thoughtfully.",
    author: 'POUDA PDG8 Wellness',
  },
  {
    text: "The goal isn't perfection — it's a sustainable rhythm you can live inside.",
    author: 'POUDA PDG8 Wellness',
  },
  {
    text: "Rest is part of the protocol. Recovery is not optional.",
    author: 'POUDA PDG8 Wellness',
  },
  {
    text: "Your body is adapting. That takes time, patience, and a willingness to keep showing up.",
    author: 'POUDA PDG8 Wellness',
  },
  {
    text: "Protein first isn't a rule — it's a tool. Use it as it serves you.",
    author: 'POUDA PDG8 Wellness',
  },
  {
    text: "Weight fluctuates daily. Trends are what matter. Zoom out.",
    author: 'POUDA PDG8 Wellness',
  },
  {
    text: "You've already done the hard part once. Maintenance is about trusting what you've learned.",
    author: 'POUDA PDG8 Wellness',
  },
  {
    text: "Movement doesn't need to be intense to be meaningful. A walk counts.",
    author: 'POUDA PDG8 Wellness',
  },
]

export function getDailyQuote() {
  const dayOfYear = Math.floor(
    (Date.now() - new Date(new Date().getFullYear(), 0, 0)) / 86400000
  )
  return QUOTES[dayOfYear % QUOTES.length]
}

export default QUOTES
