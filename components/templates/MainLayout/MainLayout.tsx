'use client';

import { ReactNode, useState } from 'react';
import { LayoutContext } from '@/context/LayoutContext';
import { Header } from '@/components/organisms/Header';

interface LayoutState {
  disableScrollLogic?: boolean;
}

interface MainLayoutProps {
  children: ReactNode;
}

export const MainLayout = ({ children }: MainLayoutProps) => {
  const [layout, setLayout] = useState<LayoutState>({
    disableScrollLogic: false,
  });

  return (
    <LayoutContext.Provider value={{ ...layout, setLayout }}>
      <div className="min-h-screen">
        <Header />
        <main className={`${!layout.disableScrollLogic ? 'mt-[15%]' : 'mt-[1%]'}`}>
          {children}
        </main>
      </div>
    </LayoutContext.Provider>
  );
};
