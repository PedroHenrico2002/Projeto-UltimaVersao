-- Criar tabela para armazenar códigos OTP temporários
CREATE TABLE IF NOT EXISTS public.auth_codes (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL,
  code TEXT NOT NULL,
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
  used BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Índice para buscar códigos por email rapidamente
CREATE INDEX IF NOT EXISTS idx_auth_codes_email ON public.auth_codes(email);

-- Índice para limpar códigos expirados
CREATE INDEX IF NOT EXISTS idx_auth_codes_expires_at ON public.auth_codes(expires_at);

-- RLS: Desabilitar acesso público à tabela de códigos por segurança
ALTER TABLE public.auth_codes ENABLE ROW LEVEL SECURITY;

-- Função para limpar códigos expirados automaticamente
CREATE OR REPLACE FUNCTION public.cleanup_expired_auth_codes()
RETURNS void AS $$
BEGIN
  DELETE FROM public.auth_codes
  WHERE expires_at < now() OR (used = true AND created_at < now() - interval '1 hour');
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;