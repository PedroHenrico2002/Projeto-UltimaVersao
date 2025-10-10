-- Sincronização de dados do projeto no Supabase
-- Este script popula as tabelas com dados de exemplo se ainda não existirem

-- Inserir categorias
INSERT INTO public.categories (id, name, icon) VALUES
  ('00000000-0000-0000-0000-000000000001', 'Pizza', '🍕'),
  ('00000000-0000-0000-0000-000000000002', 'Burger', '🍔'),
  ('00000000-0000-0000-0000-000000000003', 'Sushi', '🍣'),
  ('00000000-0000-0000-0000-000000000004', 'Salad', '🥗'),
  ('00000000-0000-0000-0000-000000000005', 'Sobremesas', '🍰'),
  ('00000000-0000-0000-0000-000000000006', 'Bebidas', '🥤')
ON CONFLICT (id) DO NOTHING;

-- Inserir endereços dos restaurantes
INSERT INTO public.addresses (id, street, number, neighborhood, city, state, zip_code, is_restaurant_address) VALUES
  ('00000000-0000-0000-0000-000000000101', 'Rua das Flores', '123', 'Centro', 'São Paulo', 'SP', '01234-567', true),
  ('00000000-0000-0000-0000-000000000102', 'Av. Paulista', '1000', 'Bela Vista', 'São Paulo', 'SP', '01310-100', true),
  ('00000000-0000-0000-0000-000000000103', 'Rua Augusta', '500', 'Consolação', 'São Paulo', 'SP', '01305-000', true),
  ('00000000-0000-0000-0000-000000000104', 'Rua Oscar Freire', '200', 'Jardins', 'São Paulo', 'SP', '01426-000', true),
  ('00000000-0000-0000-0000-000000000106', 'Av. Brigadeiro Faria Lima', '3000', 'Itaim Bibi', 'São Paulo', 'SP', '04538-132', true),
  ('00000000-0000-0000-0000-000000000107', 'Rua Haddock Lobo', '800', 'Cerqueira César', 'São Paulo', 'SP', '01414-000', true),
  ('00000000-0000-0000-0000-000000000108', 'Av. Europa', '1500', 'Jardim Europa', 'São Paulo', 'SP', '01449-000', true)
ON CONFLICT (id) DO NOTHING;

