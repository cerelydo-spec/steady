import { Home, Scale, UtensilsCrossed, CheckSquare, MessageCircle, BarChart2, Settings } from 'lucide-react'
import clsx from 'clsx'

const NAV_ITEMS = [
  { id: 'dashboard', label: 'Home', icon: Home },
  { id: 'weight', label: 'Weight', icon: Scale },
  { id: 'nutrition', label: 'Nutrition', icon: UtensilsCrossed },
  { id: 'habits', label: 'Habits', icon: CheckSquare },
  { id: 'chat', label: 'Sage', icon: MessageCircle },
]

export default function BottomNav({ currentPage, onNavigate }) {
  return (
    <nav
      aria-label="Main navigation"
      className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-warm-100 safe-area-bottom lg:hidden"
    >
      <div className="flex items-center justify-around h-16 max-w-lg mx-auto px-2">
        {NAV_ITEMS.map(({ id, label, icon: Icon }) => {
          const active = currentPage === id
          return (
            <button
              key={id}
              onClick={() => onNavigate(id)}
              aria-label={label}
              aria-current={active ? 'page' : undefined}
              className={clsx(
                'flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-xl transition-all duration-200 min-w-[44px] min-h-[44px] justify-center',
                active
                  ? 'text-teal-600'
                  : 'text-warm-400 hover:text-warm-600 hover:bg-warm-50'
              )}
            >
              <Icon
                size={20}
                aria-hidden="true"
                className={clsx('transition-all', active && 'scale-110')}
              />
              <span className="text-[10px] font-medium">{label}</span>
            </button>
          )
        })}
      </div>
    </nav>
  )
}
