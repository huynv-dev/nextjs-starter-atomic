import { FormField } from '@/components/molecules/FormField/FormField'
import { Button } from '@/components/atoms/Button/Button'
import styles from './checkoutForm.module.css'
import { useState } from 'react'

type Props = {
  onSubmit: (data: { name: string; email: string; address: string }) => void
}

export const CheckoutForm = ({ onSubmit }: Props) => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [address, setAddress] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit({ name, email, address })
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <FormField id="name" label="Name" value={name} onChange={(e) => setName(e.target.value)} />
      <FormField
        id="email"
        label="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <FormField
        id="address"
        label="Address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
      />
      <Button type="submit">Place Order</Button>
    </form>
  )
}
