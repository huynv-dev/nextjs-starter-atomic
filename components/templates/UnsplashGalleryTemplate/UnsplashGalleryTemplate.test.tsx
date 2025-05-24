import { render, screen } from '@testing-library/react'
import UnsplashGalleryTemplate from './UnsplashGalleryTemplate'

describe('UnsplashGalleryTemplate', () => {
  it('renders title', () => {
    render(<UnsplashGalleryTemplate title="Test Gallery" />)
    expect(screen.getByText('Test Gallery')).toBeInTheDocument()
  })
}) 