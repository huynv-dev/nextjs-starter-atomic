import { render, screen, fireEvent } from '@testing-library/react'
import { FormField } from './FormField'

test('renders label and input', () => {
  render(<FormField id="email" label="Email" placeholder="Enter email" />)
  expect(screen.getByText('Email')).toBeInTheDocument()
  expect(screen.getByPlaceholderText('Enter email')).toBeInTheDocument()
})

test('renders error message', () => {
  render(<FormField id="email" label="Email" error="Required" />)
  expect(screen.getByText('Required')).toBeInTheDocument()
})
