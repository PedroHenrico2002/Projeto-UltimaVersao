
/**
 * Dados de exemplo para itens de menu
 */
import { MenuItem } from '../types';

// Itens de menu de exemplo
export const sampleMenuItems: MenuItem[] = [
  // Doce Paixão - Itens do restaurante de doces
  { 
    id: '101', // ID único do item
    restaurantId: '1', // ID do restaurante Doce Paixão
    name: 'Bolo de Chocolate com Frutas', // Nome do item
    description: 'Delicioso bolo de chocolate decorado com frutas frescas', // Descrição
    price: 29.9, // Preço
    imageUrl: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=80', // Imagem
    category: 'Sobremesas', // Categoria
    rating: 4.8, // Avaliação
    isAvailable: true // Disponível para pedido
  },
  { 
    id: '102', 
    restaurantId: '1', 
    name: 'Torta de Morango', 
    description: 'Torta de morango com creme de baunilha e massa crocante', 
    price: 27.5, 
    imageUrl: 'https://images.unsplash.com/photo-1455268745580-72a73648e5e2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=80', 
    category: 'Sobremesas', 
    rating: 4.7,
    isAvailable: true
  },
  { 
    id: '103', 
    restaurantId: '1', 
    name: 'Cupcake de Red Velvet', 
    description: 'Cupcake red velvet com cobertura de cream cheese', 
    price: 8.9, 
    imageUrl: 'https://images.unsplash.com/photo-1519869325930-281384150729?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=80', 
    category: 'Doces', 
    rating: 4.9,
    isAvailable: true
  },
  { 
    id: '104', 
    restaurantId: '1', 
    name: 'Doces Variados', 
    description: 'Caixa com 12 unidades de doces variados (brigadeiros, beijinhos e cajuzinhos)', 
    price: 24.9, 
    imageUrl: 'https://images.unsplash.com/photo-1581798459219-318e68f60ae5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=80', 
    category: 'Doces', 
    rating: 4.6,
    isAvailable: true
  },
  { 
    id: '105', 
    restaurantId: '1', 
    name: 'Cheesecake de Frutas Vermelhas', 
    description: 'Cheesecake cremoso com calda de frutas vermelhas e base de biscoito', 
    price: 34.9, 
    imageUrl: 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=80', 
    category: 'Sobremesas', 
    rating: 4.9,
    isAvailable: true
  },
  
  // Restaurante Japonês - Itens de comida japonesa
  { 
    id: '201', 
    restaurantId: '2', 
    name: 'Combo Sushi Premium (30 peças)', 
    description: 'Seleção de 30 peças com os melhores rolls, uramakis e niguiris do chef', 
    price: 79.9, 
    imageUrl: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=80', 
    category: 'Combos', 
    rating: 4.9,
    isAvailable: true
  },
  { 
    id: '202', 
    restaurantId: '2', 
    name: 'Sashimi de Salmão (12 fatias)', 
    description: 'Fatias frescas de salmão importado servidas com molho shoyu especial e wasabi', 
    price: 45.9, 
    imageUrl: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=80', 
    category: 'Sashimi', 
    rating: 4.8,
    isAvailable: true
  },
  { 
    id: '203', 
    restaurantId: '2', 
    name: 'Temaki Especial', 
    description: 'Temaki recheado com salmão, cream cheese, manga e cebolinha', 
    price: 24.9, 
    imageUrl: 'https://images.unsplash.com/photo-1615361200141-f45625a9296d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=80', 
    category: 'Temaki', 
    rating: 4.7,
    isAvailable: true
  },
  { 
    id: '204', 
    restaurantId: '2', 
    name: 'Yakisoba Tradicional', 
    description: 'Macarrão oriental salteado com legumes frescos e tiras de frango ou carne (escolha na observação)', 
    price: 38.9, 
    imageUrl: 'https://images.unsplash.com/photo-1617421753170-46511a9d73bf?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=80', 
    category: 'Pratos Quentes', 
    rating: 4.6,
    isAvailable: true
  },
  { 
    id: '205', 
    restaurantId: '2', 
    name: 'Gyoza (6 unidades)', 
    description: 'Pastéis japoneses grelhados, recheados com carne de porco e legumes', 
    price: 22.5, 
    imageUrl: 'https://images.unsplash.com/photo-1625938145744-937239906491?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=80', 
    category: 'Entradas', 
    rating: 4.7,
    isAvailable: true
  },
  
  // Churrascaria Gaúcha - Itens de churrasco
  { 
    id: '301', 
    restaurantId: '3', 
    name: 'Picanha Premium (400g)', 
    description: 'Corte nobre de picanha, grelhada no ponto desejado, acompanha farofa, vinagrete e pão de alho', 
    price: 79.9, 
    imageUrl: 'https://images.unsplash.com/photo-1558030006-450675393462?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=80', 
    category: 'Carnes', 
    rating: 4.9,
    isAvailable: true
  },
  { 
    id: '302', 
    restaurantId: '3', 
    name: 'Costela Gaúcha (500g)', 
    description: 'Costela bovina assada lentamente por 8 horas, extremamente macia, servida com mandioca cozida', 
    price: 64.9, 
    imageUrl: 'https://images.unsplash.com/photo-1544025162-d76694265947?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=80', 
    category: 'Carnes', 
    rating: 4.8,
    isAvailable: true
  },
  
  // Outros restaurantes - Mais itens de exemplo
  { 
    id: '401', 
    restaurantId: '4', 
    name: 'Feijoada Completa', 
    description: 'Tradicional feijoada com carnes nobres, acompanha arroz, couve, farofa, laranja e torresmo', 
    price: 36.9, 
    imageUrl: 'https://images.unsplash.com/photo-1571809839227-b2ac3d261257?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=80', 
    category: 'Pratos Principais', 
    rating: 4.8,
    isAvailable: true
  },
  { 
    id: '601', 
    restaurantId: '6', 
    name: 'Gelato de Pistache Tradicional', 
    description: 'Gelato italiano autêntico de pistache, feito com ingredientes importados da Sicília', 
    price: 18.9, 
    imageUrl: 'https://images.unsplash.com/photo-1579954115545-a95591f28bfc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=80', 
    category: 'Gelatos', 
    rating: 4.9,
    isAvailable: true
  },
  { 
    id: '701', 
    restaurantId: '7', 
    name: 'Éclair de Chocolate', 
    description: 'Massa choux crocante recheada com creme de chocolate belga e cobertura de ganache', 
    price: 12.9, 
    imageUrl: 'https://images.unsplash.com/photo-1550617931-e17a7b70dce2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=80', 
    category: 'Doces Finos', 
    rating: 4.7,
    isAvailable: true
  },
  { 
    id: '801', 
    restaurantId: '8', 
    name: 'Açaí Tradicional na Tigela', 
    description: 'Açaí tradicional na tigela com banana, granola e mel orgânico', 
    price: 15.9, 
    imageUrl: 'https://images.unsplash.com/photo-1615478503562-ec2d8aa0e24e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=80', 
    category: 'Açaí', 
    rating: 4.8,
    isAvailable: true
  }
];
