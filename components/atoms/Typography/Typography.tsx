import { ReactNode } from 'react';
import clsx from 'clsx';

type Level = 1 | 2 | 3 | 4 | 5;

interface TypographyProps {
  variant?: 'title' | 'text' | 'link' | 'paragraph';
  level?: Level;
  type?: 'default' | 'secondary' | 'success' | 'warning' | 'danger';
  disabled?: boolean;
  mark?: boolean;
  code?: boolean;
  keyboard?: boolean;
  underline?: boolean;
  delete?: boolean;
  strong?: boolean;
  italic?: boolean;
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}

const levelClasses = {
  1: 'text-4xl',
  2: 'text-3xl',
  3: 'text-2xl',
  4: 'text-xl',
  5: 'text-lg'
};

const variantClasses = {
  title: 'font-semibold tracking-tight',
  text: 'text-base',
  link: 'text-blue-600 hover:text-blue-500 cursor-pointer',
  paragraph: 'text-base leading-relaxed'
};

const typeClasses = {
  default: 'text-gray-900',
  secondary: 'text-gray-600',
  success: 'text-green-600',
  warning: 'text-yellow-600',
  danger: 'text-red-600'
};

export function Typography({
  variant = 'text',
  level = 1,
  type = 'default',
  disabled = false,
  mark = false,
  code = false,
  keyboard = false,
  underline = false,
  delete: isDelete = false,
  strong = false,
  italic = false,
  children,
  className = '',
  onClick
}: TypographyProps) {
  const Component = variant === 'title' ? `h${level}` : variant === 'paragraph' ? 'p' : 'span';

  const classes = clsx(
    // Base styles
    'transition-colors',
    variantClasses[variant],
    variant === 'title' && levelClasses[level],
    typeClasses[type],

    // States
    disabled && 'opacity-50 cursor-not-allowed',
    mark && 'bg-yellow-200 p-0.5',
    code && 'font-mono bg-gray-100 rounded px-1.5 py-0.5',
    keyboard && 'font-mono border border-gray-200 bg-gray-50 rounded px-1.5 py-0.5',
    underline && 'underline underline-offset-4',
    isDelete && 'line-through',
    strong && 'font-bold',
    italic && 'italic',
    
    // Custom classes
    className
  );

  const content = (
    // @ts-ignore - Dynamic component
    <Component 
      className={classes}
      onClick={!disabled ? onClick : undefined}
    >
      {children}
    </Component>
  );

  return content;
}

// Title component
export function Title(props: Omit<TypographyProps, 'variant'>) {
  return <Typography {...props} variant="title" />;
}

// Text component
export function Text(props: Omit<TypographyProps, 'variant'>) {
  return <Typography {...props} variant="text" />;
}

// Link component
export function Link(props: Omit<TypographyProps, 'variant'>) {
  return <Typography {...props} variant="link" />;
}

// Paragraph component
export function Paragraph(props: Omit<TypographyProps, 'variant'>) {
  return <Typography {...props} variant="paragraph" />;
} 