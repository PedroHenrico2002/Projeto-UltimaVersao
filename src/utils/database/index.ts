
/**
 * Arquivo de índice para exportar todos os serviços de banco de dados
 * 
 * Este arquivo centraliza a exportação de todos os serviços e tipos
 * relacionados ao banco de dados da aplicação, facilitando a importação
 * destes recursos em outros módulos
 */

// Inicialização do banco de dados
import { initializeDatabase } from './utils';

// Exportar tipos
export * from './types';

// Exportar serviços de acesso a dados
export { userService } from './userService';      // Serviço para gerenciamento de usuários
export { addressService } from './addressService'; // Serviço para gerenciamento de endereços
export { categoryService } from './categoryService'; // Serviço para gerenciamento de categorias
export { restaurantService } from './restaurantService'; // Serviço para gerenciamento de restaurantes
export { menuItemService } from './menuItemService'; // Serviço para gerenciamento de itens do cardápio
export { orderService } from './orderService'; // Serviço para gerenciamento de pedidos

// Inicializar o banco de dados quando o módulo é importado
// Isso garante que os dados iniciais sejam carregados
initializeDatabase();