-- Inserir restaurantes
INSERT INTO public.restaurants (id, name, description, category_id, cuisine, rating, delivery_time, delivery_fee, min_order, image_url, address_id, is_open) VALUES
  ('00000000-0000-0000-0000-000000000201', 'Doce Paixão', 'Os melhores doces e bolos artesanais da região', '00000000-0000-0000-0000-000000000005', 'Doces e Bolos', 4.9, '20-35 min', 3.50, 5.90, 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=80', '00000000-0000-0000-0000-000000000101', true),
  ('00000000-0000-0000-0000-000000000202', 'Restaurante Japonês', 'Autêntica culinária japonesa com ingredientes frescos', '00000000-0000-0000-0000-000000000003', 'Japonesa', 4.9, '30-45 min', 5.00, 25.00, 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80', '00000000-0000-0000-0000-000000000102', true),
  ('00000000-0000-0000-0000-000000000203', 'Churrascaria Gaúcha', 'Carnes nobres preparadas na brasa', '00000000-0000-0000-0000-000000000002', 'Churrasco', 4.7, '35-50 min', 6.00, 30.00, 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80', '00000000-0000-0000-0000-000000000103', true),
  ('00000000-0000-0000-0000-000000000204', 'Comida Caseira', 'Sabor de comida feita em casa', '00000000-0000-0000-0000-000000000001', 'Brasileira', 4.5, '20-35 min', 4.00, 12.90, 'https://images.unsplash.com/photo-1547928576-f8d1c7a1b709?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80', '00000000-0000-0000-0000-000000000104', true),
  ('00000000-0000-0000-0000-000000000206', 'Gelato Italiano', 'Gelatos artesanais com receitas tradicionais', '00000000-0000-0000-0000-000000000005', 'Sorvetes e Gelatos Artesanais', 4.6, '15-30 min', 2.50, 6.50, 'https://images.unsplash.com/photo-1501443762994-82bd5dace89a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=80', '00000000-0000-0000-0000-000000000106', true),
  ('00000000-0000-0000-0000-000000000207', 'Confeitaria Doce Sonho', 'Doces finos e confeitaria premium', '00000000-0000-0000-0000-000000000005', 'Doces e Confeitaria', 4.8, '25-40 min', 3.00, 7.50, 'https://images.unsplash.com/photo-1574085733277-851d9d856a3a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80', '00000000-0000-0000-0000-000000000107', true),
  ('00000000-0000-0000-0000-000000000208', 'Açaí Tropical', 'Açaí e smoothies premium', '00000000-0000-0000-0000-000000000005', 'Açaí e Smoothies Premium', 4.7, '20-35 min', 2.00, 5.50, 'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=80', '00000000-0000-0000-0000-000000000108', true)
ON CONFLICT (id) DO NOTHING;

-- Inserir itens de menu
INSERT INTO public.menu_items (id, restaurant_id, name, description, price, category, image_url, rating, is_available, preparation_time) VALUES
  -- Doce Paixão
  ('00000000-0000-0000-0000-000000000301', '00000000-0000-0000-0000-000000000201', 'Bolo de Chocolate com Frutas', 'Delicioso bolo de chocolate decorado com frutas frescas', 29.90, 'Sobremesas', 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=80', 4.8, true, '15-20 min'),
  ('00000000-0000-0000-0000-000000000302', '00000000-0000-0000-0000-000000000201', 'Torta de Morango', 'Torta de morango com creme de baunilha e massa crocante', 27.50, 'Sobremesas', 'https://images.unsplash.com/photo-1455268745580-72a73648e5e2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=80', 4.7, true, '10-15 min'),
  ('00000000-0000-0000-0000-000000000303', '00000000-0000-0000-0000-000000000201', 'Cupcake de Red Velvet', 'Cupcake red velvet com cobertura de cream cheese', 8.90, 'Doces', 'https://images.unsplash.com/photo-1519869325930-281384150729?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=80', 4.9, true, '5-10 min'),
  ('00000000-0000-0000-0000-000000000304', '00000000-0000-0000-0000-000000000201', 'Doces Variados', 'Caixa com 12 unidades de doces variados (brigadeiros, beijinhos e cajuzinhos)', 24.90, 'Doces', 'https://images.unsplash.com/photo-1581798459219-318e68f60ae5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=80', 4.6, true, '10-15 min'),
  ('00000000-0000-0000-0000-000000000305', '00000000-0000-0000-0000-000000000201', 'Cheesecake de Frutas Vermelhas', 'Cheesecake cremoso com calda de frutas vermelhas e base de biscoito', 34.90, 'Sobremesas', 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=80', 4.9, true, '10-15 min'),
  
  -- Restaurante Japonês
  ('00000000-0000-0000-0000-000000000401', '00000000-0000-0000-0000-000000000202', 'Combo Sushi Premium (30 peças)', 'Seleção de 30 peças com os melhores rolls, uramakis e niguiris do chef', 79.90, 'Combos', 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=80', 4.9, true, '30-40 min'),
  ('00000000-0000-0000-0000-000000000402', '00000000-0000-0000-0000-000000000202', 'Sashimi de Salmão (12 fatias)', 'Fatias frescas de salmão importado servidas com molho shoyu especial e wasabi', 45.90, 'Sashimi', 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=80', 4.8, true, '10-15 min'),
  ('00000000-0000-0000-0000-000000000403', '00000000-0000-0000-0000-000000000202', 'Temaki Especial', 'Temaki recheado com salmão, cream cheese, manga e cebolinha', 24.90, 'Temaki', 'https://images.unsplash.com/photo-1615361200141-f45625a9296d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=80', 4.7, true, '15-20 min'),
  ('00000000-0000-0000-0000-000000000404', '00000000-0000-0000-0000-000000000202', 'Yakisoba Tradicional', 'Macarrão oriental salteado com legumes frescos e tiras de frango ou carne', 38.90, 'Pratos Quentes', 'https://images.unsplash.com/photo-1617421753170-46511a9d73bf?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=80', 4.6, true, '25-30 min'),
  ('00000000-0000-0000-0000-000000000405', '00000000-0000-0000-0000-000000000202', 'Gyoza (6 unidades)', 'Pastéis japoneses grelhados, recheados com carne de porco e legumes', 22.50, 'Entradas', 'https://images.unsplash.com/photo-1625938145744-937239906491?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=80', 4.7, true, '15-20 min'),
  
  -- Churrascaria Gaúcha
  ('00000000-0000-0000-0000-000000000501', '00000000-0000-0000-0000-000000000203', 'Picanha Premium (400g)', 'Corte nobre de picanha, grelhada no ponto desejado, acompanha farofa, vinagrete e pão de alho', 79.90, 'Carnes', 'https://images.unsplash.com/photo-1558030006-450675393462?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=80', 4.9, true, '35-45 min'),
  ('00000000-0000-0000-0000-000000000502', '00000000-0000-0000-0000-000000000203', 'Costela Gaúcha (500g)', 'Costela bovina assada lentamente por 8 horas, extremamente macia, servida com mandioca cozida', 64.90, 'Carnes', 'https://images.unsplash.com/photo-1544025162-d76694265947?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=80', 4.8, true, '40-50 min'),
  
  -- Comida Caseira
  ('00000000-0000-0000-0000-000000000601', '00000000-0000-0000-0000-000000000204', 'Feijoada Completa', 'Tradicional feijoada com carnes nobres, acompanha arroz, couve, farofa, laranja e torresmo', 36.90, 'Pratos Principais', 'https://images.unsplash.com/photo-1571809839227-b2ac3d261257?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=80', 4.8, true, '25-35 min'),
  
  -- Gelato Italiano
  ('00000000-0000-0000-0000-000000000701', '00000000-0000-0000-0000-000000000206', 'Gelato de Pistache Tradicional', 'Gelato italiano autêntico de pistache, feito com ingredientes importados da Sicília', 18.90, 'Gelatos', 'https://images.unsplash.com/photo-1579954115545-a95591f28bfc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=80', 4.9, true, '5-10 min'),
  
  -- Confeitaria Doce Sonho
  ('00000000-0000-0000-0000-000000000801', '00000000-0000-0000-0000-000000000207', 'Éclair de Chocolate', 'Massa choux crocante recheada com creme de chocolate belga e cobertura de ganache', 12.90, 'Doces Finos', 'https://images.unsplash.com/photo-1550617931-e17a7b70dce2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=80', 4.7, true, '10-15 min'),
  
  -- Açaí Tropical
  ('00000000-0000-0000-0000-000000000901', '00000000-0000-0000-0000-000000000208', 'Açaí Tradicional na Tigela', 'Açaí tradicional na tigela com banana, granola e mel orgânico', 15.90, 'Açaí', 'https://images.unsplash.com/photo-1615478503562-ec2d8aa0e24e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=80', 4.8, true, '10-15 min')
ON CONFLICT (id) DO NOTHING;