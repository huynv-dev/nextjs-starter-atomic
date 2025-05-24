import { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  fullWidth?: boolean;
}

const variants = {
  primary: 'bg-rose-500 hover:bg-rose-600 text-white',
  secondary: 'bg-neutral-200 hover:bg-neutral-300 text-neutral-800',
  outline: 'border border-neutral-200 hover:border-neutral-300'
};

export function Button({ 
  variant = 'primary',
  fullWidth = false,
  className = '',
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={`
        ${variants[variant]}
        ${fullWidth ? 'w-full' : ''}
        py-3 px-4
        rounded-lg
        transition
        font-medium
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
}
