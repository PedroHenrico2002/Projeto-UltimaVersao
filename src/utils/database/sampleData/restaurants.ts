
/**
 * Dados de exemplo para restaurantes
 */
import { Restaurant } from '../types';

// Restaurantes de exemplo
export const sampleRestaurants: Restaurant[] = [
  {
    id: '1', // ID único do restaurante
    name: 'Doce Paixão', // Nome do restaurante
    categoryId: '5', // ID da categoria (Doces)
    imageUrl: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=80', // URL da imagem
    cuisine: 'Doces e Bolos', // Tipo de cozinha
    deliveryTime: '20-35 min', // Tempo de entrega
    minOrder: 5.90, // Pedido mínimo como número
    deliveryFee: 3.50, // Taxa de entrega como número
    rating: 4.9, // Avaliação
    addressId: '1', // ID do endereço
    isOpen: true // Indica se está aberto
  },
  {
    id: '2',
    name: 'Restaurante Japonês',
    categoryId: '3',
    imageUrl: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    cuisine: 'Japonesa',
    deliveryTime: '30-45 min',
    minOrder: 25.00,
    deliveryFee: 5.00,
    rating: 4.9,
    addressId: '2',
    isOpen: true
  },
  {
    id: '3',
    name: 'Churrascaria Gaúcha',
    categoryId: '2',
    imageUrl: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    cuisine: 'Churrasco',
    deliveryTime: '35-50 min',
    minOrder: 30.00,
    deliveryFee: 6.00,
    rating: 4.7,
    addressId: '3',
    isOpen: true
  },
  {
    id: '4',
    name: 'Comida Caseira',
    categoryId: '1',
    imageUrl: 'https://images.unsplash.com/photo-1547928576-f8d1c7a1b709?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    cuisine: 'Brasileira',
    deliveryTime: '20-35 min',
    minOrder: 12.90,
    deliveryFee: 4.00,
    rating: 4.5,
    addressId: '4',
    isOpen: true
  },
  {
    id: '6',
    name: 'Gelato Italiano',
    categoryId: '5',
    imageUrl: 'https://images.unsplash.com/photo-1501443762994-82bd5dace89a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=80',
    cuisine: 'Sorvetes e Gelatos Artesanais',
    deliveryTime: '15-30 min',
    minOrder: 6.50,
    deliveryFee: 2.50,
    rating: 4.6,
    addressId: '6',
    isOpen: true
  },
  {
    id: '7',
    name: 'Confeitaria Doce Sonho',
    categoryId: '5',
    imageUrl: 'https://images.unsplash.com/photo-1574085733277-851d9d856a3a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    cuisine: 'Doces e Confeitaria',
    deliveryTime: '25-40 min',
    minOrder: 7.50,
    deliveryFee: 3.00,
    rating: 4.8,
    addressId: '7',
    isOpen: true
  },
  {
    id: '8',
    name: 'Açaí Tropical',
    categoryId: '5',
    imageUrl: 'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=80',
    cuisine: 'Açaí e Smoothies Premium',
    deliveryTime: '20-35 min',
    minOrder: 5.50,
    deliveryFee: 2.00,
    rating: 4.7,
    addressId: '8',
    isOpen: true
  }
];
