
/**
 * Dados de exemplo para endereços do sistema
 * 
 * Este arquivo contém endereços pré-definidos de restaurantes
 * que serão carregados automaticamente quando o sistema inicializar
 */
import { Address } from '../types'; // Importa a interface Address para garantir tipagem correta

// Array com endereços de restaurantes de exemplo
export const sampleAddresses: Address[] = [
  { 
    id: '1', // ID único do endereço
    userId: 'system', // Usuário sistema (para endereços de restaurantes)
    street: 'Av. Paulista', // Nome da rua
    number: '1500', // Número do endereço como string
    complement: 'Loja 25', // Complemento do endereço
    neighborhood: 'Bela Vista', // Nome do bairro
    city: 'São Paulo', // Nome da cidade
    state: 'SP', // Estado
    zipCode: '01310-100', // CEP
    isDefault: false, // Não é endereço padrão
    restaurantId: '1', // ID do restaurante associado
    isRestaurantAddress: true // Indica que é endereço de restaurante
  },
  { 
    id: '2',
    userId: 'system',
    street: 'Rua Augusta',
    number: '2200',
    complement: 'Piso 2',
    neighborhood: 'Consolação',
    city: 'São Paulo',
    state: 'SP',
    zipCode: '01412-100',
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
    neighborhood: 'República',
    city: 'São Paulo',
    state: 'SP',
    zipCode: '01046-010',
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
    neighborhood: 'Jardins',
    city: 'São Paulo',
    state: 'SP',
    zipCode: '01426-000',
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
    neighborhood: 'Itaim Bibi',
    city: 'São Paulo',
    state: 'SP',
    zipCode: '01451-000',
    isDefault: false,
    restaurantId: '6',
    isRestaurantAddress: true
  },
  { 
    id: '7',
    userId: 'system',
    street: 'Rua dos Pinheiros',
    number: '320',
    complement: '', // Sem complemento
    neighborhood: 'Pinheiros',
    city: 'São Paulo',
    state: 'SP',
    zipCode: '05422-000',
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
    neighborhood: 'Jardins',
    city: 'São Paulo',
    state: 'SP',
    zipCode: '01419-100',
    isDefault: false,
    restaurantId: '8',
    isRestaurantAddress: true
  }
];
