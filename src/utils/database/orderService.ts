
/**
 * Serviço para gerenciamento de pedidos
 * Este arquivo contém funções para manipular dados de pedidos no localStorage
 */

import { OrderDetails } from '@/types/order';
import { getAll, getById, create, update, remove } from './crudOperations';

// Exporta funções específicas para gerenciamento de pedidos
export const orderService = {
  // Obtém todos os pedidos do localStorage
  getAll: () => {
    // Busca o histórico de pedidos armazenado no localStorage
    const orderHistory = localStorage.getItem('orderHistory');
    // Se existir dados, converte para objeto JavaScript e retorna
    if (orderHistory) {
      return JSON.parse(orderHistory);
    }
    // Caso contrário, retorna um array vazio
    return [];
  },
  
  // Obtém um pedido específico pelo número do pedido
  getById: (orderNumber: string) => {
    // Busca todos os pedidos
    const orders = orderService.getAll();
    // Encontra e retorna o pedido que corresponde ao número informado
    return orders.find((order: OrderDetails) => order.orderNumber === orderNumber);
  },
  
  // Cria um novo pedido no localStorage
  create: (data: OrderDetails) => {
    // Obtém a lista atual de pedidos
    const orders = orderService.getAll();
    // Adiciona o novo pedido à lista
    orders.push(data);
    // Salva a lista atualizada no localStorage
    localStorage.setItem('orderHistory', JSON.stringify(orders));
    // Retorna os dados do novo pedido
    return data;
  },
  
  // Atualiza um pedido existente pelo número do pedido
  update: (orderNumber: string, data: Partial<OrderDetails>) => {
    // Obtém todos os pedidos
    const orders = orderService.getAll();
    // Encontra o índice do pedido que será atualizado
    const orderIndex = orders.findIndex((order: OrderDetails) => order.orderNumber === orderNumber);
    
    // Se o pedido não for encontrado, retorna undefined
    if (orderIndex === -1) return undefined;
    
    // Cria uma cópia do pedido existente e mescla com os novos dados
    const updatedOrder = { ...orders[orderIndex], ...data };
    // Atualiza o pedido na lista
    orders[orderIndex] = updatedOrder;
    
    // Salva a lista atualizada no localStorage
    localStorage.setItem('orderHistory', JSON.stringify(orders));
    // Retorna o pedido atualizado
    return updatedOrder;
  },
  
  // Remove um pedido pelo número do pedido
  remove: (orderNumber: string) => {
    // Obtém todos os pedidos
    const orders = orderService.getAll();
    // Filtra os pedidos, removendo o que corresponde ao número informado
    const filteredOrders = orders.filter((order: OrderDetails) => order.orderNumber !== orderNumber);
    
    // Se o tamanho da lista não mudou, significa que o pedido não foi encontrado
    if (filteredOrders.length === orders.length) return false;
    
    // Salva a lista filtrada no localStorage
    localStorage.setItem('orderHistory', JSON.stringify(filteredOrders));
    // Retorna true indicando sucesso na remoção
    return true;
  }
};
