
/**
 * Dados de exemplo para endereços
 */
import { Address } from '../types';

// Endereços de restaurantes de exemplo
export const sampleAddresses: Address[] = [
  { 
    id: '1', 
    userId: 'system', 
    street: 'Av. Paulista', 
    number: '1500', 
    complement: 'Loja 25', 
    city: 'São Paulo', 
    isDefault: false,
    restaurantId: '1',
    isRestaurantAddress: true
  },
  { 
    id: '2', 
    userId: 'system', 
    street: 'Rua Augusta', 
    number: '2200', 
    complement: 'Piso 2', 
    city: 'São Paulo', 
    isDefault: false,
    restaurantId: '2',
    isRestaurantAddress: true
  },
  { 
    id: '3', 
    userId: 'system', 
    street: 'Av. Ipiranga', 
    number: '200', 
    complement: 'Térreo', 
    city: 'São Paulo', 
    isDefault: false,
    restaurantId: '3',
    isRestaurantAddress: true
  },
  { 
    id: '4', 
    userId: 'system', 
    street: 'Rua Oscar Freire', 
    number: '498', 
    complement: 'Loja 10', 
    city: 'São Paulo', 
    isDefault: false,
    restaurantId: '4',
    isRestaurantAddress: true
  },
  { 
    id: '6', 
    userId: 'system', 
    street: 'Av. Brigadeiro Faria Lima', 
    number: '2232', 
    complement: 'Loja 15', 
    city: 'São Paulo', 
    isDefault: false,
    restaurantId: '6',
    isRestaurantAddress: true
  },
  { 
    id: '7', 
    userId: 'system', 
    street: 'Rua dos Pinheiros', 
    number: '320', 
    complement: null, 
    city: 'São Paulo', 
    isDefault: false,
    restaurantId: '7',
    isRestaurantAddress: true
  },
  { 
    id: '8', 
    userId: 'system', 
    street: 'Alameda Santos', 
    number: '1293', 
    complement: 'Loja 22', 
    city: 'São Paulo', 
    isDefault: false,
    restaurantId: '8',
    isRestaurantAddress: true
  }
];
