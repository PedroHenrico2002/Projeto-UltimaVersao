import React, { useState, useEffect } from 'react';
import { Layout } from '@/components/Layout';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ChevronLeft, MapPin, Clock, CreditCard, CheckCircle2 } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/lib/toast';
import { OrderTracker } from '@/components/OrderTracker';

interface OrderData {
  id: string;
  items: any[];
  total: number;
  subtotal: number;
  delivery_fee: number;
  restaurant_id: string;
  delivery_address_id: string;
  status: string;
  payment_method: string;
  created_at: string;
}

const OrderConfirmation: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();
  const [orderData, setOrderData] = useState<OrderData | null>(null);
  const [restaurant, setRestaurant] = useState<any>(null);
  const [address, setAddress] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [estimatedTime, setEstimatedTime] = useState('30-40 min');

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
          const newOrder = payload.new as OrderData;
          setOrderData(newOrder);
          updateEstimatedTime(newOrder.status);
        }
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, [orderId, navigate]);

  const updateEstimatedTime = (status: string) => {
    switch (status) {
      case 'pending':
      case 'confirmed':
        setEstimatedTime('30-40 min');
        break;
      case 'preparing':
        setEstimatedTime('20-30 min');
        break;
      case 'ready':
        setEstimatedTime('10-15 min');
        break;
      case 'delivering':
        setEstimatedTime('5-10 min');
        break;
      case 'delivered':
        setEstimatedTime('Entregue');
        break;
      default:
        setEstimatedTime('25-35 min');
    }
  };

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
      updateEstimatedTime(orderData.status);

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

  const getPaymentMethodDisplay = (paymentMethod: string) => {
    try {
      const parsed = JSON.parse(paymentMethod);
      switch (parsed.method) {
        case 'pix':
          return 'PIX';
        case 'credit':
          return `Cartão de Crédito ****${parsed.cardNumber?.slice(-4) || ''}`;
        case 'debit':
          return `Cartão de Débito ****${parsed.cardNumber?.slice(-4) || ''}`;
        case 'money':
          return 'Dinheiro';
        default:
          return 'Não especificado';
      }
    } catch {
      return 'Não especificado';
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="min-h-screen pt-20 pb-16 bg-background">
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
        <div className="min-h-screen pt-20 pb-16 bg-background">
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

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-b from-primary/5 to-background pt-16 pb-16">
        <div className="page-container max-w-2xl">
          {/* Header */}
          <div className="mb-6 pt-4">
            <Link
              to="/orders"
              className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <ChevronLeft size={16} className="mr-1" />
              Voltar
            </Link>
          </div>

          {/* Success Message */}
          <Card className="mb-6 border-2 border-green-500/20 bg-green-50 dark:bg-green-950/20">
            <CardContent className="pt-6">
              <div className="flex items-center justify-center mb-4">
                <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center">
                  <CheckCircle2 size={32} className="text-white" />
                </div>
              </div>
              <h1 className="text-2xl font-bold text-center mb-2">Pedido Confirmado!</h1>
              <p className="text-center text-muted-foreground mb-4">
                Pedido {orderNumber}
              </p>
              <div className="flex items-center justify-center gap-2 text-sm">
                <Clock size={16} className="text-primary" />
                <span className="font-medium">Previsão de entrega: {estimatedTime}</span>
              </div>
            </CardContent>
          </Card>

          {/* Restaurant Info */}
          {restaurant && (
            <Card className="mb-4">
              <CardContent className="pt-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg overflow-hidden flex-shrink-0 flex items-center justify-center">
                    {restaurant.image_url ? (
                      <img 
                        src={restaurant.image_url}
                        alt={restaurant.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="text-2xl font-bold text-primary">
                        {restaurant.name.charAt(0)}
                      </span>
                    )}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-lg">{restaurant.name}</h3>
                    <p className="text-sm text-muted-foreground">{restaurant.cuisine}</p>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    className="text-primary font-medium"
                    onClick={() => navigate('/orders')}
                  >
                    Histórico
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Order Tracker */}
          <Card className="mb-4">
            <CardContent className="pt-6">
              <h3 className="font-bold mb-4 flex items-center gap-2">
                <Clock size={18} />
                Status do Pedido
              </h3>
              <OrderTracker 
                status={orderData.status as any}
                estimatedDelivery={estimatedTime}
                address={address ? `${address.street}, ${address.number} - ${address.city}` : ''}
              />
            </CardContent>
          </Card>

          {/* Order Items */}
          <Card className="mb-4">
            <CardContent className="pt-6">
              <h3 className="font-bold mb-4">Resumo de valores</h3>
              <div className="space-y-3">
                {orderData.items.map((item: any, index: number) => (
                  <div key={index} className="flex items-start gap-3">
                    {item.image_url && (
                      <div className="w-12 h-12 bg-muted rounded overflow-hidden flex-shrink-0">
                        <img 
                          src={item.image_url}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm truncate">{item.name}</p>
                      {item.options && item.options.length > 0 && (
                        <p className="text-xs text-muted-foreground">
                          {item.options.map((opt: any) => opt.name).join(', ')}
                        </p>
                      )}
                    </div>
                    <div className="text-right flex-shrink-0">
                      <p className="font-medium">R$ {(item.price * item.quantity).toFixed(2)}</p>
                      <p className="text-xs text-muted-foreground">Qtd: {item.quantity}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t mt-4 pt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>R$ {orderData.subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Desconto</span>
                  <span className="text-green-600">- R$ 0,00</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Taxa de entrega</span>
                  <span>R$ {orderData.delivery_fee.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-bold text-lg border-t pt-2">
                  <span>Total</span>
                  <span>R$ {orderData.total.toFixed(2)}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Payment Method */}
          <Card className="mb-4">
            <CardContent className="pt-6">
              <h3 className="font-bold mb-3 flex items-center gap-2">
                <CreditCard size={18} />
                Pago pelo app
              </h3>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary/10 rounded flex items-center justify-center">
                  <CreditCard size={20} className="text-primary" />
                </div>
                <span className="font-medium">
                  {getPaymentMethodDisplay(orderData.payment_method)}
                </span>
              </div>
            </CardContent>
          </Card>

          {/* Delivery Address */}
          {address && (
            <Card>
              <CardContent className="pt-6">
                <h3 className="font-bold mb-3 flex items-center gap-2">
                  <MapPin size={18} />
                  Endereço de entrega
                </h3>
                <p className="text-sm">
                  {address.street}, {address.number}
                  {address.complement && ` - ${address.complement}`}
                </p>
                <p className="text-sm text-muted-foreground">
                  {address.neighborhood}, {address.city} - {address.state}
                </p>
                <p className="text-sm text-muted-foreground">
                  CEP: {address.zip_code}
                </p>
              </CardContent>
            </Card>
          )}

          {/* Action Button */}
          <Button 
            className="w-full mt-6 h-12"
            onClick={() => navigate('/orders')}
          >
            Ver Todos os Pedidos
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default OrderConfirmation;
