
import React, { createContext, useContext, useState, useEffect } from "react";

type CookieConsentType = "accepted" | "rejected" | null;

interface CookieConsentContextType {
  consent: CookieConsentType;
  setConsent: (consent: CookieConsentType) => void;
  showBanner: boolean;
  setShowBanner: (show: boolean) => void;
}

const CookieConsentContext = createContext<CookieConsentContextType | undefined>(undefined);

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

export const useCookieConsent = () => {
  const context = useContext(CookieConsentContext);
  if (context === undefined) {
    throw new Error("useCookieConsent must be used within a CookieConsentProvider");
  }
  return context;
};
