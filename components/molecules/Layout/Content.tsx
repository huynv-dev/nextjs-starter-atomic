import clsx from "clsx";
import { LayoutProps } from "./Layout";

export function Content({ children, className = '' }: LayoutProps) {
  return <main className={clsx('flex-1 px-4 py-6 bg-white', className)}>{children}</main>;
}