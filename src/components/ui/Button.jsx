import clsx from 'clsx'

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  disabled = false,
  type = 'button',
  onClick,
  'aria-label': ariaLabel,
  ...props
}) {
  const base = 'inline-flex items-center justify-center gap-2 font-medium transition-all duration-200 focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed'

  const variants = {
    primary: 'bg-teal-500 hover:bg-teal-600 active:bg-teal-700 text-white rounded-xl',
    secondary: 'bg-warm-100 hover:bg-warm-200 active:bg-warm-300 text-warm-700 rounded-xl',
    ghost: 'hover:bg-warm-100 active:bg-warm-200 text-warm-600 rounded-xl',
    danger: 'bg-red-50 hover:bg-red-100 text-red-600 rounded-xl',
    sage: 'bg-sage-500 hover:bg-sage-600 text-white rounded-xl',
  }

  const sizes = {
    sm: 'px-3 py-1.5 text-xs',
    md: 'px-5 py-2.5 text-sm',
    lg: 'px-6 py-3 text-base',
    icon: 'p-2 text-sm',
  }

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      aria-label={ariaLabel}
      className={clsx(base, variants[variant], sizes[size], className)}
      {...props}
    >
      {children}
    </button>
  )
}
