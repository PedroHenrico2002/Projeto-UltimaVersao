-- Insert sample menu items
INSERT INTO public.menu_items (restaurant_id, name, description, price, category, image_url, rating, is_available)
SELECT
  r.id,
  m.name,
  m.description,
  m.price,
  m.category,
  m.image_url,
  m.rating,
  m.is_available
FROM (VALUES
  -- Doce Paixão items
  ('Doce Paixão', 'Bolo de Chocolate com Frutas', 'Delicioso bolo de chocolate decorado com frutas frescas', 29.90, 'Sobremesas', 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=80', 4.8, true),
  ('Doce Paixão', 'Torta de Morango', 'Torta de morango com creme de baunilha e massa crocante', 27.50, 'Sobremesas', 'https://images.unsplash.com/photo-1455268745580-72a73648e5e2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=80', 4.7, true),
  ('Doce Paixão', 'Cupcake de Red Velvet', 'Cupcake red velvet com cobertura de cream cheese', 8.90, 'Doces', 'https://images.unsplash.com/photo-1519869325930-281384150729?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=80', 4.9, true),
  ('Doce Paixão', 'Doces Variados', 'Caixa com 12 unidades de doces variados (brigadeiros, beijinhos e cajuzinhos)', 24.90, 'Doces', 'https://images.unsplash.com/photo-1581798459219-318e68f60ae5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=80', 4.6, true),
  ('Doce Paixão', 'Cheesecake de Frutas Vermelhas', 'Cheesecake cremoso com calda de frutas vermelhas e base de biscoito', 34.90, 'Sobremesas', 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=80', 4.9, true),
  
  -- Restaurante Japonês items
  ('Restaurante Japonês', 'Combo Sushi Premium (30 peças)', 'Seleção de 30 peças com os melhores rolls, uramakis e niguiris do chef', 79.90, 'Combos', 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=80', 4.9, true),
  ('Restaurante Japonês', 'Sashimi de Salmão (12 fatias)', 'Fatias frescas de salmão importado servidas com molho shoyu especial e wasabi', 45.90, 'Sashimi', 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=80', 4.8, true),
  ('Restaurante Japonês', 'Temaki Especial', 'Temaki recheado com salmão, cream cheese, manga e cebolinha', 24.90, 'Temaki', 'https://images.unsplash.com/photo-1615361200141-f45625a9296d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=80', 4.7, true),
  ('Restaurante Japonês', 'Yakisoba Tradicional', 'Macarrão oriental salteado com legumes frescos e tiras de frango ou carne', 38.90, 'Pratos Quentes', 'https://images.unsplash.com/photo-1617421753170-46511a9d73bf?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=80', 4.6, true),
  ('Restaurante Japonês', 'Gyoza (6 unidades)', 'Pastéis japoneses grelhados, recheados com carne de porco e legumes', 22.50, 'Entradas', 'https://images.unsplash.com/photo-1625938145744-937239906491?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=80', 4.7, true),
  
  -- Churrascaria Gaúcha items
  ('Churrascaria Gaúcha', 'Picanha Premium (400g)', 'Corte nobre de picanha, grelhada no ponto desejado, acompanha farofa, vinagrete e pão de alho', 79.90, 'Carnes', 'https://images.unsplash.com/photo-1558030006-450675393462?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=80', 4.9, true),
  ('Churrascaria Gaúcha', 'Costela Gaúcha (500g)', 'Costela bovina assada lentamente por 8 horas, extremamente macia, servida com mandioca cozida', 64.90, 'Carnes', 'https://images.unsplash.com/photo-1544025162-d76694265947?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=80', 4.8, true),
  
  -- Comida Caseira items
  ('Comida Caseira', 'Feijoada Completa', 'Tradicional feijoada com carnes nobres, acompanha arroz, couve, farofa, laranja e torresmo', 36.90, 'Pratos Principais', 'https://images.unsplash.com/photo-1571809839227-b2ac3d261257?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=80', 4.8, true),
  
  -- Gelato Italiano items
  ('Gelato Italiano', 'Gelato de Pistache Tradicional', 'Gelato italiano autêntico de pistache, feito com ingredientes importados da Sicília', 18.90, 'Gelatos', 'https://images.unsplash.com/photo-1579954115545-a95591f28bfc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=80', 4.9, true),
  
  -- Confeitaria Doce Sonho items
  ('Confeitaria Doce Sonho', 'Éclair de Chocolate', 'Massa choux crocante recheada com creme de chocolate belga e cobertura de ganache', 12.90, 'Doces Finos', 'https://images.unsplash.com/photo-1550617931-e17a7b70dce2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=80', 4.7, true),
  
  -- Açaí Tropical items
  ('Açaí Tropical', 'Açaí Tradicional na Tigela', 'Açaí tradicional na tigela com banana, granola e mel orgânico', 15.90, 'Açaí', 'https://images.unsplash.com/photo-1615478503562-ec2d8aa0e24e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=80', 4.8, true)
) AS m(restaurant_name, name, description, price, category, image_url, rating, is_available)
JOIN public.restaurants r ON r.name = m.restaurant_name;