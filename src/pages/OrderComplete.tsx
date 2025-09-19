import React, { useEffect, useState } from 'react';
import { Layout } from '@/components/Layout';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Check, ShoppingBag, MapPin, Clock } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/lib/toast';
import confetti from 'canvas-confetti';

interface OrderData {
  id: string;
  items: any[];
  total: number;
  subtotal: number;
  delivery_fee: number;
  restaurant_id: string;
  delivery_address_id: string;
  status: string;
  created_at: string;
  payment_method: string;
}

const OrderComplete: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();
  const [orderData, setOrderData] = useState<OrderData | null>(null);
  const [restaurant, setRestaurant] = useState<any>(null);
  const [address, setAddress] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const orderId = location.state?.orderId;
  const orderFromState = location.state?.orderData;

  useEffect(() => {
    if (!orderId) {
      toast.error('Dados do pedido não encontrados');
      navigate('/');
      return;
    }

    fetchOrderData();
    triggerConfetti();
  }, [orderId, navigate]);

  const fetchOrderData = async () => {
    try {
      const { data: orderData, error } = await supabase
        .from('orders')
        .select('*')
        .eq('id', orderId)
        .single();

      if (error) throw error;

      setOrderData(orderData as OrderData);

      // Fetch restaurant data
      if (orderData.restaurant_id) {
        const { data: restaurantData } = await supabase
          .from('restaurants')
          .select('*')
          .eq('id', orderData.restaurant_id)
          .single();

        if (restaurantData) {
          setRestaurant(restaurantData);
        }
      }

      // Fetch address data
      if (orderData.delivery_address_id) {
        const { data: addressData } = await supabase
          .from('addresses')
          .select('*')
          .eq('id', orderData.delivery_address_id)
          .single();

        if (addressData) {
          setAddress(addressData);
        }
      }
    } catch (error) {
      console.error('Erro ao buscar dados do pedido:', error);
      
      // Use data from state as fallback
      if (orderFromState) {
        setOrderData({
          id: orderId,
          ...orderFromState,
          created_at: new Date().toISOString()
        });
      } else {
        toast.error('Erro ao carregar dados do pedido');
        navigate('/');
      }
    } finally {
      setLoading(false);
    }
  };

  const triggerConfetti = () => {
    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;

    const randomInRange = (min: number, max: number) => {
      return Math.random() * (max - min) + min;
    };

    const interval = setInterval(() => {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        clearInterval(interval);
        return;
      }

      const particleCount = 50 * (timeLeft / duration);

      confetti({
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
        colors: ['#10b981', '#34d399', '#6ee7b7'],
      });

      confetti({
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
        colors: ['#10b981', '#34d399', '#6ee7b7'],
      });
    }, 250);
  };

  const getOrderNumber = () => {
    return `#${orderId.slice(-8).toUpperCase()}`;
  };

  if (loading) {
    return (
      <Layout>
        <div className="pt-20 pb-16">
          <div className="page-container">
            <div className="text-center">
              <p>Carregando dados do pedido...</p>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  if (!orderData) {
    return (
      <Layout>
        <div className="pt-20 pb-16">
          <div className="page-container">
            <div className="text-center">
              <p>Pedido não encontrado</p>
              <Button onClick={() => navigate('/')} className="mt-4">
                Voltar ao Início
              </Button>
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
          <div className="max-w-3xl mx-auto">
            {/* Success Message */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 text-green-600 mb-4">
                <Check size={32} />
              </div>
              
              <h1 className="text-3xl font-bold text-green-600 mb-2">
                Pedido Confirmado!
              </h1>
              
              <p className="text-muted-foreground mb-4">
                Seu pedido foi realizado com sucesso e está sendo preparado.
              </p>
              
              <div className="inline-block bg-secondary px-4 py-2 rounded-md">
                <span className="text-muted-foreground">Pedido: </span>
                <span className="font-semibold">{getOrderNumber()}</span>
              </div>
            </div>

            <div className="space-y-6">
              {/* Order Details */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <ShoppingBag size={18} className="mr-2" />
                    Detalhes do Pedido
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {restaurant && (
                    <div className="mb-4 pb-4 border-b">
                      <h3 className="font-medium">{restaurant.name}</h3>
                      <p className="text-sm text-muted-foreground">{restaurant.cuisine}</p>
                    </div>
                  )}

                  <div className="space-y-3">
                    {orderData.items.map((item: any, index: number) => (
                      <div key={index} className="flex justify-between">
                        <div>
                          <span className="font-medium">{item.quantity}x {item.name}</span>
                          {item.options && item.options.length > 0 && (
                            <div className="text-sm text-muted-foreground">
                              {item.options.map((option: any, optIndex: number) => (
                                <div key={optIndex}>
                                  {option.name}: {Array.isArray(option.value) ? option.value.join(', ') : option.value}
                                  {option.price > 0 && ` (+R$ ${option.price.toFixed(2)})`}
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                        <span>R$ {(item.price * item.quantity).toFixed(2)}</span>
                      </div>
                    ))}

                    <div className="border-t pt-3 space-y-2">
                      <div className="flex justify-between">
                        <span>Subtotal</span>
                        <span>R$ {orderData.subtotal.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Taxa de entrega</span>
                        <span>R$ {orderData.delivery_fee.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between font-semibold text-lg border-t pt-2">
                        <span>Total</span>
                        <span>R$ {orderData.total.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Delivery Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <MapPin size={18} className="mr-2" />
                      Endereço de Entrega
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {address ? (
                      <div>
                        <p className="font-medium">
                          {address.street}, {address.number}
                        </p>
                        <p className="text-muted-foreground">
                          {address.neighborhood} - {address.city}, {address.state}
                        </p>
                        <p className="text-muted-foreground">CEP: {address.zip_code}</p>
                      </div>
                    ) : (
                      <p className="text-muted-foreground">Endereço não disponível</p>
                    )}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Clock size={18} className="mr-2" />
                      Tempo de Entrega
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="font-medium text-green-600">25-35 minutos</p>
                    <p className="text-sm text-muted-foreground">
                      Tempo estimado para entrega
                    </p>
                  </CardContent>
                </Card>
              </div>

              {/* Actions */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => navigate('/order-tracking', { 
                    state: { orderId: orderData.id } 
                  })}
                >
                  Acompanhar Pedido
                </Button>
                
                <Button 
                  className="w-full"
                  onClick={() => navigate('/')}
                >
                  Continuar Comprando
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default OrderComplete;