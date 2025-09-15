-- Insert sample categories
INSERT INTO public.categories (name, icon) VALUES
  ('Pizza', '🍕'),
  ('Burger', '🍔'),
  ('Sushi', '🍣'),
  ('Salad', '🥗'),
  ('Sobremesas', '🍰'),
  ('Bebidas', '🥤');

-- Insert sample addresses for restaurants
INSERT INTO public.addresses (street, number, complement, neighborhood, city, state, zip_code, is_restaurant_address) VALUES
  ('Av. Paulista', '1500', 'Loja 25', 'Bela Vista', 'São Paulo', 'SP', '01310-100', true),
  ('Rua Augusta', '2200', 'Piso 2', 'Consolação', 'São Paulo', 'SP', '01412-100', true),
  ('Av. Ipiranga', '200', 'Térreo', 'República', 'São Paulo', 'SP', '01046-010', true),
  ('Rua Oscar Freire', '498', 'Loja 10', 'Jardins', 'São Paulo', 'SP', '01426-000', true),
  ('Av. Brigadeiro Faria Lima', '2232', 'Loja 15', 'Itaim Bibi', 'São Paulo', 'SP', '01451-000', true),
  ('Rua dos Pinheiros', '320', '', 'Pinheiros', 'São Paulo', 'SP', '05422-000', true),
  ('Alameda Santos', '1293', 'Loja 22', 'Jardins', 'São Paulo', 'SP', '01419-100', true);

-- Insert sample restaurants
INSERT INTO public.restaurants (name, category_id, image_url, cuisine, delivery_time, min_order, delivery_fee, rating, is_open, address_id) 
SELECT 
  r.name,
  c.id as category_id,
  r.image_url,
  r.cuisine,
  r.delivery_time,
  r.min_order,
  r.delivery_fee,
  r.rating,
  r.is_open,
  a.id as address_id
FROM (VALUES
  ('Doce Paixão', 'Sobremesas', 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=80', 'Doces e Bolos', '20-35 min', 5.90, 3.50, 4.9, true, 'Av. Paulista'),
  ('Restaurante Japonês', 'Sushi', 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80', 'Japonesa', '30-45 min', 25.00, 5.00, 4.9, true, 'Rua Augusta'),
  ('Churrascaria Gaúcha', 'Burger', 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80', 'Churrasco', '35-50 min', 30.00, 6.00, 4.7, true, 'Av. Ipiranga'),
  ('Comida Caseira', 'Pizza', 'https://images.unsplash.com/photo-1547928576-f8d1c7a1b709?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80', 'Brasileira', '20-35 min', 12.90, 4.00, 4.5, true, 'Rua Oscar Freire'),
  ('Gelato Italiano', 'Sobremesas', 'https://images.unsplash.com/photo-1501443762994-82bd5dace89a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=80', 'Sorvetes e Gelatos Artesanais', '15-30 min', 6.50, 2.50, 4.6, true, 'Av. Brigadeiro Faria Lima'),
  ('Confeitaria Doce Sonho', 'Sobremesas', 'https://images.unsplash.com/photo-1574085733277-851d9d856a3a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80', 'Doces e Confeitaria', '25-40 min', 7.50, 3.00, 4.8, true, 'Rua dos Pinheiros'),
  ('Açaí Tropical', 'Sobremesas', 'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=80', 'Açaí e Smoothies Premium', '20-35 min', 5.50, 2.00, 4.7, true, 'Alameda Santos')
) AS r(name, category_name, image_url, cuisine, delivery_time, min_order, delivery_fee, rating, is_open, address_street)
JOIN public.categories c ON c.name = r.category_name
JOIN public.addresses a ON a.street = r.address_street;