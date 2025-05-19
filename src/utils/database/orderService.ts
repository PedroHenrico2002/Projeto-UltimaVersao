
/**
 * Serviço para gerenciamento de pedidos
 */

import { OrderDetails } from '@/types/order';
import { getAll, getById, create, update, remove } from './crudOperations';

// Exporta funções específicas para gerenciamento de pedidos
export const orderService = {
  // Obtém todos os pedidos
  getAll: () => {
    const orderHistory = localStorage.getItem('orderHistory');
    if (orderHistory) {
      return JSON.parse(orderHistory);
    }
    return [];
  },
  
  // Obtém um pedido específico por ID
  getById: (orderNumber: string) => {
    const orders = orderService.getAll();
    return orders.find((order: OrderDetails) => order.orderNumber === orderNumber);
  },
  
  // Cria um novo pedido
  create: (data: OrderDetails) => {
    const orders = orderService.getAll();
    orders.push(data);
    localStorage.setItem('orderHistory', JSON.stringify(orders));
    return data;
  },
  
  // Atualiza um pedido existente
  update: (orderNumber: string, data: Partial<OrderDetails>) => {
    const orders = orderService.getAll();
    const orderIndex = orders.findIndex((order: OrderDetails) => order.orderNumber === orderNumber);
    
    if (orderIndex === -1) return undefined;
    
    const updatedOrder = { ...orders[orderIndex], ...data };
    orders[orderIndex] = updatedOrder;
    
    localStorage.setItem('orderHistory', JSON.stringify(orders));
    return updatedOrder;
  },
  
  // Remove um pedido
  remove: (orderNumber: string) => {
    const orders = orderService.getAll();
    const filteredOrders = orders.filter((order: OrderDetails) => order.orderNumber !== orderNumber);
    
    if (filteredOrders.length === orders.length) return false;
    
    localStorage.setItem('orderHistory', JSON.stringify(filteredOrders));
    return true;
  }
};
