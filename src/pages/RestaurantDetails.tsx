import React, { useState, useEffect } from 'react';
import { Layout } from '@/components/Layout';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Minus, Plus, ShoppingCart, ChevronLeft, Star, AlertCircle } from 'lucide-react';
import { toast } from '@/lib/toast';
import { PaymentMethods, PaymentMethod } from '@/components/PaymentMethods';

const restaurantsData = {
  '1': {
    id: '1',
    name: 'Doce Paixão',
    image: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=80',
    cuisine: 'Doces e Bolos',
    rating: 4.9,
    deliveryTime: '20-35 min',
    minOrder: 'R$5,90',
    featured: true,
    menu: [
      {
        id: '101',
        name: 'Bolo de Chocolate com Frutas',
        image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=80',
        description: 'Delicioso bolo de chocolate decorado com frutas frescas',
        price: 'R$29,90',
        priceValue: 29.90
      },
      {
        id: '102',
        name: 'Torta de Morango',
        image: 'https://images.unsplash.com/photo-1455268745580-72a73648e5e2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=80',
        description: 'Torta de morango com creme de baunilha e massa crocante',
        price: 'R$27,50',
        priceValue: 27.50
      },
      {
        id: '103',
        name: 'Cupcake de Red Velvet',
        image: 'https://images.unsplash.com/photo-1519869325930-281384150729?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=80',
        description: 'Cupcake red velvet com cobertura de cream cheese',
        price: 'R$8,90',
        priceValue: 8.90
      },
      {
        id: '104',
        name: 'Doces Variados',
        image: 'https://images.unsplash.com/photo-1581798459219-318e68f60ae5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=80',
        description: 'Caixa com 12 unidades de doces variados (brigadeiros, beijinhos e cajuzinhos)',
        price: 'R$24,90',
        priceValue: 24.90
      },
      {
        id: '105',
        name: 'Cheesecake de Frutas Vermelhas',
        image: 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=80',
        description: 'Cheesecake cremoso com calda de frutas vermelhas e base de biscoito',
        price: 'R$34,90',
        priceValue: 34.90
      }
    ]
  },
  '2': {
    id: '2',
    name: 'Restaurante Japonês',
    image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    cuisine: 'Japonesa',
    rating: 4.9,
    deliveryTime: '30-45 min',
    minOrder: 'R$25,00',
    menu: [
      {
        id: '201',
        name: 'Combo Sushi Premium (30 peças)',
        image: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=80',
        description: 'Seleção de 30 peças com os melhores rolls, uramakis e niguiris do chef',
        price: 'R$79,90',
        priceValue: 79.90
      },
      {
        id: '202',
        name: 'Sashimi de Salmão (12 fatias)',
        image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=80',
        description: 'Fatias frescas de salmão importado servidas com molho shoyu especial e wasabi',
        price: 'R$45,90',
        priceValue: 45.90
      },
      {
        id: '203',
        name: 'Temaki Especial',
        image: 'https://images.unsplash.com/photo-1615361200141-f45625a9296d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=80',
        description: 'Temaki recheado com salmão, cream cheese, manga e cebolinha',
        price: 'R$24,90',
        priceValue: 24.90
      },
      {
        id: '204',
        name: 'Yakisoba Tradicional',
        image: 'https://images.unsplash.com/photo-1617421753170-46511a9d73bf?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=80',
        description: 'Macarrão oriental salteado com legumes frescos e tiras de frango ou carne (escolha na observação)',
        price: 'R$38,90',
        priceValue: 38.90
      },
      {
        id: '205',
        name: 'Gyoza (6 unidades)',
        image: 'https://images.unsplash.com/photo-1625938145744-937239906491?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=80',
        description: 'Pastéis japoneses grelhados, recheados com carne de porco e legumes',
        price: 'R$22,50',
        priceValue: 22.50
      }
    ]
  },
  '3': {
    id: '3',
    name: 'Churrascaria Gaúcha',
    image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    cuisine: 'Churrasco',
    rating: 4.7,
    deliveryTime: '35-50 min',
    minOrder: 'R$30,00',
    menu: [
      {
        id: '301',
        name: 'Picanha Premium (400g)',
        image: 'https://images.unsplash.com/photo-1558030006-450675393462?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=80',
        description: 'Corte nobre de picanha, grelhada no ponto desejado, acompanha farofa, vinagrete e pão de alho',
        price: 'R$79,90',
        priceValue: 79.90
      },
      {
        id: '302',
        name: 'Costela Gaúcha (500g)',
        image: 'https://images.unsplash.com/photo-1544025162-d76694265947?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=80',
        description: 'Costela bovina assada lentamente por 8 horas, extremamente macia, servida com mandioca cozida',
        price: 'R$64,90',
        priceValue: 64.90
      },
      {
        id: '303',
        name: 'Combo Gaúcho (serve 2)',
        image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=80',
        description: 'Seleção especial de cortes: maminha, linguiça toscana, fraldinha e cupim. Acompanha arroz, feijão, farofa e vinagrete',
        price: 'R$119,90',
        priceValue: 119.90
      },
      {
        id: '304',
        name: 'Linguiça Artesanal (350g)',
        image: 'https://images.unsplash.com/photo-1597714026720-76d60ae15bbf?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=80',
        description: 'Linguiça suína artesanal grelhada na brasa, temperada com ervas especiais',
        price: 'R$32,90',
        priceValue: 32.90
      },
      {
        id: '305',
        name: 'Arroz Carreteiro',
        image: 'https://images.unsplash.com/photo-1574484284002-952d92456975?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=80',
        description: 'Tradicional arroz carreteiro preparado com charque, linguiça, cebola e temperos gaúchos',
        price: 'R$42,90',
        priceValue: 42.90
      }
    ]
  },
  '4': {
    id: '4',
    name: 'Comida Caseira',
    image: 'https://images.unsplash.com/photo-1547928576-f8d1c7a1b709?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    cuisine: 'Brasileira',
    rating: 4.5,
    deliveryTime: '20-35 min',
    minOrder: 'R$12,90',
    menu: [
      {
        id: '401',
        name: 'Feijoada Completa',
        image: 'https://images.unsplash.com/photo-1571809839227-b2ac3d261257?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=80',
        description: 'Tradicional feijoada com carnes nobres, acompanha arroz, couve, farofa, laranja e torresmo',
        price: 'R$36,90',
        priceValue: 36.90
      },
      {
        id: '402',
        name: 'Escondidinho de Carne Seca',
        image: 'https://images.unsplash.com/photo-1604909052743-94e838986d24?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=80',
        description: 'Purê de mandioca gratinado com recheio de carne seca desfiada e queijo coalho',
        price: 'R$29,90',
        priceValue: 29.90
      },
      {
        id: '403',
        name: 'Baião de Dois',
        image: 'https://images.unsplash.com/photo-1551462147-37885acc36f1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=80',
        description: 'Arroz e feijão de corda cozidos juntos, com queijo coalho, carnes e temperos do sertão',
        price: 'R$27,50',
        priceValue: 27.50
      },
      {
        id: '404',
        name: 'Galinhada com Pequi',
        image: 'https://images.unsplash.com/photo-1547928576-f8d1c7a1b709?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=80',
        description: 'Arroz com frango caipira, pequi, açafrão e temperos especiais do cerrado',
        price: 'R$32,90',
        priceValue: 32.90
      },
      {
        id: '405',
        name: 'Marmitex Executiva',
        image: 'https://images.unsplash.com/photo-1546793665-c74683f339c1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=80',
        description: 'Arroz, feijão, bife acebolado, batata frita, ovo frito e salada (serve 1 pessoa)',
        price: 'R$19,90',
        priceValue: 19.90
      }
    ]
  },
  '6': {
    id: '6',
    name: 'Gelato Italiano',
    image: 'https://images.unsplash.com/photo-1501443762994-82bd5dace89a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=80',
    cuisine: 'Sorvetes e Gelatos Artesanais',
    rating: 4.6,
    deliveryTime: '15-30 min',
    minOrder: 'R$6,50',
    featured: true,
    menu: [
      {
        id: '601',
        name: 'Gelato de Pistache Tradicional',
        image: 'https://images.unsplash.com/photo-1579954115545-a95591f28bfc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=80',
        description: 'Gelato italiano autêntico de pistache, feito com ingredientes importados da Sicília',
        price: 'R$18,90',
        priceValue: 18.90
      },
      {
        id: '602',
        name: 'Sorvete de Chocolate Belga Premium',
        image: 'https://images.unsplash.com/photo-1563894923499-f65aff78a0d6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=80',
        description: 'Sorvete cremoso de chocolate belga premium com 70% de cacau e pedaços de chocolate',
        price: 'R$16,50',
        priceValue: 16.50
      },
      {
        id: '603',
        name: 'Sundae de Caramelo Salgado',
        image: 'https://images.unsplash.com/photo-1541658016709-82535e94bc69?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=80',
        description: 'Sundae especial com sorvete de baunilha, calda de caramelo salgado e amendoim torrado',
        price: 'R$14,90',
        priceValue: 14.90
      },
      {
        id: '604',
        name: 'Banana Split Clássica',
        image: 'https://images.unsplash.com/photo-1570197788417-0e82375c9371?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=80',
        description: 'Clássica banana split com três sabores de sorvete (chocolate, morango e baunilha) e coberturas especiais',
        price: 'R$22,90',
        priceValue: 22.90
      },
      {
        id: '605',
        name: 'Gelato de Stracciatella',
        image: 'https://images.unsplash.com/photo-1584278858021-91b1319e5c64?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=80',
        description: 'Tradicional gelato de creme com lascas de chocolate amargo importado',
        price: 'R$17,90',
        priceValue: 17.90
      }
    ]
  },
  '8': {
    id: '8',
    name: 'Açaí Tropical',
    image: 'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=80',
    cuisine: 'Açaí e Smoothies Premium',
    rating: 4.7,
    deliveryTime: '20-35 min',
    minOrder: 'R$5,50',
    featured: true,
    menu: [
      {
        id: '801',
        name: 'Açaí Tradicional na Tigela',
        image: 'https://images.unsplash.com/photo-1615478503562-ec2d8aa0e24e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=80',
        description: 'Açaí tradicional na tigela com banana, granola e mel orgânico',
        price: 'R$15,90',
        priceValue: 15.90
      },
      {
        id: '802',
        name: 'Smoothie de Frutas Vermelhas',
        image: 'https://images.unsplash.com/photo-1506802913710-40e2e66339c9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=80',
        description: 'Smoothie refrescante de frutas vermelhas (morango, framboesa e amora) com iogurte natural',
        price: 'R$12,50',
        priceValue: 12.50
      },
      {
        id: '803',
        name: 'Açaí Especial com Mix de Frutas',
        image: 'https://images.unsplash.com/photo-1577805947697-89e18249d767?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=80',
        description: 'Açaí premium com mix de frutas frescas (morango, kiwi, banana), leite condensado e granola artesanal',
        price: 'R$19,90',
        priceValue: 19.90
      },
      {
        id: '804',
        name: 'Bowl Energia Amazônica',
        image: 'https://images.unsplash.com/photo-1573590330099-d6c7355ec595?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=80',
        description: 'Bowl energético com açaí amazônico, banana, morango, granola, castanhas brasileiras e pasta de amendoim natural',
        price: 'R$22,90',
        priceValue: 22.90
      },
      {
        id: '805',
        name: 'Açaí com Cupuaçu',
        image: 'https://images.unsplash.com/photo-1606213651356-0adb205dec89?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=80',
        description: 'Mistura especial de açaí com cupuaçu, servida com granola e mel',
        price: 'R$18,50',
        priceValue: 18.50
      }
    ]
  },
  '7': {
    id: '7',
    name: 'Confeitaria Doce Sonho',
    image: 'https://images.unsplash.com/photo-1574085733277-851d9d856a3a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    cuisine: 'Doces e Confeitaria',
    rating: 4.8,
    deliveryTime: '25-40 min',
    minOrder: 'R$7,50',
    featured: true,
    menu: [
      {
        id: '701',
        name: 'Éclair de Chocolate',
        image: 'https://images.unsplash.com/photo-1550617931-e17a7b70dce2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=80',
        description: 'Massa choux crocante recheada com creme de chocolate belga e cobertura de ganache',
        price: 'R$12,90',
        priceValue: 12.90
      },
      {
        id: '702',
        name: 'Croissant de Amêndoas',
        image: 'https://images.unsplash.com/photo-1509365465985-25d11c17e812?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=80',
        description: 'Croissant folhado coberto com creme de amêndoas e amêndoas laminadas',
        price: 'R$15,50',
        priceValue: 15.50
      },
      {
        id: '703',
        name: 'Macaron (6 unidades)',
        image: 'https://images.unsplash.com/photo-1569864358642-9d1684040f43?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=80',
        description: 'Caixa com 6 macarons variados: pistache, framboesa, chocolate, limão, caramelo salgado e flor de laranjeira',
        price: 'R$24,90',
        priceValue: 24.90
      },
      {
        id: '704',
        name: 'Torta Ópera',
        image: 'https://images.unsplash.com/photo-1574085733277-851d9d856a3a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=80',
        description: 'Clássica torta francesa com camadas de biscoito Joconde, café, creme de manteiga e chocolate',
        price: 'R$16,90',
        priceValue: 16.90
      },
      {
        id: '705',
        name: 'Paris-Brest',
        image: 'https://images.unsplash.com/photo-1464305795204-6f5bbfc7fb81?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=80',
        description: 'Tradicional sobremesa francesa de massa choux em formato de roda, recheada com creme pralinê',
        price: 'R$18,50',
        priceValue: 18.50
      }
    ]
  }
};

