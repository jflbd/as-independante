import { Routes, Route } from 'react-router-dom';
import Index from './pages/Index';
import LegalNotices from './pages/LegalNotices';
import EbookPage from './pages/EbookPage';
import CheckoutPage from './pages/CheckoutPage';
import TelechargementPage from './pages/TelechargementPage';
import NotFound from './pages/NotFound';
import './App.css';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/mentions-legales" element={<LegalNotices />} />
      <Route path="/ebook" element={<EbookPage />} />
      <Route path="/acheter-ebook" element={<CheckoutPage />} />
      <Route path="/telechargement-ebook" element={<TelechargementPage />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
