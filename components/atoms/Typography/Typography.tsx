import { ReactNode } from 'react';

interface TypographyProps {
  variant?: 'h1' | 'h2' | 'h3' | 'body1' | 'body2' | 'caption';
  color?: 'primary' | 'secondary' | 'rose';
  children: ReactNode;
  className?: string;
}

const variants = {
  h1: 'text-2xl font-bold',
  h2: 'text-xl font-semibold',
  h3: 'text-lg font-semibold',
  body1: 'text-base',
  body2: 'text-sm',
  caption: 'text-sm font-light'
};

const colors = {
  primary: 'text-neutral-900',
  secondary: 'text-neutral-500',
  rose: 'text-rose-500'
};

export function Typography({ 
  variant = 'body1',
  color = 'primary',
  children,
  className = ''
}: TypographyProps) {
  return (
    <div className={`${variants[variant]} ${colors[color]} ${className}`}>
      {children}
    </div>
  );
} 