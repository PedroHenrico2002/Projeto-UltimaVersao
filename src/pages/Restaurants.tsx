import React, { useState, useEffect } from 'react';
import { Layout } from '@/components/Layout';
import { Link, useSearchParams } from 'react-router-dom';
import { Search, ArrowDownAZ, Star, TrendingUp } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { restaurantService } from '@/services/supabaseService';

// Remove hardcoded data sections
const Restaurants: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState<'name' | 'rating'>('name');
  const [restaurants, setRestaurants] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  const categoryParam = searchParams.get('category');

  useEffect(() => {
    const loadRestaurants = async () => {
      try {
        setLoading(true);
        const data = await restaurantService.getAll();
        setRestaurants(data);
      } catch (error) {
        console.error('Error loading restaurants:', error);
        toast({
          title: "Erro ao carregar restaurantes",
          description: "Não foi possível carregar a lista de restaurantes.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    loadRestaurants();
  }, []);

  // Filter and sort restaurants
  const displayedRestaurants = React.useMemo(() => {
    let filtered = restaurants;
    
    // Apply category filter from URL parameter
    if (categoryParam) {
      if (categoryParam === 'desserts') {
        // Filter dessert restaurants
        filtered = filtered.filter((restaurant) =>
          restaurant.cuisine.toLowerCase().includes('doce') ||
          restaurant.cuisine.toLowerCase().includes('sorvete') ||
          restaurant.cuisine.toLowerCase().includes('açaí') ||
          restaurant.cuisine.toLowerCase().includes('confeitaria') ||
          restaurant.cuisine.toLowerCase().includes('gelato') ||
          restaurant.name.toLowerCase().includes('doce')
        );
      } else if (categoryParam === 'restaurants') {
        // Filter main restaurants (exclude desserts)
        filtered = filtered.filter((restaurant) =>
          !restaurant.cuisine.toLowerCase().includes('doce') &&
          !restaurant.cuisine.toLowerCase().includes('sorvete') &&
          !restaurant.cuisine.toLowerCase().includes('açaí') &&
          !restaurant.cuisine.toLowerCase().includes('confeitaria') &&
          !restaurant.cuisine.toLowerCase().includes('gelato')
        );
      }
    }
    
    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter((restaurant) => 
        restaurant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        restaurant.cuisine.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    // Apply sorting
    const sorted = [...filtered].sort((a, b) => {
      if (sortOption === 'name') {
        return a.name.localeCompare(b.name);
      } else if (sortOption === 'rating') {
        return b.rating - a.rating;
      }
      return 0;
    });
    
    return sorted;
  }, [restaurants, searchQuery, sortOption, categoryParam]);

  if (loading) {
    return (
      <Layout>
        <div className="pt-20 pb-16">
          <div className="page-container">
            <div className="text-center py-8">Carregando restaurantes...</div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="pt-20 pb-16">
        <div className="page-container">
          {/* Search and filters */}
          <div className="mb-6">
            <div className="relative mb-4">
              <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                <Search size={18} className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Buscar restaurantes..."
                className="w-full py-2 pl-10 pr-4 border border-gray-300 rounded-lg"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <div className="flex items-center justify-between mb-4">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="flex items-center text-sm">
                    Ordenar
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onClick={() => setSortOption('name')} className="flex items-center">
                    <ArrowDownAZ size={16} className="mr-2" />
                    <span>A-Z</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSortOption('rating')} className="flex items-center">
                    <Star size={16} className="mr-2" />
                    <span>Avaliação</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              
              {/* Category Filters */}
              <div className="flex items-center space-x-2">
                <Link 
                  to="/restaurants" 
                  className="text-sm px-3 py-1 rounded-full bg-gray-100 text-gray-800 hover:bg-gray-200"
                >
                  Todos os Restaurantes
                </Link>
              </div>
            </div>
          </div>
          
          {/* Restaurant Section */}
          <section className="mb-10">
            <h2 className="text-xl font-bold mb-6">
              {categoryParam === 'desserts' ? 'Sobremesas' : categoryParam === 'restaurants' ? 'Restaurantes' : 'Todos os Restaurantes'}
            </h2>
            
            <div className="grid grid-cols-1 gap-4">
              {displayedRestaurants.length > 0 ? (
                displayedRestaurants.map((restaurant) => (
                  <Link key={restaurant.id} to={`/restaurants/${restaurant.id}`} className="block">
                    <div className="flex items-center border rounded-lg overflow-hidden bg-white hover:shadow-md transition-shadow">
                      <div className="w-20 h-20 bg-gray-200">
                        <img 
                          src={restaurant.image_url || 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'} 
                          alt={restaurant.name} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 p-3">
                        <h3 className="font-medium">{restaurant.name}</h3>
                        <p className="text-xs text-gray-500">{restaurant.cuisine}</p>
                        <div className="flex items-center text-yellow-500 text-sm">
                          <span className="mr-1">★</span>
                          <span>{restaurant.rating}</span>
                        </div>
                        <div className="flex justify-between text-sm text-gray-500 mt-1">
                          <span>{restaurant.delivery_time}</span>
                          <span>R$ {restaurant.min_order.toFixed(2)}</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))
              ) : (
                <p className="text-center text-gray-500 my-8">Nenhum resultado encontrado.</p>
              )}
            </div>
          </section>
        </div>
      </div>
    </Layout>
  );
};

export default Restaurants;
