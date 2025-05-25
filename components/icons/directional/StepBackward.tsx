import type { IconProps } from '@/components/icons/types';

export const StepBackward = ({ 
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
      <path fill="none" stroke="currentColor" strokeWidth={2} d="M19 5v14h-3V5h3zM4 12l9-7v14l-9-7z" />
    </svg>
  );
}; 