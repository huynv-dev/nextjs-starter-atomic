'use client';

import { createContext, useContext } from 'react';

interface LayoutState {
  disableScrollLogic?: boolean;

  setLayout?: (layout: Partial<LayoutState>) => void;
}

export const LayoutContext = createContext<LayoutState>({
  disableScrollLogic: false,
});

export const useLayout = () => useContext(LayoutContext);
