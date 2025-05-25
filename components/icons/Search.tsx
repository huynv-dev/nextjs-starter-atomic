import type { IconProps } from '@/components/icons/types';

export const Search = ({ 
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
      <path fill="none" d="M13 24c6.075 0 11-4.925 11-11S19.075 2 13 2 2 6.925 2 13s4.925 11 11 11zm8-3 9 9"/>
    </svg>
  );
}; 