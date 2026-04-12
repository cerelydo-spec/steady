import clsx from 'clsx'

const VARIANTS = {
  teal: 'bg-teal-100 text-teal-700',
  sage: 'bg-sage-100 text-sage-700',
  amber: 'bg-amber-100 text-amber-700',
  purple: 'bg-purple-100 text-purple-700',
  warm: 'bg-warm-100 text-warm-600',
  gold: 'bg-yellow-100 text-yellow-700',
}

export default function Badge({ children, variant = 'teal', className = '' }) {
  return (
    <span
      className={clsx(
        'inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium',
        VARIANTS[variant] || VARIANTS.teal,
        className
      )}
    >
      {children}
    </span>
  )
}
