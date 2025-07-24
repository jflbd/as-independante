
import React, { useState, useEffect } from "react";
import type { CookieConsentType } from "../types/cookieConsent";
import { CookieConsentContext } from "./CookieConsentContextDef";

export const CookieConsentProvider = ({ children }: { children: React.ReactNode }) => {
  const [consent, setConsentState] = useState<CookieConsentType>(null);
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    // Check if user has already set cookie preferences
    const savedConsent = localStorage.getItem("cookieConsent");
    if (savedConsent) {
      setConsentState(savedConsent as CookieConsentType);
    } else {
      // Show banner after a small delay
      const timer = setTimeout(() => {
        setShowBanner(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const setConsent = (newConsent: CookieConsentType) => {
    setConsentState(newConsent);
    if (newConsent) {
      localStorage.setItem("cookieConsent", newConsent);
      setShowBanner(false);
    }
  };

  return (
    <CookieConsentContext.Provider value={{ consent, setConsent, showBanner, setShowBanner }}>
      {children}
    </CookieConsentContext.Provider>
  );
};
