import React, { createContext, ReactNode } from 'react';

export interface ScrollPositionContextType {
  saveScrollPosition: () => void;
  restoreScrollPosition: () => void;
}

export const ScrollPositionContext = createContext<ScrollPositionContextType | undefined>(undefined);
