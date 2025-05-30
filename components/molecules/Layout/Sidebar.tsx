import React from 'react';
import classNames from 'classnames';

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  collapsible?: boolean;
  collapsed?: boolean;
  onCollapse?: (collapsed: boolean) => void;
  width?: number;
  collapsedWidth?: number;
  className?: string;
}

export const Sidebar: React.FC<SidebarProps> = ({
  collapsible,
  collapsed = false,
  onCollapse,
  width = 200,
  collapsedWidth = 80,
  className,
  children,
  ...props
}) => {
  const currentWidth = collapsed ? collapsedWidth : width;

  return (
    <div
      data-testid="sidebar"
      className={classNames('transition-all duration-300 overflow-hidden', className)}
      style={{ width: currentWidth }}
      {...props}
    >
      {children}
    </div>
  );
};
