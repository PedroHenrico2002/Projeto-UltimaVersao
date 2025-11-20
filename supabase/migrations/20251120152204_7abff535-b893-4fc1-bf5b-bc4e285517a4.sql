-- Remover itens duplicados (aqueles com IDs padrão 00000000-)
DELETE FROM menu_items WHERE id::text LIKE '00000000-%';

-- Atualizar imagens dos menu items baseado no tipo de alimento
-- Açaí
UPDATE menu_items SET image_url = '/src/assets/menu-items/acai-bowl.jpg' 
WHERE LOWER(name) LIKE '%açaí%' OR category = 'Açaí';

-- Pizza
UPDATE menu_items SET image_url = '/src/assets/menu-items/pizza-margherita.jpg' 
WHERE LOWER(name) LIKE '%pizza%' OR category = 'Pizzas';

-- Sushi e Sashimi
UPDATE menu_items SET image_url = '/src/assets/menu-items/sushi-combo.jpg' 
WHERE LOWER(name) LIKE '%sushi%' OR LOWER(name) LIKE '%combo%' AND category = 'Combos';

UPDATE menu_items SET image_url = '/src/assets/menu-items/sashimi-salmon.jpg' 
WHERE LOWER(name) LIKE '%sashimi%';

-- Massas (Pasta)
UPDATE menu_items SET image_url = '/src/assets/menu-items/pasta-carbonara.jpg' 
WHERE LOWER(name) LIKE '%pasta%' OR LOWER(name) LIKE '%carbonara%' OR LOWER(name) LIKE '%lasanha%' OR LOWER(name) LIKE '%ravioli%';

-- Yakisoba e pratos asiáticos
UPDATE menu_items SET image_url = '/src/assets/menu-items/yakisoba.jpg' 
WHERE LOWER(name) LIKE '%yakisoba%' OR LOWER(name) LIKE '%pad thai%';

UPDATE menu_items SET image_url = '/src/assets/menu-items/gyoza.jpg' 
WHERE LOWER(name) LIKE '%gyoza%' OR LOWER(name) LIKE '%gyouza%';

-- Carnes (Picanha e churrasco)
UPDATE menu_items SET image_url = '/src/assets/menu-items/picanha.jpg' 
WHERE LOWER(name) LIKE '%picanha%' OR LOWER(name) LIKE '%costela%' OR LOWER(name) LIKE '%maminha%' OR category = 'Carnes';

-- Sobremesas e doces (chocolate, bolos)
UPDATE menu_items SET image_url = '/src/assets/menu-items/chocolate-cake.jpg' 
WHERE (LOWER(name) LIKE '%bolo%' OR LOWER(name) LIKE '%chocolate%' OR LOWER(name) LIKE '%brownie%' OR LOWER(name) LIKE '%éclair%' OR LOWER(name) LIKE '%cupcake%') 
AND image_url LIKE '%unsplash%';

-- Gelatos e sorvetes
UPDATE menu_items SET image_url = '/src/assets/menu-items/gelato.jpg' 
WHERE LOWER(name) LIKE '%gelato%' OR LOWER(name) LIKE '%sorvete%' OR category = 'Gelatos';