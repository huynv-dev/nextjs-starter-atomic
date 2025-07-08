'use client'

import clsx from "clsx";
import { ReactNode } from "react";

interface DropdownProps {
  isOpen: boolean;
  onClose?: () => void;
  className?: string;
  position?: 'left' | 'center' | 'right';
  width?: string;
  children: ReactNode;
  ref?: React.Ref<HTMLDivElement>;
}

export const DropdownContainer = ({
  isOpen,
  onClose,
  className = '',
  position = 'left',
  width = 'w-[425px]',
  children,
  ref
}: DropdownProps) => {
  if (!isOpen) return null;

  const positionClasses = {
    left: 'left-0',
    center: 'left-1/2 -translate-x-1/2',
    right: 'right-0'
  };

  return (
    <div
      ref={ref}
      className={clsx(
        'absolute top-full mt-2 bg-white border rounded-3xl shadow-xl z-50 px-[2px] py-[20px]',
        width,
        positionClasses[position],
        className
      )}
      onClick={(e) => e.stopPropagation()}
    >
      {children}
    </div>
  );
};