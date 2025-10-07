import React, { useEffect, useState } from 'react';
import { Layout } from '@/components/Layout';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import { profileService, restaurantService } from '@/services/supabaseService';
import { Clock, Star } from 'lucide-react';

// Categorias
const categories = [
  {
    id: 'restaurants',
    name: 'Restaurantes',
    icon: (
      <div className="bg-orange-500 rounded-lg p-3 w-16 h-16 flex items-center justify-center">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="white" viewBox="0 0 16 16">
          <path d="M2.97 1.35A1 1 0 0 1 3.73 1h8.54a1 1 0 0 1 .76.35l2.609 3.044A1.5 1.5 0 0 1 16 5.37v.255a2.375 2.375 0 0 1-4.25 1.458A2.371 2.371 0 0 1 9.875 8 2.37 2.37 0 0 1 8 7.083 2.37 2.37 0 0 1 6.125 8a2.37 2.37 0 0 1-1.875-.917A2.375 2.375 0 0 1 0 5.625V5.37a1.5 1.5 0 0 1 .361-.976l2.61-3.045zm1.78 4.275a1.375 1.375 0 0 0 2.75 0 .5.5 0 0 1 1 0 1.375 1.375 0 0 0 2.75 0 .5.5 0 0 1 1 0 1.375 1.375 0 1 0 2.75 0V5.37a.5.5 0 0 0-.12-.325L12.27 2H3.73L1.12 5.045A.5.5 0 0 0 1 5.37v.255a1.375 1.375 0 0 0 2.75 0 .5.5 0 0 1 1 0zM1.5 8.5A.5.5 0 0 1 2 9v6h12V9a.5.5 0 0 1 1 0v6h.5a.5.5 0 0 1 0 1H.5a.5.5 0 0 1 0-1H1V9a.5.5 0 0 1 .5-.5zm2 .5a.5.5 0 0 1 .5.5V13h8V9.5a.5.5 0 0 1 1 0V13a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9.5a.5.5 0 0 1 .5-.5z"/>
        </svg>
      </div>
    ),
    link: '/restaurants?category=restaurants'
  },
  {
    id: 'desserts',
    name: 'Sobremesa',
    icon: (
      <div className="bg-pink-500 rounded-lg p-3 w-16 h-16 flex items-center justify-center">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="white" viewBox="0 0 16 16">
          <path d="M6 1a1.5 1.5 0 0 0-1.5 1.5H3a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-8a2 2 0 0 0-2-2h-1.5A1.5 1.5 0 0 0 10 1H6ZM5 3h6a1 1 0 0 1 1 1v1.5H4V4a1 1 0 0 1 1-1Zm7 6.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5ZM8 8v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5V8a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5Zm-3 0v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5V8a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5Zm8 1.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5ZM8 11v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5Zm-3 0v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5Z"/>
        </svg>
      </div>
    ),
    link: '/restaurants?category=desserts'
  }
];


const Index: React.FC = () => {
  const { user, loading } = useAuth();
  const [userName, setUserName] = useState('');
  const [restaurants, setRestaurants] = useState<any[]>([]);
  const [loadingRestaurants, setLoadingRestaurants] = useState(true);
  
  useEffect(() => {
    const fetchUserProfile = async () => {
      if (user) {
        try {
          const profile = await profileService.getProfile(user.id);
          setUserName(profile.display_name || profile.name);
        } catch (error) {
          console.error('Erro ao buscar perfil:', error);
          setUserName(user.email?.split('@')[0] || 'Usuário');
        }
      }
    };

    fetchUserProfile();
  }, [user]);

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        setLoadingRestaurants(true);
        const data = await restaurantService.getAll();
        setRestaurants(data);
      } catch (error) {
        console.error('Erro ao carregar restaurantes:', error);
      } finally {
        setLoadingRestaurants(false);
      }
    };

    fetchRestaurants();
  }, []);

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-background to-muted pt-20 pb-16">
        <div className="page-container">
          {/* Welcome Message */}
          {user && userName && (
            <div className="mb-6 p-4 glass-effect rounded-lg border border-primary/20">
              <h2 className="text-lg font-medium text-primary">Bem-vindo, {userName}!</h2>
              <p className="text-sm text-muted-foreground">O que você deseja pedir hoje?</p>
            </div>
          )}
          
          {/* Auth Message for Non-Logged Users */}
          {!user && !loading && (
            <div className="mb-6 p-6 bg-gradient-to-br from-primary/5 to-accent/5 rounded-lg border border-primary/10 text-center">
              <h2 className="text-xl font-semibold text-primary mb-2">Ambiente Personalizado Disponível</h2>
              <p className="text-muted-foreground mb-4">Faça login para acessar todas as funcionalidades</p>
              <Link to="/auth">
                <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                  Fazer Login
                </Button>
              </Link>
            </div>
          )}
          
          {/* Categories */}
          <div className="grid grid-cols-2 gap-4 sm:gap-6 mb-8">
            {categories.map((category) => (
              <Link 
                key={category.id}
                to={category.link}
                className="flex flex-col items-center"
              >
                {category.icon}
                <span className="mt-2 text-sm">{category.name}</span>
              </Link>
            ))}
          </div>
          
          {/* Restaurants Section */}
          <section>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">Restaurantes</h2>
              <Link to="/restaurants" className="text-sm text-primary hover:underline">
                Ver todos
              </Link>
            </div>
            
            {loadingRestaurants ? (
              <div className="text-center py-8">
                <p className="text-muted-foreground">Carregando restaurantes...</p>
              </div>
            ) : restaurants.length === 0 ? (
              <div className="text-center py-8 glass-effect rounded-lg">
                <p className="text-muted-foreground">Nenhum restaurante disponível no momento</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-4">
                {restaurants.slice(0, 4).map((restaurant) => (
                  <Link key={restaurant.id} to={`/restaurants/${restaurant.id}`} className="block">
                    <div className="flex items-center border border-border rounded-lg overflow-hidden bg-card hover:shadow-md hover:border-primary/30 transition-all">
                      <div className="w-24 h-24 bg-muted flex-shrink-0">
                        <img 
                          src={restaurant.image_url || 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'} 
                          alt={restaurant.name} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 p-4 min-w-0">
                        <h3 className="font-semibold text-base mb-1 truncate">{restaurant.name}</h3>
                        <p className="text-sm text-muted-foreground mb-2">{restaurant.cuisine}</p>
                        <div className="flex items-center gap-4 text-sm">
                          <div className="flex items-center text-yellow-500">
                            <Star className="h-4 w-4 fill-current mr-1" />
                            <span className="font-medium">{restaurant.rating || 0}</span>
                          </div>
                          <div className="flex items-center text-muted-foreground">
                            <Clock className="h-4 w-4 mr-1" />
                            <span>{restaurant.delivery_time}</span>
                          </div>
                        </div>
                        <p className="text-xs text-muted-foreground mt-2">
                          Pedido mín: R$ {restaurant.min_order?.toFixed(2) || '0.00'}
                        </p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </section>
        </div>
      </div>
    </Layout>
  );
};

export default Index;
