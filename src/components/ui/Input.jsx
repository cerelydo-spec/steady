import clsx from 'clsx'

export default function Input({
  label,
  id,
  error,
  hint,
  className = '',
  type = 'text',
  required = false,
  ...props
}) {
  return (
    <div className="space-y-1.5">
      {label && (
        <label htmlFor={id} className="block text-sm font-medium text-warm-700">
          {label}
          {required && <span className="text-amber-500 ml-1" aria-hidden="true">*</span>}
        </label>
      )}
      <input
        id={id}
        type={type}
        required={required}
        aria-invalid={error ? 'true' : undefined}
        aria-describedby={error ? `${id}-error` : hint ? `${id}-hint` : undefined}
        className={clsx(
          'w-full px-4 py-2.5 rounded-xl border bg-white text-warm-800 placeholder-warm-400 text-sm',
          'focus:outline-none focus:ring-1 transition-all duration-200',
          error
            ? 'border-red-300 focus:border-red-400 focus:ring-red-400'
            : 'border-warm-200 focus:border-teal-400 focus:ring-teal-400',
          className
        )}
        {...props}
      />
      {error && (
        <p id={`${id}-error`} className="text-xs text-red-600" role="alert">
          {error}
        </p>
      )}
      {hint && !error && (
        <p id={`${id}-hint`} className="text-xs text-warm-500">
          {hint}
        </p>
      )}
    </div>
  )
}
