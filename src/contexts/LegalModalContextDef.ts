import { createContext } from 'react';
import type { LegalModalContextType } from "../types/legalModal";

export const LegalModalContext = createContext<LegalModalContextType | undefined>(undefined);
