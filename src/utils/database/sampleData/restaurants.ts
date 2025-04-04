
/**
 * Dados de exemplo para restaurantes
 */
import { Restaurant } from '../types';

// Restaurantes de exemplo
export const sampleRestaurants: Restaurant[] = [
  {
    id: '1',
    name: 'Doce Paixão',
    categoryId: '5',
    imageUrl: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=80',
    cuisine: 'Doces e Bolos',
    deliveryTime: '20-35 min',
    minOrder: 'R$5,90',
    rating: 4.9,
    addressId: '1'
  },
  {
    id: '2',
    name: 'Restaurante Japonês',
    categoryId: '3',
    imageUrl: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    cuisine: 'Japonesa',
    deliveryTime: '30-45 min',
    minOrder: 'R$25,00',
    rating: 4.9,
    addressId: '2'
  },
  {
    id: '3',
    name: 'Churrascaria Gaúcha',
    categoryId: '2',
    imageUrl: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    cuisine: 'Churrasco',
    deliveryTime: '35-50 min',
    minOrder: 'R$30,00',
    rating: 4.7,
    addressId: '3'
  },
  {
    id: '4',
    name: 'Comida Caseira',
    categoryId: '1',
    imageUrl: 'https://images.unsplash.com/photo-1547928576-f8d1c7a1b709?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    cuisine: 'Brasileira',
    deliveryTime: '20-35 min',
    minOrder: 'R$12,90',
    rating: 4.5,
    addressId: '4'
  },
  {
    id: '6',
    name: 'Gelato Italiano',
    categoryId: '5',
    imageUrl: 'https://images.unsplash.com/photo-1501443762994-82bd5dace89a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=80',
    cuisine: 'Sorvetes e Gelatos Artesanais',
    deliveryTime: '15-30 min',
    minOrder: 'R$6,50',
    rating: 4.6,
    addressId: '6'
  },
  {
    id: '7',
    name: 'Confeitaria Doce Sonho',
    categoryId: '5',
    imageUrl: 'https://images.unsplash.com/photo-1574085733277-851d9d856a3a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    cuisine: 'Doces e Confeitaria',
    deliveryTime: '25-40 min',
    minOrder: 'R$7,50',
    rating: 4.8,
    addressId: '7'
  },
  {
    id: '8',
    name: 'Açaí Tropical',
    categoryId: '5',
    imageUrl: 'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=80',
    cuisine: 'Açaí e Smoothies Premium',
    deliveryTime: '20-35 min',
    minOrder: 'R$5,50',
    rating: 4.7,
    addressId: '8'
  }
];
