import clsx from "clsx";
import { LayoutProps } from "./Layout";

export function Header({ children, className = '' }: LayoutProps) {
  return <header className={clsx('h-16 px-4 bg-gray-200 flex items-center', className)}>{children}</header>;
}