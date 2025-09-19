import React, { useEffect, useState } from 'react';
import { Layout } from '@/components/Layout';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChevronLeft, ShoppingBag, MapPin } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useCart } from '@/contexts/CartContext';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/lib/toast';

const ConfirmOrder: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { items, getTotalPrice, getRestaurantId } = useCart();
  const [loading, setLoading] = useState(false);
  const [userAddress, setUserAddress] = useState<any>(null);
  const [restaurant, setRestaurant] = useState<any>(null);

  useEffect(() => {
    if (items.length === 0) {
      toast.error('Carrinho vazio');
      navigate('/cart');
      return;
    }

    fetchUserData();
    fetchRestaurantData();
  }, [items, navigate, user]);

  const fetchUserData = async () => {
    if (!user) return;

    try {
      const { data: addresses } = await supabase
        .from('addresses')
        .select('*')
        .eq('user_id', user.id)
        .eq('is_default', true)
        .limit(1);

      if (addresses && addresses.length > 0) {
        setUserAddress(addresses[0]);
      }
    } catch (error) {
      console.error('Erro ao buscar endereço:', error);
    }
  };

  const fetchRestaurantData = async () => {
    const restaurantId = getRestaurantId();
    if (!restaurantId) return;

    try {
      const { data } = await supabase
        .from('restaurants')
        .select('*')
        .eq('id', restaurantId)
        .single();

      if (data) {
        setRestaurant(data);
      }
    } catch (error) {
      console.error('Erro ao buscar restaurante:', error);
    }
  };

  const handleConfirmOrder = () => {
    if (!user) {
      toast.error('Faça login para continuar');
      navigate('/auth');
      return;
    }

    if (!userAddress) {
      toast.error('Configure um endereço de entrega');
      navigate('/profile');
      return;
    }

    navigate('/checkout');
  };

  const subtotal = getTotalPrice();
  const deliveryFee = restaurant?.delivery_fee || 5.99;
  const total = subtotal + deliveryFee;

  if (items.length === 0) {
    return (
      <Layout>
        <div className="pt-20 pb-16">
          <div className="page-container">
            <div className="text-center">
              <p>Carregando pedido...</p>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="pt-20 pb-16">
        <div className="page-container">
          <div className="mb-6">
            <Link
              to="/cart"
              className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <ChevronLeft size={16} className="mr-1" />
              Voltar ao Carrinho
            </Link>
          </div>

          <h1 className="text-2xl font-bold mb-6">Confirmar Pedido</h1>

          <div className="max-w-2xl mx-auto space-y-6">
            {/* Resumo do Pedido */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <ShoppingBag size={18} className="mr-2" />
                  Itens do Pedido
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {restaurant && (
                  <div className="text-sm text-muted-foreground mb-4">
                    Restaurante: <span className="font-medium">{restaurant.name}</span>
                  </div>
                )}
                
                {items.map((item) => {
                  const optionsPrice = item.options?.reduce((total, opt) => total + opt.price, 0) || 0;
                  const itemTotal = (item.price + optionsPrice) * item.quantity;
                  
                  return (
                    <div key={item.id} className="flex justify-between">
                      <div className="flex items-start">
                        <span className="bg-primary/10 text-primary w-6 h-6 rounded-full flex items-center justify-center mr-2 text-sm font-medium">
                          {item.quantity}
                        </span>
                        <div>
                          <span className="block font-medium">{item.name}</span>
                          {item.options && item.options.length > 0 && (
                            <div className="text-sm text-muted-foreground">
                              {item.options.map((option, index) => (
                                <span key={index} className="block">
                                  {option.name}: {Array.isArray(option.value) ? option.value.join(', ') : option.value}
                                  {option.price > 0 && ` (+R$${option.price.toFixed(2)})`}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                      <span className="font-medium">R$ {itemTotal.toFixed(2)}</span>
                    </div>
                  );
                })}
                
                <div className="border-t pt-4 space-y-2">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>R$ {subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Taxa de entrega</span>
                    <span>R$ {deliveryFee.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between font-semibold text-lg border-t pt-2">
                    <span>Total</span>
                    <span>R$ {total.toFixed(2)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Endereço de Entrega */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MapPin size={18} className="mr-2" />
                  Endereço de Entrega
                </CardTitle>
              </CardHeader>
              <CardContent>
                {userAddress ? (
                  <div>
                    <p className="font-medium">
                      {userAddress.street}, {userAddress.number}
                    </p>
                    <p className="text-muted-foreground">
                      {userAddress.neighborhood} - {userAddress.city}, {userAddress.state}
                    </p>
                    <p className="text-muted-foreground">CEP: {userAddress.zip_code}</p>
                    {userAddress.complement && (
                      <p className="text-muted-foreground">{userAddress.complement}</p>
                    )}
                  </div>
                ) : (
                  <div className="text-center py-4">
                    <p className="text-muted-foreground mb-2">Nenhum endereço configurado</p>
                    <Button variant="outline" onClick={() => navigate('/profile')}>
                      Adicionar Endereço
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            <Button 
              className="w-full h-12 text-lg"
              onClick={handleConfirmOrder}
              disabled={loading || !userAddress}
            >
              {loading ? 'Processando...' : 'Prosseguir para Pagamento'}
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ConfirmOrder;