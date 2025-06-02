
/**
 * Tipos de dados para o sistema de banco de dados
 * 
 * Este arquivo define todas as interfaces e tipos utilizados
 * no sistema para garantir consistência nos dados
 */

// Interface que define a estrutura de um usuário
export interface User {
  id: string; // Identificador único do usuário
  userId: string; // ID público do usuário (visível)
  name: string; // Nome completo do usuário
  email: string; // Email do usuário (único)
  authType: string; // Tipo de autenticação (email, google, etc)
  createdAt: string; // Data de criação da conta (formato ISO)
}

// Interface que define a estrutura de um endereço
export interface Address {
  id: string; // Identificador único do endereço
  userId?: string; // ID do usuário dono do endereço (opcional)
  restaurantId?: string; // ID do restaurante (se for endereço de restaurante)
  street: string; // Nome da rua e número
  neighborhood: string; // Bairro
  city: string; // Cidade
  state: string; // Estado
  zipCode: string; // CEP
  complement?: string; // Complemento (opcional)
  isDefault?: boolean; // Se é o endereço padrão do usuário
}

// Interface que define a estrutura de uma categoria
export interface Category {
  id: string; // Identificador único da categoria
  name: string; // Nome da categoria (ex: Pizza, Hambúrguer)
  icon: string; // Ícone da categoria (emoji ou URL)
}

// Interface que define a estrutura de um restaurante
export interface Restaurant {
  id: string; // Identificador único do restaurante
  name: string; // Nome do restaurante
  description?: string; // Descrição do restaurante (opcional)
  categoryId: string; // ID da categoria do restaurante
  rating: number; // Avaliação média (0-5)
  deliveryTime: string; // Tempo de entrega estimado
  deliveryFee: number; // Taxa de entrega em reais
  minOrder: number; // Valor mínimo do pedido
  imageUrl?: string; // URL da imagem do restaurante
  addressId?: string; // ID do endereço do restaurante
  isOpen: boolean; // Se o restaurante está aberto
}

// Interface que define a estrutura de um item do cardápio
export interface MenuItem {
  id: string; // Identificador único do item
  restaurantId: string; // ID do restaurante que oferece o item
  name: string; // Nome do item
  description?: string; // Descrição do item (opcional)
  price: number; // Preço do item em reais
  categoryId?: string; // ID da categoria do item (opcional)
  imageUrl?: string; // URL da imagem do item (opcional)
  isAvailable: boolean; // Se o item está disponível
  rating?: number; // Avaliação média do item (opcional)
  preparationTime?: string; // Tempo de preparo (opcional)
}
