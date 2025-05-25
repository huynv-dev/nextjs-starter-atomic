import type { IconProps } from '@/components/icons/types';

export const Menu = ({ 
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
      <g fill="none">
        <circle cx="16" cy="16" r="16" />
        <path d="M4 19h24v-2H4v2zm0-7h24v-2H4v2z" />
      </g>
    </svg>
  );
}; 