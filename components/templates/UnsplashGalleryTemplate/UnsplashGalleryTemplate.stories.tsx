import type { Meta, StoryObj } from '@storybook/react'
import UnsplashGalleryTemplate from './UnsplashGalleryTemplate'

const meta: Meta<typeof UnsplashGalleryTemplate> = {
  title: 'Templates/UnsplashGalleryTemplate',
  component: UnsplashGalleryTemplate,
  tags: ['autodocs'],
}
export default meta

type Story = StoryObj<typeof UnsplashGalleryTemplate>

export const Default: Story = {
  args: {
    title: 'Unsplash Gallery',
  },
} 