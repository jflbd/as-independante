
import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { FileText, Users, Star, MessageSquare, DollarSign, Folder } from 'lucide-react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const [stats, setStats] = useState({
    testimonials: 0,
    services: 0,
    pricing: 0,
    missions: 0,
  });

  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Récupérer le nombre de témoignages
        const { count: testimonialCount } = await supabase
          .from('testimonials')
          .select('*', { count: 'exact', head: true });

        // Récupérer le nombre de services
        const { count: serviceCount } = await supabase
          .from('services')
          .select('*', { count: 'exact', head: true });

        // Récupérer le nombre d'options de tarification
        const { count: pricingCount } = await supabase
          .from('pricing_options')
          .select('*', { count: 'exact', head: true });

        // Récupérer le nombre de missions
        const { count: missionCount } = await supabase
          .from('missions')
          .select('*', { count: 'exact', head: true });

        setStats({
          testimonials: testimonialCount || 0,
          services: serviceCount || 0,
          pricing: pricingCount || 0,
          missions: missionCount || 0,
        });
      } catch (error) {
        console.error('Erreur lors de la récupération des statistiques :', error);
      }
    };

    const getUserInfo = async () => {
      const { data } = await supabase.auth.getUser();
      setUser(data.user);
    };

    fetchStats();
    getUserInfo();
  }, []);

  const statCards = [
    { title: 'Témoignages', count: stats.testimonials, icon: MessageSquare, color: 'bg-blue-500', path: '/admin/testimonials' },
    { title: 'Services', count: stats.services, icon: FileText, color: 'bg-green-500', path: '/admin/services' },
    { title: 'Tarifs', count: stats.pricing, icon: DollarSign, color: 'bg-purple-500', path: '/admin/pricing' },
    { title: 'Missions', count: stats.missions, icon: Star, color: 'bg-orange-500', path: '/admin/missions' },
  ];

  return (
    <div>
      <header className="mb-8">
        <h1 className="text-2xl font-bold">Tableau de bord</h1>
        {user && (
          <p className="text-gray-600">
            Bienvenue, {user.email}
          </p>
        )}
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statCards.map((card) => (
          <Link 
            to={card.path}
            key={card.title} 
            className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition-shadow"
          >
            <div className="flex justify-between items-center">
              <div>
                <p className="text-gray-600">{card.title}</p>
                <h3 className="text-3xl font-bold">{card.count}</h3>
              </div>
              <div className={`${card.color} text-white p-3 rounded-full`}>
                <card.icon className="h-6 w-6" />
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white shadow-md rounded-lg p-6">
          <div className="flex items-center mb-4">
            <Folder className="h-6 w-6 text-primary mr-2" />
            <h2 className="text-lg font-semibold">Gestion du contenu</h2>
          </div>
          <ul className="space-y-2">
            <li>
              <Link to="/admin/content" className="text-primary hover:underline flex items-center">
                <FileText className="h-4 w-4 mr-2" />
                Modifier le contenu général
              </Link>
            </li>
            <li>
              <Link to="/admin/about" className="text-primary hover:underline flex items-center">
                <Users className="h-4 w-4 mr-2" />
                Gérer la section À propos
              </Link>
            </li>
          </ul>
        </div>

        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-lg font-semibold mb-4">Accès rapides</h2>
          <div className="grid grid-cols-2 gap-3">
            <Link 
              to="/admin/testimonials/new" 
              className="bg-gray-100 p-3 rounded-lg text-center hover:bg-gray-200 transition-colors"
            >
              Ajouter un témoignage
            </Link>
            <Link 
              to="/admin/services/new" 
              className="bg-gray-100 p-3 rounded-lg text-center hover:bg-gray-200 transition-colors"
            >
              Ajouter un service
            </Link>
            <Link 
              to="/admin/pricing/new" 
              className="bg-gray-100 p-3 rounded-lg text-center hover:bg-gray-200 transition-colors"
            >
              Ajouter un tarif
            </Link>
            <Link 
              to="/admin/missions/new" 
              className="bg-gray-100 p-3 rounded-lg text-center hover:bg-gray-200 transition-colors"
            >
              Ajouter une mission
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
