-- Add rating column to orders table
ALTER TABLE public.orders 
ADD COLUMN rating INTEGER CHECK (rating >= 1 AND rating <= 5);

-- Enable real-time for orders table
ALTER TABLE public.orders REPLICA IDENTITY FULL;
ALTER PUBLICATION supabase_realtime ADD TABLE public.orders;