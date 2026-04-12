import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceLine,
  Legend,
} from 'recharts'
import { format } from 'date-fns'
import { displayWeight } from '../../utils/calculations'

function CustomTooltip({ active, payload, label, unit, goalKg }) {
  if (!active || !payload?.length) return null
  return (
    <div className="bg-white rounded-xl shadow-lg border border-warm-100 p-3 text-sm">
      <p className="font-medium text-warm-700 mb-1">{label}</p>
      {payload.map((p) => (
        <p key={p.dataKey} style={{ color: p.color }}>
          {p.name}: <strong>{p.value} {unit}</strong>
        </p>
      ))}
      {goalKg && (
        <p className="text-warm-400 text-xs mt-1">
          Goal: {displayWeight(goalKg, unit)} {unit}
        </p>
      )}
    </div>
  )
}

export default function WeightChart({ entries, goalKg, unit = 'kg', height = 220 }) {
  if (!entries || entries.length === 0) {
    return (
      <div className="flex items-center justify-center h-40 text-warm-400 text-sm">
        No weight entries yet — log your first entry to see your trend.
      </div>
    )
  }

  const data = entries.slice(-30).map(e => ({
    date: format(new Date(e.date + 'T12:00:00'), 'MMM d'),
    weight: displayWeight(e.valueKg, unit),
  }))

  const goalDisplay = goalKg ? displayWeight(goalKg, unit) : null
  const allVals = data.map(d => d.weight).filter(Boolean)
  const padding = 2
  const domainMin = Math.max(0, Math.min(...allVals) - padding)
  const domainMax = Math.max(...allVals) + padding

  return (
    <ResponsiveContainer width="100%" height={height}>
      <LineChart data={data} margin={{ top: 5, right: 10, left: -10, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#e7e5e4" />
        <XAxis
          dataKey="date"
          tick={{ fontSize: 11, fill: '#78716c' }}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          domain={[domainMin, domainMax]}
          tick={{ fontSize: 11, fill: '#78716c' }}
          tickLine={false}
          axisLine={false}
          tickFormatter={v => `${v}`}
        />
        <Tooltip content={<CustomTooltip unit={unit} goalKg={goalKg} />} />
        {goalDisplay && (
          <ReferenceLine
            y={goalDisplay}
            stroke="#5a865a"
            strokeDasharray="5 5"
            strokeWidth={1.5}
            label={{ value: 'Goal', position: 'right', fontSize: 10, fill: '#5a865a' }}
          />
        )}
        <Line
          type="monotone"
          dataKey="weight"
          stroke="#14b8a6"
          strokeWidth={2.5}
          dot={{ r: 3, fill: '#14b8a6', strokeWidth: 0 }}
          activeDot={{ r: 5 }}
          name="Weight"
        />
      </LineChart>
    </ResponsiveContainer>
  )
}