interface CartItem {
  id: string;
  name: string;
  price: string;
  priceValue: number;
  quantity: number;
}

const RestaurantDetails: React.FC = () => {
  const { restaurantId } = useParams<{ restaurantId: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [totalValue, setTotalValue] = useState(0);
  const [showPaymentOptions, setShowPaymentOptions] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState<PaymentMethod>('credit');
  const [selectedCard, setSelectedCard] = useState<any>(null);
  const [isFormValid, setIsFormValid] = useState(false);
  
  const restaurant = restaurantId ? restaurantsData[restaurantId as keyof typeof restaurantsData] : null;
  
  useEffect(() => {
    const newTotal = cartItems.reduce((sum, item) => sum + (item.priceValue * item.quantity), 0);
    setTotalValue(newTotal);
  }, [cartItems]);

  useEffect(() => {
    if (selectedPayment === 'cash') {
      setIsFormValid(true);
    } else {
      setIsFormValid(!!selectedCard);
    }
  }, [selectedPayment, selectedCard]);
  
  const handleBack = () => {
    if (location.state && location.state.from) {
      navigate(location.state.from);
    } else {
      navigate(-1);
    }
  };
  
  if (!restaurant) {
    return (
      <Layout>
        <div className="pt-28 pb-16">
          <div className="page-container">
            <div className="text-center">
              <h1 className="heading-lg mb-4">Restaurante não encontrado</h1>
              <Button 
                onClick={() => navigate('/restaurants')}
                className="bg-red-600 hover:bg-red-700 text-white"
              >
                Voltar para Restaurantes
              </Button>
            </div>
          </div>
        </div>
      </Layout>
    );
  }
  
  const addToCart = (item: any) => {
    setCartItems(prev => {
      const existingItemIndex = prev.findIndex(cartItem => cartItem.id === item.id);
      
      if (existingItemIndex >= 0) {
        const updatedItems = [...prev];
        updatedItems[existingItemIndex].quantity += 1;
        return updatedItems;
      } else {
        return [...prev, { 
          id: item.id, 
          name: item.name, 
          price: item.price,
          priceValue: item.priceValue,
          quantity: 1 
        }];
      }
    });
    
    toast.success('Item adicionado ao carrinho!');
  };
  
  const removeFromCart = (itemId: string) => {
    setCartItems(prev => {
      const existingItemIndex = prev.findIndex(item => item.id === itemId);
      
      if (existingItemIndex >= 0) {
        const updatedItems = [...prev];
        if (updatedItems[existingItemIndex].quantity > 1) {
          updatedItems[existingItemIndex].quantity -= 1;
          return updatedItems;
        } else {
          return prev.filter(item => item.id !== itemId);
        }
      }
      
      return prev;
    });
  };
  
  const handlePaymentSelect = (paymentData: any) => {
    setSelectedPayment(paymentData.method);
    setSelectedCard(paymentData);
  };
  
  const handleFinishOrder = () => {
    if (cartItems.length === 0) {
      toast.error('Adicione itens ao carrinho primeiro');
      return;
    }
    
    setShowPaymentOptions(true);
  };
  
  const handleConfirmOrder = () => {
    if (!isFormValid) {
      if (selectedPayment !== 'cash') {
        toast.error('Adicione um cartão para continuar');
      }
      return;
    }
    
    sessionStorage.setItem('currentOrder', JSON.stringify({
      restaurantName: restaurant.name,
      restaurantId: restaurant.id,
      items: cartItems,
      totalValue: totalValue,
      orderNumber: `#${Math.floor(10000 + Math.random() * 90000)}`,
      paymentMethod: selectedPayment,
      paymentDetails: selectedCard
    }));
    
    navigate('/confirm-order', { state: { from: `/restaurants/${restaurantId}` } });
  };
  
  return (
    <Layout>
      <div className="pt-20 pb-16">
        <div className="page-container">
          <div className="mb-6">
            <button
              onClick={handleBack}
              className="flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <ChevronLeft size={16} className="mr-1" />
              <span>Voltar</span>
            </button>
          </div>
          
          <div className="mb-6">
            <div className="flex items-center mb-4">
              <div className="w-16 h-16 rounded-lg overflow-hidden mr-4">
                <img 
                  src={restaurant.image} 
                  alt={restaurant.name} 
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h1 className="text-xl font-bold">{restaurant.name}</h1>
                <div className="flex items-center mt-1">
                  <div className="flex items-center text-yellow-500">
                    <Star size={16} className="fill-current" />
                    <span className="ml-1 font-medium">{restaurant.rating}</span>
                  </div>
                  <span className="mx-2 text-gray-300">•</span>
                  <span className="text-gray-600">{restaurant.cuisine}</span>
                  <span className="mx-2 text-gray-300">•</span>
                  <span className="text-gray-600">{restaurant.deliveryTime}</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <h2 className="text-lg font-semibold mb-4">Cardápio</h2>
              
              <div className="space-y-4">
                {restaurant.menu.map((item) => (
                  <div key={item.id} className="flex border rounded-lg overflow-hidden bg-white">
                    <div className="w-24 h-24 bg-gray-200">
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 p-3 flex flex-col">
                      <h3 className="font-medium">{item.name}</h3>
                      <p className="text-sm text-gray-500 flex-grow">{item.description}</p>
                      <div className="flex items-center justify-between mt-2">
                        <span className="font-semibold">{item.price}</span>
                        <div className="flex items-center">
                          {cartItems.find(cartItem => cartItem.id === item.id) && (
                            <>
                              <Button 
                                variant="outline" 
                                size="icon" 
                                className="h-8 w-8 rounded-full"
                                onClick={() => removeFromCart(item.id)}
                              >
                                <Minus size={14} />
                              </Button>
                              <span className="mx-2 font-medium">
                                {cartItems.find(cartItem => cartItem.id === item.id)?.quantity || 0}
                              </span>
                            </>
                          )}
                          <Button 
                            size="sm"
                            className="rounded-full h-8 w-8 p-0 bg-red-600 hover:bg-red-700 text-white"
                            onClick={() => addToCart(item)}
                          >
                            <Plus size={14} />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <div className="bg-white rounded-lg border p-4 sticky top-24">
                <h2 className="text-lg font-semibold mb-4">Seu pedido</h2>
                
                {cartItems.length === 0 ? (
                  <div className="text-center py-6">
                    <ShoppingCart size={24} className="mx-auto text-gray-400 mb-2" />
                    <p className="text-gray-500">Seu carrinho está vazio</p>
                    <p className="text-sm text-gray-400 mt-1">Adicione itens do cardápio</p>
                  </div>
                ) : (
                  <>
                    {!showPaymentOptions ? (
                      <>
                        <div className="space-y-3 mb-4">
                          {cartItems.map((item) => (
                            <div key={item.id} className="flex justify-between items-center">
                              <div className="flex items-start">
                                <span className="bg-red-100 text-red-600 w-6 h-6 rounded-full flex items-center justify-center mr-2">
                                  {item.quantity}
                                </span>
                                <span className="text-sm">{item.name}</span>
                              </div>
                              <span className="font-medium">{item.price}</span>
                            </div>
                          ))}
                        </div>
                        
                        <div className="border-t pt-3 mt-3">
                          <div className="flex justify-between items-center font-semibold">
                            <span>Total</span>
                            <span className="text-lg">R${totalValue.toFixed(2).replace('.', ',')}</span>
                          </div>
                        </div>
                        
                        <Button 
                          className="w-full mt-4 bg-red-600 hover:bg-red-700 text-white"
                          onClick={handleFinishOrder}
                        >
                          Finalizar Pedido
                        </Button>
                      </>
                    ) : (
                      <>
                        <div className="space-y-3 mb-4">
                          <h3 className="font-medium">Forma de pagamento</h3>
                          <PaymentMethods 
                            onPaymentSelect={handlePaymentSelect}
                            selectedMethod={selectedPayment}
                          />
                        </div>
                        
                        {!isFormValid && selectedPayment !== 'cash' && (
                          <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg text-sm text-yellow-800 flex items-start gap-2">
                            <AlertCircle className="h-4 w-4 text-yellow-500 mt-0.5 flex-shrink-0" />
                            <span>Adicione um cartão para continuar com o pedido</span>
                          </div>
                        )}
                        
                        <div className="border-t pt-3 mt-3">
                          <div className="flex justify-between items-center mb-2">
                            <span>Forma de pagamento</span>
                            <span>
                              {selectedPayment === 'credit' && 'Crédito'}
                              {selectedPayment === 'debit' && 'Débito'}
                              {selectedPayment === 'pix' && 'PIX'}
                              {selectedPayment === 'cash' && 'Pagar na entrega'}
                            </span>
                          </div>
                          
                          <div className="flex justify-between items-center font-semibold">
                            <span>Total</span>
                            <span className="text-lg">R${totalValue.toFixed(2).replace('.', ',')}</span>
                          </div>
                        </div>
                        
                        <div className="flex gap-2 mt-4">
                          <Button 
                            variant="outline"
                            className="flex-1"
                            onClick={() => setShowPaymentOptions(false)}
                          >
                            Voltar
                          </Button>
                          <Button 
                            className="flex-1 bg-red-600 hover:bg-red-700 text-white"
                            onClick={handleConfirmOrder}
                            disabled={!isFormValid}
                          >
                            Confirmar Pedido
                          </Button>
                        </div>
                      </>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default RestaurantDetails;
