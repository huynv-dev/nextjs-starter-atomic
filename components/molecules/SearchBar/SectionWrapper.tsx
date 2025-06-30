'use client'

import { Button, ButtonProps } from "@/components/atoms/Button/Button";
import clsx from "clsx";
import { ReactNode } from "react";

interface SectionWrapperProps extends ButtonProps {
  children: ReactNode;
  className?: string;
  styleActive?: string;
  showRightBorder?: boolean;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  onClick?: () => void;
  isActive?: any;
  isHover?: boolean
}
export const SectionWrapper = ({
  children,
  className = '',
  styleActive = '',
  onMouseEnter,
  onMouseLeave,
  onClick,
  showRightBorder = false,
  isActive,
  isHover
}: SectionWrapperProps) => (
  <div className={clsx('relative group', className)}>
    <Button
      type="secondary"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={onClick}
      className={`
        flex flex-col items-start py-[18px] px-3 w-full text-left transition-colors 
        rounded-full
        ${isActive == null ? 'hover:bg-gray-100' : ''}
        ${styleActive}
        `}
    >
      {children}
    </Button>
    {!showRightBorder && (
      <div className="absolute top-1/2 right-0 h-8 w-px bg-gray-300 -translate-y-1/2 transition-opacity" />
    )}
  </div>
);