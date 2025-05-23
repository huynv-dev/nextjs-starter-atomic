import { Button } from './Button'

export default {
  title: 'Atoms/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'danger', 'outline', 'ghost'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
  },
}

export const Playground = {
  args: {
    children: 'Click Me',
    variant: 'primary',
    size: 'md',
    loading: false,
  },
}

export const AllVariants = () => (
  <div style={{ display: 'flex', flexDirection: 'row', gap: '1rem' }}>
    <Button variant="primary">Primary</Button>
    <Button variant="secondary">Secondary</Button>
    <Button variant="danger">Danger</Button>
    <Button variant="outline">Outline</Button>
    <Button variant="ghost">Ghost</Button>
  </div>
)

export const Sizes = () => (
  <div style={{ display: 'flex', gap: '1rem' }}>
    <Button size="sm">Small</Button>
    <Button size="md">Medium</Button>
    <Button size="lg">Large</Button>
  </div>
)

export const LoadingState = () => (
  <Button loading>Loading Button</Button>
)

export const Disabled = () => (
  <Button disabled>Disabled Button</Button>
)
