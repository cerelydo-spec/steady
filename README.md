# Steady — GLP-1 Maintenance Coach

A personalized web coaching companion for adults in the weight maintenance phase following a GLP-1 medication program.

## Features

- **Onboarding** — Baseline profile setup with medical disclaimer
- **Dashboard** — Weight trend, habit rings, daily coaching tip
- **Weight Tracker** — Log entries, visualize progress vs. goal, milestone badges
- **Nutrition Log** — Meal logging with macro breakdown + hydration tracker
- **Habit Coach** — Daily check-ins, streaks, customizable habits
- **AI Chat (Sage)** — Anthropic-powered empathetic coaching assistant
- **Insights** — Weekly progress summary and recommendations
- **Settings** — Units, goals, notification preferences

## Setup

### Prerequisites
- Node.js 18+ 
- npm 9+

### Install dependencies

```bash
cd glp1-coach
npm install
```

### Configure environment

Create a `.env.local` file in the project root:

```
VITE_ANTHROPIC_API_KEY=sk-ant-your-key-here
```

Get your API key from [console.anthropic.com](https://console.anthropic.com).

> **Note:** For MVP, the API key is used client-side. Do not deploy to a public URL with the key exposed. For production, proxy API calls through a backend server.

### Run development server

```bash
npm run dev
```

App runs at [http://localhost:3000](http://localhost:3000)

### Build for production

```bash
npm run build
npm run preview
```

## Tech Stack

- **React 18** + **Vite**
- **Tailwind CSS** — mobile-first responsive design
- **Recharts** — weight and nutrition charts
- **Anthropic SDK** — AI coaching via Claude (`claude-sonnet-4-20250514`)
- **localStorage** — all user data stored locally, no backend required

## Data Privacy

All personal health data (weight logs, meal logs, habits, profile) is stored exclusively in your browser's localStorage. Only anonymized chat messages are sent to the Anthropic API to power the Sage coaching assistant. No data is transmitted to any other server.

## Medical Disclaimer

Steady is a wellness coaching tool and is **not a medical device**. It does not provide medical advice, diagnosis, or treatment. Always consult your healthcare provider before making changes to your nutrition, exercise, or medication regimen.

## License

MIT
