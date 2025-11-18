
-- Primeiro, atualizar os pedidos para apontarem para os restaurantes corretos
UPDATE orders SET restaurant_id = '00000000-0000-0000-0000-000000000208'
WHERE restaurant_id = '667bd835-ddf2-4620-9340-c1ffa8ea111c';

UPDATE orders SET restaurant_id = '00000000-0000-0000-0000-000000000203'
WHERE restaurant_id = '95ce6c43-a296-44c6-8354-d0756afea7ea';

UPDATE orders SET restaurant_id = '00000000-0000-0000-0000-000000000204'
WHERE restaurant_id = '2f59b6b3-bfd7-41f5-836d-25498658222c';

UPDATE orders SET restaurant_id = '00000000-0000-0000-0000-000000000207'
WHERE restaurant_id = '5d95f55f-8f46-41e9-b17a-3a933a98a2c2';

UPDATE orders SET restaurant_id = '00000000-0000-0000-0000-000000000201'
WHERE restaurant_id = 'c0890839-f4dc-4e00-9870-fdd761c16993';

UPDATE orders SET restaurant_id = '00000000-0000-0000-0000-000000000206'
WHERE restaurant_id = 'b4b37a19-4503-43ef-b4fa-6e952385d71e';

UPDATE orders SET restaurant_id = '00000000-0000-0000-0000-000000000202'
WHERE restaurant_id = '4db218fc-092d-41f8-9ed9-9b6adf15cf65';

-- Atualizar menu_items para apontarem para os restaurantes corretos
UPDATE menu_items SET restaurant_id = '00000000-0000-0000-0000-000000000208'
WHERE restaurant_id = '667bd835-ddf2-4620-9340-c1ffa8ea111c';

UPDATE menu_items SET restaurant_id = '00000000-0000-0000-0000-000000000203'
WHERE restaurant_id = '95ce6c43-a296-44c6-8354-d0756afea7ea';

UPDATE menu_items SET restaurant_id = '00000000-0000-0000-0000-000000000204'
WHERE restaurant_id = '2f59b6b3-bfd7-41f5-836d-25498658222c';

UPDATE menu_items SET restaurant_id = '00000000-0000-0000-0000-000000000207'
WHERE restaurant_id = '5d95f55f-8f46-41e9-b17a-3a933a98a2c2';

UPDATE menu_items SET restaurant_id = '00000000-0000-0000-0000-000000000201'
WHERE restaurant_id = 'c0890839-f4dc-4e00-9870-fdd761c16993';

UPDATE menu_items SET restaurant_id = '00000000-0000-0000-0000-000000000206'
WHERE restaurant_id = 'b4b37a19-4503-43ef-b4fa-6e952385d71e';

UPDATE menu_items SET restaurant_id = '00000000-0000-0000-0000-000000000202'
WHERE restaurant_id = '4db218fc-092d-41f8-9ed9-9b6adf15cf65';

-- Agora deletar os restaurantes duplicados
DELETE FROM restaurants WHERE id IN (
  '667bd835-ddf2-4620-9340-c1ffa8ea111c',
  '95ce6c43-a296-44c6-8354-d0756afea7ea',
  '2f59b6b3-bfd7-41f5-836d-25498658222c',
  '5d95f55f-8f46-41e9-b17a-3a933a98a2c2',
  'c0890839-f4dc-4e00-9870-fdd761c16993',
  'b4b37a19-4503-43ef-b4fa-6e952385d71e',
  '4db218fc-092d-41f8-9ed9-9b6adf15cf65'
);

-- Atualizar restaurantes com nomes únicos e variados mantendo as funcionalidades
UPDATE restaurants SET 
  name = 'Pizzaria Bella Napoli',
  cuisine = 'Pizza Artesanal Italiana',
  description = 'Pizzas napolitanas autênticas em forno a lenha'
WHERE id = '00000000-0000-0000-0000-000000000201';

UPDATE restaurants SET 
  name = 'Sushi House Premium',
  cuisine = 'Culinária Japonesa Contemporânea',
  description = 'Sushi e sashimi frescos com técnicas tradicionais'
WHERE id = '00000000-0000-0000-0000-000000000202';

UPDATE restaurants SET 
  name = 'Churrascaria Gaúcha Tradição',
  cuisine = 'Churrasco e Carnes Nobres',
  description = 'Cortes premium e rodízio de carnes selecionadas'
WHERE id = '00000000-0000-0000-0000-000000000203';

UPDATE restaurants SET 
  name = 'Cantina da Nonna',
  cuisine = 'Comida Caseira Italiana',
  description = 'Receitas tradicionais italianas feitas com amor'
WHERE id = '00000000-0000-0000-0000-000000000204';

UPDATE restaurants SET 
  name = 'Gelateria Artigianale',
  cuisine = 'Gelatos e Sorvetes Premium',
  description = 'Gelatos artesanais com ingredientes naturais'
WHERE id = '00000000-0000-0000-0000-000000000206';

UPDATE restaurants SET 
  name = 'Doce Encanto Confeitaria',
  cuisine = 'Confeitaria e Doces Finos',
  description = 'Doces sofisticados e bolos personalizados'
WHERE id = '00000000-0000-0000-0000-000000000207';

UPDATE restaurants SET 
  name = 'Açaí Amazon Bowl',
  cuisine = 'Açaí e Bowls Saudáveis',
  description = 'Açaí puro com toppings selecionados'
WHERE id = '00000000-0000-0000-0000-000000000208';
