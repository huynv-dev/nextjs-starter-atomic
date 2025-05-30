import clsx from "clsx";
import { LayoutProps } from "./Layout";

export function Footer({ children, className = '' }: LayoutProps) {
  return <footer className={clsx('h-12 px-4 bg-gray-100 flex items-center', className)}>{children}</footer>;
}
