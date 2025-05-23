import styles from './button.module.css'
import { cn } from '@/utils/cn'

type Variant = 'primary' | 'secondary' | 'danger' | 'outline' | 'ghost'
type Size = 'sm' | 'md' | 'lg'

type Props = {
  children: React.ReactNode
  variant?: Variant
  size?: Size
  loading?: boolean
} & React.ButtonHTMLAttributes<HTMLButtonElement>

export const Button = ({
  children,
  className,
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled,
  ...props
}: Props) => {
  return (
    <button
      className={cn(styles.button, styles[variant], styles[size], className)}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? 'Loading...' : children}
    </button>
  )
}
