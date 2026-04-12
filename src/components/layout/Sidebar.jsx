import {
  Home, Scale, UtensilsCrossed, CheckSquare,
  MessageCircle, BarChart2, Bookmark, Settings, Leaf
} from 'lucide-react'
import clsx from 'clsx'

const NAV_ITEMS = [
  { id: 'dashboard', label: 'Dashboard', icon: Home },
  { id: 'weight', label: 'Weight Tracker', icon: Scale },
  { id: 'nutrition', label: 'Nutrition Log', icon: UtensilsCrossed },
  { id: 'habits', label: 'Habit Coach', icon: CheckSquare },
  { id: 'chat', label: 'Sage Chat', icon: MessageCircle },
  { id: 'insights', label: 'Insights', icon: BarChart2 },
  { id: 'resources', label: 'Resources', icon: Bookmark },
]

export default function Sidebar({ currentPage, onNavigate }) {
  return (
    <aside
      aria-label="Application navigation"
      className="hidden lg:flex flex-col w-56 shrink-0 bg-white border-r border-warm-100 h-screen sticky top-0"
    >
      {/* Logo */}
      <div className="flex items-center gap-2.5 px-5 py-6 border-b border-warm-100">
        <div className="w-8 h-8 bg-teal-500 rounded-xl flex items-center justify-center">
          <Leaf size={16} className="text-white" aria-hidden="true" />
        </div>
        <div>
          <span className="text-warm-900 font-semibold text-sm">Steady</span>
          <p className="text-warm-400 text-[10px]">GLP-1 Maintenance</p>
        </div>
      </div>

      {/* Nav links */}
      <nav className="flex-1 px-3 py-4 space-y-0.5" aria-label="Main navigation">
        {NAV_ITEMS.map(({ id, label, icon: Icon }) => {
          const active = currentPage === id
          return (
            <button
              key={id}
              onClick={() => onNavigate(id)}
              aria-current={active ? 'page' : undefined}
              className={clsx(
                'w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200',
                active
                  ? 'bg-teal-50 text-teal-700'
                  : 'text-warm-600 hover:bg-warm-50 hover:text-warm-800'
              )}
            >
              <Icon size={17} aria-hidden="true" />
              {label}
            </button>
          )
        })}
      </nav>

      {/* Settings */}
      <div className="px-3 pb-5 border-t border-warm-100 pt-3">
        <button
          onClick={() => onNavigate('settings')}
          aria-current={currentPage === 'settings' ? 'page' : undefined}
          className={clsx(
            'w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200',
            currentPage === 'settings'
              ? 'bg-teal-50 text-teal-700'
              : 'text-warm-600 hover:bg-warm-50 hover:text-warm-800'
          )}
        >
          <Settings size={17} aria-hidden="true" />
          Settings
        </button>
      </div>
    </aside>
  )
}
