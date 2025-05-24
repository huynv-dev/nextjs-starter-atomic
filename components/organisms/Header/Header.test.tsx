import { render, screen } from '@testing-library/react'
import Header from './Header'
import '@testing-library/jest-dom'

describe('Header', () => {
  it('renders logo', () => {
    render(<Header />)
    expect(screen.getByText('Shop Demo')).toBeInTheDocument()
  })
  it('renders Unsplash Gallery link', () => {
    render(<Header />)
    expect(screen.getByText('Unsplash Gallery')).toBeInTheDocument()
  })
}) 