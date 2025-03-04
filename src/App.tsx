
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import LegalNotices from "./pages/LegalNotices";
import { CookieConsentProvider } from "./contexts/CookieConsentContext";
import CookieBanner from "./components/CookieBanner";
import CheckoutPage from "./pages/CheckoutPage";
import DownloadPage from "./pages/downloadPage";
import EbookPage from "./pages/EbookPage";

// Create a new query client instance
const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <CookieConsentProvider>
        <Toaster />
        <Sonner />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/mentions-legales" element={<LegalNotices />} />
          <Route path="/acheter-ebook" element={<CheckoutPage />} />
          <Route path="/telechargement-ebook" element={<DownloadPage />} />
          <Route path="/ebook" element={<EbookPage />} /> 
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        <CookieBanner />
      </CookieConsentProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
