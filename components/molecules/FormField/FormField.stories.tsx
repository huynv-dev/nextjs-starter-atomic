import { useState } from 'react'
import { FormField } from './FormField'

export default {
  title: 'Molecules/FormField',
  component: FormField,
}

export const Default = () => {
  const [value, setValue] = useState('')
  return (
    <FormField
      id="email"
      label="Email"
      placeholder="you@example.com"
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  )
}

export const WithError = () => (
  <FormField
    id="email"
    label="Email"
    placeholder="you@example.com"
    error="Email is required"
  />
)
