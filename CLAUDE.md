# Steady — GLP-1 Maintenance Coach

## Project Overview

Steady is a web-based wellness coaching companion for adults who have completed a GLP-1 medication program (Ozempic, Wegovy, Mounjaro, etc.) and are now in the long-term weight maintenance phase. The app provides habit tracking, nutrition logging, weight trend visualization, and AI coaching via Anthropic's Claude API.

**This is a wellness tool, not a medical device.** All guidance is educational and does not replace the advice of a qualified healthcare provider.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 18 (Vite) |
| Styling | Tailwind CSS 3 |
| Charts | Recharts |
| Icons | Lucide React |
| AI Chat | Anthropic SDK (`claude-sonnet-4-20250514`) |
| Persistence | localStorage (MVP — no backend) |
| Date utils | date-fns |
| Utility | clsx |

---

## File Structure

```
src/
├── main.jsx                  # App entry point
├── App.jsx                   # Root: routing, global state
├── index.css                 # Tailwind directives + global styles
│
├── components/               # Reusable UI primitives
│   ├── layout/
│   │   ├── AppShell.jsx      # Outer shell: nav, sidebar, footer
│   │   ├── BottomNav.jsx     # Mobile bottom navigation
│   │   ├── Sidebar.jsx       # Desktop left sidebar
│   │   └── Disclaimer.jsx    # Medical disclaimer banner/modal
│   ├── ui/
│   │   ├── Button.jsx
│   │   ├── Card.jsx
│   │   ├── Input.jsx
│   │   ├── Badge.jsx
│   │   ├── ProgressRing.jsx  # SVG habit-completion ring
│   │   ├── Modal.jsx
│   │   └── Toast.jsx
│   └── charts/
│       ├── WeightChart.jsx   # Recharts line chart: actual vs target
│       ├── MacroChart.jsx    # Recharts bar/pie for macro breakdown
│       └── HabitHeatmap.jsx  # Calendar-style streak grid
│
├── pages/                    # Top-level route views
│   ├── Onboarding.jsx        # Multi-step profile setup
│   ├── Dashboard.jsx         # Home screen with rings + tips
│   ├── WeightTracker.jsx     # Log + chart weight entries
│   ├── NutritionLog.jsx      # Food + hydration logging
│   ├── HabitCoach.jsx        # Daily check-in + streaks
│   ├── Chat.jsx              # AI Sage coaching chat
│   ├── Insights.jsx          # Weekly summary report
│   └── Settings.jsx          # Profile + preferences
│
├── hooks/                    # Custom React hooks
│   ├── useProfile.js         # Read/write user profile from localStorage
│   ├── useWeightLog.js       # Weight entry CRUD
│   ├── useNutritionLog.js    # Meal/hydration entry CRUD
│   ├── useHabits.js          # Habit definitions + daily completions
│   ├── useInsights.js        # Derived weekly stats
│   └── useToast.js           # Toast notification state
│
└── utils/
    ├── storage.js            # localStorage helpers (get/set/clear)
    ├── calculations.js       # BMI, trend, macro % calculators
    ├── quotes.js             # Rotating motivational quotes (local)
    ├── glp1Tips.js           # GLP-1 maintenance dietary tips
    └── anthropic.js          # Anthropic API wrapper + Sage persona
```

---

## Component Map (Feature → Components)

| Feature | Page | Key Components |
|---|---|---|
| Onboarding | `Onboarding.jsx` | Multi-step form, Disclaimer |
| Dashboard | `Dashboard.jsx` | ProgressRing, WeightChart, Card, quotes |
| Weight Tracker | `WeightTracker.jsx` | WeightChart, Badge, Input |
| Nutrition Log | `NutritionLog.jsx` | MacroChart, Input, Card |
| Habit Coach | `HabitCoach.jsx` | ProgressRing, HabitHeatmap, Badge |
| AI Chat | `Chat.jsx` | Chat bubbles, anthropic.js |
| Insights | `Insights.jsx` | WeightChart, MacroChart, Card |
| Settings | `Settings.jsx` | Input, Button, Modal |

---

## Development Conventions

### State & Persistence
- All user data lives in `localStorage` under namespaced keys: `steady_profile`, `steady_weights`, `steady_meals`, `steady_habits`, `steady_chat_history`
- Custom hooks abstract all localStorage read/write — pages never call `localStorage` directly
- Always validate before writing; never store raw API responses

### Styling
- **Mobile-first**: base styles target 375px; use `sm:`, `md:`, `lg:` for larger breakpoints
- **Color palette**: `teal-*` for primary actions, `sage-*` for success/health states, `warm-*` for neutrals
- **Never** use red for weight-related feedback (clinical, not alarming); use `amber-*` for warnings
- Transitions: `transition-all duration-200 ease-in-out` as standard

### Accessibility (WCAG 2.1 AA)
- All interactive elements have visible focus rings: `focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500`
- All images/icons have `aria-label` or `aria-hidden="true"` if decorative
- Color is never the sole indicator of meaning; always pair with text/icon
- Minimum touch target: 44×44px

### Language & Tone
- Never use: "diet", "cheat", "fail", "bad food", "guilty", "restrict"
- Prefer: "nourishment", "maintenance goal", "opportunity", "mindful choice", "recalibrate"
- All weights shown in user's preferred unit (kg or lbs); convert at display layer, store internally as kg
- GLP-1 specific: reference "post-medication phase", "appetite recalibration", "metabolic adaptation"

### AI Chat (Sage)
- System prompt lives in `utils/anthropic.js` — update it there, not in components
- Sage never gives medical advice; always directs clinical questions to the user's healthcare team
- Chat history is stored in localStorage (last 50 messages max); anonymized — no PII in messages
- Graceful fallback: if API key is missing or call fails, show an offline Sage message

### Git Conventions
- Branch: `feature/<feature-name>`, `fix/<issue>`
- Commit style: conventional commits (`feat:`, `fix:`, `chore:`, `docs:`)

---

## Environment Variables

Create a `.env.local` file (never commit this):

```
VITE_ANTHROPIC_API_KEY=sk-ant-...
```

The key is accessed via `import.meta.env.VITE_ANTHROPIC_API_KEY`.

**Note:** In production, API calls should be proxied through a backend. For MVP, the key is used client-side. Do not deploy to a public URL with the key exposed.

---

## Medical Disclaimer

> Steady is a wellness coaching tool intended to support healthy lifestyle habits. It is not a medical device and does not provide medical advice, diagnosis, or treatment. Always consult your healthcare provider before making changes to your nutrition, exercise, or medication regimen. GLP-1 medication decisions should be made exclusively with your prescribing physician.
