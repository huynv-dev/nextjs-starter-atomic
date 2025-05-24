import { render, screen } from '@testing-library/react'
import ImageWithBlur from './ImageWithSkeleton'

describe('ImageWithBlur', () => {
  it('renders image with blur placeholder', () => {
    render(
      <ImageWithBlur
        src="/test.jpg"
        alt="Test Alt"
        width={400}
        height={300}
        blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCI+PC9zdmc+"
      />
    )
    const img = screen.getByAltText('Test Alt')
    expect(img).toBeInTheDocument()
    expect(img).toHaveAttribute('src')
  })
}) 