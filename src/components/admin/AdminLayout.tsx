
import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { Home, Settings, Users, Package, Star, MessageSquare, DollarSign, LogOut, FileText } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { toast } from '@/hooks/use-toast';

const AdminLayout = () => {
  const location = useLocation();
  
  const menuItems = [
    { icon: Home, label: 'Tableau de bord', path: '/admin' },
    { icon: Settings, label: 'Contenu général', path: '/admin/content' },
    { icon: Users, label: 'À propos', path: '/admin/about' },
    { icon: MessageSquare, label: 'Témoignages', path: '/admin/testimonials' },
    { icon: Package, label: 'Services', path: '/admin/services' },
    { icon: Star, label: 'Missions', path: '/admin/missions' },
    { icon: DollarSign, label: 'Tarifs', path: '/admin/pricing' },
    { icon: FileText, label: 'Mentions légales', path: '/admin/legal' },
  ];

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut();
      toast({
        title: 'Déconnexion réussie',
        description: 'Vous avez été déconnecté avec succès.',
      });
      window.location.href = '/';
    } catch (error) {
      toast({
        title: 'Erreur de déconnexion',
        description: 'Une erreur est survenue lors de la déconnexion.',
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md">
        <div className="p-4 border-b">
          <h1 className="text-xl font-bold text-primary">Admin AS Indépendante</h1>
        </div>
        <nav className="p-4">
          <ul className="space-y-2">
            {menuItems.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`flex items-center p-2 rounded-lg hover:bg-gray-100 transition-colors ${
                    (location.pathname === item.path || 
                     (item.path !== '/admin' && location.pathname.startsWith(item.path))) 
                      ? 'bg-primary/10 text-primary font-medium' 
                      : 'text-gray-700'
                  }`}
                >
                  <item.icon className="h-5 w-5 mr-3" />
                  {item.label}
                </Link>
              </li>
            ))}
            <li className="pt-4 mt-4 border-t">
              <button
                onClick={handleSignOut}
                className="flex items-center w-full p-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
              >
                <LogOut className="h-5 w-5 mr-3" />
                Déconnexion
              </button>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-6 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
