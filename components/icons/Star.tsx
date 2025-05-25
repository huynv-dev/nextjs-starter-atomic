import type { IconProps } from '@/components/icons/types';

export const Star = ({ 
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
      <path d="M16 1.695l4.604 9.331 10.296 1.498-7.45 7.262 1.758 10.249L16 25.341l-9.208 4.694 1.758-10.249-7.45-7.262 10.296-1.498L16 1.695z"/>
    </svg>
  );
}; 