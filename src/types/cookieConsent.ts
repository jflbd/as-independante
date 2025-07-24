export type CookieConsentType = "accepted" | "rejected" | null;

export interface CookieConsentContextType {
  consent: CookieConsentType;
  setConsent: (consent: CookieConsentType) => void;
  showBanner: boolean;
  setShowBanner: (show: boolean) => void;
}
