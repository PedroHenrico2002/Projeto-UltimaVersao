
/**
 * Tipos de dados para o sistema de banco de dados
 * 
 * Este arquivo define todas as interfaces e tipos utilizados
 * no sistema para garantir consistência nos dados
 */

// Interface que define a estrutura de um usuário
export interface User {
  id: string; // Identificador único do usuário no banco de dados
  userId: string; // ID público do usuário (visível para outros usuários)
  name: string; // Nome completo do usuário
  email: string; // Email do usuário (deve ser único no sistema)
  authType: string; // Tipo de autenticação utilizada (email, google, facebook, etc)
  createdAt: string; // Data de criação da conta no formato ISO (YYYY-MM-DDTHH:mm:ss.sssZ)
}

// Interface que define a estrutura de um endereço
export interface Address {
  id: string; // Identificador único do endereço no banco de dados
  userId?: string; // ID do usuário dono do endereço (opcional)
  restaurantId?: string; // ID do restaurante se for endereço de restaurante (opcional)
  street: string; // Nome da rua completo
  number: string; // Número do endereço (como string para aceitar números compostos como "123A")
  neighborhood: string; // Nome do bairro
  city: string; // Nome da cidade
  state: string; // Nome do estado
  zipCode: string; // Código postal (CEP no Brasil)
  complement?: string; // Complemento do endereço (apartamento, bloco, etc) - opcional
  isDefault?: boolean; // Indica se é o endereço padrão do usuário
  isRestaurantAddress: boolean; // Indica se é um endereço de restaurante
}

// Interface que define a estrutura de uma categoria
export interface Category {
  id: string; // Identificador único da categoria no banco de dados
  name: string; // Nome da categoria (ex: Pizza, Hambúrguer, Sushi)
  icon: string; // Ícone da categoria (emoji ou URL de imagem)
}

// Interface que define a estrutura de um restaurante
export interface Restaurant {
  id: string; // Identificador único do restaurante no banco de dados
  name: string; // Nome do restaurante
  description?: string; // Descrição do restaurante (opcional)
  categoryId: string; // ID da categoria à qual o restaurante pertence
  cuisine: string; // Tipo de cozinha do restaurante (italiana, japonesa, etc)
  rating: number; // Avaliação média do restaurante (de 0 a 5)
  deliveryTime: string; // Tempo estimado de entrega (ex: "30-45 min")
  deliveryFee: number; // Taxa de entrega em valor monetário (número)
  minOrder: number; // Valor mínimo do pedido em valor monetário (número)
  imageUrl?: string; // URL da imagem do restaurante (opcional)
  addressId?: string; // ID do endereço do restaurante (opcional)
  isOpen: boolean; // Indica se o restaurante está aberto para pedidos
}

// Interface que define a estrutura de um item do cardápio
export interface MenuItem {
  id: string; // Identificador único do item no banco de dados
  restaurantId: string; // ID do restaurante que oferece este item
  name: string; // Nome do item do cardápio
  description?: string; // Descrição detalhada do item (opcional)
  price: number; // Preço do item em valor monetário
  category: string; // Categoria do item (entrada, prato principal, sobremesa, etc)
  imageUrl?: string; // URL da imagem do item (opcional)
  isAvailable: boolean; // Indica se o item está disponível para pedido
  rating?: number; // Avaliação média do item (opcional, de 0 a 5)
  preparationTime?: string; // Tempo de preparo estimado (opcional)
}
