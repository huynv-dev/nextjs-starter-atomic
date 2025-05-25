import type { IconProps } from '@/components/icons/types';

export const User = ({ 
  size = 24, 
  className = '',
  ...props 
}: IconProps) => {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 32 32"
      aria-hidden="true"
      role="presentation"
      focusable="false"
      style={{ display: 'block', height: size, width: size, overflow: 'visible' }}
      className={className}
      {...props}
    >
      <path d="M16 1c4.97 0 9 4.03 9 9 0 3.92-2.51 7.24-6 8.48V21h2a3 3 0 0 1 3 3v4h2v2H6v-2h2v-4a3 3 0 0 1 3-3h2v-2.52c-3.49-1.24-6-4.56-6-8.48 0-4.97 4.03-9 9-9zm0 2C12.14 3 9 6.14 9 10c0 3.77 2.97 6.86 6.71 6.99l.29.01.2-.01c3.86-.13 6.8-3.22 6.8-6.99 0-3.86-3.14-7-7-7z"/>
    </svg>
  );
}; 