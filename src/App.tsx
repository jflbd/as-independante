
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Index from '@/pages/Index';
import LegalNotices from '@/pages/LegalNotices';
import NotFound from '@/pages/NotFound';
import { Toaster } from '@/components/ui/toaster';
import '@/App.css';
import AdminLogin from './pages/admin/AdminLogin';
import AdminLayout from './components/admin/AdminLayout';
import Dashboard from './pages/admin/Dashboard';
import ContentEditor from './pages/admin/ContentEditor';
import TestimonialsList from './pages/admin/TestimonialsList';
import TestimonialForm from './pages/admin/TestimonialForm';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/mentions-legales" element={<LegalNotices />} />
        
        {/* Routes Admin */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="content" element={<ContentEditor />} />
          <Route path="testimonials" element={<TestimonialsList />} />
          <Route path="testimonials/new" element={<TestimonialForm />} />
          <Route path="testimonials/:id" element={<TestimonialForm />} />
          {/* Autres routes à implémenter */}
        </Route>
        
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Toaster />
    </Router>
  );
}

export default App;
