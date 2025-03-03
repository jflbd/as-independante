
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
import ServicesList from './pages/admin/ServicesList';
import ServicesForm from './pages/admin/ServicesForm';
import MissionsList from './pages/admin/MissionsList';
import MissionsForm from './pages/admin/MissionsForm';
import PricingList from './pages/admin/PricingList';
import PricingForm from './pages/admin/PricingForm';
import AboutEdit from './pages/admin/AboutEdit';

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
          <Route path="about" element={<AboutEdit />} />
          <Route path="testimonials" element={<TestimonialsList />} />
          <Route path="testimonials/new" element={<TestimonialForm />} />
          <Route path="testimonials/:id" element={<TestimonialForm />} />
          <Route path="services" element={<ServicesList />} />
          <Route path="services/new" element={<ServicesForm />} />
          <Route path="services/:id" element={<ServicesForm />} />
          <Route path="missions" element={<MissionsList />} />
          <Route path="missions/new" element={<MissionsForm />} />
          <Route path="missions/:id" element={<MissionsForm />} />
          <Route path="pricing" element={<PricingList />} />
          <Route path="pricing/new" element={<PricingForm />} />
          <Route path="pricing/:id" element={<PricingForm />} />
        </Route>
        
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Toaster />
    </Router>
  );
}

export default App;
