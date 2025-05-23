import { Label } from '@/components/atoms/Label/Label'
import { Input } from '@/components/atoms/Input/Input'
import styles from './formField.module.css'

type Props = {
  id: string
  label: string
  placeholder?: string
  value?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  error?: string
}

export const FormField = ({ id, label, placeholder, value, onChange, error }: Props) => {
  return (
    <div className={styles.wrapper}>
      <Label htmlFor={id}>{label}</Label>
      <Input id={id} placeholder={placeholder} value={value} onChange={onChange} />
      {error && <p className={styles.error}>{error}</p>}
    </div>
  )
}
