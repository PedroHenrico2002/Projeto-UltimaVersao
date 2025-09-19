import React, { useState, useEffect } from 'react';
import { Layout } from '@/components/Layout';
import { OrderTracker } from '@/components/OrderTracker';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { Clock, MapPin, Phone, ChevronLeft, ShoppingBag } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/lib/toast';

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
}

type OrderStatus = 'pending' | 'confirmed' | 'preparing' | 'ready' | 'delivering' | 'delivered';

const OrderTracking: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();
  const [orderData, setOrderData] = useState<OrderData | null>(null);
  const [restaurant, setRestaurant] = useState<any>(null);
  const [address, setAddress] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const orderId = location.state?.orderId;

  useEffect(() => {
    if (!orderId) {
      toast.error('ID do pedido não encontrado');
      navigate('/orders');
      return;
    }

    fetchOrderData();
    
    // Set up real-time updates
    const subscription = supabase
      .channel('order-updates')
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'orders',
          filter: `id=eq.${orderId}`
        },
        (payload) => {
          setOrderData(payload.new as OrderData);
        }
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, [orderId, navigate]);

  const fetchOrderData = async () => {
    if (!user) return;

    try {
      const { data: orderData, error } = await supabase
        .from('orders')
        .select('*')
        .eq('id', orderId)
        .eq('user_id', user.id)
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
      toast.error('Erro ao carregar dados do pedido');
      navigate('/orders');
    } finally {
      setLoading(false);
    }
  };

  const getStatusMessage = (status: string) => {
    switch (status) {
      case 'pending':
        return 'Pedido recebido e aguardando confirmação';
      case 'confirmed':
        return 'Pedido confirmado pelo restaurante';
      case 'preparing':
        return 'Seu pedido está sendo preparado';
      case 'ready':
        return 'Pedido pronto! Entregador a caminho';
      case 'delivering':
        return 'Seu pedido está a caminho!';
      case 'delivered':
        return 'Pedido entregue com sucesso!';
      default:
        return 'Acompanhando seu pedido...';
    }
  };

  const getEstimatedTime = (status: string) => {
    switch (status) {
      case 'pending':
      case 'confirmed':
        return '30-40 min';
      case 'preparing':
        return '20-30 min';
      case 'ready':
        return '10-15 min';
      case 'delivering':
        return '5-10 min';
      case 'delivered':
        return 'Entregue';
      default:
        return '25-35 min';
    }
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
              <Button onClick={() => navigate('/orders')} className="mt-4">
                Ver Todos os Pedidos
              </Button>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  const orderNumber = `#${orderData.id.slice(-8).toUpperCase()}`;
  const currentStatus = orderData.status as OrderStatus;
  const estimatedTime = getEstimatedTime(currentStatus);

  return (
    <Layout>
      <div className="pt-20 pb-16">
        <div className="page-container">
          <div className="mb-6">
            <Link
              to="/orders"
              className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <ChevronLeft size={16} className="mr-1" />
              Voltar aos Pedidos
            </Link>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-2xl font-bold mb-2">Acompanhar Pedido</h1>
              <p className="text-muted-foreground">Pedido {orderNumber}</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Order Status */}
              <div className="lg:col-span-2 space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Clock size={18} className="mr-2" />
                      Status do Pedido
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="mb-6">
                      <p className="text-lg font-medium mb-2">
                        {getStatusMessage(currentStatus)}
                      </p>
                      <p className="text-muted-foreground">
                        Tempo estimado: {estimatedTime}
                      </p>
                    </div>

                    <OrderTracker 
                      status={currentStatus === 'pending' || currentStatus === 'confirmed' ? 'preparing' : currentStatus}
                      estimatedDelivery={estimatedTime}
                      address={address ? `${address.street}, ${address.number} - ${address.city}` : ''}
                    />
                  </CardContent>
                </Card>

                {/* Restaurant Info */}
                {restaurant && (
                  <Card>
                    <CardHeader>
                      <CardTitle>Restaurante</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="w-12 h-12 bg-muted rounded-lg overflow-hidden">
                            {restaurant.image_url && (
                              <img 
                                src={restaurant.image_url}
                                alt={restaurant.name}
                                className="w-full h-full object-cover"
                              />
                            )}
                          </div>
                          <div>
                            <h4 className="font-medium">{restaurant.name}</h4>
                            <p className="text-sm text-muted-foreground">{restaurant.cuisine}</p>
                          </div>
                        </div>
                        
                        <Button variant="outline" size="sm">
                          <Phone size={16} className="mr-1" />
                          Contato
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <ShoppingBag size={18} className="mr-2" />
                      Resumo do Pedido
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      {orderData.items.map((item: any, index: number) => (
                        <div key={index} className="flex justify-between text-sm">
                          <span>{item.quantity}x {item.name}</span>
                          <span>R$ {(item.price * item.quantity).toFixed(2)}</span>
                        </div>
                      ))}
                    </div>

                    <div className="border-t pt-3 space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Subtotal</span>
                        <span>R$ {orderData.subtotal.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Taxa de entrega</span>
                        <span>R$ {orderData.delivery_fee.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between font-semibold border-t pt-2">
                        <span>Total</span>
                        <span>R$ {orderData.total.toFixed(2)}</span>
                      </div>
                    </div>

                    {address && (
                      <div className="border-t pt-4">
                        <div className="flex items-start space-x-2">
                          <MapPin size={16} className="text-muted-foreground mt-0.5" />
                          <div>
                            <p className="text-sm font-medium">Endereço de Entrega</p>
                            <p className="text-sm text-muted-foreground">
                              {address.street}, {address.number}<br />
                              {address.neighborhood} - {address.city}, {address.state}
                            </p>
                          </div>
                        </div>
                      </div>
                    )}

                    <Button 
                      variant="outline" 
                      className="w-full"
                      onClick={() => navigate('/orders')}
                    >
                      Ver Todos os Pedidos
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default OrderTracking;