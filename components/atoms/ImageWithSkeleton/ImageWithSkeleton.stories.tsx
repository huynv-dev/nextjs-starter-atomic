import type { Meta, StoryObj } from '@storybook/react'
import ImageWithBlur from './ImageWithSkeleton'

const meta: Meta<typeof ImageWithBlur> = {
  title: 'Atoms/ImageWithBlur',
  component: ImageWithBlur,
  tags: ['autodocs'],
}
export default meta

type Story = StoryObj<typeof ImageWithBlur>

export const Default: Story = {
  args: {
    src: 'https://picsum.photos/id/1/400/300',
    alt: 'Blurred Image',
    width: 400,
    height: 300,
    blurDataURL: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCI+PC9zdmc+',
  },
} 