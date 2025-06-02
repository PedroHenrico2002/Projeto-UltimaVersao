
/**
 * Dados de exemplo para categorias de restaurantes e comidas
 * 
 * Este arquivo contém categorias pré-definidas que serão carregadas
 * automaticamente quando o sistema inicializar
 */
import { Category } from '../types'; // Importa o tipo Category

// Array com categorias de exemplo para popular o banco de dados
export const sampleCategories: Category[] = [
  { 
    id: '1', // ID único da categoria
    name: 'Pizza', // Nome da categoria
    icon: '🍕' // Emoji representativo
  },
  { 
    id: '2', 
    name: 'Burger', 
    icon: '🍔' 
  },
  { 
    id: '3', 
    name: 'Sushi', 
    icon: '🍣' 
  },
  { 
    id: '4', 
    name: 'Salad', 
    icon: '🥗' 
  },
  { 
    id: '5', 
    name: 'Sobremesas', 
    icon: '🍰' 
  },
  { 
    id: '6', 
    name: 'Bebidas', 
    icon: '🥤' 
  }
];
