
import React, { useEffect, useState } from 'react';
import { Layout } from '@/components/Layout';
import { OrderTracker } from '@/components/OrderTracker';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft, MapPin, Phone } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

interface OrderItem {
  id: string;
  name: string;
  price: string;
  priceValue: number;
  quantity: number;
}

interface OrderDetails {
  restaurantName: string;
  items: OrderItem[];
  totalValue: number;
  orderNumber: string;
  orderTime: string;
  estimatedDelivery: string;
  address: string;
  status: 'preparing' | 'ready' | 'delivering' | 'delivered';
}

const OrderDetails: React.FC = () => {
  const navigate = useNavigate();
  const [orderDetails, setOrderDetails] = useState<OrderDetails | null>(null);
  const [status, setStatus] = useState<'preparing' | 'ready' | 'delivering' | 'delivered'>('preparing');
  const [elapsedTime, setElapsedTime] = useState(0);
  
  useEffect(() => {
    const orderData = sessionStorage.getItem('orderDetails');
    
    if (!orderData) {
      navigate('/restaurants');
      return;
    }
    
    try {
      const parsedOrder = JSON.parse(orderData);
      setOrderDetails(parsedOrder);
      setStatus(parsedOrder.status || 'preparing');
    } catch (error) {
      console.error('Erro ao carregar detalhes do pedido:', error);
      navigate('/restaurants');
    }
  }, [navigate]);
  
  // Simular progresso do pedido ao longo do tempo
  useEffect(() => {
    if (!orderDetails) return;
    
    const interval = setInterval(() => {
      setElapsedTime(prev => {
        const newTime = prev + 1;
        
        // Atualizar status com base no tempo decorrido
        if (newTime === 10) {
          setStatus('ready');
          // Atualizar no sessionStorage
          const updatedOrder = { ...orderDetails, status: 'ready' };
          sessionStorage.setItem('orderDetails', JSON.stringify(updatedOrder));
        } else if (newTime === 20) {
          setStatus('delivering');
          // Atualizar no sessionStorage
          const updatedOrder = { ...orderDetails, status: 'delivering' };
          sessionStorage.setItem('orderDetails', JSON.stringify(updatedOrder));
        } else if (newTime === 35) {
          setStatus('delivered');
          // Atualizar no sessionStorage
          const updatedOrder = { ...orderDetails, status: 'delivered' };
          sessionStorage.setItem('orderDetails', JSON.stringify(updatedOrder));
          clearInterval(interval);
        }
        
        return newTime;
      });
    }, 2000); // A cada 2 segundos para simulação

    return () => clearInterval(interval);
  }, [orderDetails]);
  
  if (!orderDetails) {
    return (
      <Layout>
        <div className="pt-28 pb-16">
          <div className="page-container">
            <p className="text-center">Carregando detalhes do pedido...</p>
          </div>
        </div>
      </Layout>
    );
  }
  
  return (
    <Layout>
      <div className="pt-16 pb-16">
        <div className="page-container">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center">
              <Link to="/" className="text-red-600 mr-3">
                <ArrowLeft size={24} />
              </Link>
              <h1 className="text-xl font-bold">ACOMPANHE SEU PEDIDO</h1>
            </div>
            <Button variant="destructive" className="bg-red-600">
              Contatar vendedor
            </Button>
          </div>
          
          <div className="mb-8">
            <OrderTracker 
              status={status} 
              estimatedDelivery={orderDetails.estimatedDelivery}
              simplified={true}
            />
          </div>
          
          <Card className="mb-6">
            <CardHeader className="pb-0">
              <h2 className="text-base font-medium">Entrega em</h2>
            </CardHeader>
            <CardContent>
              <div className="flex items-start gap-3">
                <MapPin className="text-gray-500 mt-1" size={18} />
                <p className="text-sm">{orderDetails.address}</p>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-0">
              <h2 className="text-base font-medium">Detalhes do pedido</h2>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-500">Número do pedido:</span>
                  <span className="font-medium">{orderDetails.orderNumber}</span>
                </div>
                
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-500">Restaurante:</span>
                  <span className="font-medium">{orderDetails.restaurantName}</span>
                </div>
                
                <div className="py-3 border-t border-b border-gray-200">
                  <h3 className="text-sm font-medium mb-2">Itens do pedido:</h3>
                  <div className="space-y-2">
                    {orderDetails.items.map((item) => (
                      <div key={item.id} className="flex justify-between text-sm">
                        <span>{item.quantity}× {item.name}</span>
                        <span>{item.price}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="flex justify-between items-center font-medium">
                  <span>Total</span>
                  <span>R${orderDetails.totalValue.toFixed(2).replace('.', ',')}</span>
                </div>
              </div>
              
              <div className="mt-6">
                <Button className="w-full bg-red-600 hover:bg-red-700" variant="destructive">
                  <Phone size={16} className="mr-2" />
                  <span>Contatar o restaurante</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default OrderDetails;
