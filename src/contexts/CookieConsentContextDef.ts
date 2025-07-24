import { createContext } from "react";
import type { CookieConsentContextType } from "../types/cookieConsent";

export const CookieConsentContext = createContext<CookieConsentContextType | undefined>(undefined);
