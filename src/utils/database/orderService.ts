
import { OrderDetails, OrderItem } from '@/types/order';
import { supabase } from '@/integrations/supabase/client';

// Helper function to convert database order to OrderDetails format
const mapDatabaseOrderToOrderDetails = async (dbOrder: any): Promise<OrderDetails> => {
  // Get restaurant name
  const { data: restaurant } = await supabase
    .from('restaurants')
    .select('name')
    .eq('id', dbOrder.restaurant_id)
    .single();

  // Get address
  const { data: address } = await supabase
    .from('addresses')
    .select('street, number, neighborhood, city')
    .eq('id', dbOrder.delivery_address_id)
    .single();

  const addressString = address 
    ? `${address.street}, ${address.number} - ${address.neighborhood}, ${address.city}`
    : 'Endereço não encontrado';

  // Calculate estimated delivery time (30-45 minutes from order time)
  const orderTime = new Date(dbOrder.created_at);
  const deliveryTime = new Date(orderTime.getTime() + 30 * 60000);
  const deliveryEndTime = new Date(orderTime.getTime() + 45 * 60000);
  
  const deliveryTimeStr = `${deliveryTime.getHours()}:${String(deliveryTime.getMinutes()).padStart(2, '0')}`;
  const deliveryEndTimeStr = `${deliveryEndTime.getHours()}:${String(deliveryEndTime.getMinutes()).padStart(2, '0')}`;

  return {
    restaurantName: restaurant?.name || 'Restaurante não encontrado',
    restaurantId: dbOrder.restaurant_id,
    items: Array.isArray(dbOrder.items) ? dbOrder.items : [],
    totalValue: Number(dbOrder.total),
    orderNumber: dbOrder.id,
    orderTime: dbOrder.created_at,
    estimatedDelivery: `Hoje, ${deliveryTimeStr} - ${deliveryEndTimeStr}`,
    address: addressString,
    status: dbOrder.status as 'preparing' | 'ready' | 'delivering' | 'delivered',
    paymentMethod: dbOrder.payment_method as any || 'cash',
    paymentDetails: null
  };
};

// Service for managing orders in Supabase
export const orderService = {
  // Get all orders for the current user
  getAll: async (): Promise<OrderDetails[]> => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('User not authenticated');

    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    if (error) throw error;
    if (!data) return [];

    // Convert database orders to OrderDetails format
    const orderDetails = await Promise.all(
      data.map(order => mapDatabaseOrderToOrderDetails(order))
    );

    return orderDetails;
  },
  
  // Get a specific order by ID
  getById: async (orderId: string): Promise<OrderDetails> => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('User not authenticated');

    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .eq('id', orderId)
      .eq('user_id', user.id)
      .single();

    if (error) throw error;
    return mapDatabaseOrderToOrderDetails(data);
  },
  
  // Create a new order
  create: async (orderData: {
    restaurant_id: string;
    delivery_address_id: string;
    items: any[];
    subtotal: number;
    delivery_fee: number;
    total: number;
    payment_method?: string;
    notes?: string;
  }) => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('User not authenticated');

    const { data, error } = await supabase
      .from('orders')
      .insert({
        user_id: user.id,
        ...orderData,
        status: 'pending'
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  },
  
  // Update an existing order
  update: async (orderId: string, updates: any) => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('User not authenticated');

    const { data, error } = await supabase
      .from('orders')
      .update(updates)
      .eq('id', orderId)
      .eq('user_id', user.id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },
  
  // Delete an order
  remove: async (orderId: string) => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('User not authenticated');

    const { error } = await supabase
      .from('orders')
      .delete()
      .eq('id', orderId)
      .eq('user_id', user.id);

    if (error) throw error;
    return true;
  }
};
