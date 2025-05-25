import type { IconProps } from '@/components/icons/types';

export const StepForward = ({ 
  size = 24, 
  className = '',
  ...props 
}: IconProps) => {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      aria-hidden="true"
      role="presentation"
      focusable="false"
      style={{ display: 'block', height: size, width: size }}
      className={className}
      {...props}
    >
      <path fill="none" stroke="currentColor" strokeWidth={2} d="M5 5v14h3V5H5zm15 7l-9 7V5l9 7z" />
    </svg>
  );
}; 