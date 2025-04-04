
/**
 * Dados de exemplo para usuários
 */
import { User } from '../types';

// Função local para gerar IDs aleatórios (para evitar dependência circular)
const generateSampleId = (): string => {
  return Math.random().toString(36).substring(2, 15) + 
         Math.random().toString(36).substring(2, 15);
};

// Usuários de exemplo
export const sampleUsers: User[] = [
  {
    id: generateSampleId(),
    name: 'Administrador',
    email: 'admin@belegendary.com',
    authType: 'email',
    createdAt: new Date().toISOString()
  },
  {
    id: generateSampleId(),
    name: 'Maria Silva',
    email: 'maria@example.com',
    authType: 'email',
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString() // 5 dias atrás
  },
  {
    id: generateSampleId(),
    name: 'João Santos',
    email: 'joao@example.com',
    authType: 'google',
    createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString() // 10 dias atrás
  },
  {
    id: generateSampleId(),
    name: 'Ana Oliveira',
    email: 'ana@example.com',
    authType: 'facebook',
    createdAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString() // 15 dias atrás
  }
];
