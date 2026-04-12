import { PieChart, Pie, Cell, Tooltip } from 'recharts'
import { macroCalories } from '../../utils/calculations'

const COLORS = {
  protein: '#14b8a6',
  carbs: '#f59e0b',
  fat: '#a78bfa',
}

function CustomTooltip({ active, payload }) {
  if (!active || !payload?.length) return null
  const d = payload[0]
  return (
    <div className="bg-white rounded-xl shadow-lg border border-warm-100 p-3 text-sm">
      <p className="font-medium" style={{ color: d.payload.color }}>
        {d.name}: {d.value}g
      </p>
      <p className="text-warm-500 text-xs">{d.payload.kcal} kcal</p>
    </div>
  )
}

export default function MacroChart({ proteinG = 0, carbsG = 0, fatG = 0 }) {
  const totalKcal = macroCalories(proteinG, carbsG, fatG)

  const data = [
    { name: 'Protein', value: Math.round(proteinG), kcal: Math.round(proteinG * 4), color: COLORS.protein },
    { name: 'Carbs', value: Math.round(carbsG), kcal: Math.round(carbsG * 4), color: COLORS.carbs },
    { name: 'Fat', value: Math.round(fatG), kcal: Math.round(fatG * 9), color: COLORS.fat },
  ].filter(d => d.value > 0)

  if (data.length === 0) {
    return (
      <div className="flex items-center justify-center h-32 text-warm-400 text-sm">
        Log a meal to see your macro breakdown.
      </div>
    )
  }

  return (
    <div className="flex flex-col sm:flex-row items-center gap-4">
      {/* Fixed pixel dimensions — ResponsiveContainer expands to fill flex
          parents and must not be used when a precise size is needed. */}
      <div style={{ width: 140, height: 140, flexShrink: 0 }}>
        <PieChart width={140} height={140}>
          <Pie
            data={data}
            cx={70}
            cy={70}
            innerRadius={40}
            outerRadius={60}
            dataKey="value"
            strokeWidth={0}
          >
            {data.map((entry, i) => (
              <Cell key={i} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
        </PieChart>
      </div>

      <div className="space-y-2 flex-1 min-w-0">
        {data.map(d => (
          <div key={d.name} className="flex items-center gap-2 text-sm">
            <span
              className="w-2.5 h-2.5 rounded-full shrink-0"
              style={{ backgroundColor: d.color }}
              aria-hidden="true"
            />
            <span className="text-warm-700 min-w-[52px]">{d.name}</span>
            <span className="font-medium text-warm-900">{d.value}g</span>
            <span className="text-warm-400 text-xs ml-auto">{d.kcal} kcal</span>
          </div>
        ))}
        <div className="pt-1 border-t border-warm-100 flex justify-between text-xs text-warm-500">
          <span>Total</span>
          <span className="font-medium text-warm-700">{totalKcal} kcal</span>
        </div>
      </div>
    </div>
  )
}
