import clsx from 'clsx'

export default function Card({ children, className = '', as: Tag = 'div', ...props }) {
  return (
    <Tag
      className={clsx('bg-white rounded-2xl shadow-sm border border-warm-100 p-5', className)}
      {...props}
    >
      {children}
    </Tag>
  )
}
