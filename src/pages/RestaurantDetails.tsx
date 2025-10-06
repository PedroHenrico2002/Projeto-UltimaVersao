import React, { useState, useEffect } from 'react';
import { Layout } from '@/components/Layout';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Minus, Plus, ShoppingCart, ChevronLeft, Star } from 'lucide-react';
import { toast } from 'sonner';
import { useCart } from '@/contexts/CartContext';
import { restaurantService, menuItemService } from '@/services/supabaseService';

const RestaurantDetails: React.FC = () => {
  const { restaurantId } = useParams<{ restaurantId: string }>();
  const navigate = useNavigate();
  const { addItem } = useCart();
  
  const [restaurant, setRestaurant] = useState<any>(null);
  const [menuItems, setMenuItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  
  useEffect(() => {
    const loadRestaurantData = async () => {
      if (!restaurantId) return;
      
      try {
        setLoading(true);
        const [restaurantData, menuData] = await Promise.all([
          restaurantService.getById(restaurantId),
          menuItemService.getByRestaurantId(restaurantId)
        ]);
        
        setRestaurant(restaurantData);
        setMenuItems(menuData);
      } catch (error) {
        console.error('Erro ao carregar dados:', error);
        toast.error('Erro ao carregar restaurante');
      } finally {
        setLoading(false);
      }
    };

    loadRestaurantData();
  }, [restaurantId]);
  
  const handleBack = () => {
    navigate(-1);
  };
  
  const handleQuantityChange = (itemId: string, delta: number) => {
    setQuantities(prev => {
      const current = prev[itemId] || 0;
      const newQuantity = Math.max(0, current + delta);
      return { ...prev, [itemId]: newQuantity };
    });
  };
  
  const handleAddToCart = (item: any) => {
    const quantity = quantities[item.id] || 1;
    
    for (let i = 0; i < quantity; i++) {
      addItem({
        id: item.id,
        restaurantId: item.restaurant_id,
        restaurantName: restaurant.name,
        name: item.name,
        price: item.price,
        image: item.image_url
      });
    }
    
    toast.success(`${quantity}x ${item.name} adicionado ao carrinho`);
    setQuantities(prev => ({ ...prev, [item.id]: 0 }));
  };
  
  if (loading) {
    return (
      <Layout>
        <div className="pt-20 pb-16">
          <div className="page-container">
            <div className="text-center py-8">Carregando...</div>
          </div>
        </div>
      </Layout>
    );
  }
  
  if (!restaurant) {
    return (
      <Layout>
        <div className="pt-28 pb-16">
          <div className="page-container">
            <div className="text-center">
              <h1 className="heading-lg mb-4">Restaurante não encontrado</h1>
              <Button onClick={handleBack}>
                Voltar
              </Button>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  // Group menu items by category
  const groupedItems = menuItems.reduce((acc, item) => {
    const category = item.category || 'Outros';
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(item);
    return acc;
  }, {} as Record<string, any[]>);

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-background to-muted pt-20 pb-16">
        <div className="page-container">
          {/* Back Button */}
          <Button
            variant="ghost"
            size="sm"
            onClick={handleBack}
            className="mb-4 flex items-center gap-2"
          >
            <ChevronLeft className="h-4 w-4" />
            Voltar
          </Button>

          {/* Restaurant Header */}
          <div className="mb-6">
            <div className="relative h-48 rounded-lg overflow-hidden mb-4">
              <img
                src={restaurant.image_url || 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'}
                alt={restaurant.name}
                className="w-full h-full object-cover"
              />
            </div>
            
            <h1 className="text-2xl font-bold mb-2">{restaurant.name}</h1>
            <p className="text-muted-foreground mb-2">{restaurant.cuisine}</p>
            
            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-1 text-yellow-500">
                <Star className="h-4 w-4 fill-current" />
                <span className="font-medium">{restaurant.rating || 0}</span>
              </div>
              <span className="text-muted-foreground">{restaurant.delivery_time}</span>
              <span className="text-muted-foreground">
                Pedido mínimo: R$ {restaurant.min_order?.toFixed(2)}
              </span>
            </div>
          </div>

          {/* Menu Items */}
          {menuItems.length === 0 ? (
            <div className="text-center py-8 glass-effect rounded-lg">
              <p className="text-muted-foreground">Nenhum item disponível no momento</p>
            </div>
          ) : (
            <div className="space-y-8">
              {Object.entries(groupedItems).map(([category, items]) => (
                <div key={category}>
                  <h2 className="text-xl font-bold mb-4">{category}</h2>
                  <div className="grid gap-4">
                    {(items as any[]).map((item) => {
                      const quantity = quantities[item.id] || 0;
                      
                      return (
                        <div
                          key={item.id}
                          className="glass-effect rounded-lg overflow-hidden border border-primary/10 hover:border-primary/30 transition-all"
                        >
                          <div className="flex gap-4 p-4">
                            {/* Item Image */}
                            <div className="w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden">
                              <img
                                src={item.image_url || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80'}
                                alt={item.name}
                                className="w-full h-full object-cover"
                              />
                            </div>

                            {/* Item Info */}
                            <div className="flex-1 min-w-0">
                              <h3 className="font-semibold mb-1">{item.name}</h3>
                              <p className="text-sm text-muted-foreground mb-2 line-clamp-2">
                                {item.description}
                              </p>
                              <div className="flex items-center gap-2 mb-2">
                                <span className="text-lg font-bold text-primary">
                                  R$ {item.price.toFixed(2)}
                                </span>
                                {item.rating && (
                                  <div className="flex items-center gap-1 text-sm">
                                    <Star className="h-3 w-3 fill-yellow-500 text-yellow-500" />
                                    <span>{item.rating}</span>
                                  </div>
                                )}
                              </div>

                              {/* Quantity Controls */}
                              <div className="flex items-center gap-3">
                                <div className="flex items-center gap-2 bg-background/50 rounded-lg p-1">
                                  <Button
                                    size="sm"
                                    variant="ghost"
                                    onClick={() => handleQuantityChange(item.id, -1)}
                                    disabled={quantity === 0}
                                    className="h-8 w-8 p-0"
                                  >
                                    <Minus className="h-4 w-4" />
                                  </Button>
                                  <span className="w-8 text-center font-medium">
                                    {quantity}
                                  </span>
                                  <Button
                                    size="sm"
                                    variant="ghost"
                                    onClick={() => handleQuantityChange(item.id, 1)}
                                    className="h-8 w-8 p-0"
                                  >
                                    <Plus className="h-4 w-4" />
                                  </Button>
                                </div>
                                
                                <Button
                                  size="sm"
                                  onClick={() => handleAddToCart(item)}
                                  disabled={quantity === 0}
                                  className="flex items-center gap-2"
                                >
                                  <ShoppingCart className="h-4 w-4" />
                                  Adicionar
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default RestaurantDetails;
